/*******************************************************************
 * (c) Arphen Lin, arphenlin@gmail.com
 ********************************************************************/
/*******************************************************************
 * String extension
 *******************************************************************/
// format string:
// (Ex) 'Hello {0}, {1}!'.format('World', 'arphen');  --> return 'Hello World, arphen!'
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
var APLTOOL = {};

// return a hash string
APLTOOL.hash = function(len) {
	if(len===undefined){ len=20; }
	return Math.random().toString().substr(2, len);
};

// Clone object: (note) don't use this function, IE will be error!
// What is the most efficent way to clone a JavaScript object? - Stack Overflow
// http://stackoverflow.com/questions/122102/what-is-the-most-efficent-way-to-clone-a-javascript-object

/* Note: 必須原始網站沒有限制CSP(Content Security Policy)才能允許引用其它domain之js
 * Usage:
 *  addScript('http://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.js');
 */
APLTOOL.addScript = function(url) {
	try{
		var scriptElement = document.createElement( "script" );
		scriptElement.type = "text/javascript";
		scriptElement.src = url;
		document.body.appendChild( scriptElement );
	}catch(err){ // unable to catch exception if blocked by CSP, but can see error in console
		alert('addScript failed: '+url + '\n' + err.message);
	}
};


/* Usage:
 * loadFile("myscript.js", "js")    //dynamically load and add this .js file
 * loadFile("javascript.php", "js") //dynamically load "javascript.php" as a JavaScript file
 * loadFile("mystyle.css", "css")   //dynamically load and add this .css file
 */
APLTOOL.loadFile = function(filename, filetype){
    if (filetype==="js"){ //if filename is a external JavaScript file
        var fileref=document.createElement('script');
        fileref.setAttribute("type","text/javascript");
        fileref.setAttribute("src", filename);
    }
    else if (filetype==="css"){ //if filename is an external CSS file
        var fileref=document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", filename);
    }
    if (typeof fileref !== "undefined"){
        document.getElementsByTagName("head")[0].appendChild(fileref);
    }
};


/* Usage:
 *　if you have a function aFunction(a, b){ return true; }
 *  you can convert it to string and add to the page:
 *    var s = " " + aFunction; // convert to string
 *    addScriptCode(s);        // add to the page
 *
 *  you can also add a function variable
 *    addScriptCode(aFunction);
 */
APLTOOL.addScriptCode = function(code) {
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
};


/* Usage:
 *  var v = getUrlParam('p1'); // (Ex) http://foo.bar/somepage?p1=abc&p2=def..., the value of v will be "abc"
 */
APLTOOL.getUrlParam = function(param) {
	var result = "",
		tmp = [];
	var items = location.search.substr(1).split("&");
	for (var index = 0; index < items.length; index++) {
		tmp = items[index].split("=");
		if (tmp[0] === param) result = decodeURIComponent(tmp[1]);
	}
	return result;
};

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
