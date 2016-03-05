/*******************************************************************
 * (c) Arphen Lin, arphenlin@gmail.com
 ********************************************************************/
/*******************************************************************
 * String extension
 *******************************************************************/
// format string:
// (Ex) 'Hello {0}!'.format('World');  --> return 'Hello World!'
String.prototype.apl_format = function(){
	var msg = this;
	var i, rx;
	for(i=0; i<arguments.length; i+=1){
		rx = new RegExp('\\{'+i+'\\}', 'g');
		msg = msg.replace(rx, arguments[i]);
	}
	return msg;
};

/*******************************************************************
 * Utility
 *******************************************************************/
var UTIL = {};

// return a hash string
UTIL.hash = function(len) {
	if(len===undefined){ len=20; }
	return Math.random().toString().substr(2, len);
};

// Clone object: (note) don't use this function, IE will be error!
// What is the most efficent way to clone a JavaScript object? - Stack Overflow
// http://stackoverflow.com/questions/122102/what-is-the-most-efficent-way-to-clone-a-javascript-object


/* Usage:
 *  myLog.init('TW116'); // before you use myLog, set the title of your script.
 *  myLog.log('hello world!'); // print any message you want, then it will display in chrome console.
 */
var myLog = {
	title: 'YOUR_SCRIPT',
	init: function(title) {
		myLog.title = title;
	},
	log: function(text) {
		try {
			var d = new Date();
			var n = d.toLocaleString();
			console.log(n + ' [' + myLog.title + '] ' + text);
		} catch (err) {}
	}
};


/* Note: 必須原始網站沒有限制CSP(Content Security Policy)才能允許引用其它domain之js
 * Usage:
 *  addScript('http://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.js');
 */
function addScript(url) {
	try{
		var scriptElement = document.createElement( "script" );
		scriptElement.type = "text/javascript";
		scriptElement.src = url;
		document.body.appendChild( scriptElement );
	}catch(err){ // unable to catch exception if blocked by CSP, but can see error in console
		alert('addScript failed: '+url + '\n' + err.message);
	}
}

/* Usage:
 *　if you have a function aFunction(a, b){ return true; }
 *  you can convert it to string and add to the page:
 *    var s = " " + aFunction; // convert to string
 *    addScriptCode(s);        // add to the page
 *
 *  you can also add a function variable
 *    addScriptCode(aFunction);
 */
function addScriptCode(code) {
	// inject my code in page
	var str = '';
	if(typeof code != 'string'){
		str = '' + code; // convert to string
	}else{
		str = code;
	}

	var script = document.createElement('script');
	script.appendChild(document.createTextNode(str));
	(document.body || document.head || document.documentElement).appendChild(script);
}


/* Usage:
 *  var v = getUrlParam('p1'); // (Ex) http://foo.bar/somepage?p1=abc&p2=def..., the value of v will be "abc"
 */
function getUrlParam(param) {
	var result = "",
		tmp = [];
	var items = location.search.substr(1).split("&");
	for (var index = 0; index < items.length; index++) {
		tmp = items[index].split("=");
		if (tmp[0] === param) result = decodeURIComponent(tmp[1]);
	}
	return result;
}
