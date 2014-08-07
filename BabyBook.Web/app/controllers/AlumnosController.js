app.controller('alumnosController', ['$scope', 'alumnosService', '$rootScope', function ($scope, alumnosService, $rootScope) {

    $scope.alumnos = [];

    $scope.alumno = {
        nombre: '',
        primerApellido: '',
        segundoApellido: '',
        fechaAlta: '',
        fechaBaja: ''
    };
    
    $scope.message = '';

    alumnosService.getAlumnosByCentro($rootScope.centroSeleccionado).then(function (results) {
        $scope.alumnos = results.data;
    });

    $scope.createAlumno = function () {
        $scope.Alumno.CentroId = $rootScope.centroSeleccionado;

        alumnosService.createAlumno($scope.alumno).then(function (response) {
            $location.path('/home');
        }, function (err) {
            $scope.message = err.error_description;
        });
    };
}]);