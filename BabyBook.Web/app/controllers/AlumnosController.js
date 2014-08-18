app.controller('alumnosController', ['$scope', 'alumnosService', '$rootScope', '$location', '$routeParams', function ($scope, alumnosService, $rootScope, $location, $routeParams) {

    $scope.alumnos = [];

    $scope.alumno = {
        id: '',
        nombre: '',
        primerApellido: '',
        segundoApellido: '',
        fechaAlta: '',
        fechaBaja: '',
        fechaNacimiento: '',
        centroId: ''
    };
    
    $scope.message = '';

    $scope.files = [];

    $scope.newAlumno = '';

    $scope.onFileSelect = function ($files) {
        $scope.files = $files;
    }

    if ($routeParams.id === undefined) {
        alumnosService.getAlumnosByCentro($rootScope.centroSeleccionado).then(function (results) {
            $scope.alumnos = results.data;
        });
    } else {
        alumnosService.getAlumnoById($routeParams.id).then(function (results) {
            $scope.alumno = results.data;
        });
    }

    $scope.editAlumno = function (alumno) {
        if (alumno === 'new') {
            $scope.newAlumno = true;
            $scope.alumno = {
                id: 0,
                nombre: '',
                primerApellido: '',
                segundoApellido: '',
                fechaNacimiento: '',
                centroId: $rootScope.centroSeleccionado
            };
        } else {
            $scope.newAlumno = false;
            $scope.alumno = alumno;
        }
    }

    $scope.save = function (alumno) {

        /*var alumno = {
            nombre: $scope.alumno.nombre,
            primerApellido: $scope.alumno.primerApellido,
            segundoApellido: $scope.alumno.segundoApellido,
            fechaNacimiento: $scope.alumno.fechaNacimiento,
            centroId: $rootScope.centroSeleccionado
        };*/

        alumnosService.uploadAlumno(alumno, $scope.files[0]);

        if ($scope.newAlumno) {
            setTimeout(function () {
                alumnosService.getAlumnosByCentro($rootScope.centroSeleccionado).then(function (results) {
                    $scope.alumnos = results.data;
                });
            }, 3000);

        }
    };

    /*$scope.createAlumno = function () {

        if ($scope.alumno.id === '') {
            $scope.alumno.CentroId = $rootScope.centroSeleccionado;

            alumnosService.createAlumno($scope.alumno).then(function (response) {
                $location.path('/home');
            }, function (err) {
                $scope.message = err.error_description;
            });
        } else {
            alumnosService.updateAlumno($scope.alumno.id, $scope.alumno, $scope.files[0]);
        }
    };*/
}]);