app.controller('profesoresController', ['$scope', '$location', 'profesoresService', function ($scope, $location, profesoresService) {

    console.log('profesores');

    $scope.profesores = [];

    $scope.profesor = {
        Nombre: '',
        CentroId: '',
        ClaseId: ''
    };

    $scope.message = '';

    profesoresService.getProfesoresByCentro(1).then(function(results) {
        $scope.profesores = results.data;
    }, function(error)
    {
        console.log('error');
    });

}]);