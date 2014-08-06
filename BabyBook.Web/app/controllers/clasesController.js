app.controller('clasesController', ['$scope', '$location', 'clasesService', '$rootScope', function ($scope, $location, clasesService, $rootScope) {

    console.log('clases');

    $scope.clases = [];

    $scope.clase = {
        Nombre: '',
        CentroId: ''
    };

    $scope.message = '';

    clasesService.getClasesByCentro($rootScope.centroSeleccionado).then(function (results) {
        $scope.clases = results.data;
    }, function (error) {
        console.log('error');
    });

    $scope.addClase = function () {
        $scope.clase.CentroId = $rootScope.centroSeleccionado;

        clasesService.createClase($scope.clase).then(function (response) {
            $location.path('/home');
        }, function ($err) {
            $scope.message = err.error_description;
        });
    };

}]);