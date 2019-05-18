'use strict';

    
const SEARCH_URL = 'https://api.edamam.com/search'; 

// 1. Compose the request for the 1st api and submit the request.
// 2. Obtain the response of the 1st api (most likely through a callback function)
// 3. In that callback function, you compose the request for the 2nd api (in this case, you will compose a JSON object and set the title there), then submit the request.
// 4. Then obtain the response of the 2nd api.

//send GET requests

const nutritionalURL = 'https://api.edamam.com/api/nutrition-details?app_id=41225157&app_key=c1a7c26bf9e4a557a2097e482619d842'
function getDataFromFoodApi(searchTerm, callback) {
    const query = {
      q: `${searchTerm}`,
      app_id: '2482b007',
      app_key: 'd95919168024a069e1a71f8b0350d159',
      from: 0, 
      to: 9
    };
    $.getJSON(SEARCH_URL, query, callback);
}
 function getNutriData() {
  fetch(nutritionalURL, {
    method: 'POST',
    headers: {
      "content-Type:" : 'application/json'
    },
    body: JSON.stringify({
      title: `${response.title}`,
      ingr: `${searchTerm}`,
    })
   .then(response => response.json())
  })
 }



function renderResult(result) {
    return `
    
    <section class="single-result">
    
        <h2 class ="js-result-name">
          <a href="${result.recipe.url}" target= "_blank" title="${result.recipe.label}">${result.recipe.label} </a>   
        </h2>
      <section class="recipeIcons">
        <a href="${result.recipe.url}" target="_blank"><img src="${result.recipe.image}" class="thumbnail" title="Go to this recipe"></a>
      </section>
      <section>
        <section>
          <p class="ingredient-ul">Ingredients for this Recipe:
            ${makeList(result.recipe.ingredientLines)} 
          </p>
        </section>
        <p class = "nutrient-list>Nutritional Facts:
        ${totalNutrients[i]}
        </p>        
      </section>
    </section>
    
    `; 
  }
  
  


  function displayRecipeData(data) {
    if (data.hits.length == 0) {
      $('.error-catch').html("no results found")
      $('.single-result')
      }
        else {
          $('.error-catch').html(" ")
      const results = data.hits.map((item,index) => renderResult(item)); 


    $('.search-results-written').html(results);

    $('.search-results-written')
    .prop('hidden', false)
    .html(results);
    }
  }
  
  
  
  //Generate List for ingredients 
  function makeList(array) {
    const list = document.createElement('ul'); 
    
    for (let i=0; i<array.length; i++) {
      const item = document.createElement('li'); 
      item.appendChild(document.createTextNode(array[i])); 
      list.appendChild(item); 
    }
    return list.outerHTML; 
  }
  // function makeListNutrData(array)
  // for (let i= 0: i < array.length; i++)
  
  function watchSubmit() {
    $('.js-search-form').submit(event => {
      event.preventDefault(); 
      const queryTarget = $(event.currentTarget).find('.js-query'); 
      const query = queryTarget.val(); 
      queryTarget.val(""); 
      getDataFromFoodApi(query, displayRecipeData);

      $('.result-area').show(); 
    }); 
  }

$(document).ready(function () {
  $('section.hidden').fadeIn(1000).removeClass('hidden');
});

$(watchSubmit);
