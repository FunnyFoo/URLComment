(function () {
	var tabUrl = null;

	chrome.tabs.query({
		active: true,
		lastFocusedWindow: true
	}, function (tabArray) {
		tabUrl = tabArray[0].url;
		document.getElementById('currentLink').innerHTML = tabUrl;
	});

	// var ddp = new MeteorDdp("ws://localhost:3000/websocket");

	// ddp.connect().then(function() {
	//   ddp.subscribe('myBookPosts');

	//   ddp.watch('myBookPosts', function(changeDoc, message) {

	//   });
	// });
})();