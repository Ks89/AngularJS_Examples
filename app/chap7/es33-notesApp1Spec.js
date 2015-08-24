/**
 * Created by Stefano Cappa on 24/08/15.
 */

//example of mocking out services
describe('ItemCtrl with inline mock', function () {
    beforeEach(module('notesApp1'));

    var ctrl, mockService;

    /*
    Here we override the ItemService with our own mock.
    We use the "module" function passing a function that gets injected with a $provide.
    This provider shares its namespace with the modules loaded before. So now we create our mockService
     and tell the provider that when any controller or service asks for ItemService, give it our value.
    Because, we do this after the notesApp1 module is loaded, it overwrites the original ItemService definition.

    Remember, you can use this mocked service only inside this "describe" block.
     */
    beforeEach(module(function ($provide) {
        mockService = {
            list: function () {
                return [{id: 1, label: 'Mock'}];
            }
        };

        $provide.value('ItemService', mockService);
    }));

    beforeEach(inject(function ($controller) {
        ctrl = $controller('ItemCtrl');
    }));

    it('should load mocked out items', function () {
        expect(ctrl.items).toEqual([{id: 1, label: 'Mock'}]);
    });
});