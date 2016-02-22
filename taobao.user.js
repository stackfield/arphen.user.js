// ==UserScript==
// @name          淘宝
// @namespace     https://github.com/arphen/arphen.user.js/blob/master/taobao.user.js
// @version       1.0.20160222
// @description   As I wish
// @include       https://www.taobao.com/*
// @include       https://i.taobao.com/*
// @copyright     2016+, Arphen Lin
// @author        Arphen Lin
// @require       http://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.js
// @require       http://arphen.github.io/user_script_libs/utility.js
// @grant         none
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

function inpage_daily(){
	var w1 = window.open('https://taojinbi.taobao.com/index.htm?spm=a21bo.7724922.8440-1.d2.B1Ztap&auto_take=true', "_blank"); // 淘金幣
	var w2 = window.open('https://luciferchen.taobao.com/p/rd596610.htm?spm=a1z10.1-c.w5002-9485021523.4.7yVLIT', "_blank"); // 莹恋
}

function doit(){
	myLog.log('doit()');
	if($('ul#J_SiteNavBdR').length > 0){ // todo: not work in www.taobao.com
		$('ul#J_SiteNavBdR li.menu').first().before('<li class="menu"><div class="menu-hd"><a class="h" onclick="inpage_daily();">[每日必點]</a></div></li>');
	}else{
		setTimeout(doit, 2000); // doit again
	}
}

function main(){
	// use myLog
	myLog.init('淘宝');

	// inject jquery in page
	addScript('https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.js');  // 允許插入和原page不同domain的js => 因為tw116網站沒有設限CSP (Content Security Policy)

	// inject my code in page
	addScriptCode(inpage_daily);

	doit();
}

main();
