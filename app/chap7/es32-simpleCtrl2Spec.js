/**
 * Created by Stefano Cappa on 24/08/15.
 */

//example of state across unit tests
describe('SimpleCtrl2', function () {
    beforeEach(module('simpleCtrl2App'));

    var ctrl, $loc;
    beforeEach(inject(function ($controller, $location) {
        ctrl = $controller('SimpleCtrl2');

        //we are recreating the $loc before each test
        $loc = $location;
    }));

    //the order of test is important. AngualrJS avoids that by getting rid of the global state in the unit tests.
    //The $location service is destroyed and created between out unit tests. All this happens because we instantiate
    // our module before each unit test. This is responsible for
    // creating a fresh version of each of the service that our test uses.

    it('should navigate away from the current page', function () {
        expect($loc.path()).toEqual('');
        $loc.path('/here');
        ctrl.navigate1();
        expect($loc.path()).toEqual('/some/where');
    });

    it('should navigate away from the current page', function () {
        expect($loc.path()).toEqual('');
        $loc.path('/there');
        ctrl.navigate2();
        expect($loc.path()).toEqual('/some/where/else');
    });
});