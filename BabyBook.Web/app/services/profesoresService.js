app.factory('profesoresService', [
    '$http', function($http) {

        var serviceBase = "http://localhost:61073/";
        var profesoresServiceFactory = {};

        var _getProfesoresByCentro = function(centro) {
            return $http.get(serviceBase + 'api/profesores/getbycentroid/' + centro).then(function(results) {
                return results;
            });
        };

        var _createProfesor = function(profesor) {
            return $http.post(serviceBase + 'api/profesores', profesor).then(function(response) {
                return response;
            });
        };

        var _updateProfesor = function (profesor) {

            return $http.put(serviceBase + 'api/profesores/' + profesor.id, profesor).then(function(response) {
                return response;
            });
        };

        profesoresServiceFactory.getProfesoresByCentro = _getProfesoresByCentro;
        profesoresServiceFactory.createProfesor = _createProfesor;
        profesoresServiceFactory.updateProfesor = _updateProfesor;

        return profesoresServiceFactory;
    }
]);