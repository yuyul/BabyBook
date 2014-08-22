///#source 1 1 /app/services/agendasService.js
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
///#source 1 1 /app/services/alumnosService.js
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
                return data;
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

   /* var _updateAlumno = function (alumno) {
        return $http.put(serviceBase + 'api/alumnos/' + alumno.id, alumno).then(function (response) {
            return response;
        });
    };*/

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

    alumnosServiceFactory.addFamiliar = _addFamiliar;
    alumnosServiceFactory.getFamiliaresByAlumno = _getfamiliaresbyalumno;
    alumnosServiceFactory.getAlumnosByFamiliar = _getAlumnosByFamiliar;

    return alumnosServiceFactory;

}]);

///#source 1 1 /app/services/authInterceptorService.js
app.factory('authInterceptorService', ['$q', '$location', 'localStorageService', function ($q, $location, localStorageService) {

    var authInterceptorServiceFactory = {};

    var _request = function(config) {

        config.headers = config.headers || {};

        var authData = localStorageService.get('authorizationData');
        if (authData) {
            config.headers.Authorization = 'Bearer ' + authData.token;
        }

        return config;
    };

    var _responseError = function(rejection) {
        if (rejection.status === 401) {
            $location.path('/login');
        }
        return $q.reject(rejection);
    };

    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;

    return authInterceptorServiceFactory;
}]);
///#source 1 1 /app/services/authService.js
app.factory('authService', [
    '$http', '$q', 'localStorageService', function($http, $q, localStorageService) {

        var serviceBase = "http://localhost:61073/";
        var authServiceFactory = {};

        var _authentication = {
            isAuth: false,
            userName: "",
            roleName: ""
        };

        var _saveRegistration = function(registration) {

            _logOut();

            return $http.post(serviceBase + 'api/account/register', registration).then(function(response) {
                return response;
            });
        };

        var _getInfoUser = function () {

            var roleData = {
                roleName: "",
                userName: ""
            };

            $http.get(serviceBase + 'api/account/InfoUser').success(function(results) {
                roleData = results.roleName;

                //_authentication.roleName = roleData.roleName;
            });

            return roleData.roleName;
        };

        var _login = function(loginData) {

            var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

            var deferred = $q.defer();

            $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function(response) {


                console.log(response);
                _authentication.isAuth = true;
                _authentication.userName = loginData.userName;
                _authentication.roleName = response.roleName;

                localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName, roleName: _authentication.roleName });

                deferred.resolve(response);
            }).error(function(err, status) {
                _logOut();
                deferred.reject(err);
            });

            return deferred.promise;
        };

        var _logOut = function() {

            localStorageService.remove('authorizationData');

            _authentication.isAuth = false;
            _authentication.userName = "";
            _authentication.roleName = "";
        };

        var _fillAuthData = function() {

            var authData = localStorageService.get('authorizationData');

            if (authData) {
                _authentication.isAuth = true;
                _authentication.userName = authData.userName;
                _authentication.roleName = authData.roleName;
            }
        };

        authServiceFactory.saveRegistration = _saveRegistration;
        authServiceFactory.login = _login;
        authServiceFactory.logOut = _logOut;
        authServiceFactory.fillAuthData = _fillAuthData;
        authServiceFactory.authentication = _authentication;

        return authServiceFactory;
    }
]);
///#source 1 1 /app/services/centrosService.js
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
///#source 1 1 /app/services/clasesService.js
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
///#source 1 1 /app/services/cursosService.js
app.factory('cursosService', ['$http', function ($http) {
    var serviceBase = "http://localhost:61073/";
    var cursosServiceFactory = {};

    var _getCursoById = function(id) {
        return $http.get(serviceBase + 'api/cursos/getbyid/' + id).then(function(results) {
            return results;
        });
    };

    var _getCursosByCentro = function (centro) {
        return $http.get(serviceBase + 'api/cursos/getbycentroid/' + centro).then(function (results) {
            return results;
        });
    };

    var _createCurso = function (curso) {
        return $http.post(serviceBase + 'api/cursos/nuevocurso', curso).then(function(response) {
            return response;
        });
    };

    var _updateCurso = function(curso) {
        return $http.put(serviceBase + 'api/cursos/updatecurso/' + curso.id, curso).then(function(response) {
            return response;
        });
    };

    cursosServiceFactory.getCursoById = _getCursoById;
    cursosServiceFactory.getCursosByCentro = _getCursosByCentro;
    cursosServiceFactory.createCurso = _createCurso;
    cursosServiceFactory.updateCurso = _updateCurso;

    return cursosServiceFactory;

}]);
///#source 1 1 /app/services/profesoresService.js
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

            return $http.put(serviceBase + 'api/profesores/updateProfesor/' + profesor.id, profesor).then(function (response) {
                return response;
            });
        };

        profesoresServiceFactory.getProfesoresByCentro = _getProfesoresByCentro;
        profesoresServiceFactory.createProfesor = _createProfesor;
        profesoresServiceFactory.updateProfesor = _updateProfesor;

        return profesoresServiceFactory;
    }
]);
///#source 1 1 /app/services/usuariosService.js
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
