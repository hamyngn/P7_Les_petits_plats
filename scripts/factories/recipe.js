/* eslint-disable no-unused-vars */
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
    for (let i = 0; i < ingredients.length; i += 1) {
      const li = document.createElement('li');
      li.innerHTML = ingredients[i].ingredient;
      if (Object.prototype.hasOwnProperty.call(ingredients[i], 'quantity')) {
        li.innerHTML = `${ingredients[i].ingredient}: ${ingredients[i].quantity}`;
      }
      if (Object.prototype.hasOwnProperty.call(ingredients[i], 'unit')) {
        li.innerHTML = `${ingredients[i].ingredient}: ${ingredients[i].quantity} ${ingredients[i].unit}`;
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

  // principle search
  const keyword = document.querySelector('.search-bar').value;
  const reKey = new RegExp(keyword, 'gi');
  function search() {
    const tags = [];
    const div = document.querySelector('.search-result');
    if (name.toString().match(reKey)) {
      const recipeDOM = getRecipeDOM();
      div.appendChild(recipeDOM);
      for (let i = 0; i < ingredients.length; i += 1) {
        tags.push(ingredients[i].ingredient);
      }
    }
    if (!name.toString().match(reKey) && description.toString().match(reKey)) {
      const recipeDOM = getRecipeDOM();
      div.appendChild(recipeDOM);
      for (let i = 0; i < ingredients.length; i += 1) {
        tags.push(ingredients[i].ingredient);
      }
    }
    for (let i = 0; i < ingredients.length; i += 1) {
      if (!name.toString().match(reKey)
      && !description.toString().match(reKey)
      && ingredients[i].ingredient.toString().match(reKey)) {
        const recipeDOM = getRecipeDOM();
        div.appendChild(recipeDOM);
        tags.push(ingredients[i].ingredient);
      }
    }
    // add tags include keyword to ingredients search
    const modalIngredients = document.querySelector('.modal-ingredients');
    for (let k = 0; k < tags.length; k += 1) {
      const keySuggest = document.createElement('div');
      keySuggest.setAttribute('class', 'ingredient');
      keySuggest.innerHTML = tags[k];
      modalIngredients.appendChild(keySuggest);
    }
  }

  return {
    id, name, servings, ingredients, time, description, appliance, ustensils, getRecipeDOM, search,
  };
}
