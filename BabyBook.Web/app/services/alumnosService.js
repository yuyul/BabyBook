app.factory('alumnosService', ['$http', function ($http) {

    var serviceBase = "http://localhost:61073/";

    var alumnosServiceFactory = {};

    var _getAlumnosByCentro = function (centro) {
        return $http.get(serviceBase + 'api/alumnos/getbycentroid/' + centro).then(function (results) {
            return results;
        });
    };

    var _createAlumno = function (alumno) {
        return $http.post(serviceBase + 'api/alumnos', alumno).then(function (response) {
            return response;
        });
    };

    alumnosServiceFactory.getAlumnosByCentro = _getAlumnosByCentro;
    alumnosServiceFactory.createAlumno = _createAlumno;

    return alumnosServiceFactory;

}]);
