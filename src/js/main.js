// importing jquery
import $ from 'jquery';

// checking import process was successful by logging jquery object
// console.log($);

// baseURL is base url of our API
var baseURL = 'http://json-data.herokuapp.com/forms'

// get form content area in dom
var form_content = $('.form_content');

// form template
function formTemplate ( type, label, id, icon, options){
  return `
  <p>${type} ${label}
  `
}

// get json data into variable as jquery object
var request = $.getJSON(baseURL);

console.log(request);

request.then(
  function (response) {
    //console.log(response);
    response.forEach(function (inputArea){
      var html = formTemplate(inputArea.type, inputArea.label);
      form_content.append(html);
    });

});

// filmReq.then(
//   function (res){
//     res.results.forEach(function (film){
//       var html = movieTemplate(film.title, film.release_date);
//       list.append(html);
//     });
//   },
//   function (res) {
//     console.log('error', error);
//   }
// );
