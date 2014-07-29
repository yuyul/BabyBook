app.factory('usuariosService', [
    '$http', function($http) {

        var serviceBase = "http://localhost:61073/";
        var usuariosServiceFactory = {};

        var _getUsuarios = function() {

            return $http.get(serviceBase + 'api/Users').then(function(results) {
                return results;
            });
        };

        usuariosServiceFactory.getUsuarios = _getUsuarios;

        return usuariosServiceFactory;
    }
]);