/* eslint-disable no-unused-vars */

/**
   * create recipe
   * @returns an article
   */
function getRecipeDOM(data) {
  const {
    name, ingredients, time, description,
  } = data;

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
      li.innerHTML = `${ingredients[k].ingredient}: `;
      const spanQuantity = document.createElement('span');
      li.appendChild(spanQuantity);
      spanQuantity.innerHTML = `${ingredients[k].quantity}`;
    }
    if (Object.prototype.hasOwnProperty.call(ingredients[k], 'unit')) {
      li.innerHTML = `${ingredients[k].ingredient}: `;
      const spanQuantity = document.createElement('span');
      li.appendChild(spanQuantity);
      spanQuantity.innerHTML = `${ingredients[k].quantity} ${ingredients[k].unit}`;
    }
    ul.appendChild(li);
  }
  ingredientsDiv.appendChild(ul);
  intro.appendChild(ingredientsDiv);
  const paragraphe = document.createElement('p');
  paragraphe.setAttribute('class', 'description');
  paragraphe.innerHTML = description;
  intro.appendChild(paragraphe);
  abstract.appendChild(intro);
  article.appendChild(div);
  article.appendChild(abstract);
  return article;
}
