app.controller('agendasController', ['$scope', '$routeParams', 'agendasService', '$location', function ($scope, $routeParams, agendasService, $location) {

    $scope.controles = [];
    $scope.agenda = {};

    agendasService.getByAlumnoId($routeParams.id).then(function(results) {
        $scope.controles = results.data;
    });
    
    $scope.verControl = function (control)
    {
        $scope.agenda = control;
    }

    $scope.editEvent = function (event) {
        $scope.opts = ['on', 'off'];

        if (event === 'new') {
            $scope.newEvent = true;
            $scope.event = { name: '', shortname: '', phonenumber: '', state: '', voteoptions: [{ id: 1, name: '' }] };
        }
        else {
            $scope.newEvent = false;
            $scope.event = event;
        }
    };

}]);