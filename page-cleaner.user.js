// ==UserScript==
// @name          Page Cleaner
// @namespace     https://github.com/arphen/arphen.user.js/blob/master/page-cleaner.user.js
// @version       3.8.20160709
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

function log(text){
	myLog.log(text);
}

var SiteDB = [
	{
		"name": "123kubo-play",
		"url": "www.123kubo.com/vod-play-",
		"url_regx": "",
		"css_remove": '.top, div:has(> ins), .playmar ~ *'
	},
	{
		"name": "123kubo",
		"url": "www.123kubo.com",
		"url_regx": "",
		"css_remove": ".likebox, #stad, div.datal.main"
	},
	{
		"name": "7-11",
		"url": "eservice.7-11.com.tw/E-Tracking/search.aspx",
		"url_regx": "",
		"css_remove": "table[height=647] > tbody > tr:first-child, td[height=19], td[width=256]",
		"css_free": [
			{
				"selector": 'form',
				"css": {
					"visibility": "hidden"
				}
			},
			{
				"selector": 'table[bgcolor="#A4A4A4"], table[bgcolor="#65CE8E"]',
				"css": {
					"position": "fixed",
					"left": "5px",
					"top": "5px",
					"visibility": "visible"
				}
			}
		]
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
		"name": "CHT Email",
		"url": "email.cht.com.tw",
		"url_regx": "",
		"css_remove": "div.dlgMask",
		"isRepeat": true,
		"repeatInterval": 3000,
		"css_free": [
			{
				"selector": "#divConvTopic",
				"css": {
					"font-weight": "bold"
				}
			}
		]
	},
	{
		"name": "Digitimes",
		"url": "digitimes.com.tw",
		"url_regx": "",
		"css_remove": '#sitemaptable, div.art_tabbed_nav, #ToolsBoxHorizontal, table[width="990"], table[width="987"], table[width="986"], #pagefloat_r, #relate_table, #footer'
	},
	{
		"name": "ESPN",
		"url": "espn.go.com/nba/",
		"url_regx": "",
		"css_newWin": ".sb-actions a.button-alt.sm",
		"css_remove": "#global-scoreboard, div.container, #global-nav, #global-header, #pane-main:before, header.game-strip",
		"css_free": [
			{
				"selector": "#pane-main",
				"css": {
					"padding-top": "0px"
				}
			},
			{
				"selector": "header.automated-header",
				"css": {
					"padding": "0px"
				}
			}
		],
		"isRepeat": true,
		"repeatInterval": 3000
	},
	{
		"name": "Eyny",
		"url": "eyny.com",
		"url_regx": "",
		"css_remove": 'div#hd + table[width], td.forumlist, div#pt, div#ft, div#pgt, div.hdc, div#f_pst, div.bm.bml.pbn, ul#thread_types, h2 a img, iframe, div.sitemajiad, table[height="240"], table.t_p_top'
	},
	{
		"name": "Facebook",
		"url": "-facebook.com",
		"url_regx": "",
		"css_remove": "div[data-ownerid]",
		"isRepeat": true,
		"repeatInterval": 10000
	},
	{
		"name": "HamiCloud",
		"url": "hamicloud.net",
		"url_regx": "",
		"css_remove": "div.blockOverlay, #show-upload-fun, #show-upload-list, #footer",
		"isRepeat": true,
		"repeatInterval": 1000
	},
	{
		"name": "PanSci",
		"url": "pansci.asia/archives/",
		"url_regx": "",
		"css_remove": "#banner_container, #header_container, #categories_container, #fixed_menu, div.links, div.sticky_left, div.wpbcap, div.wpbcap ~ *, footer, footer ~ *, div.container-fluid, div.copyright, div.about_author, div.comments_wrap"
	},
	{
		"name": "Pixnet",
		"url": ".pixnet.net/blog",
		"url_regx": "",
		"css_remove": "div#idle-pop",
		"isRepeat": true,
		"repeatInterval": 3000
	},
	{
		"name": "tabletennisdb",
		"url": "www.tabletennisdb.com",
		"url_regx": "",
		"css_newWin": "a"
	},
	{
		"name": "TechNews",
		"url": "technews.tw/20",
		"url_regx": "",
		"css_remove": "#masthead, #secondary, .socialcount, .sharefbline, .sharefbline ~ *, nav, nav ~ *, footer, #jj-prev-post, #jj-next-post"
	},
	{
		"name": "Teepr",
		"url": "www.teepr.com",
		"url_regx": "",
		"css_remove": ".main-header, .secondary-navigation, #top-navigation, .sidebar, #content_box header, .copyrights, .wf-formTpl, .wf-formTpl~*, .post~*, #popmake-overlay, div.popmake"
	},
	{
		"name": "TW116",
		"url": "www.tw116.com",
		"url_regx": "",
		"css_remove": "#logo, div.htop, div.tbpic, #center, #footer, #t365"
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
		"name": "UDN",
		"url": "udn.com/",
		"url_regx": "",
		"css_remove": '#header_head, #header_body_wrapper, #story_bar, #footer, #sidebar, #story ~ *, #story_foot ~ *, #story_body_content ~ *, #channel ~ *, #show_box, div[id^="ad_"], #channel, #scoreboard-container, #app, #wimbledonudn, #wimbledon-frame',
		"css_free": [
			{
				"selector": "#header",
				"css": {
					"height": "25px"
				}
			}
		],
		"isRepeat": true,
		"repeatInterval": 3000
	},
	{
		"name": "電腦王阿達",
		"url": "www.kocpc.com.tw/archives/",
		"url_regx": "",
		"css_remove": "#header, #sidebar, .breadcrumb, .w2bslikebox, #share_button, #jp-relatedposts, #jp-relatedposts ~ *, article footer, #comments, #footer"
	},
	{
		"name": "良醫健康網",
		"url": "health.businessweekly.com.tw/AArticle.aspx",
		"url_regx": "",
		"css_remove": "#fixed_header, #header, #footer, #statustop, #aside, .container, .articleinfo, .articlecontent ~ *"
	},
	{
		"name": "露天拍賣",
		"url": "ruten.com.tw",
		"url_regx": "",
		"css_remove": "#bestgoods_div, div.rt-store-ad",
		"css_newWin": "a"
	},
	{
		"name": "卡提諾論壇",
		"url": "ck101.com",
		"url_regx": "",
		"css_remove": '#header, .footer, .side, .flt_r_i, .sideToolBar, .tagBox, .tagBox ~ *, div[id^="post_"] ~ *, div.gamePopWp, div.gamePopBg, div.a_t',
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
	//if(MatchedSite.css_remove !== null){
	if(typeof MatchedSite.css_remove !== 'undefined'){
		$(MatchedSite.css_remove).remove();
	}

	// open link in new window
	//if(MatchedSite.css_newWin !== null){
	if(typeof MatchedSite.css_newWin !== 'undefined'){
		$(MatchedSite.css_newWin).each(function( index ) {
			$(this).attr("target", "_blank");
		});
	}

	// apply free format css
	//if(MatchedSite.css_free !== null && MatchedSite.css_free.length > 0){
	if(typeof MatchedSite.css_free !== 'undefined' && MatchedSite.css_free.length > 0){
		for(var i=0; i<MatchedSite.css_free.length; i++){
			var o = MatchedSite.css_free[i];
			$(o.selector).css(o.css);
		}
	}

}

function main(){
	myLog.init('PageCleaner');

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
