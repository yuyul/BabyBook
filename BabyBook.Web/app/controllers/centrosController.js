app.controller('centrosController', [
    '$scope', '$location', 'centrosService', 'Session', function($scope, $location, centrosService, Session) {

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
            Session.centro = centroId;
        };
    }
]);