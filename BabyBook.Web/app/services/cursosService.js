app.factory('cursosService', ['$http', function ($http) {
    var serviceBase = "http://localhost:61073/";
    var cursosServiceFactory = {};

    var _getCursosByCentro = function (centro) {
        return $http.get(serviceBase + 'api/cursos/getbycentroid/' + centro).then(function (results) {
            return results;
        });
    };

    var _createCurso = function (curso) {
        return $http.post(serviceBase + 'api/cursos', curso).then(function(response) {
            return response;
        });
    };

    cursosServiceFactory.getCursosByCentro = _getCursosByCentro;
    cursosServiceFactory.createCurso = _createCurso;
    
    return cursosServiceFactory;

}]);