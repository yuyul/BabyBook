app.controller('usuariosController', [
    '$scope', 'usuariosService', function($scope, usuariosService) {

        console.log('usuarios');

        $scope.usuarios = [];

        usuariosService.getUsuarios().then(function(results) {
            $scope.usuarios = results.data;
        }, function(error) {
            console.log('error');
        });

    }
]);