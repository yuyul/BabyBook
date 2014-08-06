app.factory('clasesService', ['$http', function ($http) {

    var serviceBase = "http://localhost:61073/";
    var clasesServiceFactory = {};

    var _getClasesByCentro = function (centro) {
        return $http.get(serviceBase + 'api/clases/getbycentroid/' + centro).then(function (results) {
            return results;
        });
    };

    var _createClase = function (clase) {
        return $http.post(serviceBase + 'api/clases', clase).then(function(response) {
            return response;
        });
    };

    clasesServiceFactory.getClasesByCentro = _getClasesByCentro;
    clasesServiceFactory.createClase = _createClase;

    return clasesServiceFactory;

}]);