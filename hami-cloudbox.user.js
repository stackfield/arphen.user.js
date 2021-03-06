// ==UserScript==
// @name          Hami Cloudbox
// @namespace     https://github.com/arphen/arphen.user.js/blob/master/hami-cloudbox.user.js
// @version       3.3.20160702
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
var gWaitingTime = 0; // sec

function untilfullDeleteDone(){
	if($('div.blockUI.blockMsg.blockPage').is(':visible')){
		if(gWaitingTime >= 60){
			myLog.log("徹底刪除已等太久了，可再手動按一次刪除。")
			// 等太久了, 自動reload => todo: hicloud刪得比較慢, 重新reload可能會重複刪造成hicloud錯亂
			//window.location.reload();
		}else{
			gWaitingTime += 5; // sec
			setTimeout(untilfullDeleteDone, 5000);
		}
	}else{
		gWaitingTime = 0;
		scanAll();
	}
}

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
			// todo: 詢問是否徹底刪除時, 按"取消"也不會停止
			gWaitingTime = 0;
			untilfullDeleteDone();
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
    var dir = $('p#back-current-dir').text();
    trs = $('tr.back-row-dir');
    if (trs.length > 0) {
        // 進入還沒掃過的子目錄
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
        myLog.log('子目錄已掃完');
    } else {
        myLog.log('無子目錄');
    }

    // 標記為1
    markDirDone();

    // 判斷是否結束
    var root = GM_getValue('cloudboxRootDir', '');
    if (dir === root) { // 已經掃完此目錄及所有子目錄
        // reset all
        resetGMVars();
        alert('此目錄為本次掃瞄根目錄，已全部掃完。');
        return;
    } else {
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

function resetGMVars() {
    GM_setValue('cloudboxDirTree', '{}');
    GM_setValue('cloudboxRootDir', '');
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
            resetGMVars();
        }
    }
    var json = GM_getValue('cloudboxDirTree', '{}');
    gDirTree = JSON.parse(json);
    myLog.log(json);
    if (json === '{}') {
        r = confirm("是否由此目錄開始掃瞄?");
        if (r === true) {
            GM_setValue('cloudboxRootDir', dir);
            scanNewDir(dir);
        }
    } else {
        var v = gDirTree[dir];
        if (v === undefined) { // 新目錄
            scanNewDir(dir);
        } else {
            //debugger;
            switch (v) {
                case 0:
                    scanAll();
                    break;
                case 1:
                    myLog.log('此目錄已掃過了');
                    backToParent(); // 回上一層目錄
                    break;
                default:
                    myLog.log('無效的v值');
                    break;
            }
        }
    }

}

main();
