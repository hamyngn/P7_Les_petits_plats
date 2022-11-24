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

// remove same tags in searching by ingredients
function removeSameTags() {
  const ingredients = document.querySelectorAll('.ingredient');
  const ingredientsArr = [];
  for (let j = 0; j < ingredients.length; j += 1) {
    ingredientsArr.push(ingredients[j].innerHTML);
  }
  const uniqueIngredients = [];
  for (let k = 0; k < ingredientsArr.length; k += 1) {
    if (!uniqueIngredients.includes(ingredientsArr[k])) {
      uniqueIngredients.push(ingredientsArr[k]);
      console.log(uniqueIngredients);
    } else {
      console.log(ingredients[k]);
      ingredients[k].remove();
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
    removeSameTags(); // remove same tags in searching by ingredients
  }
}

const searchbar = document.querySelector('.search-bar');
searchbar.addEventListener('input', searchPrincipal);

function showIngredients() {
  const modalIngredients = document.querySelector('.bground');
  modalIngredients.style.display = 'block';
}
const iconIngredients = document.querySelector('.icon--ingredients');
iconIngredients.addEventListener('click', showIngredients);
