/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-console */
/* global getRecipeDOM, search, getTags, advancedSearchTagsAndKey */

/**
 *
 * @returns recipes objects
 */
async function getRecipes() {
  const response = await fetch('./recipes.json');
  const data = await response.json();
  return data;
}

/**
 * create recipes elements
 * @param {Array} recipes
 */
async function displayRecipes(recipes) {
  const recipesSection = document.querySelector('.recipes');
  recipes.forEach((recipe) => {
    const recipeDOM = getRecipeDOM(recipe);
    recipesSection.appendChild(recipeDOM);
  });
}

/**
 * create all tags
 * @param {Array} recipes
 */
async function displayAllTags(recipes) {
  recipes.forEach((recipe) => {
    getTags(recipe);
  });
  displayTags();
}

/**
 * display all recipes
 */
async function init() {
  const { recipes } = await getRecipes();
  displayRecipes(recipes);
  displayAllTags(recipes);
}

window.onload = () => {
  init();
};

/**
 * remove same tags in advanced search
 * @param {String} item
 */
function removeSameTags(item) {
  const items = document.querySelectorAll(`.${item}`);
  const itemsArr = [];
  for (let j = 0; j < items.length; j += 1) {
    itemsArr.push(items[j].innerHTML.toLowerCase());
  }
  const uniqueIngredients = [];
  for (let k = 0; k < itemsArr.length; k += 1) {
    if (!uniqueIngredients.includes(itemsArr[k])) {
      uniqueIngredients.push(itemsArr[k]);
    } else {
      items[k].remove();
    }
  }
}

const ingredientsStr = 'ingredients';
const appareilsStr = 'appareils';
const ustensilsStr = 'ustensils';
/**
 * display updated ingredient, appareil, ustensil tags after removing cached
 */
function displayTags() {
  removeSameTags(ingredientsStr); // remove same tags in searching by ingredients
  removeSameTags(appareilsStr);
  removeSameTags(ustensilsStr);
}

const searchResult = document.querySelector('.search-result');
const result = document.querySelector('.result');

/**
 * display message no result
 */
function noResult() {
  if (!searchResult.hasChildNodes()) {
    const p = document.createElement('p');
    p.style.width = '100vw';
    p.textContent = 'Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.';
    searchResult.appendChild(p);
  }
}

const modalBackground = document.querySelector('.bground');
/**
 * open tags modal
 * @param {String} field
 */
function showModal(field) {
  const show = document.querySelector(`.show-${field}`);
  const hide = document.querySelector(`.hide-${field}`);
  const modal = document.querySelector(`.modal-${field}`);
  const div = document.querySelector(`.div--${field}`);
  modalBackground.style.display = 'block';
  modal.style.display = 'grid';
  div.style.width = '667px';
  show.style.display = 'none';
  hide.style.display = 'inline-block';
}

/**
 * hide tags modal
 * @param {String} field
 */
function hideModal(field) {
  const show = document.querySelector(`.show-${field}`);
  const hide = document.querySelector(`.hide-${field}`);
  const modal = document.querySelector(`.modal-${field}`);
  const div = document.querySelector(`.div--${field}`);
  const input = document.querySelector(`.input-${field}`);
  const inputKey = field.charAt(0).toUpperCase() + field.slice(1);
  input.setAttribute('placeholder', `${inputKey}`);
  modalBackground.style.display = 'none';
  modal.style.display = 'none';
  // take back default value of advanced search field's size
  div.style.width = '170px';
  hide.style.display = 'none';
  show.style.display = 'inline-block';
}

const recipesBlock = document.querySelector('.section--recipes');

/**
 * update recipes search result when remove a tag
 */
async function searchByTagListAndKey() {
  searchResult.replaceChildren();
  clearTags();
  const { recipes } = await getRecipes();
  for (let k = 0; k < recipes.length; k += 1) {
    advancedSearchTagsAndKey(recipes[k]);
  }
  noResult();
}

/**
 * remove tags that do not match advanced input keyword
 */
function removeNotMatchedTags(field) {
  const fieldTags = document.querySelectorAll(`.modal-${field} .${field}`);
  const input = document.querySelector(`.input-${field}`);
  input.addEventListener('input', () => {
    hideModal(ingredientsStr);
    hideModal(appareilsStr);
    hideModal(ustensilsStr);
    showModal(field);
    const inputKeyword = input.value;
    const exInput = new RegExp(inputKeyword, 'gi');
    fieldTags.forEach((tag) => tag.style.display = 'block');
    if (inputKeyword !== '') {
      for (let i = 0; i < fieldTags.length; i += 1) {
        if (!fieldTags[i].innerHTML.match(exInput)) {
          fieldTags[i].style.display = 'none';
        }
      }
    }
  });
}

/**
 * display search result
 */
async function searchPrincipal() {
  const keyword = document.querySelector('.search-bar').value;
  const { recipes } = await getRecipes();
  if (!tagsDiv.hasChildNodes()) {
    if (keyword.length >= 3) {
      for (let i = 0; i < recipes.length; i += 1) {
        search(recipes[i]);
      }
      displayTags();
      result.style.display = 'block'; // display searching result
      recipesBlock.style.display = 'none'; // hide block that include all recipes
      noResult(); // display message no result
    } else {
      result.style.display = 'none';
      recipesBlock.style.display = 'grid';
      init();
    }
  }
  if (tagsDiv.hasChildNodes()) {
    result.style.display = 'block';
    recipesBlock.style.display = 'none';
    for (let i = 0; i < recipes.length; i += 1) {
      advancedSearchTagsAndKey(recipes[i]);
    }
    noResult();
  }
}
const modalIngredients = document.querySelector('.modal-ingredients');
const modalAppareils = document.querySelector('.modal-appareils');
const modalUstensils = document.querySelector('.modal-ustensils');

/**
 * clear old tags before diplay new search result tags
 */
function clearTags() {
  modalIngredients.replaceChildren();
  modalAppareils.replaceChildren();
  modalUstensils.replaceChildren();
}
const tagsDiv = document.querySelector('.tags');
const searchbar = document.querySelector('.search-bar');
searchbar.addEventListener('input', () => {
  clearTags();
  searchResult.replaceChildren();
  searchPrincipal();
});

/**
 * display tags modal
 * @param {String} field
 */
function showAndHideModal(field) {
  const show = document.querySelector(`.show-${field}`);
  const hide = document.querySelector(`.hide-${field}`);
  const modal = document.querySelector(`.modal-${field}`);
  const div = document.querySelector(`.div--${field}`);
  const input = document.querySelector(`.input-${field}`);
  if (hide.style.display === 'none') {
    hideModal(ingredientsStr);
    hideModal(appareilsStr);
    hideModal(ustensilsStr);
    modalBackground.style.display = 'block';
    modal.style.display = 'grid';
    div.style.width = '667px';
    show.style.display = 'none';
    hide.style.display = 'inline-block';
    const inputKey = field.slice(0, -1);
    input.setAttribute('placeholder', `Rechercher un ${inputKey}`);
  } else {
    hideModal(field);
  }
}

// show and hide ingredients tags
const iconIngredients = document.querySelector('.icon--ingredients');
iconIngredients.addEventListener('click', () => {
  showAndHideModal(ingredientsStr);
});

// show and hide appareils tags
const iconAppareils = document.querySelector('.icon--appareils');
iconAppareils.addEventListener('click', () => {
  showAndHideModal(appareilsStr);
});

// show and hide ustensils tags
const iconUstensils = document.querySelector('.icon--ustensils');
iconUstensils.addEventListener('click', () => {
  showAndHideModal(ustensilsStr);
});
