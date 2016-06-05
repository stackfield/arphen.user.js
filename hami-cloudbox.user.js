// ==UserScript==
// @name          Hami Cloudbox
// @namespace     https://github.com/arphen/arphen.user.js/blob/master/hami-cloudbox.user.js
// @version       1.3.20160605
// @description   As I wish
// @include       http://sync.hamicloud.net/*
// @copyright     2015+, Arphen Lin
// @author        Arphen Lin
// @require       http://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.js
// @require       https://rawgit.com/arphen/arphen.user.js/master/libs/utility.js
// @grant         none
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

var gTotalRows = 0;

function selectDeleted(){
	// 自動勾選已刪除檔案
/*	
	$('tr.back-row-deleted input.cbox').each(function(){
		$(this).click();
		$(this).prop( "checked", true );
	});
*/	
	var dels = $('tr.back-row-deleted input.cbox');
	if(dels.length>0){
		$(dels[0]).click();
		$(dels).prop( "checked", true );

		if($('li#list-func-batch-delete-fully').is(':visible')) {
			myLog.log('ready to delete');
			$('li#list-func-batch-delete-fully a')[0].click();
			//$("li#list-func-batch-delete-fully a").trigger("click");
		}
	}
}

function scanAll(){
	// step1. page down until bottom
	// 檢查列數是否增加
	var rows = $('table#file-list tr');
	if(rows.length > gTotalRows){
		gTotalRows = rows.length;
		$("html, body").animate({ scrollTop: $(document).height()-$(window).height() });
		setTimeout(scanAll, 500);
		return;
	}

	myLog.log('stop scrolling');

	// select deleted
	var trs = $('tr.back-row-deleted');
	if(trs.length>0){
		myLog.log('some deleted items');
		selectDeleted();
	}

}

function main(){
	// use myLog
	myLog.init('Hami Cloudbox');

	//setInterval(selectDeleted, 3000);

	scanAll();
}

main();
