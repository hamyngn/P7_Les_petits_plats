function recipeFactory(data) {
    const {id, name, servings, ingredients, time, description, appliance, ustensils} = data;

    function setId() {
        localStorage.setItem('id', id);
      }

      function getRecipeDOM(){
        const article = document.createElement('article');
        const div = document.createElement('div');
        div.setAttribute('class','image');
        const abstract = document.createElement('div');
        abstract.setAttribute('class','abstract');
        const head = document.createElement('div');
        head.setAttribute('class','head');
        const h1 = document.createElement('h1');
        h1.innerHTML = name;
        const span = document.createElement('span');
        span.innerHTML = `<i class="fa-regular fa-clock"></i> ${time}`;
        head.appendChild(h1);
        head.appendChild(span);
        abstract.appendChild(head);
        const intro = document.createElement('div');
        intro.setAttribute('class','intro');
        const ingredientsDiv = document.createElement('div');
        ingredientsDiv.setAttribute('class', 'ingredients');
        const ul = document.createElement('ul');
        for(let i = 0; i < ingredients.length; i += 1) {
            const li = document.createElement('li');
            li.innerHTML = ingredients[i].ingredient;
            if(ingredients[i].hasOwnProperty('quantity')){
                li.innerHTML = ingredients[i].ingredient + ": " + ingredients[i].quantity;
            } 
            if(ingredients[i].hasOwnProperty('unit')){
                li.innerHTML = ingredients[i].ingredient + ": " + ingredients[i].quantity + " " + ingredients[i].unit;;
            } 
            ul.appendChild(li);
        }
        ingredientsDiv.appendChild(ul);
        const paragraphe = document.createElement('p');
        paragraphe.setAttribute('class','description');
        paragraphe.innerHTML = description;
        intro.appendChild(ingredientsDiv);
        intro.appendChild(paragraphe);
        abstract.appendChild(intro);
        article.appendChild(div);
        article.appendChild(abstract);
        return article;
      }
        // search bar
        let keyword = document.querySelector('.search-bar').value;
        let reKey = new RegExp(keyword,"gi");
        const error = document.querySelector('.error');
        function search() {
            if(keyword.length < 3) {
                error.innerHTML = "Please enter at least 3 characters";
            }
            const div = document.querySelector('.search-result');
            if(name.toString().match(reKey)){
                const recipeDOM = getRecipeDOM();
                div.appendChild(recipeDOM);
            }
            if(!name.toString().match(reKey) && description.toString().match(reKey)) {
                const recipeDOM = getRecipeDOM();
                div.appendChild(recipeDOM);
            }
            for(let i = 0; i < ingredients.length; i += 1) {
            if(!name.toString().match(reKey) && !description.toString().match(reKey) && ingredients[i].toString().match(reKey)) {
                const recipeDOM = getRecipeDOM();
                div.appendChild(recipeDOM);
            }
            }
        }
    
      return { id, name, servings, ingredients, time, description, appliance, ustensils, getRecipeDOM, search }
}