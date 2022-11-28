/* eslint-disable no-unused-vars */
/* gobal advancedSearchRecipes */
function recipeFactory(data) {
  const {
    id, name, servings, ingredients, time, description, appliance, ustensils,
  } = data;

  // display recipe
  function getRecipeDOM() {
    const article = document.createElement('article');
    const div = document.createElement('div');
    div.setAttribute('class', 'image');
    const abstract = document.createElement('div');
    abstract.setAttribute('class', 'abstract');
    const head = document.createElement('div');
    head.setAttribute('class', 'head');
    const h1 = document.createElement('h1');
    h1.innerHTML = name;
    const span = document.createElement('span');
    span.innerHTML = `<i class="fa-regular fa-clock"></i> ${time}`;
    head.appendChild(h1);
    head.appendChild(span);
    abstract.appendChild(head);
    const intro = document.createElement('div');
    intro.setAttribute('class', 'intro');
    const ingredientsDiv = document.createElement('div');
    ingredientsDiv.setAttribute('class', 'ingredients');
    const ul = document.createElement('ul');
    for (let k = 0; k < ingredients.length; k += 1) {
      const li = document.createElement('li');
      li.innerHTML = ingredients[k].ingredient;
      if (Object.prototype.hasOwnProperty.call(ingredients[k], 'quantity')) {
        li.innerHTML = `${ingredients[k].ingredient}: ${ingredients[k].quantity}`;
      }
      if (Object.prototype.hasOwnProperty.call(ingredients[k], 'unit')) {
        li.innerHTML = `${ingredients[k].ingredient}: ${ingredients[k].quantity} ${ingredients[k].unit}`;
      }
      ul.appendChild(li);
    }
    ingredientsDiv.appendChild(ul);
    const paragraphe = document.createElement('p');
    paragraphe.setAttribute('class', 'description');
    paragraphe.innerHTML = description;
    intro.appendChild(ingredientsDiv);
    intro.appendChild(paragraphe);
    abstract.appendChild(intro);
    article.appendChild(div);
    article.appendChild(abstract);
    return article;
  }

  const keyword = document.querySelector('.search-bar').value;
  const reKey = new RegExp(keyword, 'gi');
  function advancedSearch(fieldValue) {
    document.querySelector('.input-ingredients').value = fieldValue;
    const div = document.querySelector('.search-result');
    if (name.toString().match(reKey)) {
      for (let j = 0; j < ingredients.length; j += 1) {
        if (ingredients[j].ingredient == fieldValue) {
          const recipeDOM = getRecipeDOM();
          div.appendChild(recipeDOM);
          break;
        }
      }
    }
    if (!name.toString().match(reKey) && description.toString().match(reKey)) {
      for (let j = 0; j < ingredients.length; j += 1) {
        if (ingredients[j].ingredient == fieldValue) {
          const recipeDOM = getRecipeDOM();
          div.appendChild(recipeDOM);
          break;
        }
      }
    }
    for (let i = 0; i < ingredients.length; i += 1) {
      if (!name.toString().match(reKey)
      && !description.toString().match(reKey)
      && ingredients[i].ingredient.toString().match(reKey)
      ) {
        for (let j = 0; j < ingredients.length; j += 1) {
          if (ingredients[j].ingredient == fieldValue) {
            const recipeDOM = getRecipeDOM();
            div.appendChild(recipeDOM);
            break;
          }
        }
      }
    }
  }
  /**
   * add tags include keyword to advance search
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
  }

  // principle search
  function search() {
    const ingredientTags = [];
    const applianceTags = [];
    const ustensilTags = [];
    const div = document.querySelector('.search-result');
    if (name.toString().match(reKey)) {
      const recipeDOM = getRecipeDOM();
      div.appendChild(recipeDOM);
      for (let i = 0; i < ingredients.length; i += 1) {
        ingredientTags.push(ingredients[i].ingredient);
      }
      applianceTags.push(appliance);
      for (let j = 0; j < ustensils.length; j += 1) {
        ustensilTags.push(ustensils[j]);
      }
    }
    if (!name.toString().match(reKey) && description.toString().match(reKey)) {
      const recipeDOM = getRecipeDOM();
      div.appendChild(recipeDOM);
      for (let i = 0; i < ingredients.length; i += 1) {
        ingredientTags.push(ingredients[i].ingredient);
      }
      applianceTags.push(appliance);
      for (let j = 0; j < ustensils.length; j += 1) {
        ustensilTags.push(ustensils[j]);
      }
    }
    for (let i = 0; i < ingredients.length; i += 1) {
      if (!name.toString().match(reKey)
      && !description.toString().match(reKey)
      && ingredients[i].ingredient.toString().match(reKey)) {
        const recipeDOM = getRecipeDOM();
        div.appendChild(recipeDOM);
        ingredientTags.push(ingredients[i].ingredient);
        applianceTags.push(appliance);
        for (let j = 0; j < ustensils.length; j += 1) {
          ustensilTags.push(ustensils[j]);
        }
      }
    }
    const ingredientsField = 'ingredients';
    addTags(ingredientTags, ingredientsField);
    const applianceField = 'appareils';
    addTags(applianceTags, applianceField);
    const ustensilField = 'ustensils';
    addTags(ustensilTags, ustensilField);
  }

  return {
    id,
    name,
    servings,
    ingredients,
    time,
    description,
    appliance,
    ustensils,
    getRecipeDOM,
    search,
    advancedSearch,
  };
}
