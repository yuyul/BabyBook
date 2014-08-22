app.controller('centrosController', [
    '$scope', '$location', 'centrosService', '$rootScope', function ($scope, $location, centrosService, $rootScope) {

        console.log('centros');

        $scope.centros = [];

        $scope.centro = {
            id: 0,
            nombre: '',
            direccion: ''
        };

        $scope.message = '';
        $scope.newCentro = '';

        centrosService.getCentrosByUser().then(function(results) {

            $scope.centros = results.data;
        }, function(error) {
            console.log('error');
        });

        $scope.save = function(centro) {

            if ($scope.newCentro) {
                centrosService.addCentro($scope.centro).then(function (response) {
                }, function (err) {
                    $scope.message = err.error_description;
                });
            } else {
                centrosService.updateCentro(centro).then(function (response) {

                }, function (err) {
                    $scope.message = err.error_description;
                });
            }

        };

        $scope.seleccionaCentro = function (centroId) {
            $rootScope.centroSeleccionado = centroId;
        };

        $scope.editCentro = function (centro) {

            if (centro === 'new') {
                $scope.newCentro = true;
                $scope.centro = {
                    id: 0,
                    nombre: '',
                    direccion: ''
                };
            } else {
                $scope.newCentro = false;
                $scope.centro = centro;
            }

        };

        $scope.deleteCentro = function (centroId) {
            centrosService.deleteCentro(centroId);

            setTimeout(function () {
                centrosService.getCentrosByUser().then(function (results) {

                    $scope.centros = results.data;
                }, function (error) {
                    console.log('error');
                });
            }, 3000);
        };
    }
]);