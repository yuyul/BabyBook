app.controller('alumnosController', ['$scope', 'alumnosService', '$rootScope', '$location', '$routeParams', function ($scope, alumnosService, $rootScope, $location, $routeParams) {

    $scope.alumnos = [];
    $scope.familiares = [];

    $scope.consulta = "";

    $scope.alumno = {
        id: '',
        nombre: '',
        primerApellido: '',
        segundoApellido: '',
        fechaAlta: '',
        fechaBaja: '',
        fechaNacimiento: '',
        centroId: '',
        foto:''
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
                centroId: $rootScope.centroSeleccionado,
                foto: ''
            };
        } else {
            $scope.newAlumno = false;
            $scope.alumno = alumno;
        }
    }

    $scope.save = function (alumno) {

        alumnosService.uploadAlumno(alumno, $scope.files[0]);

        setTimeout(function () {
            alumnosService.getAlumnosByCentro($rootScope.centroSeleccionado).then(function (results) {
                $scope.alumnos = results.data;
            });
        }, 3000);

    };

    $scope.addFamiliar = function (familiar) {
        alumnosService.addFamiliar($scope.alumno.id, familiar);
    };

    $scope.verFamiliares = function (alumno) {
        $scope.alumno = alumno;
        alumnosService.getFamiliaresByAlumno(alumno.id).then(function (results) {
            $scope.familiares = results.data;
        });
    };
}]);