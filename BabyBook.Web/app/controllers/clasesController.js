app.controller('clasesController', ['$scope', '$location', 'clasesService', '$rootScope', 'alumnosService', 'cursosService', '$routeParams', function ($scope, $location, clasesService, $rootScope, alumnosService, cursosService, $routeParams) {

    console.log('clases');

    $scope.clases = [];

    $scope.clase = {
        id: '',
        nombre: '',
        centroId: ''
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

    if ($routeParams.id === undefined) {
        clasesService.getClasesByCentro($rootScope.centroSeleccionado).then(function(results) {
            $scope.clases = results.data;
        }, function(error) {
            console.log('error');
        });
    } else {
        clasesService.getByClaseId($routeParams.id).then(function(results) {
            $scope.clase = results.data;
        }, function(error) {
            console.log('error');
        });
    }

    $scope.save = function() {
        if ($scope.clase.id == '') {
            addClase();
        } else {
            updateClase();
        }
    };

    var addClase = function () {
        $scope.clase.CentroId = $rootScope.centroSeleccionado;

        clasesService.createClase($scope.clase).then(function (response) {
            $location.path('/home');
        }, function (err) {
            $scope.message = err.error_description;
        });
    };

    var updateClase = function () {
        clasesService.updateClase($scope.clase).then(function (response) {
            $location('/home');
        }, function (error) {
            $scope.message = error.error_description;
        });
    };

    $scope.editClase = function (clase) {

        if (clase === 'new')
        {
            $scope.newClase = true;

            $scope.clase = {
                id: 0,
                nombre: '',
                centroId: $rootScope.centroSeleccionado
            }

        } else {
            $scope.newClase = false;
            $scope.clase = clase;
        }
    }

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

    $scope.asignarAlumnos = function(claseId, cursoId) {
        //console.log($scope.alumnos);

        var asignaciones = [];

        $scope.alumnos.filter(function(element) {
            return element.seleccionado == true;
        }).forEach(function(element, index, array) {
            var asignacion = {
                alumnoId: element.id,
                cursoId: cursoId,
                claseId: claseId
            };

            asignaciones.push(asignacion);
        });

        clasesService.asignarAlumnos(asignaciones);
    };

    $scope.eliminarAsignacion = function (claseId, cursoId) {

        var asignaciones = [];

        $scope.alumnos.filter(function (element) {
            return element.seleccionado == true;
        }).forEach(function (element, index, array) {
            var asignacion = {
                alumnoId: element.id,
                cursoId: cursoId,
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