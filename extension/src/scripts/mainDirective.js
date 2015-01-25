//keyboard events
myapp.directive('ngEnter', function () {
  return {
    restrict: 'A',
    link: function (scope, elem, attrs, ctrl) {
      elem.bind('keydown', function(event) {
        var code = event.keyCode || event.which;
        if (code === 13) {
          if (!event.shiftKey) {
            event.preventDefault();
            scope.$apply(attrs.ngEnter);
          }
        }
      });
    }
  };
});
