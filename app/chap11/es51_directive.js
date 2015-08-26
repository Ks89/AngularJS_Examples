//remember that here you define a stockWidget in camel-case but in html you'll use "stock-widget"
angular.module('stockMarketApp')
    .directive('stockWidget', [function () {
        return {
            templateUrl: 'es51_stock.html',
            restrict: 'AE',
            link: function ($scope, $element, $attrs) {
                $scope.getChange = function (stock) {
                    return Math.ceil(((stock.price - stock.previous) / stock.previous) * 100);
                };
            }
        };
    }]);

/*
 * restrict:
 *      A: directive can be used as an attribute on existing html elements (such as <div stock-widget></div>). Default value.
 *      E: directive can be used as a new html element
 *      C: directive can be used as a class name in existing html elements
 *      M: directive can be used as html comments (<!-- directive: stock-widget -->). The ng-repeat-start and
 *         ng-repeat-end directives were introduces for this sole purpose, so it's preferable
 *         to use them instead of comment directives.
 */
