// ==UserScript==
// @name          SelectFilter
// @namespace     https://github.com/arphen/arphen.user.js/blob/master/selectfilter.user.js
// @version       0.1.20150320
// @description   Add keyword filtering function
// @include       http*
// @copyright     2015+, Arphen Lin
// @author     Arphen Lin
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require      https://code.jquery.com/ui/1.8.16/jquery-ui.min.js
// @require       http://arphen.github.io/user_script_libs/utility.js?aaa=afasdfasf
// @grant         none
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

var url = window.location.href;
/* Content Script
 * Author: Arphen Lin
 * (Note) 
   1. The localStorage is not accessible in Content Scripts. We must access localStorage through background.html with chrome.extension.sendRequest(). Refer to restoreOptions().
   2. In Chrome Extension's sandbox model, Web page's JavaScript functions/variables are not accessible in Content Scripts.
 * (Ref) http://code.google.com/chrome/extensions/content_scripts.html
   Content script cannot:
   1. Use chrome.* APIs (except for parts of chrome.extension)
   2. Use variables or functions defined by their extension's pages
   3. Use variables or functions defined by web pages or by other content scripts
*/

var DEBUG = true;                 // print info to console
var MIN_OPTION_ITEMS = 15;      // The localStorage is not accessible in Content Scripts.

var LEN_OPTION_TEXT = 5;
var AC_INPUT_WIDTH = 200;
var gSelectedId = '';

function debug(msg){
	if(DEBUG){
		console.log(msg);
	}
}

function restoreOptions(){
	debugger;
	chrome.extension.sendRequest({name: "getOptions"}, function(response){
		try{
			var n = parseInt(response.MIN_OPTION_ITEMS, 10);
			if(!isNaN(n) && n>0){
				MIN_OPTION_ITEMS = n;
			}
		}catch(ex){
			debug(ex);
		}
	});
}

// set the <select> with class="isComplex" if it has many <option>s inside it
function checkComplexSelects(){
	debugger;
	$.each($('select').not('.isChecked'), function(i, sel){
		$('#divAutoComplete').hide();
		$(sel).addClass('isChecked');
		var opts = $('option', sel);
		if(opts.length >= MIN_OPTION_ITEMS){
			var isLongText = false, j;
			for(j=0; j<opts.length; j++){
				if($(opts[j]).html().length > LEN_OPTION_TEXT){
					isLongText = true;
					break;
				}
			}
			if(isLongText){
				$(sel).addClass('isComplex');
				$(sel).attr('title', 'Click to open the autocomplete input box');
			}
		}
	});
}

function createAutocompleteBox(){
	debugger;
	var div = $('#divAutoComplete').get(0);
	if(div){
		return div;
	}else{
		// create autocomplete input box
		var divId = 'divAutoComplete';
		var txtId = 'txtAutoComplete';
		var template =
			'<div id="{0}">'.format(divId)+
			'Input keyword:<br>'+
			'<div class="divClose">(x)</div>'+
			'<input id="{0}">'.format(txtId)+
			'</div>';
		$('body').append(template);
		$('#{0}'.format(divId)).draggable();
		$('.divClose').click(function(){
			$(this.parentNode).hide();
		});
		return $('#divAutoComplete').get(0);
	}
}

function filterSelectOptions(sel, index){
	debugger;
	$('select').removeClass('selected');
	$(sel).addClass('selected');
	$('option', sel).removeClass('hidden hilite').show().removeAttr('selected');  // recovery all <option>s

	debug('index={0}'.format(index));

	// mark matched option with 'selected' attribute, 
	$.each($('option', sel), function(i, opt){
		if(i === index){
			//$(opt).removeClass('hidden').show().attr('selected', 'selected');
			$(opt).addClass('hilite').attr('selected', 'selected');
		}else{
			if(i>=10){   // leave 3 old items
				//$(opt).addClass('hidden').hide().removeAttr('selected');
				$(opt).addClass('hidden').hide();
			}
		}
	});

	if(!$(sel).attr('multiple')){ // single <select>
		var opt = $('option.fakeOption', sel).get(0);
		if(!opt){
			// insert an <option>: ===Please Select===
			sel.innerHTML = '<option class="fakeOption" value="none" disabled="disabled">== Your selection is highlighted ==</option>' + sel.innerHTML;
		}

		//$(sel).attr('size', '3');     // not working => will turn single <select> into multiple <select>
		sel.selectedIndex = 0;  // point to the fakeOption => let user click <select> to trigger __doPostBack()
		$(sel).attr('title', 'If you cannot see the highlighted item, scroll down to find it.');
		$(sel).click();
	}
}


function showAutocomplete(sel){
	debugger;
	
	var div = createAutocompleteBox();

	var x = $(sel).offset().left;
	var y = $(sel).offset().top;
	var w = $(sel).width();
	var h = $(sel).height();
	$(div).show().offset({left: x+w, top: y+h});

	// remove fake option at first
	//$('option.fakeOption', sel).remove();

	// prevent creating autocomplete repeatedly
	var selectedId = $(sel).attr('selectedId');
	if(selectedId === gSelectedId){ return; }

	// assign a new hash
	gSelectedId = UTIL.hash();
	$(sel).attr('selectedId', gSelectedId);

	// make input box autocompletable
	var items = [];
	$.each($('option', sel), function(i, opt){
		if(!$(opt).hasClass('fakeOption')){
			items.push($(opt).html());
		}
	});

	$('#txtAutoComplete').val('')
		.autocomplete('destroy')
		.autocomplete({
		source: items,
		select: function(event, ui) {
			var selected = ui.item.value;
			debug(selected);
			// find which item is selected
			var index = -1, i;
			for(i=0; i<items.length; i++){
				if(items[i] == selected){
					index = i;
					break;
				}
			}
			// let <select> show the item
			if(index>=0){
				index += $('option.fakeOption', sel).length;
				try{    // following will cause error: Uncaught ReferenceError: __doPostBack is not defined
					sel.selectedIndex = index;
					$(sel).change();    // trigger onchange event => not work on AJAX.NET's update panel
					// => cannot access web page's funciton: __doPostBack()
					__doPostBack(sel.id, ''); // cannot access web page's funciton: __doPostBack()
				}catch(ex){
					debug(ex);
				}
				filterSelectOptions(sel, index);
				/*
                postToBackground({
                    message: 'msgChangeSelect',
                    index: index
                });
    */
			}
		}
	});
}

// post msg to background page
function postToBackground(msg){
	debugger;
	chrome.extension.connect().postMessage(msg);
}


function main(){
	myLog.init('SelectFilter');

	debugger;
	
	myLog.log('hello {0}'.format('hahaha'));

	debug('Select Filter - start');
	//restoreOptions();

	//debug(__doPostBack);    // content script cannot access web page's function/variable

	// Ajax.net update panel will re-create <select>, so we should check continuously
	//setInterval(checkComplexSelects, 3000);
	checkComplexSelects();

	// As above, if new <select> is found, bind it with autocomplete feature
	/*
$('select.isComplex').livequery(function() {
	$(this).bind('focus', function(){
		debug(this);
		showAutocomplete(this);
	});
});
*/

	// .live(): alternative implementation to .livequery()
	//$('select.isComplex').live('focus', function() {
	$('select.isComplex').on('focus', function() {
		debug(this);
		debugger;
		showAutocomplete(this);
	});

}

main();
