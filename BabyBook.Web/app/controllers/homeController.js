app.controller('homeController', ['$scope', '$location', 'authService', function ($scope, $location, authService) {

    console.log('home');

    var authentication = authService.authentication;

    $scope.isAdmin = authentication.roleName === "Admin";
    $scope.isGestor = authentication.roleName === "Gestor";

}]);