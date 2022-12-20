/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-console */
/* global getRecipeDOM, search, getTags, advancedSearchTagsAndKey */

/**
 *
 * @returns recipes objects
 */
async function getRecipes() {
  const response = await fetch('./recipes.json');
  const data = await response.json();
  return data;
}

/**
 * create recipes elements
 * @param {Array} recipes
 */
async function displayRecipes(recipes) {
  const recipesSection = document.querySelector('.recipes');
  recipes.forEach((recipe) => {
    const recipeDOM = getRecipeDOM(recipe);
    recipesSection.appendChild(recipeDOM);
  });
}

/**
 * create all tags
 * @param {Array} recipes
 */
async function displayAllTags(recipes) {
  recipes.forEach((recipe) => {
    getTags(recipe);
  });
  displayTags();
  searchByIngredientTags();
  searchByAppareilTags();
  searchByUstensilTags();
}

/**
 * display all recipes
 */
async function init() {
  const { recipes } = await getRecipes();
  displayRecipes(recipes);
  displayAllTags(recipes);
}

window.onload = () => {
  init();
};

/**
 * remove same tags in advanced search
 * @param {String} item
 */
function removeSameTags(item) {
  const items = document.querySelectorAll(`.${item}`);
  const itemsArr = [];
  for (let j = 0; j < items.length; j += 1) {
    itemsArr.push(items[j].innerHTML.toLowerCase());
  }
  const uniqueIngredients = [];
  for (let k = 0; k < itemsArr.length; k += 1) {
    if (!uniqueIngredients.includes(itemsArr[k])) {
      uniqueIngredients.push(itemsArr[k]);
    } else {
      items[k].remove();
    }
  }
}

/**
 * display updated ingredient, appareil, ustensil tags after removing cached
 */
function displayTags() {
  const ingredientsStr = 'ingredients';
  removeSameTags(ingredientsStr); // remove same tags in searching by ingredients
  const appareilsStr = 'appareils';
  removeSameTags(appareilsStr);
  const ustensilsStr = 'ustensils';
  removeSameTags(ustensilsStr);
}

const searchResult = document.querySelector('.search-result');
const result = document.querySelector('.result');

/**
 * display message no result
 */
function noResult() {
  if (!searchResult.hasChildNodes()) {
    const p = document.createElement('p');
    p.style.width = '100vw';
    p.textContent = 'Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.';
    searchResult.appendChild(p);
  }
}

/**
 * remove same recipes search result when search by tags
 */
function removeSameResult() {
  if (searchResult.hasChildNodes()) {
    const articles = searchResult.querySelectorAll('article');
    const articlesArr = [];
    for (let j = 0; j < articles.length; j += 1) {
      articlesArr.push(articles[j].querySelector('h1').innerHTML);
    }
    const uniqueArticles = [];
    for (let k = 0; k < articlesArr.length; k += 1) {
      if (!uniqueArticles.includes(articlesArr[k])) {
        uniqueArticles.push(articlesArr[k]);
      } else {
        articles[k].remove();
      }
    }
  } else {
    noResult();
  }
}

const modalBackground = document.querySelector('.bground');
/**
 * open tags modal
 * @param {String} field
 */
function showModal(field) {
  const show = document.querySelector(`.show-${field}`);
  const hide = document.querySelector(`.hide-${field}`);
  const modal = document.querySelector(`.modal-${field}`);
  const div = document.querySelector(`.div--${field}`);
  modalBackground.style.display = 'block';
  modal.style.display = 'grid';
  div.style.width = '667px';
  show.style.display = 'none';
  hide.style.display = 'inline-block';
}

/**
 * hide tags modal
 * @param {String} field
 */
function hideModal(field) {
  const show = document.querySelector(`.show-${field}`);
  const hide = document.querySelector(`.hide-${field}`);
  const modal = document.querySelector(`.modal-${field}`);
  const div = document.querySelector(`.div--${field}`);
  const input = document.querySelector(`.input-${field}`);
  const inputKey = field.charAt(0).toUpperCase() + field.slice(1);
  input.setAttribute('placeholder', `${inputKey}`);
  modalBackground.style.display = 'none';
  modal.style.display = 'none';
  // take back default value of advanced search field's size
  div.style.width = '170px';
  hide.style.display = 'none';
  show.style.display = 'inline-block';
}

const ingredientsStr = 'ingredients';
const appareilsStr = 'appareils';
const ustensilsStr = 'ustensils';
const recipesBlock = document.querySelector('.section--recipes');

/**
 * update recipes search result when remove a tag
 */
async function searchByTagListAndKey() {
  searchResult.replaceChildren();
  const { recipes } = await getRecipes();
  for (let k = 0; k < recipes.length; k += 1) {
    advancedSearchTagsAndKey(recipes[k]);
  }
  removeSameResult();
}

/**
 * remove tags that do not match ingredient input keyword
 */
function removeNotMatchedTagsIng() {
  const ingredientTags = document.querySelectorAll('.modal-ingredients .ingredients');
  const inputIngredients = document.querySelector('.input-ingredients');
  inputIngredients.addEventListener('input', () => {
    hideModal(appareilsStr);
    hideModal(ustensilsStr);
    showModal(ingredientsStr);
    const inputKeyword = inputIngredients.value;
    const exInput = new RegExp(inputKeyword, 'gi');
    ingredientTags.forEach((ingredientTag) => ingredientTag.style.display = 'block');
    if (inputKeyword !== '') {
      for (let i = 0; i < ingredientTags.length; i += 1) {
        if (!ingredientTags[i].innerHTML.match(exInput)) {
          ingredientTags[i].style.display = 'none';
        }
      }
    }
  });
}

/**
 * add onlick event to ingredient tags and remove tags that do not match ingredient input keyword
 */
function searchByIngredientTags() {
  const ingredientTags = document.querySelectorAll('.modal-ingredients .ingredients');
  const tags = document.querySelector('.tags');
  // add onlick event to ingredient tags
  for (let i = 0; i < ingredientTags.length; i += 1) {
    ingredientTags[i].addEventListener('click', () => {
      ingredientTags[i].setAttribute('clicked', 'clicked');
      ingredientTags[i].style.pointerEvents = 'none';
      const div = document.createElement('div');
      div.setAttribute('class', 'tag ingredient-tag');
      div.innerHTML = ingredientTags[i].innerHTML;
      const span = document.createElement('span');
      span.innerHTML = '<i class="fa-regular fa-circle-xmark"></i>';
      span.addEventListener('click', () => {
        div.remove();
        ingredientTags[i].style.pointerEvents = 'auto';
        searchByTagListAndKey();
      });
      div.appendChild(span);
      tags.appendChild(div);
      tags.style.display = 'flex';
      searchByTagListAndKey();
      const clickedTags = document.querySelectorAll('.tag');
      if (clickedTags.length === 1) {
        searchResult.replaceChildren();
      }
      result.style.display = 'block'; // display searching result
      recipesBlock.style.display = 'none'; // hide block that include all recipes
    });
  }
  removeNotMatchedTagsIng();
}

/**
 * remove tags that do not match appareil input keyword
 */
function removeNotMatchedTagsApp() {
  const appareilsTags = document.querySelectorAll('.modal-appareils .appareils');
  const inputAppareils = document.querySelector('.input-appareils');
  inputAppareils.addEventListener('input', () => {
    hideModal(ingredientsStr);
    hideModal(ustensilsStr);
    showModal(appareilsStr);
    const inputKeyword = inputAppareils.value;
    const exInput = new RegExp(inputKeyword, 'gi');
    appareilsTags.forEach((tag) => tag.style.display = 'block');
    if (inputKeyword !== '') {
      for (let i = 0; i < appareilsTags.length; i += 1) {
        if (!appareilsTags[i].innerHTML.match(exInput)) {
          appareilsTags[i].style.display = 'none';
        }
      }
    }
  });
}
/**
 * add onlick event to appareil tags and remove tags that do not match appareil input keyword
 */
function searchByAppareilTags() {
  const appareilsTags = document.querySelectorAll('.modal-appareils .appareils');
  const tags = document.querySelector('.tags');
  // add onlick event to appareil tags
  for (let j = 0; j < appareilsTags.length; j += 1) {
    appareilsTags[j].addEventListener('click', () => {
      appareilsTags[j].setAttribute('clicked', 'clicked');
      appareilsTags[j].style.pointerEvents = 'none';
      const div = document.createElement('div');
      div.setAttribute('class', 'tag appareil-tag');
      div.innerHTML = appareilsTags[j].innerHTML;
      const span = document.createElement('span');
      span.innerHTML = '<i class="fa-regular fa-circle-xmark"></i>';
      span.addEventListener('click', () => {
        div.remove();
        appareilsTags[j].style.pointerEvents = 'auto';
        searchByTagListAndKey();
      });
      div.appendChild(span);
      tags.appendChild(div);
      tags.style.display = 'flex';
      searchByTagListAndKey();
      result.style.display = 'block'; // display searching result
      recipesBlock.style.display = 'none'; // hide block that include all recipes
    });
  }
  removeNotMatchedTagsApp();
}

/**
 * remove tags that do not match ustensil input keyword
 */
function removeNotMatchedTagUstensil() {
  const ustensilsTags = document.querySelectorAll('.modal-ustensils .ustensils');
  const inputUstensils = document.querySelector('.input-ustensils');
  inputUstensils.addEventListener('input', () => {
    hideModal(ingredientsStr);
    hideModal(appareilsStr);
    showModal(ustensilsStr);
    const inputKeyword = inputUstensils.value;
    const exInput = new RegExp(inputKeyword, 'gi');
    ustensilsTags.forEach((tag) => tag.style.display = 'block');
    if (inputKeyword !== '') {
      for (let i = 0; i < ustensilsTags.length; i += 1) {
        if (!ustensilsTags[i].innerHTML.match(exInput)) {
          ustensilsTags[i].style.display = 'none';
        }
      }
    }
  });
}

/**
 * add onlick event to ustensil tags and remove tags that do not match ustensil input keyword
 */
function searchByUstensilTags() {
  const ustensilsTags = document.querySelectorAll('.modal-ustensils .ustensils');
  const tags = document.querySelector('.tags');
  // add onlick event to ustensil tags
  for (let i = 0; i < ustensilsTags.length; i += 1) {
    ustensilsTags[i].addEventListener('click', () => {
      ustensilsTags[i].setAttribute('clicked', 'clicked');
      ustensilsTags[i].style.pointerEvents = 'none';
      const div = document.createElement('div');
      div.setAttribute('class', 'tag ustensil-tag');
      div.innerHTML = ustensilsTags[i].innerHTML;
      const span = document.createElement('span');
      span.innerHTML = '<i class="fa-regular fa-circle-xmark"></i>';
      span.addEventListener('click', () => {
        div.remove();
        ustensilsTags[i].style.pointerEvents = 'auto';
        searchByTagListAndKey();
      });
      div.appendChild(span);
      tags.appendChild(div);
      tags.style.display = 'flex';
      searchByTagListAndKey();
      result.style.display = 'block'; // display searching result
      recipesBlock.style.display = 'none'; // hide block that include all recipes
    });
  }
  removeNotMatchedTagUstensil();
}

/**
 * display search result
 */
async function searchPrincipal() {
  const keyword = document.querySelector('.search-bar').value;
  const { recipes } = await getRecipes();
  if (keyword.length >= 3) {
    for (let k = 0; k < recipes.length; k += 1) {
      search(recipes[k]);
    }
    removeSameResult();
    result.style.display = 'block'; // display searching result
    recipesBlock.style.display = 'none'; // hide block that include all recipes
    noResult(); // display message no result
    displayTags();
    searchByIngredientTags();
    searchByAppareilTags();
    searchByUstensilTags();
  } else {
    result.style.display = 'none';
    recipesBlock.style.display = 'grid';
    init();
  }
}

const modalIngredients = document.querySelector('.modal-ingredients');
const modalAppareils = document.querySelector('.modal-appareils');
const modalUstensils = document.querySelector('.modal-ustensils');

/**
 * clear old tags before diplay new search result tags
 */
function clearTags() {
  modalIngredients.replaceChildren();
  modalAppareils.replaceChildren();
  modalUstensils.replaceChildren();
}

const tagsDiv = document.querySelector('.tags');
const searchbar = document.querySelector('.search-bar');
searchbar.addEventListener('input', () => {
  clearTags();
  tagsDiv.replaceChildren();
  searchResult.replaceChildren();
  searchPrincipal();
});

/**
 * display tags modal
 * @param {String} field
 */
function showAndHideModal(field) {
  const show = document.querySelector(`.show-${field}`);
  const hide = document.querySelector(`.hide-${field}`);
  const modal = document.querySelector(`.modal-${field}`);
  const div = document.querySelector(`.div--${field}`);
  const input = document.querySelector(`.input-${field}`);
  if (hide.style.display === 'none') {
    hideModal(ingredientsStr);
    hideModal(appareilsStr);
    hideModal(ustensilsStr);
    modalBackground.style.display = 'block';
    modal.style.display = 'grid';
    div.style.width = '667px';
    show.style.display = 'none';
    hide.style.display = 'inline-block';
    const inputKey = field.slice(0, -1);
    input.setAttribute('placeholder', `Rechercher un ${inputKey}`);
  } else {
    hideModal(field);
  }
}

// show and hide ingredients tags
const iconIngredients = document.querySelector('.icon--ingredients');
iconIngredients.addEventListener('click', () => {
  showAndHideModal(ingredientsStr);
});

// show and hide appareils tags
const iconAppareils = document.querySelector('.icon--appareils');
iconAppareils.addEventListener('click', () => {
  showAndHideModal(appareilsStr);
});

// show and hide ustensils tags
const iconUstensils = document.querySelector('.icon--ustensils');
iconUstensils.addEventListener('click', () => {
  showAndHideModal(ustensilsStr);
});
