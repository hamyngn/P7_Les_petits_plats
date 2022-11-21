async function getRecipes() {
    const response = await fetch('./recipes.json');
    const data = await response.json();
    return data;
  }

  async function displayRecipes(recipes) {
    const recipesSection = document.querySelector('.recipes');
  
    recipes.forEach((recipe) => {
      const recipeModel = recipeFactory(recipe);
      const recipeDOM = recipeModel.getRecipeDOM();
      recipesSection.appendChild(recipeDOM);
    });
  }
  async function init() {
    const {recipes} = await getRecipes();
    displayRecipes(recipes);
  }
  
  window.onload = () => {
    init();
  };