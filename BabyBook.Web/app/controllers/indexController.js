app.controller('indexController', ['$scope', '$location', 'authService', 'Session', function ($scope, $location, authService, Session) {

    console.log('index');

    $scope.logOut = function() {
        authService.logOut();
        $location.path('/home');
    };

    $scope.authentication = authService.authentication;

    $scope.centroId = Session.centro;
}]);