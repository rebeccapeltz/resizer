var app = angular.module('myApp', []);

app.controller('MainCtrl', function($scope) {
  $scope.content = 'Hello World';
});

app.directive('myDirective',['$window', '$document', function ($window, $document) {
  return {
    restrict:'E',
    scope: {
      direction: '@',
      height: '@',
      top: '@',
      bottom: '@',
      width: '@',
      left: '@',
      max:'@'
    },
    link: function(scope, element, attrs) {
        element.on('mousedown', function(event) {
			event.preventDefault();

			$document.on('mousemove', mousemove);
			$document.on('mouseup', mouseup);
		});

		function mousemove(event) {

			if (attrs.direction == 'vertical') {
				// Handle vertical resizer
				var x = event.pageX;

				if (attrs.max && x > attrs.max) {
					x = parseInt(attrs.max);
				}

				// element.css({
				// 	left: x + 'px'
				// });
                element.css('left', x+'px');

				angular.element(document.querySelector(attrs.left)).css('width', x + 'px');

				angular.element(document.querySelector(attrs.right)).css('left',(x + parseInt(attrs.width)) + 'px');
				

			} else {
				// Handle horizontal resizer
				var y = $window.innerHeight - event.pageY;

				element.css('bottom', y + 'px');

				angular.element(document.querySelector(attrs.top)).css('bottom', (y + parseInt(attrs.height)) + 'px');
				angular.element(document.querySelector(attrs.bottom)).css('height', y + 'px');
			}
		}

		function mouseup() {
			$document.unbind('mousemove', mousemove);
			$document.unbind('mouseup', mouseup);
		}
      
    //   var inputField = element.find('input');
    //   var name = element.children('#test-name');
    //    scope.width = inputField[0].offsetWidth; 
       
    //    scope.width = inputField[0].offsetWidth /3; // To test 
       
    //   angular.element(name).css('background-color', 'orange');
    //   angular.element(name).css('width', (scope.width + 'px'));
     
      
     
    }
  };
}]);
