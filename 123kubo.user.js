// ==UserScript==
// @name          123KUBO
// @namespace     https://github.com/arphen/arphen.user.js
// @version       0.2.20151221
// @description   As I wish
// @include       http://www.123kubo.com/*
// @copyright     2015+, Arphen Lin
// @author        Arphen Lin
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require       http://arphen.github.io/user_script_libs/video.js
// @grant         none
// ==/UserScript==
/* jshint -W097 */
//'use strict';

this.$ = this.jQuery = jQuery.noConflict(true);

function log(text){
    try{
        console.log('[123KUBO] ' + text);
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


function main(){
    $('div.listforum, div.footer, div.datal.clear, ul.ad').remove();

    // hilite
    hilite();

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
