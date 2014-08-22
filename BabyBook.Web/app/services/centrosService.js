app.factory('centrosService', [
    '$http', function($http) {

        var serviceBase = "http://localhost:61073/";
        var centrosServiceFactory = {};

        var _getCentros = function() {

            return $http.get(serviceBase + 'api/centros').then(function(results) {
                return results;
            });
        };

        var _getCentrosByUser = function() {
            return $http.get(serviceBase + 'api/centros/GetByUserId').then(function(results) {
                return results;
            });
        };

        var _addCentro = function(centro) {
            return $http.post(serviceBase + 'api/centros/', centro).then(function(results) {
                return results;
            });
        };

        var _updateCentro = function (centro) {
            return $http.put(serviceBase + 'api/centros/UpdateCentro/' + centro.id, centro).then(function (results) {
                return results;
            });
        };

        var _deleteCentro = function (centroId) {
            return $http.delete(serviceBase + 'api/centros/DeleteCentro/' + centroId).then(function (results) {
                return results;
            });
        };

        centrosServiceFactory.getCentros = _getCentros;
        centrosServiceFactory.getCentrosByUser = _getCentrosByUser;
        centrosServiceFactory.addCentro = _addCentro;
        centrosServiceFactory.updateCentro = _updateCentro;
        centrosServiceFactory.deleteCentro = _deleteCentro;

        return centrosServiceFactory;
    }
]);