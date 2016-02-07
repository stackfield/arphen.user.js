// ==UserScript==
// @name         MyFont
// @homepage     https://github.com/arphen/arphen.user.js/blob/master/myfont.user.js
// @version      2.0.20160207-1
// @description  use my font
// @copyright    2016+, Arphen Lin
// @author       Arphen Lin
// @match        http*://*/*
// @exclude      *netflix.com*
// @exclude      *github.com*
// @exclude      *openuserjs.org*
// @exclude      *taobao.com*
// @exclude      *naxosmusiclibrary.com*
// @exclude      *hackpad.com*
// @exclude      *jotform.com*
// @exclude      *taiwanmooc.org*
// @exclude      *coursera.*
// @exclude      *edx.org*
// @exclude      *openedu.*
// @exclude      *jsfiddle.*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
	'use strict';

	// Your code here...
	//var css = '* { font-family: ebrima, gadugi, "lao ui", "leelawadee ui", "meiryo ui", "segoe ui", Arial, Meiryo, "microsoft jhenghei ui", "微軟正黑體", "microsoft yahei", "microsoft yahei ui" !important; }';
	var css = '* { font-family: Helvetica, tahoma, arial, "segoe ui", "microsoft jhenghei" !important; }  pre, pre > * {font-family: consolas !important; } ';

	GM_addStyle(css);
})();
