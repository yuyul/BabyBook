app.factory('alumnosService', ['$http', function ($http) {

    var serviceBase = "http://localhost:61073/";

    var alumnosServiceFactory = {};

    var _getAlumnosByCentro = function (centro) {
        return $http.get(serviceBase + 'api/alumnos/getbycentroid/' + centro).then(function (results) {
            return results;
        });
    };

    var _getAlumnoById = function (id) {
        return $http.get(serviceBase  + 'api/alumnos/getbyid/' + id).then(function(results) {
            return results;
        });
    };

    var _createAlumno = function (alumno) {
        return $http.post(serviceBase + 'api/alumnos', alumno).then(function (response) {
            return response;
        });
    };

    var _updateAlumno = function (alumno) {
        return $http.put(serviceBase + 'api/alumnos/' + alumno.id, alumno).then(function (response) {
            return response;
        });
    };

    var _getAlumnosSinAsignar = function (centroId) {
        return $http.get(serviceBase + 'api/alumnos/getalumnossinasignar/' + centroId).then(function (results) {
            return results;
        });
    };

    var _getAlumnosByClase = function (claseId) {
        return $http.get(serviceBase + 'api/alumnos/getalumnosbyclase/' + claseId).then(function (results) {
            return results;
        });
    };

    var _getAlumnosByProfesor = function (profesorId, cursoId) {
        return $http.get(serviceBase + 'api/alumnos/getalumnosbyprofesorcurso/?profesorId=' + profesorId + '&cursoId=' + cursoId).then(function (results) {
            return results;
        });
    };

    alumnosServiceFactory.getAlumnosByCentro = _getAlumnosByCentro;
    alumnosServiceFactory.createAlumno = _createAlumno;
    alumnosServiceFactory.getAlumnoById = _getAlumnoById;
    alumnosServiceFactory.updateAlumno = _updateAlumno;
    alumnosServiceFactory.getAlumnosSinAsignar = _getAlumnosSinAsignar;
    alumnosServiceFactory.getAlumnosByClase = _getAlumnosByClase;
    alumnosServiceFactory.getAlumnosByProfesor = _getAlumnosByProfesor;

    return alumnosServiceFactory;

}]);
