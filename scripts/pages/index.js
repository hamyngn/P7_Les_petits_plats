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
    itemsArr.push(items[j].innerHTML);
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

// display message no result
const searchResult = document.querySelector('.search-result');
const result = document.querySelector('.result');
function noResult() {
  if (!searchResult.hasChildNodes()) {
    const p = document.createElement('p');
    p.textContent = 'Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.';
    result.appendChild(p);
  }
}

// display search result

async function searchPrincipal() {
  const keyword = document.querySelector('.search-bar').value;
  const error = document.querySelector('.error');

  if (keyword.length < 3) {
    error.innerHTML = 'Please enter at least 3 characters';
  }
  if (keyword.length >= 3) {
    error.style.display = 'none';
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
    const ingredientsStr = 'ingredients';
    removeSameTags(ingredientsStr); // remove same tags in searching by ingredients
    const appareilsStr = 'appareils';
    removeSameTags(appareilsStr);
    const ustensilsStr = 'ustensils';
    removeSameTags(ustensilsStr);
    const ingredientTags = document.querySelectorAll('.modal-ingredients .ingredients');
    for (let i = 0; i < ingredientTags.length; i += 1) {
      ingredientTags[i].addEventListener('click', () => {
        console.log(ingredientTags[i].innerHTML);
        advancedSearchRecipes(ingredientTags[i].innerHTML);
      });
    }
  }
}

const searchbar = document.querySelector('.search-bar');
searchbar.addEventListener('input', searchPrincipal);

// hide Modal
const modalBackground = document.querySelector('.bground');
function hideModal(field) {
  const show = document.querySelector(`.show-${field}`);
  const hide = document.querySelector(`.hide-${field}`);
  const modal = document.querySelector(`.modal-${field}`);
  const div = document.querySelector(`.div--${field}`);

  modalBackground.style.display = 'none';
  modal.style.display = 'none';
  // take back default value of advanced search field's size
  div.style.width = 'fit-content';
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

    if (hide.style.display === 'none') {
      hideModal(ingredientsStr);
      hideModal(appareilsStr);
      hideModal(ustensilsStr);
      modalBackground.style.display = 'block';
      modal.style.display = 'grid';
      div.style.width = '667px';
      show.style.display = 'none';
      hide.style.display = 'inline-block';
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

async function advancedSearchRecipes(tag) {
  const { recipes } = await getRecipes();
  const div = document.querySelector('.search-result');
  while (div.firstChild) {
    div.removeChild(div.lastChild);
  }
  for (let k = 0; k < recipes.length; k += 1) {
    const recipeModel = recipeFactory(recipes[k]);
    recipeModel.advancedSearch(tag);
  }
}
