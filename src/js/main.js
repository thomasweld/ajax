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
  <div id="${id}">
    <span class="fa ${icon}"></span>
    <input placeholder="${label}" type="${type}" />
  </div>
  `
}


// form template
function formTemplate ( type, label, id, icon){
  return `
  <div id="${id}">
    <span class="fa ${icon}"></span>
    <input placeholder="${label}" type="${type}" />
  </div>
  `
}


// form template for options
function formTemplateOptions ( type, label, id, icon, options){
  return `
  <div class="${id}">
    <input list="${id}" type="${type}" name="${label}" placeholder="${label}" /></label>
    <datalist id=${id}>
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


        // function getOptions( input ){
        //   return input.label;
        // }
        // console.log(getOptions());
        // inputArea.forEach( getOptions(){
        //
        // }){
        //   var htmlOptionsList = formOptionList( inputArea.options );
        //   console.log(htmlOptionsList);
        //   form_content.append(htmlOptions);
        // };
        //
        // form_content.append(htmlOptionsList + '<datalist>' + htmlOptions + '</datalist>')


      }
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
