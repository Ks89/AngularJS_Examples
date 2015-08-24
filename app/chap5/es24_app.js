angular.module('notesApp', [])
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
        }])
    .factory('ItemService', [function () {
        //when you want to create a service:
        //1) Use angular.module().factory to declare service's name and dependencies
        //2) Return an object or a function within the service definition, which becomes the public API for our service
        //3) Hold internal state as local variable inside the service. This is important because is a Single Page Application
        //   where controllers can get created and destroyed, the service can act as an application-level store.

        //you should use module.factory() to define your services if you follow a function
        // style programming and/or you prefer to return functions and objects
        var items = [
            {id: 1, label: 'Item 0'},
            {id: 2, label: 'Item 1'}
        ];
        return {
            list: function () {
                return items;
            },
            add: function (item) {
                items.push(item);
            }
        };
    }]);