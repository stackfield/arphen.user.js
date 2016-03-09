// ==UserScript==
// @name         MyFont
// @homepage     https://github.com/arphen/arphen.user.js/blob/master/myfont.user.js
// @version      2.1.20160207
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
// @exclude      *211.20.181.194*
// @require       https://rawgit.com/arphen/arphen.user.js/master/libs/utility.js
// @grant        GM_addStyle
// ==/UserScript==

(function() {
	'use strict';

	//var css = '* { font-family: ebrima, gadugi, "lao ui", "leelawadee ui", "meiryo ui", "segoe ui", Arial, Meiryo, "microsoft jhenghei ui", "微軟正黑體", "microsoft yahei", "microsoft yahei ui" !important; }';
	//var css = '* { font-family: Helvetica, tahoma, arial, "segoe ui", "microsoft jhenghei" !important; }  pre, pre > * {font-family: consolas !important; } ';

	// Google Fonts 推出「思源黑體」中文網頁字型，改善網頁文字顯示效果 - https://goo.gl/yuGglm
	APLTOOL.loadFile('http://fonts.googleapis.com/earlyaccess/notosanstc.css', 'css');
	var css = '* { font-family:  Helvetica, tahoma, arial, "segoe ui", "Noto Sans TC", "microsoft jhenghei" !important; }  pre, pre > * {font-family: consolas !important; } ';
	//var css = '* { font-family:  "Noto Sans TC" !important; }  pre, pre > * {font-family: consolas !important; } ';

	GM_addStyle(css);
})();
