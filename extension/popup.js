(function() {
    chrome.tabs.query({ 
        active: true,
        lastFocusedWindow: true
    }, function(tabArray) {
        document.getElementById('currentLink').innerHTML = tabArray[0].url;
    });
})();

