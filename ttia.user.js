// ==UserScript==
// @name          TTIA
// @namespace     https://github.com/arphen/arphen.user.js
// @version       0.1.20151127
// @description   As I wish
// @include       http://ttia-tw.org/bbs.php?id=*
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
        console.log('[TTIA] ' + text);
    }catch(err){
    }
}

function doit(){
    var links = $('div.Txt.clearfix p a');   
    if(links.length > 0){
        log(links[0]);
        links[0].click();  // go to link
    }    
};

doit();
