/**
 * Created by Stefano Cappa on 24/08/15.
 */

angular.module('notesApp', [])
    .controller('SimpleCtrl', ['$location', function ($location) {
        var self = this;
        self.navigate = function () {
            $location.path('/some/where/else');
        };
    }]);