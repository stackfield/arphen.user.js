// ==UserScript==
// @name          TW116
// @namespace     https://github.com/arphen/arphen.user.js/blob/master/tw116.user.js
// @version       2.5.20160215
// @description   As I wish
// @include       http://www.tw116.com/*
// @copyright     2015+, Arphen Lin
// @author        Arphen Lin
// @require       http://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.js
// @require       http://arphen.github.io/user_script_libs/video.js
// @grant         none
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

function log(text){
	try{
		var d = new Date();
		var n = d.toLocaleString();
		console.log(n + ' [TW116] ' + text);
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

function baiduLink(){
	//$('div.movie a[href~="baidu"]').each(function(){
	$('div.movie a[href^="http://pan.baidu.com"]').each(function(){
		var s = $(this).text();
		log(s);
		if(s.indexOf('密碼') > 0){
			s = s.trim();
			acc_code = s.substr(s.length-4, 4);
			log('密碼=' + acc_code);
			var href = $(this).attr('href');
			$(this).attr("href", href + '&acc_code=' + acc_code); // todo: 百度縮址加上acc_code沒用! 要設法取得真網址
		}
	});
}


function main(){
	//$('#logo, div.htop, div.tbpic, #center, #footer, #t365').remove();

	// hilite
	hilite();

	baiduLink();

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
