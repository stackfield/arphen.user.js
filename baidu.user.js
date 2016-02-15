// ==UserScript==
// @name          Baidu Pan
// @namespace     https://github.com/arphen/arphen.user.js/blob/master/baidu.user.js
// @version       0.1.20151109
// @description   As I wish
// @include       http://pan.baidu.com/s*
// @copyright     2015+, Arphen Lin
// @author        Arphen Lin
// @require       http://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.js
// @grant         none
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

function log(text){
	try{
		var d = new Date();
		var n = d.toLocaleString();
		console.log(n + ' [Baidu] ' + text);
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


var url = window.location.href.toLowerCase();

function main(){
	var acc_code = parse("acc_code");
	log(acc_code);
	if(acc_code === "") return;

	// not work on baidu
	if(url.indexOf('pan.baidu.com/s') >= 0){
		$('input#accessCode').val(acc_code);
		//alert(code);
		var t = $($('input#accessCode')[0]).val();
		if(t === acc_code){
			$('a#submitBtn')[0].click();
		}
	}
}

main();
setInterval(main, 2000);
