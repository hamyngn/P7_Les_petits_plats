/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-console */
/* global recipeFactory */
async function getRecipes() {
  const response = await fetch('./recipes.json');
  const data = await response.json();
  return data;
}

/**
 * display homepage recipes
 * @param {Array} recipes
 */
async function displayRecipes(recipes) {
  const recipesSection = document.querySelector('.recipes');

  recipes.forEach((recipe) => {
    const recipeModel = recipeFactory(recipe);
    const recipeDOM = recipeModel.getRecipeDOM();
    recipesSection.appendChild(recipeDOM);
  });
}

async function init() {
  const { recipes } = await getRecipes();
  displayRecipes(recipes);
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

function displayTags() {
  const ingredientsStr = 'ingredients';
  removeSameTags(ingredientsStr); // remove same tags in searching by ingredients
  const appareilsStr = 'appareils';
  removeSameTags(appareilsStr);
  const ustensilsStr = 'ustensils';
  removeSameTags(ustensilsStr);
}

// display message no result
const searchResult = document.querySelector('.search-result');
const result = document.querySelector('.result');
function noResult() {
  if (!searchResult.hasChildNodes()) {
    const p = document.createElement('p');
    p.style.width = '100vw';
    p.textContent = 'Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.';
    searchResult.appendChild(p);
  }
}

/**
 * display recipes when search by Ingredient tag
 * @param {String} tag
 */
async function searchByIngredientTag(tag) {
  const { recipes } = await getRecipes();
  const div = document.querySelector('.search-result');
  div.replaceChildren();
  for (let k = 0; k < recipes.length; k += 1) {
    const recipeModel = recipeFactory(recipes[k]);
    recipeModel.advancedSearchIngredient(tag);
  }
}

/* add onlick event to ingredient tags
    and remove tags that do not match ingredient input keyword */
function searchByIngredientTags() {
  const tags = document.querySelector('.tags');
  const ingredientTags = document.querySelectorAll('.modal-ingredients .ingredients');
  // add onlick event to ingredient tags
  for (let i = 0; i < ingredientTags.length; i += 1) {
    ingredientTags[i].addEventListener('click', () => {
      searchByIngredientTag(ingredientTags[i].innerHTML);
      ingredientTags[i].setAttribute('clicked', 'clicked');
      const div = document.createElement('div');
      div.setAttribute('class', 'tag');
      div.innerHTML = ingredientTags[i].innerHTML;
      tags.appendChild(div);
    });
  }
  // remove tags that do not match ingredient input keyword
  const inputIngredients = document.querySelector('.input-ingredients');
  inputIngredients.addEventListener('input', () => {
    const inputKeyword = inputIngredients.value;
    const exInput = new RegExp(inputKeyword, 'gi');
    ingredientTags.forEach((ingredientTag) => ingredientTag.style.display = 'block');
    if (inputKeyword !== '') {
      for (let i = 0; i < ingredientTags.length; i += 1) {
        if (!ingredientTags[i].innerHTML.match(exInput)) {
          ingredientTags[i].style.display = 'none';
        }
      }
    }
  });
}

/**
 * search by Appareil tag
 * @param {String} tag
 */
async function searchByAppareilTag(tag) {
  const { recipes } = await getRecipes();
  const div = document.querySelector('.search-result');
  div.replaceChildren();
  for (let k = 0; k < recipes.length; k += 1) {
    const recipeModel = recipeFactory(recipes[k]);
    recipeModel.advancedSearchAppareil(tag);
  }
}

// add onclick event to appareil tags
function searchByAppareilTags() {
  const appareilsTags = document.querySelectorAll('.modal-appareils .appareils');
  for (let j = 0; j < appareilsTags.length; j += 1) {
    appareilsTags[j].addEventListener('click', () => {
      console.log(appareilsTags[j].innerHTML);
      searchByAppareilTag(appareilsTags[j].innerHTML);
    });
  }

  const inputAppareils = document.querySelector('.input-appareils');
  inputAppareils.addEventListener('input', () => {
    const inputKeyword = inputAppareils.value;
    const exInput = new RegExp(inputKeyword, 'gi');
    appareilsTags.forEach((tag) => tag.style.display = 'block');
    if (inputKeyword !== '') {
      for (let i = 0; i < appareilsTags.length; i += 1) {
        if (!appareilsTags[i].innerHTML.match(exInput)) {
          appareilsTags[i].style.display = 'none';
        }
      }
    }
  });
}

/**
 * display recipes when search by ustensil tag
 * @param {String} tag
 */
async function searchByUstensilTag(tag) {
  const { recipes } = await getRecipes();
  const div = document.querySelector('.search-result');
  div.replaceChildren();
  for (let k = 0; k < recipes.length; k += 1) {
    const recipeModel = recipeFactory(recipes[k]);
    recipeModel.advancedSearchUstensil(tag);
  }
}

// add onlick event to ustensil tags
function searchByUstensilTags() {
  const ustensilsTags = document.querySelectorAll('.modal-ustensils .ustensils');
  for (let i = 0; i < ustensilsTags.length; i += 1) {
    ustensilsTags[i].addEventListener('click', () => {
      searchByUstensilTag(ustensilsTags[i].innerHTML);
    });
  }
}

// display search result
async function searchPrincipal() {
  const keyword = document.querySelector('.search-bar').value;
  if (keyword.length >= 3) {
    searchResult.replaceChildren();
    const { recipes } = await getRecipes();
    for (let k = 0; k < recipes.length; k += 1) {
      const recipeModel = recipeFactory(recipes[k]);
      // function display recipes and tags that include keyword
      recipeModel.search();
    }
    /*   recipes.forEach((recipe) => {
    const recipeModel = recipeFactory(recipe);
    recipeModel.search();
  }); */
    result.style.display = 'block'; // display searching result
    const recipesBlock = document.querySelector('.section--recipes');
    recipesBlock.style.display = 'none'; // hide block that include all recipes
    noResult(); // display message no result
    displayTags();
    searchByIngredientTags();
    searchByAppareilTags();
    searchByUstensilTags();
  }
}

const modalIngredients = document.querySelector('.modal-ingredients');
const modalAppareils = document.querySelector('.modal-appareils');
const modalUstensils = document.querySelector('.modal-ustensils');

// clear old search result tags before diplay new search result tags
function clearTags() {
  modalIngredients.replaceChildren();
  modalAppareils.replaceChildren();
  modalUstensils.replaceChildren();
}

const searchbar = document.querySelector('.search-bar');
searchbar.addEventListener('input', () => {
  clearTags();
  searchPrincipal();
});

// hide Modal
const modalBackground = document.querySelector('.bground');
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

// display Ingredients modal
const ingredientsStr = 'ingredients';
const appareilsStr = 'appareils';
const ustensilsStr = 'ustensils';
function showAndHideModal(field) {
  const keyword = document.querySelector('.search-bar').value;
  if (keyword.length >= 3) {
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
