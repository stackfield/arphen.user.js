// ==UserScript==
// @name          Eyny
// @namespace     https://github.com/arphen/arphen.user.js
// @version       0.9.20160103
// @description   Hiding and hilighting some html elements
// @include       http://*.eyny.com/*
// @copyright     2015+, Arphen Lin
// @author        Arphen Lin
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @grant         none
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

//var url = window.location.href;

function hide(){
    $('div#hd + table[width], td.forumlist').remove();
    $('div#pt, div#ft, div#pgt, div.hdc, div#f_pst, div.bm.bml.pbn, ul#thread_types').remove();
    $('h2 a img, iframe, div.sitemajiad').remove();
    $('table[height="240"], table.t_p_top').remove();
}

function hilite(){
    $('h3.ptn a').each(function(){
        var s = $(this).text();
        var o;
        if(s.search(/(大橋未久|波多野結衣|羽田愛|羽田あい|一ノ瀬アメリ|百合川さら|前田|涼川絢音|佐々木愛美|遠山雪菜|岡田優子|有賀|三上悠亞)/)>=0){
            //alert(s);
            o = $(this).parent().parent();
            $(o).css({backgroundColor: "chartreuse", border: "1px solid red" });
        }
        if(s.search(/(無碼)/)>=0){
            //alert(s);
            o = $(this).parent().parent();
            $(o).css({backgroundColor: "yellow", border: "1px solid red" });
        }
        if(s.search(/(合集|合輯|連發)/)>=0){
            //alert(s);
            o = $(this).parent().parent();
            $(o).css({backgroundColor: "red", border: "1px solid red" });
        }
    });
    setTimeout(hilite, 5000);
}

function main(){
    hide();
    hilite();
}

main();


