angular.module('notesApp', [])
    .controller('MainCtrl', ['$http', function ($http) {
        var self = this;
        self.items = [];
        self.newTodo = {};

        //function that wraps the fetching form the server
        var fetchTodos = function() {
          return $http.get('/api/note').then(
              function(response) {
                  self.items = response.data;
              }, function(errResponse) {
                  console.error("Error while fetching notes");
              });
        };

        fetchTodos();

        self.add = function() {
          $http.post('/api/note', self.newTodo)
              .then(fetchTodos)
              .then(function() {
                  //and finally clear todos, only after the post in this add, and
                  //the get in fetchTodos.
                  self.newTodo = {};
              });
        };
    }]);