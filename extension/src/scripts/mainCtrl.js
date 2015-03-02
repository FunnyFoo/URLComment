var myapp = angular.module('myapp', []);

myapp.controller('mainCtrl', ['$scope', '$q', function($scope, $q){
  //server url
  var meteorServerURL = 'urlegendary.meteor.com';

  $scope.comments = [];
  $scope.currentScopeURL = null;
  $scope.currentScopeTitle = null;
  $scope.inputComment = "";

  //test url
  var asteroid = new Asteroid(meteorServerURL);
  var currentPostId = undefined;

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
      var commentAttributes = {
        postId: currentPostId,
        body: comment
      };
      var postComment = asteroid.call('commentByAnonymous', commentAttributes);
      postComment.result.then(function (commentId) {
        console.log(commentId);
        $scope.inputComment = "";
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

  // $scope.loginWith = {
  //   facebook: function () {
  //     console.log('facebook');
  //     asteroid.loginWithFacebook()
  //     .then(function (successRes) {
  //       console.log(successRes);
  //     });
  //   }
  // };

  //initial
  $scope.getCurrentURL().then(function(url){
    var a = document.createElement('a');
    a.href = url;
    $scope.currentScopeURL = a.origin;

    var post = {
      url: $scope.currentScopeURL,
      title: a.hostname
    };
    console.log(post);
    var checkPost = asteroid.call('checkPost', post);
    console.log(checkPost);

    checkPost.result.then(function (postId) {
      console.info('result');
      console.log(postId);
      asteroid.subscribe('comments', postId);
      currentPostId = postId;
      var comments = asteroid.getCollection('comments');
      var commentsOnPost = comments.reactiveQuery({});
      console.log(comments);
      console.log(commentsOnPost);

      commentsOnPost.on('change', function () {
        $scope.comments = commentsOnPost.result;
        $scope.$apply();
        $scope.keepBottom('.wrapper');
        console.log($scope.comments);
      });
    });

    checkPost.updated.then(function (res) {
      console.info('updated');
      console.log(res);
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