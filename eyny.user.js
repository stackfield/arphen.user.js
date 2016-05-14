// ==UserScript==
// @name          Eyny
// @namespace     https://github.com/arphen/arphen.user.js/blob/master/eyny.user.js
// @version       2.1.20160514
// @description   Hiding and hilighting some html elements
// @include       http://*.eyny.com/*
// @copyright     2015+, Arphen Lin
// @author        Arphen Lin
// @require       http://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.js
// @require       https://rawgit.com/arphen/arphen.user.js/master/libs/utility.js
// @grant         none
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

var url = window.location.href.toLowerCase();

function log(text){
	myLog.log(text);
}

function hilite(){
	//log("hilite");
	$('h3.ptn a').each(function(){
		var s = $(this).text();
		var o;
		if(s.search(/(SIRO|CHN|新人|debut|引退|大橋未久|波多野|羽田愛|羽田あい|一ノ瀬アメリ|百合川|前田|美雪|希志|julia|涼川|佐々木愛美|遠山雪菜|岡田優子|有賀|三上|鈴村あいり|鈴村愛里)/i)>=0){
			//alert(s);
			if(s.search(/(新人)/)>=0 && s.search(/(人妻)/)>=0){
				// pass 最新人妻
			}else{
				o = $(this).parent().parent();
				$(o).css({backgroundColor: "chartreuse", border: "1px solid red" });
			}
		}
		if(s.search(/(無碼)/)>=0){
			//alert(s);
			o = $(this).parent().parent();
			$(o).css({backgroundColor: "yellow", border: "1px solid red" });
		}
		if(s.search(/(合集|合輯|連發)/)>=0){
			//alert(s);
			o = $(this).parent().parent();
			$(o).css({backgroundColor: "red", border: "1px solid red" });
		}
	});
	setTimeout(hilite, 5000);
}

function createContainer(){
	$('body').append('<div id="torrent"></div>');
	$('#torrent').css({
		position: "fixed", top: "50px", right: "0px",
		backgroundColor: "yellow",
		border: "2px solid red",
		"padding-left": "15px", "padding-right": "15px",
		fontSize: "20px"});
}

function moveTop(ele){
	if($('#torrent').length<=0){
		createContainer();
	}
	$('#torrent').append(ele);
	$('#torrent').append('<br>');
}

function torrent(){
	if(url.indexOf('eyny.com/forum.php') >= 0 || url.indexOf('eyny.com/thread-') >= 0){
		$('a[href*="attachment"]').each(function(){
			var s = $(this).text();
			if(s.search(/torrent/)>=0){
				//alert(s);
				moveTop(this);
				$(this).click(function(){
					//if (confirm("Close Window?")) { close(); }
					close();
				});
			}
		});
	}
}

function loadImage(){
	if(url.indexOf('eyny.com/forum.php') >= 0 || url.indexOf('eyny.com/thread-') >= 0){
		$('a[href$=".jpg"]').each(function(){
			var s = $(this).text();
			//myLog.log(s);
			$(this).append('<img src="'+s+'">');
		});
	}
}


function main(){
	myLog.init('Eyny');

	//hide();
	hilite();

	torrent();

	loadImage();
}

main();


