/**
 * Created by Stefano Cappa on 24/08/15.
 */

//integration
angular.module('serverApp2', [])
    .controller('MainCtrl', ['NoteService', function (NoteService) {
        var self = this;
        self.items = [];
        self.errorMessage = '';

        NoteService.query().then(function (response) {
            self.items = response.data;
        }, function (errResponse) {
            self.errorMessage = errResponse.data.msg;
        });
    }])
    .factory('NoteService', ['$http', function ($http) {
        return {
            query: function () {
                return $http.get('/api/note');
            }
        };
    }]);