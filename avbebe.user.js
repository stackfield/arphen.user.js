// ==UserScript==
// @name          AVbebe 
// @namespace     https://github.com/arphen/arphen.user.js
// @version       0.2.20160103
// @description   Adjust the page
// @include       http://avbebe.com/*
// @copyright     2015+, Arphen Lin
// @author        Arphen Lin
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @grant         none
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

//var url = window.location.href;

$('div.logo, div.sidebar, div#footer').remove();
$('iframe').remove();

$('h3.entry-title a, a.entry-thumbnails-link').attr("target", "_blank");

function hilite(){
    $('h3.entry-title a').each(function(){
        var s = $(this).text();
        var o;
        if(s.search(/(女優影片)/)>=0){
            //alert(s);
            o = $(this).parent().parent();
            $(o).css({backgroundColor: "yellow", border: "1px solid red" });
        }
        if(s.search(/(大橋未久|波多野|羽田愛|羽田あい|一ノ瀬アメリ|百合川|前田|涼川|佐々木愛美|遠山雪菜|岡田優子|有賀|三上)/)>=0){
            //alert(s);
            o = $(this).parent().parent();
            $(o).css({backgroundColor: "chartreuse", border: "1px solid red" });
        }
    });
    setTimeout(hilite, 5000);
}

hilite();


