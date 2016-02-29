// ==UserScript==
// @name          莹恋
// @namespace     https://github.com/arphen/arphen.user.js/blob/master/luciferchen.user.js
// @version       1.0.20160213
// @description   As I wish
// @include       https://hyyxmk.shopmodule.jaeapp.com/modv3/index_modv3.php*
// @include       https://eco.taobao.com/widget/ui/authbtn/*
// @copyright     2016+, Arphen Lin
// @author        Arphen Lin
// @require       http://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.js
// @grant         none
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

var url = window.location.href.toLowerCase();

function log(text){
	try{
		var d = new Date();
		var n = d.toLocaleString();
		console.log(n + ' [莹恋] ' + text);
	}catch(err){
	}
}

function main(){

	if(url.indexOf("hyyxmk.shopmodule.jaeapp.com") > 0){
		var arr = $('iframe[width=170]');
		if(arr.length === 0){
			var div = $('div.sign')[0];
			if($(div).attr('title').indexOf("今日已签") < 0){
				$(div).click();
			}
		}
	}

	if(url.indexOf("eco.taobao.com/widget") > 0){
		$('a.btn-allow')[0].click();
	}
}

main();
setInterval(main, 3000);
