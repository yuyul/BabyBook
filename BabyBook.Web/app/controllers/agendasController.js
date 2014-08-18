app.controller('agendasController', ['$scope', '$routeParams', 'agendasService', '$location', function ($scope, $routeParams, agendasService, $location) {

    $scope.controles = [];
    $scope.control = {};
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
            $scope.control = control;
        }
        
    }

    $scope.save = function (control) {
        agendasService.saveControl(control);
    };

    $scope.today = function () {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
        $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function (date, mode) {
        return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
    };

    $scope.toggleMin = function () {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.initDate = new Date('2016-15-20');
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
}]);