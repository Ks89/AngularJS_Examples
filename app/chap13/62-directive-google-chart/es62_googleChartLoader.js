angular.module('googleChartApp')
    //load the visulization library once at load, and returns a promise
    //that can be chained on to know when the load is complete.
    //it does so using the $q service. This service allows us to create and work with our own
    //promises, which is what we use here.
    .factory('googleChartLoaderPromise',
    ['$q', '$rootScope', '$window',
        function ($q, $rootScope, $window) {
            // Create a Deferred Object
            var deferred = $q.defer();

            // Load Google Charts API asynchronously
            $window.google.load('visualization', '1',
                {
                    packages: ['corechart'],
                    callback: function () {
                        // Once loaded, trigger the resolve,
                        // but inside a $apply as the event happens
                        // outside of AngularJS lifecycle
                        $rootScope.$apply(function () {
                            //resolve the deferred object
                            //this callback is called outside the lifecycle of angular.
                            //we need to wrap it in a $rootScope.$apply function ensure
                            //angularjs knows to redraw the ui and run a complete digest cycle as needed.
                            deferred.resolve();
                        });
                    }
                });

            // Return the promise object for the directive
            // to chain onto.
            return deferred.promise;
        }]);
/*
 * the synchronous loader, which ensures that the pie chart directive
 * doesn't try drawing the chart before our api is loaded
 */