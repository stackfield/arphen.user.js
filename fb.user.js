// ==UserScript==
// @name          FB
// @namespace     https://github.com/arphen/arphen.user.js/blob/master/fb.user.js
// @version       1.0.20160219
// @description   As I wish
// @include       https://www.facebook.com*
// @copyright     2016+, Arphen Lin
// @author        Arphen Lin
// @require       http://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.js
// @require       http://arphen.github.io/user_script_libs/utility.js
// @grant         none
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

function shareByEmail(){
	// 應用gmail bookmarklet將FB文章寄給自己
	$('div._42nr').each(function(){
		// check if exist
		if($('span.email', this).length === 0){
			$(this).append('<span class="email">Email</span>');
		}
	});
}


function main(){
	// use myLog
	myLog.init('FB');

	setInterval(shareByEmail, 3000);
}

main();
