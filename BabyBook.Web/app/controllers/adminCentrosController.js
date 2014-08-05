app.controller('adminCentrosController', [
    '$scope', 'centrosService', 'Session', function ($scope, centrosService, Session) {

        console.log('centros');

        $scope.centros = [];

        centrosService.getCentros().then(function (results) {

            $scope.centros = results.data;
        }, function (error) {
            console.log('error');
        });

        $scope.seleccionaCentro = function (centroId) {
            $scope.centroId = centroId;
            Session.centro = centroId;
        };
    }
]);