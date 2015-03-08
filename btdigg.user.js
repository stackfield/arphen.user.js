// ==UserScript==
// @name          BTDigg
// @namespace     https://arphen.github.io/
// @version       0.2.20150308
// @description   Do something
// @include       http*://btdigg.org/*
// @copyright     2015+, Arphen Lin
// @author     Arphen Lin
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @grant         none
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

$('#logo').hide();

// click to copy magnet link
/*
$('a[title*="magnet"]').each(function(index){
    var magnet = $(this).attr('href');
    $(this).after('<a class="copylink" link="'+magnet+'">[Copy Link]</a>');
});
*/

$('a[title*="magnet"]').click(function(){
    copyToClipboard( $(this).attr('href') );
});

function copyToClipboard(text) {
    window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}

