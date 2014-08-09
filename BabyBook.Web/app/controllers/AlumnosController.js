﻿app.controller('alumnosController', ['$scope', 'alumnosService', '$rootScope', '$location', '$routeParams', function ($scope, alumnosService, $rootScope, $location, $routeParams) {

    $scope.alumnos = [];

    $scope.alumno = {
        id: '',
        nombre: '',
        primerApellido: '',
        segundoApellido: '',
        fechaAlta: '',
        fechaBaja: '',
        fechaNacimiento: '',
        centroId: ''
    };
    
    $scope.message = '';


    if ($routeParams.id === undefined) {
        alumnosService.getAlumnosByCentro($rootScope.centroSeleccionado).then(function (results) {
            $scope.alumnos = results.data;
        });
    } else {
        alumnosService.getAlumnoById($routeParams.id).then(function (results) {
            $scope.alumno = results.data;
        });
    }

    $scope.createAlumno = function () {

        if ($scope.alumno.id === '') {
            $scope.alumno.CentroId = $rootScope.centroSeleccionado;

            alumnosService.createAlumno($scope.alumno).then(function (response) {
                $location.path('/home');
            }, function (err) {
                $scope.message = err.error_description;
            });
        } else {
            alumnosService.updateAlumno($scope.alumno).then(function (response) {
                $location.path('/alumnos');
            }, function (err) {
                $scope.message = err.error_description;
            });
        }
    };
}]);