//version with provider function. Not a common approach, but can be useful when we need
// to setup some config for our service before our application loads.
//With the provider we can have functions to setup how service works based on the language, environment,
// or other things that are applicable to our service.
function ItemService(opt_items) {
    var items
    opt_items || [];
    this.list = function () {
        return items;
    };
    this.add = function (item) {
        items.push(item);
    };
}

angular.module('notesApp', [])
    .provider('ItemService', function () {
        var haveDefaultItems = true;

        this.disableDefaultItems = function () {
            haveDefaultItems = false;
        };

        //This function gets our dependencies, not the
        //provider above
        this.$get = [function () {
            var optItems = [];
            if (haveDefaultItems) {
                optItems = [
                    {id: 1, label: 'Item 0'},
                    {id: 2, label: 'Item 1'}
                ];
            }
            return new ItemService(optItems);
        }];
    })
    .config(['ItemServiceProvider',
        //this function executes before the angular js executes, So, this function executes
        //bore our controllers, services and other function/(
        function (ItemServiceProvider) {
            //To see how the provider can change
            // cibfugration, change tha value of
            // shouldHaveDefaults to true and try running the example,
            var shouldHaveDefaults = false;

            // Get configuration from server
            // Set shouldHaveDefaults somehow
            // Assume it magically changes for now
            if (!shouldHaveDefaults) {
                ItemServiceProvider.disableDefaultItems();
            }
        }])
    .controller('MainCtrl', [function () {
        var self = this;
        self.tab = 'first';
        self.open = function (tab) {
            self.tab = tab;
        };
    }])
    .controller('SubCtrl', ['ItemService',
        function (ItemService) {
            var self = this;

            //function list()
            self.list = function () {
                return ItemService.list();
            };

            //function add()
            self.add = function () {
                ItemService.add({
                    id: self.list().length + 1,
                    label: 'Item ' + self.list().length
                });
            };
        }]);