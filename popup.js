setTimeout(function() {
	document.body.innerHTML = "Loading";

	chrome.tabs.getSelected(null, function(tab) {
    chrome.extension.sendRequest(chrome.i18n.getMessage('@@extension_id'), tab.id, function(response) {
    	var t = '<nobr>Start(Play) the video to see the URL of the video stream.</nobr><br><br><table border=1><tr><td>N</td><td>Type</td><td>Size</td><td>Link</td></tr>';
    	for(var i in response) {
    		var o = response[i];
				t += '<tr><td>'+(~~(i)+1)+'</td><td>'+o.type+'</td><td>'+(~~(~~(o.length)/1048576))+' MB</td><td><a target=_blank title="'+o.url+'" href="'+o.url+'">Link</a></td></td></tr>';
    	}
    	if(response.length === 0) {
				t += '<td colspan=4>Nothing found</td>';
    	}
    	t += '</table>';
    	$(document.body).html(t).find('a').click(function(e) {
			  e.preventDefault();
   		chrome.tabs.update(tab.id, {url: 'about:blank', active: true});
    		chrome.tabs.update(tab.id, {url: $(this).attr('href'), active: true});
			});
    });
  });
  
}, 500);
