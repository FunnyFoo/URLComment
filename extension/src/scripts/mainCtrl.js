var myapp = angular.module('myapp', []);

myapp.controller('mainCtrl', ['$scope', '$q', function($scope, $q){
  //server url
  var meteorServerURL = 'localhost:3000';

  $scope.comments = [];
  $scope.currentScopeURL = null;
  $scope.currentScopeTitle = null;
  $scope.inputComment = "";

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

  $scope.postComment = function(comment){
    if(comment !== ""){
      var post = ['anonymous', {'0': 0, '1': 0, '-1': 0}, comment, $scope.currentScopeURL, true];
      ddp.connect().then(function(){
        var postComment = ddp.call('postComment', post);
        $scope.inputComment = "";
        postComment.then(function(id) {
          console.log("insert complete: " + id);
        });
      });
    }
  };

  $scope.keepBottom = function(elem){
    $(elem).scrollTop($(elem).prop('scrollHeight'));
  };

  $scope.switchEvent = function(){
    $scope.keywordFilter = '';
    setTimeout(function() {
      $scope.keepBottom('.wrapper');
    });
  };

  //initial
  $scope.getCurrentURL().then(function(url){
    var a = document.createElement('a');
    a.href = url;
    $scope.currentScopeURL = a.origin;

    //ddp client subscribe data from meteor server
    ddp.connect().then(function() {
      var checkPost = ddp.call('checkPost', [{
        url: $scope.currentScopeURL,
        title: a.domain
      }]);

      checkPost.then(function (postId) {
        ddp.subscribe('comments', [postId]).fail(function (err) {
          console.log('Fail to subscribe data from meteor server.');
        });
        console.info('Connected!');
        ddp.watch('comments', function(changeDoc, message){
          // changeDoc.comment = changeDoc.comment.replace(/\n/g, '<br>');
          $scope.comments.push(changeDoc);
          $scope.$apply();
          $scope.keepBottom('.wrapper');
        });
      });
      // ddp.subscribe('myBookPosts', [$scope.currentScopeURL]).fail(function(err) {
      //   console.log('Fail to subscribe data from meteor server.');
      // });   
      // console.log('Connected!');
      // ddp.watch('myBookPosts', function(changeDoc, message){
      //   // changeDoc.comment = changeDoc.comment.replace(/\n/g, '<br>');
      //   $scope.comments.push(changeDoc);
      //   $scope.$apply();
      //   $scope.keepBottom('.wrapper');
      // });
    });
  });
}]);

//out of controller 
angular.element(document).ready(function(){
  var opts = {
    context: $('.write-command'), 
    animate: true, 
    cloneClass: 'faketextarea'
  };

  $('.write').autogrow(opts);

  $('#status').change( function(){
    if ( $(this).is(':checked') )  {
      $('.write').css('left', '-300px');
      $('.send').css('right', '-50px');
      $('.search').css('left', '10px');
      $('.search').focus();
    } else {
      $('.write').css('left', '10px');
      $('.search').css('left', '-300px');
      $('.write').focus();
      $('.send').css('right', '10px');
    }
  });
});