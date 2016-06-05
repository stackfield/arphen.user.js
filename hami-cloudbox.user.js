// ==UserScript==
// @name          Hami Cloudbox
// @namespace     https://github.com/arphen/arphen.user.js/blob/master/hami-cloudbox.user.js
// @version       2.0.20160605
// @description   As I wish
// @include       http://sync.hamicloud.net/*
// @copyright     2015+, Arphen Lin
// @author        Arphen Lin
// @require       http://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.js
// @require       https://rawgit.com/arphen/arphen.user.js/master/libs/utility.js
// @grant         GM_setValue
// @grant         GM_getValue
// ==/UserScript==
this.$ = this.jQuery = jQuery.noConflict(true);

var gTotalRows = 0;
var gDirTree = {};

function fullyDelete() {
    // 自動勾選已刪除檔案
    var dels = $('tr.back-row-deleted input.cbox');
    if (dels.length > 0) {
        $(dels[0]).click();
        $(dels).prop("checked", true);

        if ($('li#list-func-batch-delete-fully').is(':visible')) {
            myLog.log('徹底刪除{0}個檔案'.apl_format(dels.length));
            $('li#list-func-batch-delete-fully a')[0].click(); // 加上[0]是關鍵!
            // 因出現alert會中斷程式, 必須再按一次目錄才會繼續
        }
    }
}

function markDirDone() {
    var dir = $('p#back-current-dir').text();
    gDirTree[dir] = 1;
    GM_setValue('cloudboxDirTree', JSON.stringify(gDirTree)); // 把json轉為字串存在GM內
}

function backToParent() {
    $('tr#obj_row_fake_folder td.back-row-name a')[0].click();
}

function scanAll() {
    // step 1. 捲到底部
    var rows = $('table#file-list tr');
    if (rows.length > gTotalRows) { // 檢查列數是否增加
        gTotalRows = rows.length;
        $("html, body").animate({
            scrollTop: $(document).height() - $(window).height()
        });
        setTimeout(scanAll, 500);
        return;
    }
    myLog.log('已捲到底了');

    // step 2. 檢查有無已刪檔案, 徹底刪除
    var trs = $('tr.back-row-deleted');
    if (trs.length > 0) {
        myLog.log('發現{0}個已刪除檔案'.apl_format(trs.length));
        fullyDelete();
        scalAll(); // 重新掃瞄
    }
    myLog.log('此目錄已無待刪檔案');

    // step 3. 目前位置已無待刪檔案, 進入子目錄
    trs = $('tr.back-row-dir');
    if (trs.length > 0) {
        // 進入還沒掃過的子目錄
        var dir = $('p#back-current-dir').text();
        //debugger;
        for (var i = 0; i < trs.length; i++) {
            var path = '{0} / {1}'.apl_format(dir, $(trs[i]).find('td.back-row-name a').text());
            //debugger;
            if (gDirTree[path] !== 1) {
                myLog.log('進入子目錄: ' + path);
                //debugger;
                $(trs[i]).find('td.back-row-name a')[0].click();
                return;
            }
        }
		myLog.log('此目錄已掃完');
        // 標記為1
        markDirDone();
        // 回上一層目錄
        backToParent();
    } else {
        myLog.log('已無子目錄');
        // 標記為1
        markDirDone();
        // 回上一層目錄
        backToParent();
    }

}

function scanNewDir(dir) {
    gDirTree[dir] = 0; // 不能用 gDirTree = {dir: 1}; key會變成"dir"而不是dir的內容
    GM_setValue('cloudboxDirTree', JSON.stringify(gDirTree)); // 把json轉為字串存在GM內
    //json = GM_getValue('cloudboxDirTree', '{}');
    //jsonObj = JSON.parse(json);
    //debugger;
    scanAll();
}

function main() {
    // use myLog
    myLog.init('Hami Cloudbox');

    var dir = $('p#back-current-dir').text();
    myLog.log(dir);
	var r;
    if (dir === '我的雲櫃') {
        r = confirm("是否RESET所有掃瞄目錄?");
        if (r === true) {
            GM_setValue('cloudboxDirTree', '{}');
        }
    }
    var json = GM_getValue('cloudboxDirTree', '{}');
    gDirTree = JSON.parse(json);
    myLog.log(json);
    if (json === '{}') {
        r = confirm("是否由此目錄開始掃瞄?");
        if (r === true) {
            scanNewDir(dir);
        }
    } else {
        var v = gDirTree[dir];
        if (v === undefined) { // 新目錄
            scanNewDir(dir);
        } else {
            //debugger;
            if (v === 0) {
                scanAll();
            } else {
                myLog.log('此目錄已掃過了');
            }
        }
    }

}

main();
