(function () {
	var tabUrl = null;

	chrome.tabs.query({
		active: true,
		lastFocusedWindow: true
	}, function (tabArray) {
		tabUrl = tabArray[0].url;
		document.getElementById('currentLink').innerHTML = tabUrl;
	});
})();

$(document).ready(function(){
	var opts = {
  	context: $('.write-command')
  , animate: true
  , cloneClass: 'faketextarea'
	};
	$('.write').autogrow(opts);
});