/**
 * Created by Stefano Cappa on 22/08/15.
 */

//simple controller example in an external file, without a real html.
//I'm using this only for testing
angular.module('notesApp', [])
    .controller('ListCtrl', [function () {
        var self = this;
        self.item = [
            {id: 1, label: 'First', done: true},
            {id: 2, label: 'Second', done: false}
        ];

        self.getDoneClass = function (item) {
            return {
                finished: item.done,
                unfinished: !item.done
            };
        };
    }]);