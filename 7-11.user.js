// ==UserScript==
// @name          7-11
// @namespace     https://github.com/arphen/arphen.user.js/blob/master/7-11.user.js
// @version       1.0.20160213
// @description   As I wish
// @include       https://eservice.7-11.com.tw/E-Tracking/search.aspx*
// @copyright     2016+, Arphen Lin
// @author        Arphen Lin
// @require       http://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.js
// @grant         none
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

//var url = window.location.href;

function log(text){
	try{
		console.log('[Ruten] ' + text);
	}catch(err){
	}
}

function parse(val) {
	var result = "",
		tmp = [];
	var items = location.search.substr(1).split("&");
	for (var index = 0; index < items.length; index++) {
		tmp = items[index].split("=");
		if (tmp[0] === val) result = decodeURIComponent(tmp[1]);
	}
	return result;
}


function main(){
	// get query variable
	var tid = parse("tid");
	log(tid);
	if(tid !== ""){
		$('input#txtProductNum').val(tid);
		$('input#tbChkCode').focus();
	}
}

main();
