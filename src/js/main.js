// importing jquery
import $ from 'jquery';

// checking import process was successful by logging jquery object
// console.log($);

// baseURL is base url of our API
var baseURL = 'http://json-data.herokuapp.com/forms'

// get form content area in dom
var form_content = $('.form_content');


// form textarea
function formTemplateTextarea ( type, label, id, icon, options){
  return `
  <div class=${type} id="${id}">
    <i class="fontawesome fa fa-2x ${icon}"></i>
    <textarea placeholder="${label}" />
  </div>
  `
}

// form template
function formTemplate ( type, label, id, icon){
  return `
  <div class=${type} id="${id}">
    <i class="fontawesome fa fa-2x ${icon}"></i>
    <input placeholder="${label}" type="${type}" />
  </div>
  `
}

// form template for options
function formTemplateOptions ( type, label, id, icon, options){
  return `
  <div class="${type}"  class="${id}">
    <input list="${id}" type="${type}" name="${label}" placeholder="${label}" /></label>
    <datalist id="${id}">
  `
}

// form template for options
function formOptionList ( option ){
  return `
  <option value="${option}">
  `
}

// get json data into variable as jquery object
var request = $.getJSON(baseURL);

console.log(request);


// request is an object that has methods like `.then`, `.success`, `.error` all ways of "resolving" that
// request object.
//
// Inside of the `.then` we can do this...

request.then(
  function (response) {
    //console.log(response);
    response.forEach(function (inputArea){

      if (inputArea.type === 'textarea') {
        var htmlTextarea = formTemplateTextarea(inputArea.type, inputArea.label, inputArea.id, inputArea.icon, inputArea.options);
        form_content.append(htmlTextarea);
      } else if ( inputArea.options.length === 0 ) {
        var html = formTemplate(inputArea.type, inputArea.label, inputArea.id, inputArea.icon);
        form_content.append(html);
      } else {
        // stores results of formTemplateOptions function above in htmlOptions variable
        var htmlOptions = formTemplateOptions(inputArea.type, inputArea.label, inputArea.id, inputArea.icon, inputArea.options);

        // add initial input tag via htmlOptions
        form_content.append(htmlOptions);

        // create variable to hold list item labels
        var htmlOptionsList = '';

        // for each pair of options, we're pulling the label and inserting it into html string
        inputArea.options.forEach(function ( pair ){
          htmlOptionsList += ("<option value='" + pair.label + "'>");
          console.log(htmlOptionsList);
        });

        // get input name id of
        var div_content = $('#' + inputArea.id );


        // adding closing tags to the datalist and div
        var finalHTMLOutputList = htmlOptionsList + "</datalist></div>"

        // appending whole html string to the dom element we selected earlier
        div_content.append(finalHTMLOutputList);
      }
    });

  },

  function (res) {
      console.log('error', error);
    }

);


//
// form_content.append("<button name='button'>Submit</button>");
