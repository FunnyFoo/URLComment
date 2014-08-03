(function() {
//    var ddp = new MeteorDdp("ws://localhost:3000/websocket");
//    
//    ddp.connect().then(function() {
//        ddp.subscribe('myBookPosts');
//    });
    
    chrome.tabs.query({ 
        active: true,
        lastFocusedWindow: true
    }, function(tabArray) {
        document.getElementById('currentLink').innerHTML = tabArray[0].url;
    });
})();