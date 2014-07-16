app.controller('adminCentrosController', [
    '$scope', 'centrosService', function ($scope, centrosService) {

        console.log('centros');

        $scope.centros = [];

        centrosService.getCentros().then(function (results) {

            $scope.centros = results.data;
        }, function (error) {
            console.log('error');
        });

    }
]);