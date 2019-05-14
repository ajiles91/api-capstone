'use strict';

    
const SEARCH_URL = 'https://api.edamam.com/search'; 

//send GET requests
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

function renderResult(result) {
    return `
    
    <div class="single-result">
    
        <h2 class ="js-result-name">
          <a href="${result.recipe.url}" target= "_blank" title="${result.recipe.label}">${result.recipe.label} </a>   
        </h2>
      <div class="recipeIcons">
        <a href="${result.recipe.url}" target="_blank"><img src="${result.recipe.image}" class="thumbnail" title="Go to this recipe"></a>
      </div>
      <div>
        <div>
          <p class="ingredient-ul">Ingredients for this Recipe:
            ${makeList(result.recipe.ingredientLines)} 
          </p>
        </div>
      </div>
    </div>
    
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
      $('div.hidden').fadeIn(1000).removeClass('hidden');
  });
  
 $(watchSubmit);
} 