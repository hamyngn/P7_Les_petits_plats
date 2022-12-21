/* eslint-disable no-unused-vars */
/* global searchByTagListAndKey, removeNotMatchedTags, searchResult, result, recipesBlock */
/**
   * add tags include keyword to advanced search
   * @param {Array} tags
   * @param {String} field
   */
function addTags(tags, field) {
  const modal = document.querySelector(`.modal-${field}`);
  const tagsDiv = document.querySelector('.tags');
  tags.forEach((tag) => {
    const keySuggest = document.createElement('div');
    keySuggest.setAttribute('class', field);
    keySuggest.innerHTML = tag;
    modal.appendChild(keySuggest);
    keySuggest.addEventListener('click', () => {
      keySuggest.setAttribute('clicked', 'clicked');
      keySuggest.style.pointerEvents = 'none';
      const div = document.createElement('div');
      div.setAttribute('class', `tag ${field}-tag`);
      div.innerHTML = keySuggest.innerHTML;
      const span = document.createElement('span');
      span.innerHTML = '<i class="fa-regular fa-circle-xmark"></i>';
      span.addEventListener('click', () => {
        div.remove();
        keySuggest.style.pointerEvents = 'auto';
        searchByTagListAndKey();
      });
      div.appendChild(span);
      tagsDiv.appendChild(div);
      tagsDiv.style.display = 'flex';
      searchByTagListAndKey();
      const clickedTags = document.querySelectorAll('.tag');
      if (clickedTags.length === 1) {
        searchResult.replaceChildren();
      }
      result.style.display = 'block'; // display searching result
      recipesBlock.style.display = 'none'; // hide block that include all recipes
    });
  });
  return modal;
}

/**
 * get all tags of a recipe
 * @param {object} data
 */
function getTags(data) {
  const {
    ingredients, appliance, ustensils,
  } = data;

  const ingredientTags = [];
  const applianceTags = [];
  const ustensilTags = [];
  for (let i = 0; i < ingredients.length; i += 1) {
    ingredientTags.push(ingredients[i].ingredient);
  }
  applianceTags.push(appliance);
  for (let j = 0; j < ustensils.length; j += 1) {
    ustensilTags.push(ustensils[j]);
  }
  const ingredientsField = 'ingredients';
  addTags(ingredientTags, ingredientsField);
  removeNotMatchedTags(ingredientsField);
  const applianceField = 'appareils';
  addTags(applianceTags, applianceField);
  removeNotMatchedTags(applianceField);
  const ustensilField = 'ustensils';
  addTags(ustensilTags, ustensilField);
  removeNotMatchedTags(ustensilField);
}
