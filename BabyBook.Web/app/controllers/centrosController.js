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
        $scope.messageok = '';
        $scope.newCentro = '';

        centrosService.getCentrosByUser().then(function(results) {

            $scope.centros = results.data;
        }, function(error) {
            console.log('error');
        });

        $scope.save = function(centro) {

            if ($scope.newCentro) {
                centrosService.addCentro($scope.centro).then(function (response) {
                    $scope.messageok = "Centro guardado correctamente";
                }, function (err) {
                    $scope.message = err.error_description;
                });
                cargarCentros();
            } else {
                centrosService.updateCentro(centro).then(function (response) {
                    $scope.messageok = "Centro guardado correctamente";
                }, function (err) {
                    $scope.message = err.error_description;
                });
            }

        };

        $scope.seleccionaCentro = function (centroId) {
            $rootScope.centroSeleccionado = centroId;
        };

        $scope.editCentro = function (centro) {
            limpiaMensajes();
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
            cargarCentros();

        };

        var cargarCentros = function() {
            setTimeout(function() {
                centrosService.getCentrosByUser().then(function(results) {

                    $scope.centros = results.data;
                }, function(error) {
                    console.log('error');
                });
            }, 1000);
        };

        var limpiaMensajes = function() {
            $scope.message = '';
            $scope.messageok = '';
        }
    }
]);