app.controller('profesoresController', ['$scope', '$location', 'profesoresService', '$rootScope', 'clasesService', function ($scope, $location, profesoresService, $rootScope, clasesService) {

    console.log('profesores');

    $scope.profesores = [];
    $scope.clases = [];

    $scope.profesor = {
        Nombre: '',
        CentroId: '',
        ClaseId: ''
    };

    $scope.message = '';

    profesoresService.getProfesoresByCentro($rootScope.centroSeleccionado).then(function(results) {
        $scope.profesores = results.data;
    }, function(error)
    {
        console.log('error');
    });

    $scope.addProfesor = function() {
        $scope.profesor.CentroId = $rootScope.centroSeleccionado;

        profesoresService.createProfesor($scope.profesor).then(function(response) {
            $location.path('/home');
        }, function(err) {
            $scope.message = err.error_description;
        });
    };

    $scope.mostrarClases = function (profesor) {
        $scope.profesor = profesor;

        clasesService.getClasesByCentro($rootScope.centroSeleccionado).then(function (results) {
            $scope.clases = results.data;
        }, function (error) {
            console.log('error');
        });

    };

    $scope.asignarClase = function (claseId) {
        $scope.profesor.claseId = claseId;

        profesoresService.updateProfesor($scope.profesor).then(function (response) {
            $location.path('/home');
        }, function (error) {
            console.log('error');
        });

    };

}]);