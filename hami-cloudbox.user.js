// ==UserScript==
// @name          Hami Cloudbox
// @namespace     https://github.com/arphen/arphen.user.js/blob/master/hami-cloudbox.user.js
// @version       1.0.20160604
// @description   As I wish
// @include       http://sync.hamicloud.net/*
// @copyright     2015+, Arphen Lin
// @author        Arphen Lin
// @require       http://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.js
// @require       https://rawgit.com/arphen/arphen.user.js/master/libs/utility.js
// @grant         none
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

function selectDeleted(){
	// 自動勾選已刪除檔案
	$('td.back-row-name a[data-type=0]').each(function(){
		var tr = this.parentNode.parentNode;
		var chk = $('input.cbox', tr);
		$(chk[0]).prop( "checked", true );
	});
}

function main(){
	// use myLog
	myLog.init('Hami Cloudbox');

	setInterval(selectDeleted, 5000);
}

main();
