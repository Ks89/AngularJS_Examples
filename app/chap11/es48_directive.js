//remember that here you define a stockWidget in camel-case but in html you'll use "stock-widget"
angular.module('stockMarketApp')
    .directive('stockWidget', [function () {
        return {
            templateUrl: 'es46_stock.html'
        };
    }]);

