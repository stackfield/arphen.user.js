// ==UserScript==
// @name          10musume
// @namespace     https://arphen.github.io/
// @version       0.1.20150308
// @description   Modify the page
// @include       http://www.10musume.com/*
// @copyright     2015+, Arphen Lin
// @author     Arphen Lin
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @grant         none
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

var url = window.location.href;
//alert(url);

$('#d2p-groupheader, img[src*="header.jpg"], #nav, #footer, p.clear, div.pagenate meta ~ *, #dl-box, #dl-box ~ *').hide();
$('div.pagenate').append("<br>");
$('#main, #detail').css({
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto"
});

function findSearchBox(){
    $('body').append('<div id="searchbox"></div>');
    $('#searchbox').css({
        position: "fixed", top: "0px", right: "0px", 
        backgroundColor: "yellow", 
        border: "2px solid red",
        fontSize: "12px"});
    $('#searchbox').append($('#search_form')[0]);
    $('#search_form *').css({
        fontSize: "10px"
    });
}

findSearchBox();

// foreach page, do something
if(url.search(/home.html/i)>0){
    //alert(url);
}


