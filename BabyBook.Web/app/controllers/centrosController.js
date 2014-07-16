app.controller('centrosController', [
    '$scope', 'centrosService', function($scope, centrosService) {

        console.log('centros');

        $scope.centros = [];

        centrosService.getCentrosByUser().then(function(results) {

            $scope.centros = results.data;
        }, function(error) {
            console.log('error');
        });

    }
]);