// ==UserScript==
// @name         BTLibrary
// @namespace    https://arphen.github.io/
// @version      0.1.20150621
// @description  Some modifications
// @include       http://btlibrary.org/*
// @copyright     2015+, Arphen Lin
// @author     Arphen Lin
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @grant         none
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

//var url = window.location.href;

$('iframe').hide();
$('#cs_left_couplet, #cs_right_couplet').hide();

