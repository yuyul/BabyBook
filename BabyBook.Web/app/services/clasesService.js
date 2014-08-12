app.factory('clasesService', ['$http', function ($http) {

    var serviceBase = "http://localhost:61073/";
    var clasesServiceFactory = {};

    var _getClasesByCentro = function (centro) {
        return $http.get(serviceBase + 'api/clases/getbycentroid/' + centro).then(function (results) {
            return results;
        });
    };

    var _getByClaseId = function(claseId) {
        return $http.get(serviceBase + 'api/clases/getbyclaseid/' + claseId).then(function(results) {
            return results;
        });
    };

    var _createClase = function (clase) {
        return $http.post(serviceBase + 'api/clases/NuevaClase', clase).then(function(response) {
            return response;
        });
    };

    var _asignarAlumno = function(asignacion) {
        return $http.post(serviceBase + 'api/clases/asignaralumno', asignacion).then(function(response) {
            return response;
        });
    };

    var _eliminarAsignacionAlumno = function (asignacion) {
        return $http.post(serviceBase + 'api/clases/eliminarasignacionalumno', asignacion).then(function (response) {
            return response;
        });

    };

    var _updateClase = function(clase) {
        return $http.put(serviceBase + 'api/clases/updateclase/' + clase.id, clase).then(function(response) {
            return response;
        });
    };

    clasesServiceFactory.getClasesByCentro = _getClasesByCentro;
    clasesServiceFactory.createClase = _createClase;
    clasesServiceFactory.asignarAlumnos = _asignarAlumno;
    clasesServiceFactory.eliminarAsignacion = _eliminarAsignacionAlumno;
    clasesServiceFactory.updateClase = _updateClase;
    clasesServiceFactory.getByClaseId = _getByClaseId;

    return clasesServiceFactory;

}]);