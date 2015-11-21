// ==UserScript==
// @name          TW116
// @namespace     https://github.com/arphen/arphen.user.js
// @version       0.9.20151121
// @description   As I wish
// @include       http://www.tw116.com/*
// @copyright     2015+, Arphen Lin
// @author        Arphen Lin
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @grant         none
// ==/UserScript==
/* jshint -W097 */
'use strict';

this.$ = this.jQuery = jQuery.noConflict(true);

function log(text){
    try{
        console.log('[TW116] ' + text);
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

function doit(){
    $('#logo, div.htop, div.tbpic, #center, #footer, #t365').remove();

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
};

doit();
