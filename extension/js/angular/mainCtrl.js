var myapp = angular.module('myapp', []);

myapp.controller('mainCtrl', ['$scope', '$q', function($scope, $q){
	//server url
	var meteorServerURL = 'cesar2535.meteor.com';

	$scope.comments = [];
	$scope.currentScopeURL = null;
	$scope.currentScopeTitle = null;
	//test url
	var ddp = new MeteorDdp('ws://' + meteorServerURL + '/websocket');

	$scope.getCurrentURL = function(){
		var deferred = $q.defer();
		chrome.tabs.query({
			active: true,
			lastFocusedWindow: true
		}, function (tabArray) {
			$scope.currentScopeTitle = tabArray[0].title;
			return deferred.resolve(tabArray[0].url);
		});
		return deferred.promise;
	};

	$scope.getCurrentURL().then(function(url){
		$scope.currentScopeURL = url;
	});	


	ddp.connect().then(function() {
		ddp.subscribe('myBookPosts', [$scope.currentScopeURL]).fail(function(err) {
		  console.log('Fail to subscribe data from meteor server.');
		});	  
	  console.log('Connected!');
	  ddp.watch('myBookPosts', function(changeDoc, message) {
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