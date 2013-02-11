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
	
	document.title = decodeURI(docHref.substr(docHref.indexOf("redditTitle=") + 12, docHref.length - (docHref.indexOf("redditTitle=") + 12)));
}

