/**
 * Created by Stefano Cappa on 26/08/15.
 */

describe('Stock widget directive behaviour', function () {
    beforeEach(module('stockMarketApp'));

    var compile, mockBackend, rootScope;

    //STEP 1
    beforeEach(inject(function ($compile, $httpBackend, $rootScope) {
        compile = $compile;
        mockBackend = $httpBackend;
        rootScope = $rootScope;
    }));

    it('Should render html based on scope correctly', function () {
        //STEP 2
        var scope = rootScope.$new();
        var scopeClickCalled = '';
        scope.myStock = {
            name: 'Best Stock',
            price: 100,
            previous: 200
        };
        scope.title = 'the best';
        scope.userClick = function (stockPrice, stockPrevious, stockName) {
            scopeClickCalled = stockPrice +
                ';' + stockPrevious +
                ';' + stockName;
        };

        //STEP 3
        mockBackend.expectGET('es53_stock.html').respond(
            '<div ng-bind="stockTitle"></div>' +
            '<div ng-bind="stockData.price"></div>');

        //STEP 4
        var element = compile(
            '<div stock-widget' +
            ' stock-data="myStock"' +
            ' stock-title="This is {{title}}"' +
            ' when-select="userClick(stockPrice, ' +
            'stockPrevious, stockName)">' +
            '></div>'
        )(scope);

        //STEP 5
        scope.$digest();
        mockBackend.flush();

        //STEP 6
        var compiledElementScope = element.isolateScope();

        expect(compiledElementScope.stockData).toEqual(scope.myStock);
        expect(compiledElementScope.getChange(compiledElementScope.stockData)).toEqual(-50);

        //STEP 7
        expect(scopeClickCalled).toEqual('');

        compiledElementScope.onSelect();

        expect(scopeClickCalled).toEqual('100;200;Best Stock');
    });
});