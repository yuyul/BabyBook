app.factory('agendasService', ['$http', function ($http) {

    var serviceBase = "http://localhost:61073/";

    var agendasServiceFactory = {};

    var _getByAlumnoId = function (alumnoId) {
        return $http.get(serviceBase + 'api/agendas/getbyalumnoid/' + alumnoId).then(function (results) {
            return results;
        });
    };

    var _getById = function (controlId) {
        return $http.get(serviceBase + 'api/agendas/' + controlId).then(function (results) {
            return results;
        });

    };

    var _saveControl = function (control) {
        return $http.post(serviceBase + 'api/agendas', control).then(function (response) {
            return response;
        }, function(error)
        {
            console.log('error');
        });
    };

    agendasServiceFactory.getByAlumnoId = _getByAlumnoId;
    agendasServiceFactory.getById = _getById;
    agendasServiceFactory.saveControl = _saveControl;

    return agendasServiceFactory;

}]);