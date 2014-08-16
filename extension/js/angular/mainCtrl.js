var myapp = angular.module('myapp', []);

myapp.controller('mainCtrl', ['$scope', '$q', function($scope, $q){
	//server url
	var meteorServerURL = 'cesar2535.meteor.com';

	$scope.comments = [];
	$scope.currentScopeURL = null;
	$scope.inputComment = "";
	//test url
	var ddp = new MeteorDdp('ws://' + meteorServerURL + '/websocket');

	$scope.getCurrentURL = function(){
		var deferred = $q.defer();
		chrome.tabs.query({
			active: true,
			lastFocusedWindow: true
		}, function (tabArray) {
			return deferred.resolve(tabArray[0].url);
		});
		return deferred.promise;
	};

	$scope.postComment = function(comment){
		var post = ['anonymous', {'0': 0, '1': 0, '-1': 0}, comment, $scope.currentScopeURL, true];
		ddp.connect().then(function(){
			var postComment = ddp.call('postComment', post);
			$scope.inputComment = "";
		  postComment.then(function(id) {
		    console.log("insert complete: " + id);
		  });
		});
	};

	//initial

	$scope.getCurrentURL().then(function(url){
		$scope.currentScopeURL = url;
	});	


//ddp client subscribe data from meteor server
	ddp.connect().then(function() {
		ddp.subscribe('myBookPosts', [$scope.currentScopeURL]).fail(function(err) {
		  console.log('Fail to subscribe data from meteor server.');
		});	  
	  console.log('Connected!');
	  ddp.watch('myBookPosts', function(changeDoc, message){
	  	// changeDoc.comment = changeDoc.comment.replace(/\n/g, '<br>');
	  	$scope.comments.push(changeDoc);
	  	$scope.$apply();
	  });
	});
}]);

//out of controller 
$(document).ready(function(){
	var opts = {
  	context: $('.write-command')
  , animate: true
  , cloneClass: 'faketextarea'
	};
	$('.write').autogrow(opts);
});