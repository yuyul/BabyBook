app.controller('alumnosController', ['$scope', 'alumnosService', '$rootScope', '$location', '$routeParams', function ($scope, alumnosService, $rootScope, $location, $routeParams) {

    $scope.alumnos = [];
    $scope.familiares = [];

    $scope.consulta = "";

    $scope.familiar = {
        id: 0,
        nombre: '',
        primerApellido: '',
        segundoApellido: '',
        email: '',
        dni: ''
    };

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
    $scope.messageok = '';

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
        if ($scope.newAlumno) {
            alumno.fechaNacimiento = (alumno.fechaNacimiento.getMonth() + 1) + '/' + alumno.fechaNacimiento.getDate() + '/' + alumno.fechaNacimiento.getFullYear();
        }
        alumnosService.uploadAlumno(alumno, $scope.files[0]);

        cargarAlumnos();

    };

    $scope.editFamiliar = function(familiar) {
        limpiaMensajes();
        if (familiar === 'new') {
            $scope.newFamiliar = true;
            $scope.familiar = {
                id: 0,
                nombre: '',
                primerApellido: '',
                segundoApellido: '',
                email: '',
                dni: ''
            };
        } else {
            $scope.familiar = familiar;
            $scope.newFamiliar = false;
        }

    };

    $scope.addFamiliar = function (familiar) {
        if ($scope.newFamiliar) {
            alumnosService.addFamiliar($scope.alumno.id, familiar);
        } else {
            alumnosService.updateFamiliar(familiar.id, familiar);
        }
        cargarFamiliares();
    };

    $scope.deleteAsignacion = function(familiarId) {
        alumnosService.deleteAsignacion(familiarId, $scope.alumno.id);
        cargarFamiliares();
    };

    $scope.verFamiliares = function (alumno) {
        limpiaMensajes();
        $scope.alumno = alumno;
        alumnosService.getFamiliaresByAlumno(alumno.id).then(function (results) {
            $scope.familiares = results.data;
        });
    };

    $scope.deleteAlumno = function(alumnoId) {
        alumnosService.deleteAlumno(alumnoId);
        cargarAlumnos();
    };

    var cargarAlumnos = function() {
        setTimeout(function() {
            alumnosService.getAlumnosByCentro($rootScope.centroSeleccionado).then(function(results) {
                $scope.alumnos = results.data;
            });
        }, 2000);
    }

    var cargarFamiliares = function() {
        
        setTimeout(function () {
            alumnosService.getFamiliaresByAlumno($scope.alumno.id).then(function (results) {
                $scope.familiares = results.data;
            });
        }, 3000);

    }

    var limpiaMensajes = function() {
        $scope.message = '';
        $scope.messageok = '';
    }
}]);