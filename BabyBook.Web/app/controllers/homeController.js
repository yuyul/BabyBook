app.controller('homeController', ['$scope', '$location', 'authService', '$rootScope', 'centrosService',  function ($scope, $location, authService, $rootScope, centrosService) {

    console.log('home');

    var authentication = authService.authentication;

    $scope.isAdmin = authentication.roleName === "Admin";
    $scope.isGestor = authentication.roleName === "Gestor" && $rootScope.centroSeleccionado != "";
    $scope.authentication = authentication;

    $scope.centerSelected = $rootScope.centroSeleccionado != "";

    $scope.centros = [];

    $scope.seleccionaCentro = function (centroId) {
        $rootScope.centroSeleccionado = centroId;
    };

    centrosService.getCentrosByUser().then(function (results) {
        $scope.centros = results.data;
    });
}]);