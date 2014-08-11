app.controller('clasesController', ['$scope', '$location', 'clasesService', '$rootScope', 'alumnosService', 'cursosService', function ($scope, $location, clasesService, $rootScope, alumnosService, cursosService) {

    console.log('clases');

    $scope.clases = [];

    $scope.clase = {
        Nombre: '',
        CentroId: ''
    };

    $scope.asignacion = {
        AlumnoId: '',
        ClaseId: '',
        CursoId: ''
    };

    $scope.alumnos = [];
    $scope.cursos = [];
    $scope.cursoSeleccionado = '';
    $scope.message = '';
    $scope.isAsignacion = false;
    $scope.isVerAlumnos = false;


    clasesService.getClasesByCentro($rootScope.centroSeleccionado).then(function (results) {
        $scope.clases = results.data;
    }, function (error) {
        console.log('error');
    });

    $scope.addClase = function () {
        $scope.clase.CentroId = $rootScope.centroSeleccionado;

        clasesService.createClase($scope.clase).then(function (response) {
            $location.path('/home');
        }, function (err) {
            $scope.message = err.error_description;
        });
    };

    $scope.cargarAlumnos = function () {

        if ($scope.isAsignacion) {
            alumnosService.getAlumnosSinAsignar($rootScope.centroSeleccionado).then(function (results) {
                $scope.alumnos = results.data;
            }, function (error) {
                console.log('error');
            });
        } else {
            alumnosService.getAlumnosByClase($scope.clase.id).then(function (results) {
                $scope.alumnos = results.data;
            }, function (error) {
                console.log('error')
            });
        }
    }

    $scope.mostrarAlumnos = function (clase) {
        $scope.isAsignacion = true;
        $scope.isVerAlumnos = false;
        $scope.clase = clase;
        $scope.alumnos = [];

        cargaCursos();

        /*alumnosService.getAlumnosSinAsignar($rootScope.centroSeleccionado).then(function(results) {
            $scope.alumnos = results.data;
        }, function(error) {
            console.log('error');
        });*/

    };

    $scope.verAlumnos = function (clase) {
        $scope.isVerAlumnos = true;
        $scope.isAsignacion = false;
        $scope.clase = clase;
        $scope.alumnos = [];
        cargaCursos();

        /*alumnosService.getAlumnosByClase(claseId).then(function (results) {
            $scope.alumnos = results.data;
        }, function (error) {
            console.log('error')
        });*/

    };

    $scope.asignarAlumnos = function(claseId) {
        //console.log($scope.alumnos);

        var asignaciones = [];

        $scope.alumnos.filter(function(element) {
            return element.seleccionado == true;
        }).forEach(function(element, index, array) {
            var asignacion = {
                alumnoId: element.id,
                cursoId: $scope.cursoSeleccionado.id,
                claseId: claseId
            };

            asignaciones.push(asignacion);
        });

        clasesService.asignarAlumnos(asignaciones);
    };

    $scope.eliminarAsignacion = function (claseId) {

        var asignaciones = [];

        $scope.alumnos.filter(function (element) {
            return element.seleccionado == true;
        }).forEach(function (element, index, array) {
            var asignacion = {
                alumnoId: element.id,
                cursoId: $scope.cursoSeleccionado.id,
                claseId: claseId
            };

            asignaciones.push(asignacion);
        });

        clasesService.eliminarAsignacion(asignaciones);
    };

    var cargaCursos = function () {
        cursosService.getCursosByCentro($rootScope.centroSeleccionado).then(function (results) {
            $scope.cursos = results.data;
        }, function (error) {
            console.log('error');
        });
    }
}]);