// ==UserScript==
// @name          115
// @namespace     https://arphen.github.io/
// @version       0.1.20150309
// @description   Modify the page
// @include       http*://115.com/*
// @copyright     2015+, Arphen Lin
// @author     Arphen Lin
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @grant         none
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

var url = window.location.href;
var filePath = "";
var prevFolder = "";

function log(text){
    try{
        console.log('[115] ' + text);
    }catch(err){
    }
}

$('iframe[rel*="wangpan"]').load(function(){
    //$('iframe[rel*="wangpan"]').contents().find('body').html('Hey, i`ve changed content of <body>! Yay!!!');
    //alert($('iframe[rel*="wangpan"]').contents().find('span.file-name a[field]').length);
});

var tmrCheckPath = setInterval(checkPath, 1000);
var tmrCheckImgClosed = null;

function checkPath(){
    var objs = $('iframe[rel*="wangpan"]').contents().find('div.file-path');
    if(objs.length<=0) return;

    var newPath = $(objs[0]).text();
    if(filePath != newPath){ // path changed
        filePath = newPath;
        log('path = ' + filePath);        
        checkFolder();
    }
}

function checkFolder(){
    // check if any folder
    var objs = $('iframe[rel*="wangpan"]').contents().find('a[rel="view_folder"]');
    if(objs.length>0){ 
        if(prevFolder == "") return;
        for(var i=0; i<objs.length; i++){
            if($(objs[i]).text() == prevFolder && i<(objs.length-1)) {
                log('goto next folder = ' + $(objs[i+1]).text());
                objs[i+1].click();
                break;
            }
        }
        return;
    }

    // check if any file
    objs = $('iframe[rel*="wangpan"]').contents().find('a[rel="file"]');
    if(objs.length <=0) { return false; }

    // show first jpg, jpeg
    return showImage("jpg")? true : showImage("jpeg");
}

function showImage(img){
    objs = $('iframe[rel*="wangpan"]').contents().find('span.file-name a[title*=".'+img+'"]');
    if(objs.length>0){
        objs[0].click(); // show image
        // keep current folder name
        objs = $('iframe[rel*="wangpan"]').contents().find('div.file-path a');
        if(objs.length>0) {
            prevFolder = $(objs[objs.length-1]).text();
            log('prevFolder = ' + prevFolder);
        }
        // check if image closed
        tmrCheckImgClosed = setInterval(checkImgClosed, 1000);
        return true;
    }else{
        return false;
    }
}

function checkImgClosed(){       
    objs = $('div.previewer-container');
    if(objs.length<=0){ return; }

    if(!$(objs[0]).is(':visible')){
        clearInterval(tmrCheckImgClosed);
        tmrCheckImgClosed = null;
        log('image closed');
        // return to parent folder
        returnToParentFolder();
    }
}

function returnToParentFolder(){
    var objs = $('iframe[rel*="wangpan"]').contents().find('div.file-path a');
    if(objs.length<=0) return;

    objs[objs.length-2].click();
}