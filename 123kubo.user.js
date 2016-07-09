// ==UserScript==
// @name          123KUBO
// @namespace     https://github.com/arphen/arphen.user.js/blob/master/123kubo.user.js
// @version       1.0.20160709
// @description   As I wish
// @include       http://www.123kubo.com/*
// @copyright     2015+, Arphen Lin
// @author        Arphen Lin
// @require       http://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.js
// @require       https://rawgit.com/arphen/arphen.user.js/master/libs/utility.js
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
    $('div.listlf ul li p.t a').each(function(){
        var s = $(this).text();
        log(s);

        //var re = new RegExp("(偵探小隊|黑傑克)");
        var re = new RegExp(VideoList.join("|"));

        //if(s.search(/(偵探小隊|黑傑克)/)>=0){
        if(re.test(s)){
            var o = $(this).parent().parent();
            $(o).css({backgroundColor: "#550055",
                      color: "#ccc"}); // set color
        }
    });
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
	myLog.init('123KUBO');

    hilite();

	keydownObserver();
}

main();
