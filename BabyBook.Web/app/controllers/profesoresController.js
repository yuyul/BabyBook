app.controller('profesoresController', ['$scope', '$location', 'profesoresService', '$rootScope', function ($scope, $location, profesoresService, $rootScope) {

    console.log('profesores');

    $scope.profesores = [];

    $scope.profesor = {
        Nombre: '',
        CentroId: '',
        ClaseId: ''
    };

    $scope.message = '';

    profesoresService.getProfesoresByCentro($rootScope.centroSeleccionado).then(function(results) {
        $scope.profesores = results.data;
    }, function(error)
    {
        console.log('error');
    });

    $scope.addProfesor = function() {
        $scope.profesor.CentroId = $rootScope.centroSeleccionado;

        profesoresService.createProfesor($scope.profesor).then(function(response) {
            $location.path('/home');
        }, function(err) {
            $scope.message = err.error_description;
        });
    };

}]);