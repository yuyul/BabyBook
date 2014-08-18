app.controller('profesoresController', ['$scope', '$location', 'profesoresService', '$rootScope', 'clasesService', 'alumnosService', function ($scope, $location, profesoresService, $rootScope, clasesService, alumnosService) {

    console.log('profesores');

    $scope.profesores = [];
    $scope.clases = [];

    $scope.profesor = {
        nombre: '',
        primerApellido: '',
        segundoApelido: '',
        email: '',
        centroId: '',
        claseId: ''
    };

    $scope.message = '';

    $scope.alumnos = [];

    if ($location.path() == "/profesores") {
        profesoresService.getProfesoresByCentro($rootScope.centroSeleccionado).then(function (results) {
            $scope.profesores = results.data;
        }, function (error) {
            console.log('error');
        });
    } else {
        alumnosService.getAlumnosByProfesor().then(function (results) {
            $scope.alumnos = results.data;
        }, function (error) {
            console.log('error');
        });
        //$scope.message = $location.path();
    }

    $scope.save = function() {
        $scope.profesor.CentroId = $rootScope.centroSeleccionado;

        profesoresService.createProfesor($scope.profesor).then(function(response) {
        }, function(err) {
            $scope.message = err.error_description;
        });
    };

    $scope.mostrarClases = function (profesor) {
        $scope.profesor = profesor;

        clasesService.getClasesByCentro($rootScope.centroSeleccionado).then(function (results) {
            $scope.clases = results.data;
        }, function (error) {
            console.log('error');
        });

    };

    $scope.asignarClase = function (claseId) {
        $scope.profesor.claseId = claseId;

        profesoresService.updateProfesor($scope.profesor).then(function (response) {
        }, function (error) {
            console.log('error');
        });

    };

}]);