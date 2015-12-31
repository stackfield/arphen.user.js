// ==UserScript==
// @name          Page Cleaner
// @namespace     https://github.com/arphen/arphen.user.js
// @version       0.6.20151231
// @description   get a clean page
// @include       http*://*
// @copyright     2015+, Arphen Lin
// @author        Arphen Lin
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @grant         none
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

var url = window.location.href.toLowerCase();

function log(text){
    try{
        var d = new Date();
        var n = d.toLocaleString();
        console.log(n + ' [PageCleaner] ' + text);
    }catch(err){
    }
}

var SiteDB = [
    {
        "name": "UDN",
        "url": "udn.com/news/story/",
        "regx": "",
        "css": "#header_head, #header_body_wrapper, #story_bar, #footer, #sidebar, #story ~ *, #story_foot ~ *, #story_body_content ~ *"
    },
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
    },
    {
        "name": "artFido",
        "url": "www.artfido.com/blog/",
        "regx": "",
        "css": "#header, .top-ad-holder, #sidebar, .post-pagination ~ *, iframe, .addthis_toolbox, img[alt~=ArtFido]",
        "isRepeat": true,
        "repeatInterval": 3000
    },
    {
        "name": "T客邦",
        "url": "www.techbang.com/posts/",
        "regx": "",
        "css": "#header, #footer, #stickies, #sidebar, .post-header-additional, #div-inread-ad, #div-inread-ad ~ *, #post-additional, #post-additional ~ *",
        "isRepeat": true,
        "repeatInterval": 3000
    },
    {
        "name": "Pixnet",
        "url": ".pixnet.net/blog",
        "regx": "",
        "css": "div#idle-pop",
        "isRepeat": true,
        "repeatInterval": 3000
    }
];

var MatchedSite = null;
var Initialized = false;

function findSite(){
    var isMatch = false;
    var site;
    for(var i=0; i<SiteDB.length; i++){
        site = SiteDB[i];
        if(site.url !== ""){
            //isMatch = url.search(site.url);
            isMatch = (url.indexOf(site.url.toLowerCase()) >= 0);
        }else if(site.regx !== ""){
            var re = new RegExp(site.regx, "i");
            isMatch = re.test(url);
        }

        if(isMatch) break;
    }

    return (isMatch? site : null);
}

function removeCss(){
    log(MatchedSite.name);
    $(MatchedSite.css).remove();
}

function main(){
    if(!Initialized){
        MatchedSite = findSite();
        Initialized = true;
    }

    if(MatchedSite !== null){
        removeCss();

        if(MatchedSite.isRepeat){
            setInterval(removeCss, MatchedSite.repeatInterval);
        }
    }
}

main();
