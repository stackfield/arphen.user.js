// ==UserScript==
// @name          ESPN NBA Score
// @namespace     https://github.com/arphen/arphen.user.js
// @version       0.1.20151206
// @description   As I wish
// @include       http://espn.go.com/nba/scoreboard*
// @copyright     2015+, Arphen Lin
// @author        Arphen Lin
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @grant         none
// ==/UserScript==

// Your code here...
this.$ = this.jQuery = jQuery.noConflict(true);

function log(text){
    try{
        console.log('[ESPN] ' + text);
    }catch(err){
    }
}

function main(){
    // open in new window
    $('.sb-actions a.button-alt.sm').each(function( index ) {
        $(this).attr("target", "_blank");
    });

    setTimeout(main, 3000);
}

main();





