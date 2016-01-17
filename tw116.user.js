// ==UserScript==
// @name          TW116
// @namespace     https://github.com/arphen/arphen.user.js
// @version       2.2.20160117
// @description   As I wish
// @include       http://www.tw116.com/*
// @copyright     2015+, Arphen Lin
// @author        Arphen Lin
// @require       http://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.js
// @grant         none
// ==/UserScript==
// http://arphen.github.io/user_script_libs/video.js


this.$ = this.jQuery = jQuery.noConflict(true);

var VideoList = [
	// anime
	"暗殺教室",
	"排球少年",
	"全部成爲F",
	"偵探小隊KZ",
	"黑傑克",
	"櫻子小姐的腳下",
	"野良神第二季",
	"魯邦三世",
	"終物語",
	// TV
	"福爾摩斯",
	"黑名單",
	"僞裝夫妻",
	"熟女正青春",
	"下町火箭",
	"掟上今日子的備忘錄",
	"武士老師",
	"孤獨的美食家",
	"遺産争族",
	"相棒",
	"TransitGirls",
	"芈月傳",
	"鄉村愛情",
	// end
	"=== END ==="
];

function log(text){
	try{
		console.log('[TW116] ' + text);
	}catch(err){
	}
}

function goto(page){
	$('a.pagegbk').each(function(){
		var s = $(this).text();
		if(s == page){
			log(s);
			this.click();
			return false; // break .each() loop
		}
	});
}

function hilite(){
	$('div.mlist dl dt a').each(function(){
		var s = $(this).text();
		//log(s);

		//var re = new RegExp("(偵探小隊|黑傑克)");
		var re = new RegExp(VideoList.join("|"));

		//if(s.search(/(偵探小隊|黑傑克)/)>=0){
		if(re.test(s)){
			var o = $(this).parent().parent().parent();
			$(o).css({backgroundColor: "#550055"}); // set back color
		}
	});
}


function main(){
	//$('#logo, div.htop, div.tbpic, #center, #footer, #t365').remove();

	// hilite
	hilite();

	$('body').keydown(function(e){
		log('keydown = ' + e.which);
		//return;
		switch(e.which){
			case 39: // right key -> next page
				goto("下一頁");
				break;
			case 37: // left key -> prev page
				goto("上一頁");
				break;
		}
	});
}

main();
