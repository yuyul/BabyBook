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