// ==UserScript==
// @name          Pixnet
// @namespace     https://github.com/arphen/arphen.user.js
// @version       0.1.20151207
// @description   As I wish
// @include       http://*.pixnet.net/*
// @copyright     2015+, Arphen Lin
// @author        Arphen Lin
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @grant         none
// ==/UserScript==

// Your code here...
this.$ = this.jQuery = jQuery.noConflict(true);

function log(text){
    try{
        console.log('[Pixnet] ' + text);
    }catch(err){
    }
}

function main(){
    $('div#idle-pop').remove();

    setTimeout(main, 3000);
}

main();





