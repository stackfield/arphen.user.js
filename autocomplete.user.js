// ==UserScript==
// @name          Autocomplete
// @namespace     https://github.com/arphen/arphen.user.js/blob/master/autocomplete.user.js
// @version       1.0.20160529
// @description   As I wish
// @include       http*://*
// @exclude       -http://efms.hinet.net/FMS/
// @exclude       -http://efms.hinet.net/FMS/subsystem/Map/*
// @copyright     2016+, Arphen Lin
// @author        Arphen Lin
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js
// @require       https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.0/jquery-ui.min.js
// @require       https://rawgit.com/arphen/selectToAutocomplete/master/jquery.select-to-autocomplete.js
// @require       https://rawgit.com/arphen/arphen.user.js/master/libs/utility.js
// @require       https://rawgit.com/arphen/arphen.user.js/master/libs/waitForKeyElements.js
// @grant         GM_addStyle
// ==/UserScript==
this.$ = this.jQuery = jQuery.noConflict(true);

var url = window.location.href.toLowerCase();

function main() {
    myLog.init('Autocomplete');

    GM_addStyle('.ui-helper-reset,.ui-menu{list-style:none;padding:0;outline:0}.ui-helper-hidden{display:none}.ui-helper-hidden-accessible{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}.ui-helper-zfix,.ui-widget-overlay{width:100%;height:100%;left:0;top:0}.ui-helper-reset{margin:0;border:0;line-height:1.3;text-decoration:none;font-size:100%}.ui-helper-clearfix:after,.ui-helper-clearfix:before{content:"";display:table;border-collapse:collapse}.ui-helper-clearfix:after{clear:both}.ui-helper-clearfix{min-height:0}.ui-helper-zfix{position:absolute;opacity:0;filter:Alpha(Opacity=0)}.ui-front{z-index:100}.ui-state-disabled{cursor:default!important}.ui-icon{display:block;text-indent:-99999px;overflow:hidden;background-repeat:no-repeat}.ui-widget-overlay{position:fixed}.ui-autocomplete,.ui-menu .ui-menu{position:absolute}.ui-autocomplete{top:0;left:0;cursor:default}.ui-menu{margin:0;display:block}.ui-menu .ui-menu-item{position:relative;margin:0;padding:3px 1em 3px .4em;cursor:pointer;min-height:0;list-style-image:url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)}.ui-menu .ui-menu-divider{margin:5px 0;height:0;font-size:0;line-height:0;border-width:1px 0 0}.ui-menu-icons{position:relative}.ui-menu-icons .ui-menu-item{padding-left:2em}.ui-menu .ui-icon{position:absolute;top:0;bottom:0;left:.2em;margin:auto 0}.ui-menu .ui-menu-icon{left:auto;right:0}');
    GM_addStyle('.ui-autocomplete{padding:0;list-style:none;background-color:#fff;width:218px;border:1px solid #B0BECA;max-height:350px;overflow-x:hidden}.ui-autocomplete .ui-menu-item{border-top:1px solid #B0BECA;display:block;padding:4px 6px;color:#353D44;cursor:pointer}.ui-autocomplete .ui-menu-item:first-child{border-top:none}.ui-autocomplete .ui-menu-item.ui-state-focus{background-color:#D5E5F4;color:#161A1C}');

    //APLTOOL.addScriptCode(inpage_autocomplete + ' setTimeout(inpage_autocomplete, 5000);');
    waitForKeyElements("select:not([multiple])", function() {
        //debugger;
        $('select:not([multiple])').selectToAutocomplete();
    });
}

main();
