/**
 * Created by Stefano Cappa on 24/08/15.
 */

//integration-level unit tests
describe('Server App integration', function () {

    //in this test we are only ensuring that when the controller loads, it makes a server call to
    // to /api/notes. We don't care whether it is through NoteService or directly. This makes it
    // much more of an integration test, where it is independent of the undelying implementation.

    beforeEach(module('serverApp2'));

    var ctrl, mockBackend;

    beforeEach(inject(function ($controller, $httpBackend) {
        mockBackend = $httpBackend;

        mockBackend.expectGET('/api/note').respond(404, {msg: 'Not Found'});
        ctrl = $controller('MainCtrl');
        //At this point, a server request will have benn made
    }));

    it('should load items from server', function () {
        //initially, before the server responds,
        //the items should be empty.
        expect(ctrl.items).toEqual([]);

        //Simulate a server response
        mockBackend.flush();

        //No item from server, only an error
        //So item should still be empty
        expect(ctrl.items).toEqual([]);
        //and check the error message
        expect(ctrl.errorMessage).toEqual('Not Found');
    });

    afterEach(function () {
        mockBackend.verifyNoOutstandingExpectation();
        mockBackend.verifyNoOutstandingRequest();
    });
});