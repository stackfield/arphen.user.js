// ==UserScript==
// @name          Teepr
// @namespace     https://arphen.github.io/
// @version       0.1.20151023
// @description   As I wish
// @include       http://www.teepr.com/*
// @copyright     2015+, Arphen Lin
// @author        Arphen Lin
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @grant         none
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

function doit(){
    $('.main-header, .secondary-navigation, #top-navigation, .sidebar, #content_box header, .copyrights').remove();
    $('.wf-formTpl, .wf-formTpl~*, .post~*').remove();
    $('#popmake-overlay, div.popmake').remove();
    //setTimeout(doit, 1000);
};

doit();