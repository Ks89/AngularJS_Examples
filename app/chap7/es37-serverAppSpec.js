/**
 * Created by Stefano Cappa on 24/08/15.
 */

//example of unit testing server calls
describe('MainCtrl Server Calls', function () {
    beforeEach(module('serverApp'));

    var ctrl, mockBackend;

    beforeEach(inject(function ($controller, $httpBackend) {
        // the $http service internally uses the $httpBackend to make the actual XHR requests.
        //the angular-mocks file provides a mock $httpBackend service that prevents server calls,
        // and gives us hooks to set expectations and trigger responses.
        mockBackend = $httpBackend;

        //there are two ways to set expectations on what server calls will be made on the $httpBackend:
        /*
         * except: used when we want to control exactly how many requests will be made
         *         and to what URL, and then control the response.
         *         This function has a series of functions, like exceptGET or exceptPOST.
         *
         * when: The difference between "except" is that then when does not care about the order of
         *       requests or how many times the call was made.
         */
        /*
         * Except is more fine-grained and sets exceptations. "when" stubs out the backend, allowing it to respond
         * in a consistent manner without any expectations for any and all requests.
         * After the use of expect or when, we can use "respond" chaining to the previous one.
         */
        mockBackend.expectGET('/api/note').respond([{id: 1, label: 'Mock'}]);
        ctrl = $controller('MainCtrl');
        //At this point, a server request will have been made
    }));

    it('should load items from server', function () {
        //Initially, before the server responds,
        //the items should be empty
        expect(ctrl.items).toEqual([]);

        //Simulate a server response
        //Angularjs send back the responses for all the requests that the client has received so far.
        //Flush allows us to test asynchronous behaviour without actually writing asynchronous tests.
        //flush(int) can receive an integer to flush the requests one at a time (using $httpBackend.flush(1),
        //or flush 3 of them (using $httpBackend.flush(3)).
        mockBackend.flush();

        expect(ctrl.items).toEqual([{id: 1, label: 'Mock'}]);
    });

    //when you use $httpBackend it is recommended to use afterEach.
    afterEach(function () {
        //Ensure that all excepts set on the $httpBackend
        //were actually called
        mockBackend.verifyNoOutstandingExpectation();

        //Ensure that all requests to the server
        //have actually responded (using flush())
        mockBackend.verifyNoOutstandingRequest();
    });
});