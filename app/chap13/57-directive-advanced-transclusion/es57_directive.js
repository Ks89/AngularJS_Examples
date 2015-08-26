angular.module('stockMarketApp')
    .directive('simpleStockRepeat', [function () {
        return {
            restrict: 'A',
            //capture and replace the entire element
            //instead of just its content
            //When we specify transclude to element, it notifies AngularJS to copy the entire element,
            //along with any directivies that might be present on it for transclusion.
            transclude: 'element',
            //A $transclude is passed in as the fifth
            //argument to the link function
            link: function ($scope, $element, $attrs, ctrl, $transclude) {
                var myArray = $scope.$eval($attrs.simpleStockRepeat);

                //because transclude element copies the entire element, it also removes the element rom the html. So we create
                //a container element within which to pull all our instances that we create.
                var container = angular.element('<div class="container"></div>');
                for (var i = 0; i < myArray.length; i++) {
                    //Create an element instance with a new child
                    //scope using the clone linking function
                    //this is considere a good practice to make sure no global states step on each other.
                    var instance = $transclude($scope.$new(),
                        function (clonedElement, newScope) {
                            //Expose custom variables for the instance
                            newScope.currentIndex = i;
                            newScope.stock = myArray[i];
                        });
                    //Add it to our container
                    container.append(instance);
                }

                //With transclude: 'element', the element gets replaced
                //with a comment. Add our generated content
                //after the comment
                $element.after(container);
            }
        };
    }]);