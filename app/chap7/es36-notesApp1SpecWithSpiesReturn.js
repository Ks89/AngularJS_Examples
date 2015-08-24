/**
 * Created by Stefano Cappa on 24/08/15.
 */

describe('ItemCtrl with SpyReturn', function () {
    beforeEach(module('notesApp1'));

    var ctrl, itemService;

    beforeEach(inject(function ($controller, ItemService) {
        //in this example, we override the list method in the ItemService, and replace it with our
        //Jasmine spy. The spyOn function returns a spy that's called with the andReturn
        //function on the spy created by createSpy, and gives it the value to return.
        //Then we can check if ItemService.list was called, and if it was called once.
        spyOn(ItemService, 'list').and.returnValue([{id: 1, label: 'Mock'}]);
        itemService = ItemService;
        ctrl = $controller('ItemCtrl');
    }));

    it('should load mocked out items', function () {
        expect(itemService.list).toHaveBeenCalled();
        expect(itemService.list.calls.count()).toEqual(1);
        expect(ctrl.items).toEqual([
            {id: 1, label: 'Mock'}
        ]);
    });
});