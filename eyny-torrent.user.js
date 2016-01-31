// ==UserScript==
// @name          Eyny Torrent
// @namespace     https://github.com/arphen/arphen.user.js/blob/master/eyny-torrent.user.js
// @version       1.0.20160131
// @description   Moving torrent links to top-right, auto close window after downloading torrent.
// @include       http://*.eyny.com/forum.php*
// @include       http://*.eyny.com/thread-*
// @copyright     2015+, Arphen Lin
// @author        Arphen Lin
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @grant         none
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

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
