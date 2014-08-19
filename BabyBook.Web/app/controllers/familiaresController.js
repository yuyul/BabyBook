app.controller('familiaresController', ['$scope', 'alumnosService', function($scope, alumnosService) {
    $scope.alumnos = [];

    alumnosService.getAlumnosByFamiliar().then(function (results) {
        $scope.alumnos = results.data;
    });
}]);