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
    for (let i = 0; i < recipes.length; i += 1) {
      const recipeModel = recipeFactory(recipes[i]);
      recipeModel.search(); // function display recipes and tags that include keyword
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
  }
}

const searchbar = document.querySelector('.search-bar');
searchbar.addEventListener('input', searchPrincipal);

// display Ingredients modal
const modalBackground = document.querySelector('.bground');

function showAndHideIngredients(string) {
  const keyword = document.querySelector('.search-bar').value;
  if (keyword.length >= 3) {
    const show = document.querySelector(`.show-${string}`);
    const hide = document.querySelector(`.hide-${string}`);
    const modal = document.querySelector(`.modal-${string}`);
    const div = document.querySelector(`.div--${string}`);
    if (hide.style.display === 'none') {
      modalBackground.style.display = 'block';
      modal.style.display = 'grid';
      div.style.width = '667px';
      show.style.display = 'none';
      hide.style.display = 'inline-block';
    } else {
      modalBackground.style.display = 'none';
      modal.style.display = 'none';
      div.style.width = 'fit-content';
      hide.style.display = 'none';
      show.style.display = 'inline-block';
    }
  }
}
const iconIngredients = document.querySelector('.icon--ingredients');
iconIngredients.addEventListener('click', () => {
  const ingredient = 'ingredients';
  showAndHideIngredients(ingredient);
});

const iconAppareils = document.querySelector('.icon--appareils');
iconAppareils.addEventListener('click', () => {
  const appareils = 'appareils';
  showAndHideIngredients(appareils);
});

const iconUstensils = document.querySelector('.icon--ustensils');
iconUstensils.addEventListener('click', () => {
  const ustensils = 'ustensils';
  showAndHideIngredients(ustensils);
});
