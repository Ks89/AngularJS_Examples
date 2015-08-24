/**
 * Created by Stefano Cappa on 24/08/15.
 */

//when i'm calling $http in a test, i'm using the mocked version.
//All server calls are intercepted, and we can test them all within the context of a unit test.
angular.module('serverApp', [])
    .controller('MainCtrl', ['$http', function ($http) {
        var self = this;
        self.items = [];
        self.errorMessage = '';

        //here there is a simple get controller which makes a get request to /api/note when
        // it loads, and saves the response into the items array on the controller.

        $http.get('/api/note').then(function (response) {
                self.items = response.data;
            }, function (errResponse) {
                self.errorMessage = errResponse.data.msg;
            }
        )
        ;
    }]);