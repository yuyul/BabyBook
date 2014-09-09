app.factory('alumnosService', ['$http', '$upload', function ($http, $upload) {

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

    var _uploadAlumno = function (dataalumno, file) {
        $upload.upload(
            {
                url: serviceBase + 'api/alumnos/uploadAlumno',
                data: { alumno: dataalumno },
                file: file
            }).progress(function (evt) {
                console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
            }).success(function (data, status, headers, config) {
                console.log(data);
                return true;
            });
    };

    var _updateAlumno = function (id, dataalumno, file) {
        $upload.upload(
            {
                url: serviceBase + 'api/alumnos/updateAlumno/' + id,
                data: { alumno: dataalumno },
                file: file
            }).progress(function (evt) {
                console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
            }).success(function (data, status, headers, config) {
                console.log(data);
                return data;
            });
    };

    var _createAlumno = function (alumno) {
        return $http.post(serviceBase + 'api/alumnos/creaAlumno', alumno).then(function (response) {
            return response;
        });
    };

    var _deleteAlumno = function(alumnoId) {
        return $http.delete(serviceBase + 'api/alumnos/deleteAlumno/' + alumnoId).then(function(response) {
            return response;
        });
    };

    var _getAlumnosSinAsignar = function (centroId) {
        return $http.get(serviceBase + 'api/alumnos/getalumnossinasignar/' + centroId).then(function (results) {
            return results;
        });
    };

    var _getAlumnosSinAsignarByCentroCurso = function (centroId, cursoId) {
        return $http.get(serviceBase + 'api/alumnos/getalumnossinasignarbycentrocurso?centroId=' + centroId + '&cursoId=' + cursoId).then(function (results) {
            return results;
        });
    };

    var _getAlumnosByClase = function (claseId) {
        return $http.get(serviceBase + 'api/alumnos/getalumnosbyclase/' + claseId).then(function (results) {
            return results;
        });
    };

    var _getAlumnosByClaseCurso = function (claseId, cursoId) {
        return $http.get(serviceBase + 'api/alumnos/getalumnosbyclasecurso?claseId=' + claseId + '&cursoId=' + cursoId).then(function (results) {
            return results;
        });

    };
    var _getAlumnosByProfesor = function () {
        return $http.get(serviceBase + 'api/alumnos/getalumnosbyprofesorcurso').then(function (results) {
            return results;
        });
    };

    var _addFamiliar = function (alumnoId, familiar) {
        return $http.post(serviceBase + 'api/familiares/nuevoFamiliar?alumnoId=' + alumnoId, familiar).then(function (response) {
            return response;
        });
    };

    var _updateFamiliar = function(familiarId, familiar) {
        return $http.put(serviceBase + 'api/familiares/updateFamiliar?familiarId=' + familiarId, familiar).then(function(response) {
            return response;
        });
    };

    var _deleteAsignacion = function(familiarId, alumnoId) {
        return $http.delete(serviceBase + 'api/familiares/deleteAsignacion?familiarId=' + familiarId + '&alumnoId=' + alumnoId).then(function(response) {
            return response;
        });
    };

    var _getfamiliaresbyalumno = function (alumnoId) {
        return $http.get(serviceBase + 'api/familiares/getfamiliaresbyalumno/' + alumnoId).then(function (results) {
            return results;
        });
    };

    var _getAlumnosByFamiliar = function () {
        return $http.get(serviceBase + 'api/alumnos/getalumnosbyfamiliar').then(function (results) {
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
    alumnosServiceFactory.uploadAlumno = _uploadAlumno;
    alumnosServiceFactory.getAlumnosByClaseCurso = _getAlumnosByClaseCurso;
    alumnosServiceFactory.getAlumnosSinAsignarByCentroCurso = _getAlumnosSinAsignarByCentroCurso;
    alumnosServiceFactory.deleteAlumno = _deleteAlumno;

    alumnosServiceFactory.addFamiliar = _addFamiliar;
    alumnosServiceFactory.updateFamiliar = _updateFamiliar;
    alumnosServiceFactory.deleteAsignacion = _deleteAsignacion;

    alumnosServiceFactory.getFamiliaresByAlumno = _getfamiliaresbyalumno;
    alumnosServiceFactory.getAlumnosByFamiliar = _getAlumnosByFamiliar;

    return alumnosServiceFactory;

}]);
