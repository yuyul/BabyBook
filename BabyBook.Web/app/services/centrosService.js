app.factory('centrosService', [
    '$http', function($http) {

        var serviceBase = "http://localhost:61073/";
        var centrosServiceFactory = {};

        var _getCentros = function() {

            return $http.get(serviceBase + 'api/centros').then(function(results) {
                return results;
            });
        };

        centrosServiceFactory.getCentros = _getCentros;
        return centrosServiceFactory;
    }
]);