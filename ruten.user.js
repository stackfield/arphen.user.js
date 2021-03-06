// ==UserScript==
// @name          Ruten
// @namespace     https://github.com/arphen/arphen.user.js/blob/master/ruten.user.js
// @version       1.0.20160213
// @description   As I wish
// @include       http://mybid.ruten.com.tw/master/view_transaction.php?*
// @copyright     2016+, Arphen Lin
// @author        Arphen Lin
// @require       http://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.js
// @grant         none
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

function log(text){
	try{
		console.log('[Ruten] ' + text);
	}catch(err){
	}
}

function main(){
	var eles = $('span.tno-detail-dway span.content a');
	log(eles.length);
	if(eles.length === 1){
		var a = eles[0];
		var span = a.parentNode;
		var td = a.parentNode.parentNode.parentNode;
		var s = $(span).text();
		//log(s);
		var res = s.match(/交貨便代碼.*查詢進度/g); //"交貨便代碼 D74054780250 查詢進度"
		//log(res);
		if(res.length === 1){
			var tid = res[0].replace("交貨便代碼", "").replace("查詢進度", "").replace(" ", "");
			$(td).append('<br><iframe width="550" height="350" scrolling="no" src="https://eservice.7-11.com.tw/E-Tracking/search.aspx?tid='+tid+'"></iframe>');
		}
	}
}

main();
