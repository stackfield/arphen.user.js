// ==UserScript==
// @name          CHT Resort
// @namespace     https://github.com/arphen/arphen.user.js
// @version       1.0.20151215
// @description   Booking the room
// @include       http://resort.cht.com.tw/*
// @copyright     2015+, Arphen Lin
// @author        Arphen Lin
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @grant         none
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);
var url = window.location.href;

function log(text){
    try{
        console.log('[CHT Resort] ' + text);
    }catch(err){
    }
}

function bookARoom(){
    var currentRoom = null;
    var currentPrice = 99999;
    $("input#mycheck").each(function(index){
        log(index);
        var s = $(this).attr("value");
        var data = s.split(",");
        var room = data[3];
        var price = parseInt(data[4], 10);
        log(s);
        log("price = " + price);
        var tr = $(this).parent().parent();
        if(room.search(/(雙|二|兩|2)(人).*(房)/)>=0 && room.search(/(雅房|靠電梯)/)<0){
            $(tr).css({backgroundColor: "#DF7401",
                       outline: "thin solid black"
                      }); // set back color
            if(price<currentPrice){
                currentPrice = price;
                currentRoom = this;
            }
        }else{
            $(tr).css({backgroundColor: "#6E6E6E",
                       outline: "thin solid black"
                      }); // set back color
        }
    });

    if(currentPrice<99999){
        $(currentRoom).prop( "checked", true);
        var tr = $(currentRoom).parent().parent();
        $(tr).css({backgroundColor: "#B40404"}); // set back color
    }
}

function selectAResort(resort){
    $("form a span").each(function(){
        var s = $(this).text();
        log(s);
        if(s.indexOf(resort)>=0){
            var a = $(this).parent();
            log($(a).attr("href"));
            $(a).click(); // not work
            window.location.href = "http://resort.cht.com.tw/use_reserve/" + $(a).attr("href");
            return false; // break .each() loop
        }
    });
}

function main(){
    log(url);

    if(url.indexOf("pre_mho_speed.php")>0){ // 會館清單 http://resort.cht.com.tw/use_reserve/pre_mho_speed.php?Flag=MTQ1MDE2NjQ5OQ==
        log("pre_mho_speed.php");
        var resort = "日月潭"; // 預設要自動進入的會館名稱, 例: "礁溪", "日月潭"
        if(resort !== ""){
            selectAResort(resort);
        }
    }else if(url.indexOf("pre_mho_speed_hotel.php")>0){  // 選會館房間 http://resort.cht.com.tw/use_reserve/pre_mho_speed_hotel.php?hotel=MDQtODA4MC0yNisxNDUwMTQ4OTE3
        log("pre_mho_speed_hotel.php");
        bookARoom();
    }else if(url.indexOf("pre_article_speed.php")>0){ // 同意書 http://resort.cht.com.tw/use_reserve/pre_article_speed.php
        log("pre_article_speed.php");
        $("#agreeEinvoice").prop( "checked", true);
        $("form#a_form p input").click();
    }
}

main();
