/**
 * Created by Stefano Cappa on 26/08/15.
 */

describe('Stock widget directive rendering', function () {
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
        scope.myStock = {
            name: 'Best Stock',
            price: 100,
            previous: 200
        };
        scope.title = 'the best';

        //STEP 3
        mockBackend.expectGET('es53_stock.html').respond(
            '<div ng-bind="stockTitle"></div>' +
            '<div ng-bind="stockData.price"></div>');

        //STEP 4
        var element = compile('<div stock-widget' +
            ' stock-data="myStock"' +
            ' stock-title="This is {{title}}"></div>')(scope);

        //STEP 5
        scope.$digest();
        mockBackend.flush();

        //STEP 6
        expect(element.html()).toEqual(
            '<div ng-bind="stockTitle" class="ng-binding">' +
            'This is the best' +
            '</div>' +
            '<div ng-bind="stockData.price" class="ng-binding">' +
            '100' +
            '</div>');
    });
});