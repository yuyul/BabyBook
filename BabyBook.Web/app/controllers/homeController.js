app.controller('homeController', ['$scope', '$location', 'authService', '$rootScope', 'centrosService', '$route', function ($scope, $location, authService, $rootScope, centrosService, $route) {

    console.log('home');

    var authentication = authService.authentication;

    $scope.isAdmin = authentication.roleName === "Admin";
    $scope.isGestor = authentication.roleName === "Gestor";
    $scope.isProfesor = authentication.roleName === "Profesor";
    $scope.isFamiliar = authentication.roleName === "Familiar";

    $scope.authentication = authentication;

    $scope.centerSelected = $rootScope.centroSeleccionado != "" ;

    $scope.centros = [];

    $scope.seleccionaCentro = function (centroId) {
        $rootScope.centroSeleccionado = centroId;
        $route.reload();
    };

    if (authentication.isAuth) {
        centrosService.getCentrosByUser().then(function (results) {
            $scope.centros = results.data;
        });
    }
}]);