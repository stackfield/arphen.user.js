// ==UserScript==
// @name          Page Cleaner
// @homepage      https://github.com/arphen/arphen.user.js/blob/master/page_cleaner.user.js
// @namespace     https://github.com/arphen/arphen.user.js/blob/master/page_cleaner.user.js
// @version       2.0.20160201
// @description   get a clean page
// @include       http*://*
// @copyright     2015+, Arphen Lin
// @author        Arphen Lin
// @require       http://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js
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
		"name": "artFido",
		"url": "www.artfido.com/blog/",
		"url_regx": "",
		"css_remove": "#header, .top-ad-holder, #sidebar, .post-pagination ~ *, iframe, .addthis_toolbox, img[alt~=ArtFido]",
		"isRepeat": true,
		"repeatInterval": 3000
	},
	{
		"name": "ESPN",
		"url": "espn.go.com/nba/scoreboard",
		"url_regx": "",
		"css_remove": "#global-scoreboard, div.container, #global-nav",
		"css_free": [
			{
				"selector": "#pane-main",
				"css": {
					"padding-top": "50px"
				}
			}
		]
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
		"css_remove": '#header_head, #header_body_wrapper, #story_bar, #footer, #sidebar, #story ~ *, #story_foot ~ *, #story_body_content ~ *, #channel ~ *, #show_box, div[id^="ad_"]',
		"css_free": [
			{
				"selector": "#header",
				"css": {
					"height": "25px"
				}
			}
		]
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
		"css_remove": '#header, .footer, .side, .flt_r_i, .sideToolBar, .tagBox, .tagBox ~ *, div[id^="post_"] ~ *'
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
