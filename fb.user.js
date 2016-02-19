// ==UserScript==
// @name          FB
// @namespace     https://github.com/arphen/arphen.user.js/blob/master/fb.user.js
// @version       1.1.20160219
// @description   As I wish
// @include       https://www.facebook.com*
// @copyright     2016+, Arphen Lin
// @author        Arphen Lin
// @require       http://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.js
// @require       http://arphen.github.io/user_script_libs/utility.js?ab=cd
// @grant         none
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

function addEmailLink(){
	// 應用gmail bookmarklet將FB文章寄給自己
	$('div._42nr').each(function(){
		// check if exist
		if($('span.email', this).length === 0){
			$(this).append('<span class="email" onclick="inpage_shareByEmail();">Email</span>');

			// test
			var div = $(this).parents('.userContentWrapper')[0]; //.css("border", "3px solid green");
			var arr = $('a._52c6', div);
			myLog.log(arr.length);
		}
	});
}

function inpage_shareByEmail(){
	debugger;
	var span = event.target;
	var div = $(span).parents('.userContentWrapper')[0]; // cannot include jquery, error here!
	var arr = $('a._52c6', div);

	var subject = 'your subject';
	var url = 'your url';
	if(arr.length>0){
		url = arr[0].href;
	}

	var m = 'http://mail.google.com/mail/?ui=1&view=cm&fs=1&tf=1' +
		'&to=arphen@cht.com.tw&su=[todo] ' + encodeURIComponent(subject) +
		'&body=' + encodeURIComponent(url);
	var w=window.open(m,'_blank');
	//setTimeout(function(){w.focus();}, 250);
}


function main(){
	// inject jquery in page
	addScript('http://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.js');  // FB禁止插入不同domain的js => Content Security Policy Reference & Examples - http://goo.gl/0q6Fa0
	addScriptCode(inpage_shareByEmail);

	// use myLog
	myLog.init('FB');

	setInterval(addEmailLink, 3000);
}

main();
