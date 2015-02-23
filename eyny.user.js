// ==UserScript==
// @name          Eyny Cleaner
// @namespace     https://arphen.github.io/
// @version       0.1.20150223
// @description   Hide some elements
// @include       http://*.eyny.com/*
// @copyright     2015+, Arphen Lin
// @author     Arphen Lin
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js
// @grant         none
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

//var url = window.location.href;

$('div#hd + table[width], td.forumlist').hide();
$('div#pt, div#ft, div#pgt, div.hdc, div#f_pst, div.bm.bml.pbn, ul#thread_types').hide();
$('h2 a img').hide();
$('table[height="240"], table.t_p_top').hide();
