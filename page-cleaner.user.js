// ==UserScript==
// @name          Page Cleaner
// @namespace     https://github.com/arphen/arphen.user.js/blob/master/page-cleaner.user.js
// @version       4.0.20160814
// @description   get a clean page
// @include       http*://*
// @exclude       *docs.google.com*
// @copyright     2015+, Arphen Lin
// @author        Arphen Lin
// @require       http://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js
// @require       https://rawgit.com/arphen/arphen.user.js/master/libs/utility.js
// @grant         none
// ==/UserScript==
this.$ = this.jQuery = jQuery.noConflict(true);

var url = window.location.href.toLowerCase();

function log(text) {
    myLog.log(text);
}

var SiteDB = [{
    "name": "123kubo",
    "url": "www.123kubo.com",
    "url_regx": "",
    "css_remove": "div.listforum, div.footer, div.datal.clear, ul.ad, .likebox, #stad, div.datal.main"
}, {
    "name": "123kubo-play",
    "url": "www.123kubo.com/vod-play-",
    "url_regx": "",
    "css_remove": '.top, div:has(> ins), .playmar ~ *'
}, {
    "name": "7-11",
    "url": "eservice.7-11.com.tw/E-Tracking/search.aspx",
    "url_regx": "",
    "css_remove": "table[height=647] > tbody > tr:first-child, td[height=19], td[width=256]",
    "css_free": [{
        "selector": 'form',
        "css": {
            "visibility": "hidden"
        }
    }, {
        "selector": 'table[bgcolor="#A4A4A4"], table[bgcolor="#65CE8E"]',
        "css": {
            "position": "fixed",
            "left": "5px",
            "top": "5px",
            "visibility": "visible"
        }
    }]
}, {
    "name": "artFido",
    "url": "www.artfido.com/blog/",
    "url_regx": "",
    "css_remove": "#header, .top-ad-holder, #sidebar, .post-pagination ~ *, iframe, .addthis_toolbox, img[alt~=ArtFido]",
    "isRepeat": true,
    "repeatInterval": 3000
}, {
    "name": "CHT Email",
    "url": "email.cht.com.tw",
    "url_regx": "",
    "css_remove": "div.dlgMask",
    "isRepeat": true,
    "repeatInterval": 3000,
    "css_free": [{
        "selector": "#divConvTopic",
        "css": {
            "font-weight": "bold"
        }
    }]
}, {
    "name": "CHT Video",
    "url": "chtvideo.hinet.net/olympics/2016Rio/broadcast.do",
    "css_newWin": 'div.dragArea a'
}, {
    "name": "Digitimes",
    "url": "digitimes.com.tw",
    "url_regx": "",
    "css_remove": '#sitemaptable, div.art_tabbed_nav, #ToolsBoxHorizontal, table[width="990"], table[width="987"], table[width="986"], #pagefloat_r, #relate_table, #footer'
}, {
    "name": "ESPN",
    "url": "espn.go.com/nba/",
    "url_regx": "",
    "css_newWin": ".sb-actions a.button-alt.sm",
    "css_remove": "#global-scoreboard, div.container, #global-nav, #global-header, #pane-main:before, header.game-strip",
    "css_free": [{
        "selector": "#pane-main",
        "css": {
            "padding-top": "0px"
        }
    }, {
        "selector": "header.automated-header",
        "css": {
            "padding": "0px"
        }
    }],
    "isRepeat": true,
    "repeatInterval": 3000
}, {
    "name": "Eyny",
    "url": "eyny.com",
    "url_regx": "",
    "css_remove": 'div#hd + table[width], td.forumlist, div#pt, div#ft, div#pgt, div.hdc, div#f_pst, div.bm.bml.pbn, ul#thread_types, h2 a img, iframe, div.sitemajiad, table[height="240"], table.t_p_top'
}, {
    "name": "Facebook",
    "url": "-facebook.com",
    "url_regx": "",
    "css_remove": "div[data-ownerid]",
    "isRepeat": true,
    "repeatInterval": 10000
}, {
    "name": "HamiCloud",
    "url": "hamicloud.net",
    "url_regx": "",
    "css_remove": "div.blockOverlay, #show-upload-fun, #show-upload-list, #footer",
    "isRepeat": true,
    "repeatInterval": 1000
}, {
    "name": "PanSci",
    "url": "pansci.asia/archives/",
    "url_regx": "",
    "css_remove": "#banner_container, #header_container, #categories_container, #fixed_menu, div.links, div.sticky_left, div.wpbcap, div.wpbcap ~ *, footer, footer ~ *, div.container-fluid, div.copyright, div.about_author, div.comments_wrap"
}, {
    "name": "Pixnet",
    "url": ".pixnet.net/blog",
    "url_regx": "",
    "css_remove": "div#idle-pop",
    "isRepeat": true,
    "repeatInterval": 3000
}, {
    "name": "tabletennisdb",
    "url": "www.tabletennisdb.com",
    "url_regx": "",
    "css_newWin": "a"
}, {
    "name": "TechNews",
    "url": "technews.tw/20",
    "url_regx": "",
    "css_remove": "#masthead, #secondary, .socialcount, .sharefbline, .sharefbline ~ *, nav, nav ~ *, footer, #jj-prev-post, #jj-next-post"
}, {
    "name": "Teepr",
    "url": "www.teepr.com",
    "url_regx": "",
    "css_remove": ".main-header, .secondary-navigation, #top-navigation, .sidebar, #content_box header, .copyrights, .wf-formTpl, .wf-formTpl~*, .post~*, #popmake-overlay, div.popmake"
}, {
    "name": "TW116",
    "url": "www.tw116.com",
    "url_regx": "",
    "css_remove": "#logo, div.htop, div.tbpic, #center, #footer, #t365"
}, {
    "name": "T客邦",
    "url": "www.techbang.com/posts/",
    "url_regx": "",
    "css_remove": "#header, #footer, #stickies, #sidebar, .post-header-additional, #div-inread-ad, #div-inread-ad ~ *, #post-additional, #post-additional ~ *",
    "isRepeat": true,
    "repeatInterval": 3000
}, {
    "name": "UDN",
    "url": "udn.com/",
    "url_regx": "",
    "css_remove": '#header_head, #header_body_wrapper, #story_bar, #footer, #sidebar, #story ~ *, #story_foot ~ *, #story_body_content ~ *, #channel ~ *, #show_box, div[id^="ad_"], #channel, #scoreboard-container, #app, #wimbledonudn, #wimbledon-frame',
    "css_free": [{
        "selector": "#header",
        "css": {
            "height": "25px"
        }
    }],
    "isRepeat": true,
    "repeatInterval": 3000
}, {
    "name": "電腦王阿達",
    "url": "www.kocpc.com.tw/archives/",
    "url_regx": "",
    "css_remove": "#header, #sidebar, .breadcrumb, .w2bslikebox, #share_button, #jp-relatedposts, #jp-relatedposts ~ *, article footer, #comments, #footer"
}, {
    "name": "良醫健康網",
    "url": "health.businessweekly.com.tw/AArticle.aspx",
    "url_regx": "",
    "css_remove": "#fixed_header, #header, #footer, #statustop, #aside, .container, .articleinfo, .articlecontent ~ *"
}, {
    "name": "露天拍賣",
    "url": "ruten.com.tw",
    "url_regx": "",
    "css_remove": "#bestgoods_div, div.rt-store-ad",
    "css_newWin": "a"
}, {
    "name": "卡提諾論壇",
    "url": "ck101.com",
    "url_regx": "",
    "css_remove": '#header, .footer, .side, .flt_r_i, .sideToolBar, .tagBox, .tagBox ~ *, div[id^="post_"] ~ *, div.gamePopWp, div.gamePopBg, div.a_t',
    "isRepeat": true,
    "repeatInterval": 3000
}];

var MatchedSites = [];

function findSite() {
    var isMatch = false;
    var site;
    for (var i = 0; i < SiteDB.length; i++) {
        site = SiteDB[i];
        if (site.url !== "") {
            //isMatch = url.search(site.url);
            isMatch = (url.indexOf(site.url.toLowerCase()) >= 0);
        } else if (site.url_regx !== "") {
            var re = new RegExp(site.url_regx, "i");
            isMatch = re.test(url);
        }

        if (isMatch) {
            MatchedSites.push(site);
        }
    }
}

function doit(theSite) {
    log(theSite.name);

    // remove elements
    //if(theSite.css_remove !== null){
    if (typeof theSite.css_remove !== 'undefined') {
        $(theSite.css_remove).remove();
    }

    // open link in new window
    //if(theSite.css_newWin !== null){
    if (typeof theSite.css_newWin !== 'undefined') {
        $(theSite.css_newWin).each(function(index) {
            $(this).attr("target", "_blank");
        });
    }

    // apply free format css
    //if(theSite.css_free !== null && theSite.css_free.length > 0){
    if (typeof theSite.css_free !== 'undefined' && theSite.css_free.length > 0) {
        for (var i = 0; i < theSite.css_free.length; i++) {
            var o = theSite.css_free[i];
            $(o.selector).css(o.css);
        }
    }

    if (theSite.isRepeat) {
        //setInterval(doit, site.repeatInterval);
        setTimeout(function() {
            doit(theSite);
        }, theSite.repeatInterval);
    }

}

function main() {
    myLog.init('PageCleaner');

    findSite();

	log('MatchedSites.length=' + MatchedSites.length);

    for (var i = 0; i < MatchedSites.length; i++) {
        var site = MatchedSites[i];
        doit(site);
    }

}

main();
