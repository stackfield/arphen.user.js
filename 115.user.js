// ==UserScript==
// @name          115
// @namespace     https://arphen.github.io/
// @version       0.5.20150313
// @description   Modify the page
// @include       http*://115.com/*
// @copyright     2015+, Arphen Lin
// @author     Arphen Lin
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @grant         none
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

var url = window.location.href;
var autoMode = false;
var filePath = "";
var prevFolder = "";
var viewImageMode = false;
var tmrCheckImgClosed = null;
var tmrCheckPath = null;

function log(text){
    try{
        console.log('[115] ' + text);
    }catch(err){
    }
}

function createImgController(){
    $($('body.frame-body')[0]).append('<div id="controllerWrapper"><input id="autoMode" type="checkbox">Auto Mode</div>');
    $('#controllerWrapper').css({
        position: "fixed", top: "0px", left: "0px", 
        backgroundColor: "yellow", 
        border: "2px solid red",
        fontSize: "12px"});
    $('#autoMode').click(function(){
        autoMode = ($('input#autoMode:checked').length > 0);
        log('autoMode = ' + autoMode);
        if(autoMode){
            tmrCheckPath = setInterval(checkPath, 1000);
        }else{
            clearInterval(tmrCheckPath);
            tmrCheckPath = null;
            filePath = "";
            prevFolder = "";
        }
    });
}
createImgController();

// when iframe is loaded
$('iframe[rel*="wangpan"]').load(function(){
    //$('iframe[rel*="wangpan"]').contents().find('body').html('Hey, i`ve changed content of <body>! Yay!!!');
    //alert($('iframe[rel*="wangpan"]').contents().find('span.file-name a[field]').length);
});

function checkPath(){
    // if not auto mode, bypass
    if(!autoMode) return;

    // if search box is not empty, bypass 
    var objs = $('iframe[rel*="wangpan"]').contents().find('#js_search_name_input');
    if(objs.length<=0) return;
    if($(objs[0]).val() != ""){
        log('search box = ' + $(objs[0]).val());
        return;
    }

    objs = $('iframe[rel*="wangpan"]').contents().find('div.file-path');
    if(objs.length<=0) return;

    var newPath = $(objs[0]).text();
    if(filePath != newPath){ // path changed
        filePath = newPath;
        log('path = ' + filePath); 
        checkFolder();
    }
}

function checkFolder(){
    // check if any folder here
    objs = $('iframe[rel*="wangpan"]').contents().find('a[rel="view_folder"]');
    if(objs.length>0){ 
        if(viewImageMode){  // if in image view mode, auto goto next folder
            viewImageMode = false;
            for(var i=0; i<objs.length; i++){
                if($(objs[i]).text() == prevFolder && i<(objs.length-1)) {
                    log('goto next folder = ' + $(objs[i+1]).text());
                    objs[i+1].click();                    
                    break;
                }
            }
            return;
        }
    }

    // check if any file
    objs = $('iframe[rel*="wangpan"]').contents().find('a[rel="file"]');
    if(objs.length <=0) { return false; }

    // show first jpg, jpeg
    viewImageMode = showImage("jpg")? true : showImage("jpeg");
}

function showImage(img){
    objs = $('iframe[rel*="wangpan"]').contents().find('span.file-name a[title*=".'+img+'"]');
    if(objs.length>0){
        objs[0].click(); // show image        
        // check if image closed
        tmrCheckImgClosed = setInterval(checkImgClosed, 1000);
        // simulate space key as ESC
        $('body').keydown(function(e){
            log('keydown = ' + e.which);
            //return;
            if(e.which == 32){ // space key -> close image viewer
                objs = $('div.pvc-close a[data-btn="close"');
                if(objs.length>0){
                    objs[0].click();
                }
                //var e = jQuery.Event("keydown");
                //e.which = 27; // # ESC
                //$("body").trigger(e);
            }
        });
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
    if(objs.length>0) {
        // keep current folder name
        //prevFolder = $(objs[objs.length-1]).text();
        prevFolder = $(objs[objs.length-1]).attr('title');
        log('prevFolder = ' + prevFolder);
        // return to previous folder
        objs[objs.length-2].click();
    }
}