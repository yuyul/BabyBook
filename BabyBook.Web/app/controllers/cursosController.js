app.controller('cursosController', ['$scope', '$location', 'cursosService', '$rootScope', function ($scope, $location, cursosService, $rootScope) {

    console.log('cursos');

    $scope.cursos = [];

    $scope.curso = {
        fechaInicio: '',
        fechaFin: '',
        centroId: ''
    };

    $scope.message = '';

    cursosService.getCursosByCentro($rootScope.centroSeleccionado).then(function (results) {
        $scope.cursos = results.data;
    }, function (error) {
        console.log('error');
    });

    $scope.createCurso = function () {
        $scope.curso.centroId = $rootScope.centroSeleccionado;

        cursosService.createCurso($scope.curso).then(function (response) {
            $location.path('/home');
        }, function (err) {
            $scope.message = err.error_description;
        });
    };


}]);