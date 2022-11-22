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

// display search result
async function searchByName() {
  const { recipes } = await getRecipes();
  recipes.forEach((recipe) => {
    const recipeModel = recipeFactory(recipe);
    recipeModel.search();
  });
  const result = document.querySelector('.result');
  result.style.display = 'block';
  const recipesBlock = document.querySelector('.section--recipes');
  recipesBlock.style.display = 'none';
}
const searchbar = document.querySelector('.search-icon');
searchbar.addEventListener('click', searchByName);
