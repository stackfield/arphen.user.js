// ==UserScript==
// @name          Page Cleaner
// @namespace     https://github.com/arphen/arphen.user.js
// @version       0.9.20160107
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
        "url_regx": "",
        "css_remove": "#header_head, #header_body_wrapper, #story_bar, #footer, #sidebar, #story ~ *, #story_foot ~ *, #story_body_content ~ *"
    },
    {
        "name": "良醫健康網",
        "url": "health.businessweekly.com.tw/AArticle.aspx",
        "url_regx": "",
        "css_remove": "#fixed_header, #header, #footer, #statustop, #aside, .container, .articleinfo, .articlecontent ~ *"
    },
    {
        "name": "PanSci",
        "url": "pansci.asia/archives/",
        "url_regx": "",
        "css_remove": "#banner_container, #header_container, #categories_container, #fixed_menu, div.links, div.sticky_left, div.wpbcap, div.wpbcap ~ *, footer, footer ~ *, div.container-fluid, div.copyright, div.about_author, div.comments_wrap"
    },
    {
        "name": "Teepr",
        "url": "www.teepr.com",
        "url_regx": "",
        "css_remove": ".main-header, .secondary-navigation, #top-navigation, .sidebar, #content_box header, .copyrights, .wf-formTpl, .wf-formTpl~*, .post~*, #popmake-overlay, div.popmake"
    },
    {
        "name": "TechNews",
        "url": "technews.tw/20",
        "url_regx": "",
        "css_remove": "#masthead, #secondary, .socialcount, .sharefbline, .sharefbline ~ *, nav, nav ~ *, footer, #jj-prev-post, #jj-next-post"
    },
    {
        "name": "Facebook",
        "url": "facebook.com",
        "url_regx": "",
        "css_remove": "div[data-ownerid]",
        "isRepeat": true,
        "repeatInterval": 10000
    },
    {
        "name": "電腦王阿達",
        "url": "www.kocpc.com.tw/archives/",
        "url_regx": "",
        "css_remove": "#header, #sidebar, .breadcrumb, .w2bslikebox, #share_button, #jp-relatedposts, #jp-relatedposts ~ *, article footer, #comments, #footer"
    },
    {
        "name": "tabletennisdb",
        "url": "www.tabletennisdb.com",
        "url_regx": "",
        "css_newWin": "a"
    },
    {
        "name": "artFido",
        "url": "www.artfido.com/blog/",
        "url_regx": "",
        "css_remove": "#header, .top-ad-holder, #sidebar, .post-pagination ~ *, iframe, .addthis_toolbox, img[alt~=ArtFido]",
        "isRepeat": true,
        "repeatInterval": 3000
    },
    {
        "name": "T客邦",
        "url": "www.techbang.com/posts/",
        "url_regx": "",
        "css_remove": "#header, #footer, #stickies, #sidebar, .post-header-additional, #div-inread-ad, #div-inread-ad ~ *, #post-additional, #post-additional ~ *",
        "isRepeat": true,
        "repeatInterval": 3000
    },
    {
        "name": "Pixnet",
        "url": ".pixnet.net/blog",
        "url_regx": "",
        "css_remove": "div#idle-pop",
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
        }else if(site.url_regx !== ""){
            var re = new RegExp(site.url_regx, "i");
            isMatch = re.test(url);
        }

        if(isMatch) break;
    }

    return (isMatch? site : null);
}

function doit(){
    log(MatchedSite.name);

    // remove elements
    if(MatchedSite.css_remove !== null){
        $(MatchedSite.css_remove).remove();
    }

    // open link in new window
    if(MatchedSite.css_newWin !== null){
        $(MatchedSite.css_newWin).each(function( index ) {
            $(this).attr("target", "_blank");
        });
    }

}

function main(){
    if(!Initialized){
        MatchedSite = findSite();
        Initialized = true;
    }

    if(MatchedSite !== null){
        doit();

        if(MatchedSite.isRepeat){
            setInterval(doit, MatchedSite.repeatInterval);
        }
    }
}

main();
