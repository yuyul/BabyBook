app.controller('adminCentrosController', [
    '$scope', 'centrosService', '$rootScope', function ($scope, centrosService, $rootScope) {

        console.log('centros');

        $scope.centros = [];

        centrosService.getCentros().then(function (results) {

            $scope.centros = results.data;
        }, function (error) {
            console.log('error');
        });

        $scope.seleccionaCentro = function (centroId) {
            $rootScope.centroSeleccionado = centroId;
        };
    }
]);