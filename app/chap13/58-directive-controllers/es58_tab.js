angular.module('stockMarketApp')
    .directive('tab', [function () {
        return {
            restrict: 'E',

            //the tab directive does is set up translaction, because it defines a template of its own.
            transclude: true,

            //in the template, we use the ng-transclude to add the content inside a div and add a condition
            //to selectively hide and show the div based on a selected variable on the scope
            template: '<div ng-show="selected" ng-transclude></div>',

            //tells to angular that for the tab directive to work, it requires one of the parent elements in the html be the tabs
            //directive, and we want its controller to be made available to the tab directive.
            require: '^tabs',

            //to not override the parent scope
            scope: true,

            //we register the tab with the parent tabs directive function that we defined earlier.
            link: function ($scope, $element, $attr, tabCtrl) {
                tabCtrl.registerTab($attr.title, $scope);
            }
        };
    }]);

/*
 * Require in the directive definition object either takes a string or an array of strings, each of
 * which is the name of the directive that must be used in conjunction with the current directive.
 *
 * Example: require: 'tabs', tells angular to look for a directive called tabs, which exposes a conroller on the same
 *                           element the directive is on. Similarly, "require: ['tabs','ngModel']" tells angular
 *                           that both the tabs and ng-model directives must be present on the element our directive is used on.
 *                           When used as an array, the link function gets an array of controllers as the fourth
 *                           argument, instead of just one controller.
 *
 * require: 'tabs' -> implies that angular should locate the directive tabs on the same element, and throw an error if it's not found
 * require: '?tabs' -> implies that angular should try to locate the directive tabs on the same element, but pass null as the fourth arument
 *                     to the link function if it's found. That is prefixing ? tells angular to treat the directive as an optional dependency
 * require: '^tabs' -> tells angular to look for a directive not on itself, but on its parent chain.
 *
 * You can also mix like: '?^tabs' implies that a parent element of our directive may or may not have the tabs directive,
 * but if it is present, it should be injected into our directive link function.qq
 *
 */
