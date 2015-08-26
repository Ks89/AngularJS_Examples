angular.module('stockMarketApp')
    .directive('tabs', [function () {
        return {
            restrict: 'E',

            //tarnsclusion to pick up the individual tbs and add the tab titles above them.
            transclude: true,

            //scope, because it needs to add certain function to the scope, and we don't want to collide or override
            //any properties or functions on the parent
            scope: true,

            //templates defines a section to repeat over individual tabs and display them.
            //The template also handles clicking an individual tab as well as highlighting the selected
            //tab using functions on the scope of the directive.
            template: '<div class="tab-headers">' +
            ' <div ng-repeat="tab in tabs"' +
            ' ng-click="selectTab($index)"' +
            ' ng-class="{selected: isSelectedTab($index)}">' +
            '<span ng-bind="tab.title"></span>' +
            ' </div>' +
            ' </div>' +
            ' <div ng-transclude></div>',
            //In the template there is a dive where the contents are trancluded into using ng-tranclude.

            //instead of defining a link function, we define a directive controller. The reason we
            //do this is because we want children directives of the tabs directive to be able to access
            //certain functionality from the tabs directive.
            controller: function ($scope) {
                var currentIndex = 0;
                $scope.tabs = [];

                //function defined on the controller instance.
                //It's not defined on the scope, and for this reason it will be not accessible from directive's html.
                //This function add title and scope object to an array.
                //this array is used to displat the list of tabs at the top.
                this.registerTab = function (title, scope) {
                    if ($scope.tabs.length === 0) {
                        scope.selected = true;
                    } else {
                        scope.selected = false;
                    }
                    $scope.tabs.push({title: title, scope: scope});
                };

                //the controller can define functions that are specific to the directive instance by defining them on $scope
                //as we have been doing so far, and define the API or accessible functions and variables by
                //defining them on this or the cantroller's instance.
                $scope.selectTab = function (index) {
                    currentIndex = index;
                    for (var i = 0; i < $scope.tabs.length; i++) {
                        $scope.tabs[i].scope.selected = currentIndex === i;
                    }
                };

                $scope.isSelectedTab = function (index) {
                    return currentIndex === index;
                };
            }
        };
    }]);