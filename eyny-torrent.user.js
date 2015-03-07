// ==UserScript==
// @name          Eyny Torrent Link
// @namespace     https://arphen.github.io/
// @version       0.1.20150307
// @description   Move torrent link to top, auto close window after downloading torrent.
// @include       http://*.eyny.com/forum.php*
// @copyright     2015+, Arphen Lin
// @author     Arphen Lin
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @grant         none
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

function createContainer(){
    $('body').append('<div id="torrent">BT: </div>');
    $('#torrent').css({
        position: "fixed", top: "0px", right: "0px", 
        backgroundColor: "yellow", 
        border: "2px solid red",
        fontSize: "20px"});    
}

function moveTop(ele){
    if($('#torrent').length<=0){
        createContainer();
    }
    $('#torrent').append(ele);
}

$('a[href*="attachment"]').each(function(){
    var s = $(this).text();
    if(s.search(/torrent/)>=0){
        //alert(s);
        moveTop(this);
        $(this).click(function(){
            //if (confirm("Close Window?")) { close(); }
            close();
        });
    }
});
