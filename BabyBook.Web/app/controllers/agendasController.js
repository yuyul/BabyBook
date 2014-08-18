app.controller('agendasController', ['$scope', '$routeParams', 'agendasService', '$location', function ($scope, $routeParams, agendasService, $location) {

    $scope.controles = [];
    $scope.agenda = {};
    $scope.newControl = '';

    agendasService.getByAlumnoId($routeParams.id).then(function(results) {
        $scope.controles = results.data;
    });
    
    $scope.editControl = function (control)
    {
        if (control === 'new') {
            $scope.newControl = true;
            $scope.control = {
                fecha: '',
                alumnoId: $routeParams.id,
                observacionesCasa: '',
                observacionesCentro: '',
                estadoDia: '',
                comida: '',
                siesta: '',
                merienda: '',
                deposicion: ''
            }
        } else {
            $scope.newControl = false;
            $scope.agenda = control;
        }
        
    }

    $scope.save = function (control) {
        agendasService.saveControl(control);
    };

}]);