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

    $scope.curDate = '';

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

        if ($scope.curso.id === '') {
            $scope.curso.centroId = $rootScope.centroSeleccionado;

            cursosService.createCurso($scope.curso).then(function(response) {
                $location.path('/home');
            }, function(err) {
                $scope.message = err.error_description;
            });
        } else {
            cursosService.updateCurso($scope.curso).then(function(response) {
                $location.path('/cursos');
            }, function(err) {
                $scope.message = err.error_description;
            });
            
        }
    };

    $scope.editCurso = function (curso) {
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


}]);