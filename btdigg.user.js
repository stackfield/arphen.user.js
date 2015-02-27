// ==UserScript==
// @name          BTDigg Cleaner
// @namespace     https://arphen.github.io/
// @version       0.1.20150227
// @description   Hide some elements
// @include       http*://btdigg.org/*
// @copyright     2015+, Arphen Lin
// @author     Arphen Lin
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @grant         none
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

$('#logo').hide();
