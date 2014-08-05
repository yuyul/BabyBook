app.controller('indexController', ['$scope', '$location', 'authService', '$rootScope', function ($scope, $location, authService, $rootScope) {

    console.log('index');

    $scope.logOut = function() {
        authService.logOut();
        $location.path('/home');
    };

    $scope.authentication = authService.authentication;

}]);