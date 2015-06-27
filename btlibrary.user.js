// ==UserScript==
// @name         BTLibrary
// @namespace    https://arphen.github.io/
// @version      0.2.20150627
// @description  Some modifications
// @include       http://btlibrary.org/*
// @copyright     2015+, Arphen Lin
// @author     Arphen Lin
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @grant         none
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

//var url = window.location.href;

$('iframe').remove();
$('#cs_left_couplet, #cs_right_couplet').remove();
$('#__QQCP_LEFT_Div, #__QQCP_RIGHT_Div').remove();

