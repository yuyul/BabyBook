app.factory('profesoresService', [
    '$http', function($http) {

        var serviceBase = "http://localhost:61073/";
        var profesoresServiceFactory = {};

        var _getProfesoresByCentro = function(centro) {
            return $http.get(serviceBase + 'api/profesores/GetByCentro/' + centro).then(function(results) {
                return results;
            });
        };

        profesoresServiceFactory.getProfesoresByCentro = _getProfesoresByCentro;
    }
]);