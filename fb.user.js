// ==UserScript==
// @name          FB
// @namespace     https://github.com/arphen/arphen.user.js/blob/master/fb.user.js
// @version       1.0.20160219
// @description   As I wish
// @include       https://mail.google.com/mail/u/*
// @copyright     2016+, Arphen Lin
// @author        Arphen Lin
// @require       http://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.js
// @require       http://arphen.github.io/user_script_libs/utility.js
// @grant         none
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

function shareByEmail(){
	// 應用gmail bookmarklet將FB文章寄給自己
}


function insertMyEmail(){
	myLog.log('insertMyEmail');
	if($("textarea#:oj.vO").length === 0){
		setTimeout(insertMyEmail, 3000); // wait and try again
		return;
	}else{
		var me = '<div id="myEmail" class="vR"><span class="vN Y7BVp a3q" email="arphen@cht.com.tw"><div class="vT">681林佳宏</div><div class="vM"></div></span><input name="to" type="hidden" value="681林佳宏 <arphen@cht.com.tw>"><input name="notlsindicator" type="hidden" value="arphen@cht.com.tw"></div>';
		$("textarea#:oj.vO").before(me);
	}
}

function sendMail(){
	myLog.log('ctrlEnter: ' + $('div[data-tooltip^="Send"]').length);
	$('div[data-tooltip^="Send"]')[0].click();
}

function main(){
	// use myLog
	myLog.init('GMail This');

	setInterval(sendMail, 2000);
}

main();
