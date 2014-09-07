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
    $scope.messageok = '';
    $scope.isAsignacion = false;
    $scope.isVerAlumnos = false;
    $scope.newClase = true;

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
        cargarClases();
    };

    var addClase = function () {
        $scope.clase.CentroId = $rootScope.centroSeleccionado;

        clasesService.createClase($scope.clase).then(function (response) {
            $scope.messageok = "Clase guardada corretamente";
        }, function (err) {
            $scope.message = err.error_description;
        });
    };

    var updateClase = function () {
        clasesService.updateClase($scope.clase).then(function (response) {
            $scope.messageok = "Clase guardada correctamente";
        }, function (error) {
            $scope.message = error.error_description;
        });
    };

    $scope.editClase = function (clase) {
        borraMensajes();
        if (clase === 'new') {
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
    };

    $scope.cargarAlumnos = function (cursoId) {

        if ($scope.isAsignacion) {
            alumnosService.getAlumnosSinAsignarByCentroCurso($rootScope.centroSeleccionado, cursoId).then(function (results) {
                $scope.alumnos = results.data;
            }, function (error) {
                console.log('error');
            });
        } else {
            alumnosService.getAlumnosByClaseCurso($scope.clase.id, cursoId).then(function (results) {
                $scope.alumnos = results.data;
            }, function (error) {
                console.log('error');
            });
        }
    };

    $scope.mostrarAlumnos = function (clase) {
        $scope.isAsignacion = true;
        $scope.isVerAlumnos = false;
        $scope.clase = clase;
        $scope.alumnos = [];

        cargaCursos();
        borraMensajes();
    };

    $scope.verAlumnos = function (clase) {
        $scope.isVerAlumnos = true;
        $scope.isAsignacion = false;
        $scope.clase = clase;
        $scope.alumnos = [];

        cargaCursos();
        borraMensajes();
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

        clasesService.asignarAlumnos(asignaciones).then(function(response) {
            $scope.messageok = "Asignación guardada correctamente";
        }, function(error) {
            $scope.message = error.error_description;
        });
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

        clasesService.eliminarAsignacion(asignaciones).then(function(response) {
            $scope.messageok = "Asignación eliminada correctamente";
        }, function(error) {
            $scope.message = error.error_description;
        });
    };

   

    var cargaCursos = function () {
        cursosService.getCursosByCentro($rootScope.centroSeleccionado).then(function (results) {
            $scope.cursos = results.data;
        }, function (error) {
            console.log('error');
        });
    };

    $scope.muestraCurso = function (curso) {
        alert(curso.id);
    };

    var borraMensajes = function() {
        $scope.message = '';
        $scope.messageok = '';
    }

    var cargarClases = function () {
        setTimeout(function () {
            clasesService.getClasesByCentro($rootScope.centroSeleccionado).then(function (results) {
                $scope.clases = results.data;
            }, function (error) {
                console.log('error');
            });
        }, 1000);
    };
}]);