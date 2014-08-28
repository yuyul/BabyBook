app.controller('profesoresController', ['$scope', '$location', 'profesoresService', '$rootScope', 'clasesService', 'alumnosService', function ($scope, $location, profesoresService, $rootScope, clasesService, alumnosService) {

    console.log('profesores');

    $scope.profesores = [];
    $scope.clases = [];

    $scope.profesor = {
        id: 0,
        nombre: '',
        primerApellido: '',
        segundoApelido: '',
        email: '',
        centroId: '',
        claseId: ''
    };

    $scope.message = '';
    $scope.messageok = '';

    $scope.alumnos = [];
    $scope.claseSeleccionada = 0;

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

    $scope.editProfesor = function (profesor) {
        $scope.message = '';
        $scope.messageok = '';
        if (profesor === 'new') {
            $scope.newProfesor = true;
            $scope.profesor = {
                id: 0,
                nombre: '',
                primerApellido: '',
                segundoApelido: '',
                email: '',
                centroId: $rootScope.centroSeleccionado,
                claseId: ''
            };
        } else {
            $scope.newProfesor = false;
            $scope.profesor = profesor;
        }
    }

    $scope.save = function(profesor) {

        if ($scope.newProfesor) {
            profesoresService.createProfesor(profesor).then(function (response) {
                $scope.messageok = "Profesor guardado correctamente";
            }, function(err) {
                $scope.message = err.error_description;
            });
            cargarProfesores();
        } else {
            profesoresService.updateProfesor(profesor).then(function(response) {
                $scope.messageok = "Profesor guardado correctamente";
            }, function(err) {
                $scope.message = err.error_description;
            });
        }
    };

    $scope.mostrarClases = function (profesor) {
        $scope.profesor = profesor;
        $scope.claseSeleccionada = profesor.claseId;
        clasesService.getClasesByCentro($rootScope.centroSeleccionado).then(function (results) {
            $scope.clases = results.data;
        }, function (error) {
            console.log('error');
        });

    };

    $scope.asignarClase = function (profesor) {

        profesoresService.updateProfesor(profesor).then(function (response) {
            $scope.messageok = "Asignación guardada correctamente";
        }, function (error) {
            $scope.message = error.error_description;
            console.log('error');
        });
        cargarProfesores();

    };

    var cargarProfesores = function () {
        setTimeout(function () {
            profesoresService.getProfesoresByCentro($rootScope.centroSeleccionado).then(function (results) {
                $scope.profesores = results.data;
            }, function (error) {
                console.log('error');
            });
        }, 1000);
    };

    $scope.eliminarProfesor = function (profesorId) {
        profesoresService.deleteProfesor(profesorId).then(function (response) {
            cargarProfesores();
        });
    };

}]);