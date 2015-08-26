angular.module('stockMarketApp')
    .directive('stockWidget', [function () {
        return {
            templateUrl: 'es53_stock.html',
            restrict: 'A',
            scope: {
                stockData: '=',
                stockTitle: '@', //becomes stock-title in html. Allows us to pass in strings to our directive,
                                 //which can also have AngularJS bindings (using the {{}} syntax)
                whenSelect: '&'  //becomes when-select in html. Makes the function that was specified in
                                 //our html available to the directive on its scope as whenSelect.
            },
            link: function ($scope, $element, $attrs) {
                $scope.getChange = function (stock) {
                    return Math.ceil(((stock.price - stock.previous) / stock.previous) * 100);
                };

                $scope.onSelect = function() {
                    //called with an object with 3 keys
                    $scope.whenSelect({
                        stockName: $scope.stockData.name,
                        stockPrice: $scope.stockData.price,
                        stockPrevious: $scope.stockData.previous
                    })
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

/*
 * Scope:
 *      false:  default. Tells to Angular that the directive scope is the same as the parent scope, whichever one it is.
 *              Any modifications are reflected to the parent.
 *      true:   Tells to Angular that the directive scope inherits the parent scope, but creates a child scope of its own.
 *              Any modifications are NOT reflected to the parent. This is recommended if we need access to the
 *              parent's functions and  information, but need to make local modifications that are specific to the directive.
 *      object: Tells to Angular to create what we call an isolated scope. This scope doesn't inherit anything from the
 *              parent, and any data that the parent scope needs to share with this directive needs to be passed in though
 *              html attributes. This is the best option when creating reusable components that should be
 *              independent of how and where they are used.
 */

/*
 * For the object scope you can use this three types of values:
 *      = Specifies that the value of the attribute in html is to be treated as a json object. Any changes
 *        done in the parent scope will be automatically available in the directive.
 *      @ Specifies that the value of the attribute in html is to be treated as a string.Any changes
 *        done in the parent scope will be automatically available in the directive.
 *      & Specifies that the value of the attribute in html is a function in some controller whose reference
 *        needs to be available to the directive. The directive can then trigger the function whenever it needs to.
 */