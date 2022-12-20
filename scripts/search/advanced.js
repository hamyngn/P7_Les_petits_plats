/* eslint-disable no-unused-vars */
/* global getRecipeDOM */

/**
   *
   * @param {Array} arr
   * @param {Array} target
   * @returns boolean
   */
function checker(arr, target) {
  let include = true;
  for (let i = 0; i < target.length; i += 1) {
    if (!arr.includes(target[i])) {
      include = false;
    }
  }
  return include;
}

/**
 * search by tags
 * @param {object} data
 * @returns div element
 */
function advancedSearchTags(data) {
  const {
    ingredients, appliance, ustensils,
  } = data;

  const ingredientTags = document.querySelectorAll('.ingredients-tag');
  const appareilTags = document.querySelectorAll('.appareils-tag');
  const ustensilTags = document.querySelectorAll('.ustensils-tag');
  const div = document.querySelector('.search-result');

  const ingredientTagsArr = [];
  if (ingredientTags.length >= 1) {
    ingredientTags.forEach((i) => ingredientTagsArr.push(i.textContent));
  }
  const appareilTagsArr = [];
  if (appareilTags.length >= 1) {
    appareilTags.forEach((a) => appareilTagsArr.push(a.textContent));
  }
  const ustensilTagsArr = [];
  if (ustensilTags.length >= 1) {
    ustensilTags.forEach((u) => ustensilTagsArr.push(u.textContent));
  }
  const ingredientsArr = [];
  for (let i = 0; i < ingredients.length; i += 1) {
    ingredientsArr.push(ingredients[i].ingredient);
  }
  const appareilArr = [];
  appareilArr.push(appliance);
  const ustensilArr = [];
  ustensils.forEach((u) => ustensilArr.push(u));
  if (checker(ingredientsArr, ingredientTagsArr)
              && checker(ustensilArr, ustensilTagsArr)
              && checker(appareilArr, appareilTagsArr)) {
    const recipeDOM = getRecipeDOM(data);
    div.appendChild(recipeDOM);
  }
  return div;
}

/**
 * search by tags and keyword
 * @param {object} data
 */
function advancedSearchTagsAndKey(data) {
  const {
    name, description, ingredients,
  } = data;
  const keyword = document.querySelector('.search-bar').value;
  const reKey = new RegExp(keyword, 'gi');
  if (keyword.length >= 3) {
    if (name.toString().match(reKey)) {
      advancedSearchTags(data);
    }
    if (!name.toString().match(reKey) && description.toString().match(reKey)) {
      advancedSearchTags(data);
    }
    ingredients.forEach((i) => {
      if (!name.toString().match(reKey)
        && !description.toString().match(reKey)
        && i.ingredient.toString().match(reKey)) {
        advancedSearchTags(data);
      }
    });
  } else advancedSearchTags(data);
}
