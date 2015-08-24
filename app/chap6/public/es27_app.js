angular.module('notesApp', [])
    .controller('MainCtrl', ['$http', function ($http) {
        //this controller as a dependency on $http as a service. When the controller loads,
        // we make a get to the /api/notes server endpoint. $http.get() returns a Promise object,
        // which allow to chain functions as if they were synchronized.
        //Promises allow nonblocking operations
        //then function takes 2 arguments, a success handler and an error handler.
        //The Promise API poposes the following:
        //1) Each async task will return a promise object
        //2) Each promise object will have a then function that can take 2 args, a success handler and an error handler
        //3) Success/error handlers in the then function will be called only once, after the async task finishes.
        //4) The then function will also return a promise, to allow chaining multiple calls
        //5) Each handler can return a calue, which will be passed to the next function in the chain of promises
        var self = this;
        self.items = [];
        $http.get('/api/note').then(function (response) {
            self.items = response.data;
        }, function (errResponse) {
            console.error("Error while fetching notes");
        });
    }]);


//the traditional javascript way to deal with asynchronous calls is with callbacks.
//for example, supposing to have a xhrGET function:
/*
    //fetch some serve configuration
    xhrGET('/api/server-config', function(config) {
        //fetch user informations, if he's logged in
        xhrGET('/api/' + config.USER_END_POINT, function(user) {
            //fetch items for the user
            xhrGET('/api/' + user.id + '/items', function(items) {
                //actually display the items here
            });
        });
    });
 */
//Using promises:
/*
$http.get('/api/server-config').then(function(configResponse) {
    return $http.get('/api/' + configResponse.data.USER_END_POINT);
}).then(function(userResponse) {
    return $http.get('/api/' + userResponse.data.id + '/items');
}).then(function(itemResponse) {
    //display items here
}, function(error) {
    //Common error handling, because Angular finds the next closest
    //error handler and trigger it.
    //so the common error handler will be called.
});


 If we want to trigger the success handler for the next promise in the chain, we can
 just return a value from the success or the error handler, angualrjs will treat it
 as us successfully resolving any errors.
 */

/*
 * The $q service in angular has the API: $q.defer(), deferredObject.resolve, deferredObject.reject, $q.reject
 *
 */
