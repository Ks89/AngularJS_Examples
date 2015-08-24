angular.module('notesApp', [])
    .controller('MainCtrl', ['$http', function ($http) {
        var self = this;
        self.items = [];
        self.newTodo = {};

        //function that wraps the fetching form the server
        var fetchTodos = function () {
            return $http.get('/api/note').then(function (response) {
                self.items = response.data;
            }, function (errResponse) {
                console.error("Error while fetching notes");
            });
        };

        fetchTodos();

        self.add = function () {
            $http.post('/api/note', self.newTodo)
                .then(fetchTodos)
                .then(function (response) {
                    self.newTodo = {};
                });
        };
    }]).factory('MyLoggingInterceptor', ['$q', function ($q) {
        return {
            request: function (config) {
                console.log("Request made with ", config);
                return config;
            },
            requestError: function (rejection) {
                console.log("Request error due to ", rejection);
                return $q.reject(rejection);
            },
            response: function (response) {
                console.log("Response from server", response);
                return response || $q.when(response);
            },
            responseError: function (rejection) {
                console.log("Error in response, " + rejection);
                return $q.reject(rejection);
            }
        };
    }]).config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('MyLoggingInterceptor');
    }]);