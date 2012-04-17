var videosArr = [];

chrome.webRequest.onHeadersReceived.addListener(
  function(d) {
  	var found = false, length = 0, type = '', videoRegx = /video|flv|asf|asx|wmv|wma|wmx|ram|rmvb|ogg|mkv|ogm|3gp|mp4|mpg|mpe|mpeg|m1s|mpa|mp2|m2a|m2v|m2s|avi|mov|quicktime/gi;
  	if(d.responseHeaders && typeof d.responseHeaders === 'object') {
	    for(var i in d.responseHeaders) {
	    	var r = d.responseHeaders[i];
	    	if(r.name.toLowerCase() === 'content-type' && videoRegx.test(r.value)) {
	    		found = true;
					type = r.value;
	    	} else if(r.name.toLowerCase() === 'content-length') {
					length = r.value;
	    	}
	    }
  	}
		if(found && ~~length > 0) {
			videosArr.unshift({tabId: d.tabId, url: d.url, type: type, length: length});
			videosArr = videosArr.slice(0,100);
		}
  },
  
  {
    urls: [],
    types: []
  },
  
  ['responseHeaders']
);


chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
  	var tmpArr = [];
    for(var i in videosArr) {
    	if(videosArr[i].tabId === request) {
				tmpArr.push(videosArr[i]);
    	}
    }
    sendResponse(tmpArr);
  }
); 