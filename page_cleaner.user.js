// ==UserScript==
// @name          Page Cleaner
// @namespace     https://github.com/arphen/arphen.user.js
// @version       0.1.20151226
// @description   get a clean page
// @include       http*://*
// @copyright     2015+, Arphen Lin
// @author        Arphen Lin
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @grant         none
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

var url = window.location.href;

function log(text){
    try{
        console.log('[PageCleaner] ' + text);
    }catch(err){
    }
}

var SiteDB = [
    {
        "name": "良醫健康網",
        "url": "health.businessweekly.com.tw/AArticle.aspx",
        "regx": "",
        "css": "#fixed_header, #header, #footer, #statustop, #aside, .container, .articleinfo, .articlecontent ~ *"
    },
    {
        "name": "Teepr",
        "url": "www.teepr.com",
        "regx": "",
        "css": ".main-header, .secondary-navigation, #top-navigation, .sidebar, #content_box header, .copyrights, .wf-formTpl, .wf-formTpl~*, .post~*, #popmake-overlay, div.popmake"
    }

];

function main(){
    for(var i=0; i<SiteDB.length; i++){
        var site = SiteDB[i];
        var isMatch = false;
        if(site.url !== ""){
            //isMatch = url.search(site.url);
            isMatch = (url.indexOf(site.url) >= 0);
        }else if(site.regx !== ""){
            var re = new RegExp(site.regx);
            isMatch = re.test(url);
        }

        if(isMatch){
            log(site.name);
            $(site.css).remove();
            break;
        }
    }
}

main();
