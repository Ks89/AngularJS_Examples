/**
 * Created by Stefano Cappa on 24/08/15.
 */

//Jasmine spies allow us to hook into certain functions, and check whether they were called,
// how many times they were called, what arguments they were called with, and so on.
//This exercise use the list function, like created in the js. In the next exercise there is a different
//implementation where i'll override the list method and replace it with the Jasmine spy.
describe('ItemCtrl with spies', function () {
    beforeEach(module('notesApp1'));

    var ctrl, itemService;

    beforeEach(inject(function ($controller, ItemService) {
        //spyOn has an object as first parameter
        //and a string as second parameter. The last name is the
        //function name that we want to hook on to as the second argument.
        //We are telling to Jasmine to spy the list function of ItemService.
        spyOn(ItemService, 'list').and.callThrough();
        itemService = ItemService;
        //its recommended to setup all mocks and spies before instantiating controllers
        ctrl = $controller('ItemCtrl');
    }));

    it('should load mocked out items', function () {
        expect(itemService.list).toHaveBeenCalled();
        expect(itemService.list.calls.count()).toEqual(1);
        expect(ctrl.items).toEqual([
            {id: 1, label: 'Item 0'},
            {id: 2, label: 'Item 1'}
        ]);
    });
});
