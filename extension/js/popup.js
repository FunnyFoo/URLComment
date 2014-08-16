$(document).ready(function(){
	var opts = {
  	context: $('.write-command')
  , animate: true
  , cloneClass: 'faketextarea'
	};
	$('.write').autogrow(opts);
});