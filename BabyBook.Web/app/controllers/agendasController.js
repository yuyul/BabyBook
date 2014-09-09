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

            var fecha = new Date();
            $scope.newControl = true;
            $scope.control = {
                fecha: fecha,
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
        var save = true;
        if ($scope.newControl) {
            var result = $scope.controles.filter(function (elem) {
                var fecha = new Date(elem.fecha);

                return fecha.getDate() == control.fecha.getDate() && fecha.getMonth() == control.fecha.getMonth() && fecha.getFullYear() == control.fecha.getFullYear();
            });

            if (result.length > 0)
            {
                save = false;
                alert('Ya existe un control para el día seleccionado. Los datos no serán guardados.');
            }
        }

        if (save) {
            if ($scope.newControl) {
                control.fecha = (control.fecha.getMonth() + 1) + '/' + control.fecha.getDate() + '/' + control.fecha.getFullYear();
            }

            agendasService.saveControl(control);

            setTimeout(function () {
                agendasService.getByAlumnoId($routeParams.id).then(function (results) {
                    $scope.controles = results.data;
                });
            }, 1000);
        }
    };

    
}]);