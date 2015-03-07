// ==UserScript==
// @name          Eyny Beautifier
// @namespace     https://arphen.github.io/
// @version       0.3.20150307
// @description   Hiding and hilighting some html elements
// @include       http://*.eyny.com/*
// @copyright     2015+, Arphen Lin
// @author     Arphen Lin
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @grant         none
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

//var url = window.location.href;

$('div#hd + table[width], td.forumlist').hide();
$('div#pt, div#ft, div#pgt, div.hdc, div#f_pst, div.bm.bml.pbn, ul#thread_types').hide();
$('h2 a img').hide();
$('table[height="240"], table.t_p_top').hide();

function hilite(){
    $('h3.ptn a').each(function(){
        var s = $(this).text();
        if(s.search(/(大橋未久|桜井あゆ|波多野結衣)/)>=0){
            //alert(s);
            var o = $(this).parent().parent();
            $(o).css({backgroundColor: "chartreuse", border: "1px solid red" });
        }        
        if(s.search(/(無碼)/)>=0){
            //alert(s);
            var o = $(this).parent().parent();
            $(o).css({backgroundColor: "yellow", border: "1px solid red" });
        }        
        if(s.search(/(合集|合輯|連發)/)>=0){
            //alert(s);
            var o = $(this).parent().parent();
            $(o).css({backgroundColor: "red", border: "1px solid red" });
        }
    });
    setTimeout(hilite, 5000);
};

hilite();


