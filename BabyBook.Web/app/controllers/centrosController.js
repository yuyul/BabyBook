app.controller('centrosController', [
    '$scope', '$location', 'centrosService', '$rootScope', function ($scope, $location, centrosService, $rootScope) {

        console.log('centros');

        $scope.centros = [];

        $scope.centro = {
            Nombre: '',
            Direccion: ''
        };

        $scope.message = '';

        centrosService.getCentrosByUser().then(function(results) {

            $scope.centros = results.data;
        }, function(error) {
            console.log('error');
        });

        $scope.addCentro = function() {
            centrosService.addCentro($scope.centro).then(function(response) {
                $location.path('/home');
            }, function(err) {
                $scope.message = err.error_description;
            });

        };

        $scope.seleccionaCentro = function (centroId) {
            $rootScope.centroSeleccionado = centroId;
        };

        $scope.editCentro = function (centro) {

            if (centro === 'new') {
                $scope.centro = {
                    nombre: '',
                    direccion: ''
                };
            } 

        };
    }
]);