/* eslint-disable no-unused-vars */
/* global getRecipeDOM, getTags */

/**
   * display recipes and tags that include keyword
   */
function search(data) {
  const {
    name, ingredients, description,
  } = data;
  const keyword = document.querySelector('.search-bar').value;
  const reKey = new RegExp(keyword, 'gi');
  const div = document.querySelector('.search-result');
  if (name.toString().match(reKey)) {
    const recipeDOM = getRecipeDOM(data);
    div.appendChild(recipeDOM);
    getTags(data);
  }
  if (!name.toString().match(reKey) && description.toString().match(reKey)) {
    const recipeDOM = getRecipeDOM(data);
    div.appendChild(recipeDOM);
    getTags(data);
  }
  for (let i = 0; i < ingredients.length; i += 1) {
    if (!name.toString().match(reKey)
    && !description.toString().match(reKey)
    && ingredients[i].toString().match(reKey)) {
      const recipeDOM = getRecipeDOM(data);
      div.appendChild(recipeDOM);
      getTags(data);
    }
  }
  return div;
}
