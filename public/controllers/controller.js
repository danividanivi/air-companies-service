
var scotchTodo = angular.module('AirCompanies',[]);

function mainController($scope, $http) {

    $scope.formData = {};

    // when landing on the page, get all todos and show them
    $http.get('/api/companies')
        .success(function(data) {
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {
        $http.post('/api/companies', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo after checking it
    $scope.deleteTodo = function(id) {
        $http.delete('/api/companies/' + id)
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    
    // get one company 
    $scope.getone = function(id) {
        $http.get('/api/companies/' + id)
            .success(function(data) {
                $scope.todos = [''];
                $scope.toda = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
      

    };





}