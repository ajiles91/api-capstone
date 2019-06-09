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
  if (data.ok === false) {
    $('.error-catch').html(`<h2>No Results Found</h2>`)
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
 
   for (let i = 0; i < array.length; i++) {
   const item = document.createElement('li'); 
   item.appendChild(document.createTextNode(array[i])); 
   list.appendChild(item); 
 }
 return list.outerHTML; 
}



const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const API_KEY = "AIzaSyDtt_G4qN2cPH4UIov4-H7VAyOCpSyX3NY";

function getDataFromVideoApi(searchTerm, callback) {
  const query = {
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