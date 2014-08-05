var app = angular.module('BabyBookApp', ['ngRoute', 'LocalStorageModule', 'angular-loading-bar']);

app.config(function($routeProvider) {

    $routeProvider.when("/home", {
            controller: "homeController",
            templateUrl: "/app/views/home.html"
        });

    $routeProvider.when("/login", {
        controller: "loginController",
        templateUrl: "/app/views/login.html"
    });

    $routeProvider.when("/signup", {
        controller: "signupController",
        templateUrl: "/app/views/signup.html"
    });

    $routeProvider.when("/centros", {
        controller: "centrosController",
        templateUrl: "/app/views/centros.html"
    });

    $routeProvider.when("/admin/centros", {
        controller: "adminCentrosController",
        templateUrl: "/app/views/centros.html"
    });

    $routeProvider.when("/centros/new", {
        controller: "centrosController",
        templateUrl: "/app/views/newCentro.html"
    });

    $routeProvider.when("/admin/usuarios", {
        controller: "usuariosController",
        templateUrl: "/app/views/usuarios.html"
    });

    $routeProvider.when("/profesores", {
        controller: "profesoresController",
        templateUrl: "/app/views/profesores.html"
    });

    $routeProvider.when("/profesores/new", {
        controller: "profesoresController",
        templateUrl: "/app/views/newProfesor.html"
    });

    $routeProvider.otherwise({ redirectTo: "/home" });
});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});

app.run(['authService', '$rootScope', function (authService, $rootScope) {
    authService.fillAuthData();
    $rootScope.centroSeleccionado = '';
}]);