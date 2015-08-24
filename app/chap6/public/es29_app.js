angular.module('notesApp', [])
    .controller('LoginCtrl', ['$http', function ($http) {
        var self = this;
        self.user = {};
        self.message = 'Please login';
        self.login = function () {
            $http.post('/api/login', self.user).then(
                function (resp) {
                    self.message = resp.data.msg;
                });
        };
    }])
    .config(['$httpProvider', function ($httpProvider) {
        // Every POST data becomes jQuery style
        $httpProvider.defaults.transformRequest.push(

            //there are also this possibilities for &httpProvider.defaults :
            //.headers.common
            //.headers.get
            //.headers.put
            //.headers.post
            //.transformRequest
            //.transformResponse
            //.xsrfHeaderName
            //.xsrfCookieName

            function (data) {
                var requestStr;
                if (data) {
                    data = JSON.parse(data);
                    for (var key in data) {
                        if (requestStr) {
                            requestStr += '&' + key + '=' + data[key];
                        } else {
                            requestStr = key + '=' + data[key];
                        }
                    }
                }
                return requestStr;
            });
        // Set the content type to be FORM type for all post requests
        // This does not add it for GET requests.
        $httpProvider.defaults.headers.post['Content-Type'] =
            'application/x-www-form-urlencoded';
    }]);
