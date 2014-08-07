app.controller('loginController', ['$scope', '$location', 'authService', function ($scope, $location, authService) {

    console.log('login');

    $scope.loginData = {
        userName: "",
        password: ""
    };

    $scope.message = "";

    $scope.login = function () {

        authService.login($scope.loginData).then(function (response) {
            
            $location.path('/home');
            //$location.path('/home/' + response.roleName);

        },
         function (err) {
             $scope.message = err.error_description;
         });
    };

}]);