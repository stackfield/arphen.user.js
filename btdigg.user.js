// ==UserScript==
// @name          BTDigg
// @namespace     https://arphen.github.io/
// @version       0.3.20150405
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
function main(){
    // note: .off("click") will clear previous bound click events firstly, then bind a new click event
    $('a[title*="magnet"]').off("click").click(function(){
        copyToClipboard( $(this).attr('href') );
    });
    setTimeout(main, 5000);
}

function copyToClipboard(text) {
    window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}

main();
