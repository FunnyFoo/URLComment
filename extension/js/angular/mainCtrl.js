myapp.controller('mainCtrl', ['$scope', function($scope){
	$scope.comments = [];
	var tabUrl = null;

	chrome.tabs.query({
		active: true,
		lastFocusedWindow: true
	}, function (tabArray) {
		tabUrl = tabArray[0].url;
		document.getElementById('currentLink').innerHTML = tabUrl;
	});

	var ddp = new MeteorDdp("ws://cesar2535.meteor.com/websocket");

	ddp.connect().then(function() {
		ddp.subscribe('myBookPosts', [tabUrl]);
		console.log('Connected!');
		ddp.watch('myBookPosts', function(changeDoc, message) {
			$scope.comments.push(changeDoc);
			$scope.$apply();
		});
	});

	
}]);

$(document).ready(function(){
	var opts = {
		context: $('.write-command')
	, animate: true
	, cloneClass: 'faketextarea'
	};
	$('.write').autogrow(opts);
});