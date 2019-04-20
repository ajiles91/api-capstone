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
  
  function handleRestartButton() {
    $('.single-result').on('click', '.js-restart-button', function(event) {
        return `<<!DOCTYPE html>
        <!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
        <!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
        <!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
        <html class="no-js"> <!--<![endif]-->
            <head>
                <meta charset="utf-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <title>Recipe App</title>
        
                <meta name="description" content="">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">
                <link rel="stylesheet" href="style.css">
                <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous">
                </script>
            </head>
            <body>
                
                <div class = "search-field hidden">
                <h1>Clear out your kitchen!</h1>
                <h2>Need to make a meal but don't want to leave your house or order out? Throw some things you have in 
                    your fridge into the seachbar to get a recipe to make!</h2>
                    <form action = '#' class = 'js-search-form'>
                    <input type='text' placeholder="Type Here" class="js-query" required aria-label ="search query">
                    <button type="submit">Search</button>
                    
                </form>
              </div>
                
             <main role="main" class="js-output" aria-live="assertive">
                <div class="result-area">
                 
                 
                  <div class= "search-results-written">
                        
                  </div>
                </div>
                
              </main>
              <script src="script.js"></script>
            </body>
        </html>
        `
      
    });
  }


  function displayRecipeData(data) {
    const results = data.hits.map((item,index) => renderResult(item)); 
    if (Object.keys(data).length == 0){
        return `<h2>Sorry, there's no recipes like that here!</h2>`
    }
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