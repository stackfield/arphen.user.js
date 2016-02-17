// ==UserScript==
// @name          Baidu Pan
// @namespace     https://github.com/arphen/arphen.user.js/blob/master/baidu-pan.user.js
// @version       1.1.20160217
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
var pwd = "";

function main_old(){
	var pwd = parse("pwd");
	log(pwd);
	if(pwd === "") return;

	// not work on baidu
	if(url.indexOf('pan.baidu.com/s') >= 0){
		$('input#accessCode').val(pwd);
		//alert(code);
		var t = $($('input#accessCode')[0]).val();
		if(t === pwd){
			$('a#submitBtn')[0].click();
		}
	}
}

function getMessage(event){
	log('data= ' + event.data + '; origin= ' + event.origin);

	if(pwd !== "") return;

	if (event.origin.indexOf('www.tw116.com') >=0 ) {
		//alert('data= ' + event.data + '; origin= ' + event.origin);
		pwd = event.data;

		$('input#accessCode').val(pwd);
		//alert(code);
		var t = $($('input#accessCode')[0]).val();
		if(t === pwd){
			$('a#submitBtn')[0].click();
		}
	}
}

function main(){
	window.addEventListener('message', getMessage);
}

main();
//setInterval(main, 2000);
