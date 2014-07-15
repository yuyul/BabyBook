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
            var resultado = "";
            $http.get(serviceBase + 'api/account/InfoUser').then(function(results) {
                resultado =  results.data;
            });

            return resultado;
        };

        var _login = function(loginData) {

            var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

            var deferred = $q.defer();

            $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function(response) {



                _authentication.isAuth = true;
                _authentication.userName = loginData.userName;
                _authentication.roleName = _getInfoUser();

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