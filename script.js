'use strict';

// 1. Compose the request for the 1st api and submit the request.
// 2. Obtain the response of the 1st api (most likely through a callback function)
// 3. In that callback function, you compose the request for the 2nd api (in this case, you will compose a JSON object and set the title there), then submit the request.
// 4. Then obtain the response of the 2nd api.
    

//send GET requests
const SEARCH_URL = 'https://api.edamam.com/search'; 

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
  <section class="single-result">
    <h2 class ="js-result-name">
      <a href="${result.recipe.url}" target= "_blank" title="${result.recipe.label}">${result.recipe.label} </a>   
    </h2>

    <section class="recipeIcons">
      <a href="${result.recipe.url}" target="_blank"><img src="${result.recipe.image}" class="thumbnail" title="Go to this recipe"></a>
      <img src = "https://cdn0.iconfinder.com/data/icons/most-usable-logos/120/you_Tube-512.png" class="videoIcon" title="Click here for related Video Recipes!">
    </section>

    
    <section class="scroll-bar">
      <section class="scroll-box ingredientItems">
        <p class="ingredient-ul">Ingredients for this Recipe:
          ${makeList(result.recipe.ingredientLines)} 
        </p>
      </section>
      <section class="cover-bar"></section>
    </section>
  </section>
  `; 
}






function displayRecipeData(data) {
  if (Response.ok === false) {
    $('.error-catch').html(`<h2>no results found</h2>`)
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


// // Generate Nutrient Info List
// function makeListNutrData(obj) {
//   var satFatValues = Object.values(result.totalNutrients.FASAT);
//   var calValues = Object.values(result.totalNutrients.ENERC_KCAL);
//   var sugarValues = Object.values(result.totalNutrients.SUGAR);
//   var fiberValues = Object.values(result.totalNutrients.FIBTG);
//   var proteinValues = Object.values(result.totalNutrients.PROCNT);
//   var carbsValues = Object.values(result.totalNutrients.CHOCDF);

//   const paragraph = document.createElement("p");
//   var br = document.createElement("br");
//   var element = document.getElementsByClassName("nutrient-list");

//   var satFatNode = document.createTextNode("`There's ${Math.round(satFatValues[1][1])}${satFatValues[2][1]} of ${satFatValues[0][1]}`");
//   var calNode = document.createTextNode("`There's ${Math.round(calValues[1][1])}${calValues[2][1]} of ${calValues[0][1]}`");
//   var sugarNode = document.createTextNode("`There's ${Math.round(sugarValues[1][1])}${sugarValues[2][1]} of ${sugarValues[0][1]}`");
//   var fiberNode = document.createTextNode("`There's ${Math.round(fiberValues[1][1])}${fiberValues[2][1]} of ${fiberValues[0][1]}`");
//   var proteinNode = document.createTextNode("`There's ${Math.round(proteinValues[1][1])}${proteinValues[2][1]} of ${proteinValues[0][1]}`");
//   var carbsNode = document.createTextNode("`There's ${Math.round(carbsValues[1][1])}${carbsValues[2][1]} of ${carbsValues[0][1]}`");
  
//   para.appendChild(satFatNode);
//   element.appendChild(br);
//   para.appendChild(calNode);
//   element.appendChild(br);
//   para.appendChild(sugarNode);
//   element.appendChild(br);
//   para.appendChild(fiberNode);
//   element.appendChild(br);
//   para.appendChild(proteinNode);
//   element.appendChild(br);
//   para.appendChild(proteinNode);


//   return list.outerHTML;
// }
const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const API_KEY = "AIzaSyDtt_G4qN2cPH4UIov4-H7VAyOCpSyX3NY";

function getDataFromVideoApi(searchTerm, callback) {
  const query= {
    part: 'snippet', 
    key: API_KEY, 
    q: `${searchTerm} recipe`,
    maxResults: 10
  }; 
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback); 
}

function vidResult(data) {
  let relatedVideos=``;
  const x = data.items.map((item, i) => {
    
    relatedVideos += 
    `<section class= "videoPopUp">
       <h2>   
        <a href="https://www.youtube.com/watch?v=${item.id.videoId}" target="_blank">${item.snippet.title}</a>
        </h2>
      <a href="https://www.youtube.com/watch?v=${item.id.videoId}" target = "_blank">
      <img src=' ${item.snippet.thumbnails.medium.url} ' class=vidThumbnail>
      </a>
        <p>More From: 
        <a href="https://www.youtube.com/channel/${item.snippet.channelId}" target="_blank">${item.snippet.channelTitle}
        </a></p>
    </section>`;
  });
  $('#vidResult .videoPopUp').remove(); 
  $('#vidResult').append(relatedVideos);
  $('#vidResult').fadeIn(300);
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

document.getElementById('closeButton').addEventListener('click', function(event) {
  event.preventDefault();
  this.parentNode.style.display = 'none';
}, false); 

$('.search-results-written').on('click', '.videoIcon', function() {
  let vidSearch = $('.js-result-name a', event.target.parentElement.parentElement).text();
  getDataFromVideoApi(vidSearch, vidResult);
  
});


$(document).ready(function () {
  $('section.hidden').fadeIn(1000).removeClass('hidden');
});


$(watchSubmit);