/**
 * Created by Stefano Cappa on 24/08/15.
 */

//example of dependency injection in our unit tests
describe('SimpleCtrl', function () {
    beforeEach(module('notesApp'));

    //We are using location, but in the test we need to use the mocked version
    //Because we are using the mocked version of $location,
    // we don't need to change the reale simpleCtrl code.

    var ctrl, $loc;
    beforeEach(inject(function ($controller, $location) {
        ctrl = $controller('SimpleCtrl');
        $loc = $location;
    }));

    it('should navigate away from the current page', function () {
        //the mocked version of "$loc" permits to set an initial state of the browser's location ("/here" in this case).
        $loc.path('/here');
        ctrl.navigate();
        expect($loc.path()).toEqual('/some/where/else');
    });
});