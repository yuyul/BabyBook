﻿app.controller('indexController', ['$translate', '$scope', '$location', 'authService', '$rootScope', function ($translate, $scope, $location, authService, $rootScope) {

    console.log('index');

    $scope.logOut = function() {
        authService.logOut();
        $rootScope.centroSeleccionado = "";
        $location.path('/home');
    };

    $scope.changeLanguage = function (langkey) {
        $translate.use(langkey);
    };

    $scope.authentication = authService.authentication;

}]);