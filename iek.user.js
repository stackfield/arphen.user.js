// ==UserScript==
// @name          IEK
// @namespace     https://arphen.github.io/
// @version       0.2.20151015
// @description   Modify the page
// @include       http://ieknet.iek.org.tw/fullSearchNews.*
// @copyright     2015+, Arphen Lin
// @author     Arphen Lin
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @grant         none
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

function change(){
    $('tr.altrow td.list_title a').each(function(){
        var s = $(this).html();
        console.log(s);
        var o = $(this).parent().parent();
        if(s.search(/font/)>=0){            
            $(o).css({backgroundColor: "#CCFFFF"});
        }else{
            $(o).css({backgroundColor: "#DDDDDD"});
        }
    });    
    setTimeout(change, 1000);
}

change();

