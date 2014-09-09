app.controller('cursosController', ['$scope', '$location', 'cursosService', '$rootScope', '$routeParams', function ($scope, $location, cursosService, $rootScope, $routeParams) {

    console.log('cursos');

    $scope.cursos = [];

    $scope.curso = {
        id: '',
        descripcion: '',
        fechaInicio: '',
        fechaFin: '',
        centroId: ''
    };

    $scope.message = '';
    $scope.messageok = '';
    $scope.newCurso = true;

    if ($routeParams.id === undefined) {
        cursosService.getCursosByCentro($rootScope.centroSeleccionado).then(function(results) {
            $scope.cursos = results.data;
        }, function(error) {
            console.log('error');
        });
    } else {
        cursosService.getCursoById($routeParams.id).then(function(results) {
            $scope.curso = results.data;
        }, function(error) {
            console.log('error');
        });
    }

    $scope.createCurso = function () {

        $scope.curso.fechaFin = ($scope.curso.fechaFin.getMonth() + 1) + '/' + $scope.curso.fechaFin.getDate() + '/' + $scope.curso.fechaFin.getFullYear();
        $scope.curso.fechaInicio = ($scope.curso.fechaInicio.getMonth() + 1) + '/' + $scope.curso.fechaInicio.getDate() + '/' + $scope.curso.fechaInicio.getFullYear();

        if ($scope.newCurso) {
            $scope.curso.centroId = $rootScope.centroSeleccionado;

            cursosService.createCurso($scope.curso).then(function(response) {
                $scope.messageok = "Curso guardado correctamente";
            }, function(err) {
                $scope.message = err.error_description;
            });
        } else {
            cursosService.updateCurso($scope.curso).then(function(response) {
                $scope.messageok = "Curso actualizado correctamente";
            }, function(err) {
                $scope.message = err.error_description;
            });
            
        }
        cargarCursos();
    };

    $scope.editCurso = function (curso) {
        limpiarMensajes();
        if (curso === 'new') {
            $scope.newCurso = true;
            $scope.curso = {
                id: '0',
                descripcion: '',
                fechaInicio: '',
                fechafin: '',
                centroId: $rootScope.centroSeleccionado
            };
        } else {
            $scope.newCurso = false;
            $scope.curso = curso;
        }
    };

    var limpiarMensajes = function() {
        $scope.message = '';
        $scope.messageok = '';
    };

    var cargarCursos = function () {
        setTimeout(function () {
            cursosService.getCursosByCentro($rootScope.centroSeleccionado).then(function (results) {
                $scope.cursos = results.data;
            }, function (error) {
                console.log('error');
            });
        }, 1000);
    };
}]);