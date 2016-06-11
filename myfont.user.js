// ==UserScript==
// @name         MyFont
// @homepage     https://github.com/arphen/arphen.user.js/blob/master/myfont.user.js
// @version      3.5.20160611
// @description  use my font
// @copyright    2016+, Arphen Lin
// @author       Arphen Lin
// @match        http*://*/*
// @exclude      *211.20.181.194*
// @exclude      *_coursera.*
// @exclude      *_edx.org*
// @exclude      *docs.google*
// @exclude      *github.com*
// @exclude      *gitbook.com*
// @exclude      *hackpad.com*
// @exclude      *_jotform.com*
// @exclude      *jsfiddle.*
// @exclude      *livehouse.in*
// @exclude      *_naxosmusiclibrary.com*
// @exclude      *netflix.com*
// @exclude      *_openedu.*
// @exclude      *_openuserjs.org*
// @exclude      *pragprog.com*
// @exclude      *_slideshare.net*
// @exclude      *_taiwanmooc.org*
// @exclude      *_taobao.com*
// @exclude      *_trello.com*
// @require      https://rawgit.com/arphen/arphen.user.js/master/libs/utility.js
// @grant        GM_addStyle
// ==/UserScript==


(function() {
	'use strict';

	//var css = '* { font-family: ebrima, gadugi, "lao ui", "leelawadee ui", "meiryo ui", "segoe ui", Arial, Meiryo, "microsoft jhenghei ui", "微軟正黑體", "microsoft yahei", "microsoft yahei ui" !important; }';
	//var css = '* { font-family: Helvetica, tahoma, arial, "segoe ui", "microsoft jhenghei" !important; }  pre, pre > * {font-family: consolas !important; } ';

	// Google Fonts 推出「思源黑體」中文網頁字型，改善網頁文字顯示效果 - https://goo.gl/yuGglm
	APLTOOL.loadFile('http://fonts.googleapis.com/earlyaccess/notosanstc.css', 'css');
	//var css = '* { font-family:  Helvetica, tahoma, arial, "segoe ui", "Noto Sans TC", "microsoft jhenghei" !important; }  pre, pre > * {font-family: consolas !important; } ';

	// CSS原始碼 - https://github.com/arphen/arphen.user.js/blob/master/libs/arphenFont.css
	//APLTOOL.loadFile('https://rawgit.com/arphen/arphen.user.js/master/libs/arphenFont.css', 'css');
	var css = '@font-face{font-family:ArphenFont;src:local("Helvetica"),local("tahoma"),local("arial")}@font-face{font-family:ArphenFont;unicode-range:U+4E00-9FFF;src:"Noto Sans TC",local("microsoft jhenghei")}@font-face{font-family:ArphenFont;unicode-range:U+00-024F;src:local("Segoe UI")}@font-face{font-family:ArphenFont;unicode-range:U+3100-312F;src:"Noto Sans TC",local("microsoft jhenghei")}@font-face{font-family:ArphenFont;unicode-range:U+3040-30FF;src:local(Meiryo)}*{font-family:ArphenFont,Helvetica,tahoma,arial,"segoe ui","Noto Sans TC","microsoft jhenghei"!important}pre,pre *,pre>*,code,code *,code>*{font-family:consolas,"microsoft jhenghei"!important}';
	//var css = '@font-face{font-family:ArphenFont;src:local("Helvetica"),local("tahoma"),local("arial")}@font-face{font-family:ArphenFont;unicode-range:U+4E00-9FFF;src:"Noto Sans TC",local("microsoft jhenghei")}@font-face{font-family:ArphenFont;unicode-range:U+00-024F;src:local("Segoe UI")}@font-face{font-family:ArphenFont;unicode-range:U+3100-312F;src:"Noto Sans TC",local("microsoft jhenghei")}@font-face{font-family:ArphenFont;unicode-range:U+3040-30FF;src:local(Meiryo)}:not([class]){font-family:ArphenFont,Helvetica,tahoma,arial,"segoe ui","Noto Sans TC","microsoft jhenghei"!important}pre:not([class]),pre>:not([class]){font-family:consolas!important}';

	GM_addStyle(css);
})();
