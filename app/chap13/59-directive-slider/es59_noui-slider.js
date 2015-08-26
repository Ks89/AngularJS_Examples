angular.module('sliderApp')
    .directive('noUiSlider', [function () {
        return {
            restrict: 'E',

            //requires that the ngModel directive be used on the same element
            //as the noUiSlider directive that we're creating
            require: 'ngModel',

            //we first create the noUiSlider by calling its constructor with the appropriate
            //parameters.
            link: function ($scope, $element, $attr, ngModelCtrl) {

                //because noUiSlider is a jQuery plugin, and we load jQuery before we load angularjs
                //in es60.html, we get to directly call the noUiSlider function on our element,
                //because jQuery seamlessly integrates into angularjs.
                $element.noUiSlider({
                    // We might not have the initial value in ngModelCtrl yet
                    start: 0,
                    range: {
                        // $attrs by default gives us string values
                        // nouiSlider expects numbers, so convert
                        min: Number($attr.rangeMin),
                        max: Number($attr.rangeMax)
                    }
                });

                //to finish integrating ngModel into our third-party input integration,
                //we need to accomplish two steps.
                // When data changes inside AngularJS we need to update the third-party ui component
                //We do this overriding the $render method on the ngModelCtrl, and setting
                //the value in the third-party component inside of it.
                //Angular JS calls the $render method whnever the model value changes inside angulajs.
                ngModelCtrl.$render = function () {
                    $element.val(ngModelCtrl.$viewValue);
                };

                // When data changes outside of AngularJS, we need to update angulajs with the new value.
                //We do this by calling the $setViewValue function on the ngModelCtrl with the latest and
                //greatest value inside the set listener.
                $element.on('set', function (args) {
                    // Also tell AngularJS that it needs to update the UI
                    //because a third-party component is outside the angulaks life-cycle, so we nedd to manually call
                    //$scope.$apply() to ensure that Angualrjs updates the ui.
                    //The $scope.apply() call takes an optional function as an argument and ensures that
                    //the angulajs digest cycle that's responsible for updating the ui with the latest values is triggered.
                    $scope.$apply(function () {
                        // Set the data within AngularJS
                        ngModelCtrl.$setViewValue($element.val());
                    });
                });
            }
        };
    }]);
