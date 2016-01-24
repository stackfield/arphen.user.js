// ==UserScript==
// @name         MyFont
// @namespace    https://github.com/arphen/arphen.user.js
// @homepage     https://github.com/arphen/arphen.user.js
// @version      0.4.20160124
// @description  use my font
// @copyright    2016+, Arphen Lin
// @author       Arphen Lin
// @match        http*://*/*
// @exclude      *.netflix.com/*
// @exclude      *github.com/*
// @exclude      *openuserjs.org/*
// @exclude      *taobao.com*
// @exclude      *naxosmusiclibrary.com*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
	'use strict';

	// Your code here...
	var css = '* { font-family: "微軟正黑體", "微软雅黑", "黑体", "helvetica neue", "lucida grande", helvetica, arial, sans-serif !important;	}';

	GM_addStyle(css);
})();
