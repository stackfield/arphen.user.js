// ==UserScript==
// @name          TW116
// @namespace     https://github.com/arphen/arphen.user.js/blob/master/tw116.user.js
// @version       3.3.20160305
// @description   As I wish
// @include       http://www.tw116.com/*
// @copyright     2015+, Arphen Lin
// @author        Arphen Lin
// @require       http://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.js
// @require       https://rawgit.com/arphen/arphen.user.js/master/libs/utility.js?aaa=bbb
// @require       https://rawgit.com/arphen/arphen.user.js/master/libs/video.js
// @grant         none
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

function log(text){
	myLog.log(text);
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

/*
var win;
function getRealURL(obj, pwd, href){
	var id = 'ifm_' + pwd;
	//win = window.open(href, "_blank", "location=yes,height=570,width=520,scrollbars=yes,status=yes");
	win = window.open(href, "_blank");
	setInterval(function(){
		log('postMessage(): ' + pwd);
		win.postMessage(pwd, 'http://pan.baidu.com');
		//alert(win.location.href); // 會因安全性的問題被block => javascript - SecurityError: Blocked a frame with origin from accessing a cross-origin frame - http://goo.gl/h29eh8
	}, 3000);
	return href;
}

function getRealURL_iframe(obj, pwd, href){
	var id = 'ifm_' + pwd;
	$(obj).append('<br><iframe id="' +id+ '" width="1000" height="350" scrolling="yes" src="' +href+ '"></iframe>');
	//var url = document.frames[id].location.href;
	//log(url);
	$('#'+id).load(function(){
		//alert('url = ' + this.contentWindow.location.href); // 會因安全性的問題被block => javascript - SecurityError: Blocked a frame with origin from accessing a cross-origin frame - http://goo.gl/h29eh8
		this.contentWindow.postMessage(pwd, 'http://www.tw116.com/');
	});
	return href;
}

var ajax =
	{
		send: function(urlstring)
		{
			if(!this.ifram)
			{
				this.ifram = document.createElement('iframe');
				//this.ifram.style.display = 'none';
				if(this.ifram.addEventListener) this.ifram.addEventListener('load',ajax.receive,false);
				else if(this.ifram.attachEvent) this.ifram.attachEvent('onload',ajax.receive);
				//$(this.ifram).load(ajax.receive);
				document.body.appendChild(this.ifram);
			}
			this.ifram.setAttribute('src',urlstring);
		},
		receive: function()
		{
			content = ajax.ifram.contentWindow.document.body.innerHTML;
			returnurl = ajax.ifram.contentWindow.location.href; // 此時根本還沒載入, about:blank
			log('return url: '+returnurl);
			setTimeout(ajax.receive_delay, 5000); // 等5秒載入後再抓網址
		},
		receive_delay: function(){
			returnurl = ajax.ifram.contentWindow.location.href; // 會因安全性的問題被block => javascript - SecurityError: Blocked a frame with origin from accessing a cross-origin frame - http://goo.gl/h29eh8
			log('return url: '+returnurl);
		}
	};
*/

function baiduLink(){
	//$('div.movie a[href~="baidu"]').each(function(){
	$('div.movie a[href^="http://pan.baidu.com"]').each(function(){
		var s = $(this).text();
		log(s);
		if(s.indexOf('密碼') > 0){
			s = s.trim();
			pwd = s.substr(s.length-4, 4);
			log('密碼=' + pwd);
			var href = $(this).attr('href');
			//var url = getRealURL(this, pwd, href);
			//ajax.send(href); // todo: not work
			//$(this).attr("href", href + '&pwd=' + pwd); // todo: 百度縮址加上pwd沒用! 要設法取得真網址
			$(this).removeAttr('href')
				.attr('id', 'pwd_'+pwd)
				.attr('title', href)
				.attr('onclick', 'inpage_openBaiduPan(this)');
			//$(this).after('<a id="pwd_'+pwd+'" title="'+href+'" onclick="inpage_openBaiduPan(this)">Baidu</a>');
		}
	});
}

/* this code is for page only */
function inpage_openBaiduPan(){
	var a = event.target;
	//alert(a.title);
	var pwd = a.id.replace("pwd_", "");
	win = window.open(a.title, "_blank");
	setInterval(function(){
		win.postMessage(pwd, 'http://pan.baidu.com');
	}, 2000);
}

function keydownObserver(){
	// add short-key
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


function main(){
	// use myLog
	myLog.init('TW116');

	// inject jquery in page
	APLTOOL.addScript('http://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.js');  // 允許插入和原page不同domain的js => 因為tw116網站沒有設限CSP (Content Security Policy)

	// inject my code in page
	APLTOOL.addScriptCode('var win; ' + inpage_openBaiduPan);

	// hilite
	hilite();

	// process baidu pan
	baiduLink();

	keydownObserver();
}

main();
