/* eslint-disable no-unused-vars */
/**
   * add tags include keyword to advanced search
   * @param {Array} tags
   * @param {String} field
   */
function addTags(tags, field) {
  const modal = document.querySelector(`.modal-${field}`);
  for (let k = 0; k < tags.length; k += 1) {
    const keySuggest = document.createElement('div');
    keySuggest.setAttribute('class', field);
    keySuggest.innerHTML = tags[k];
    modal.appendChild(keySuggest);
  }
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
  const applianceField = 'appareils';
  addTags(applianceTags, applianceField);
  const ustensilField = 'ustensils';
  addTags(ustensilTags, ustensilField);
}
