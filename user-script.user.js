// ==UserScript==
// @name        Reddit Title
// @include     http*
// @grant       none
// ==/UserScript==

if(location.href.indexOf("reddit.com") > -1){
	var titles = document.querySelectorAll("#siteTable a.title");
	for(var t in titles){
		 if(typeof(titles[t]) == "object"){
			var title = titles[t];
			var titleHref = title["href"];

			var queryStringDelim = titleHref.indexOf("?") > -1 ? "&" : "?";
			var queryStringTitle = queryStringDelim + "redditTitle=" + encodeURI(title.text);
			title["href"] += queryStringTitle;

			var thumbNail = title.parentNode.parentNode.parentNode.getElementsByClassName("thumbnail");
			if(thumbNail.length){
				thumbNail[0]["href"] += queryStringTitle;
			}	
		}
	}
}else if(location.href.indexOf("redditTitle=") > -1){
	var docHref = location.href;
	
	var title = decodeURI(docHref.substr(docHref.indexOf("redditTitle=") + 12, docHref.length - (docHref.indexOf("redditTitle=") + 12)));

	//
	// attempt to decode URL again until it doesn't contain "%20", or is decoded 16 times.
	//
	var i = 0;
	while(title.indexOf("%20") != -1 || i++ < 16){
		title = decodeURI(title);
	}

	var originalTitle = "";

	// add a "//" to the start of the next line to turn off appending the original title to the Reddit title.
	originalTitle = document.title;

	document.title = title + (originalTitle != "" ? " - " + originalTitle : "");
}

