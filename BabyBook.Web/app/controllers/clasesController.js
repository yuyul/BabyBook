app.controller('clasesController', ['$scope', '$location', 'clasesService', '$rootScope', 'alumnosService', 'cursosService', function ($scope, $location, clasesService, $rootScope, alumnosService, cursosService) {

    console.log('clases');

    $scope.clases = [];

    $scope.clase = {
        Nombre: '',
        CentroId: ''
    };

    $scope.asignacion = {
        AlumnoId: '',
        ClaseId: '',
        CursoId: ''
    };

    $scope.alumnos = [];
    $scope.cursos = [];
    $scope.cursoSeleccionado = '';
    $scope.message = '';

    clasesService.getClasesByCentro($rootScope.centroSeleccionado).then(function (results) {
        $scope.clases = results.data;
    }, function (error) {
        console.log('error');
    });

    $scope.addClase = function () {
        $scope.clase.CentroId = $rootScope.centroSeleccionado;

        clasesService.createClase($scope.clase).then(function (response) {
            $location.path('/home');
        }, function (err) {
            $scope.message = err.error_description;
        });
    };

    $scope.mostrarAlumnos = function(clase) {
        $scope.clase = clase;

        alumnosService.getAlumnosByCentro($rootScope.centroSeleccionado).then(function(results) {
            $scope.alumnos = results.data;
        }, function(error) {
            console.log('error');
        });

        cursosService.getCursosByCentro($rootScope.centroSeleccionado).then(function(results) {
            $scope.cursos = results.data;
        }, function(error) {
            console.log('error');
        });
    };

    $scope.asignarAlumnos = function(claseId) {
        //console.log($scope.alumnos);

        

        var asignaciones = [];

        $scope.alumnos.filter(function(element) {
            return element.seleccionado == true;
        }).forEach(function(element, index, array) {
            var asignacion = {
                alumnoId: element.id,
                cursoId: $scope.cursoSeleccionado.id,
                claseId: claseId
            };

            asignaciones.push(asignacion);
        });

        clasesService.asignarAlumnos(asignaciones);
    };

}]);