var app = angular.module('BabyBookApp', ['ngRoute', 'LocalStorageModule', 'angular-loading-bar', 'wysiwyg.module', 'angularFileUpload']);

app.config(function($routeProvider) {

    $routeProvider.when("/home", {
            controller: "homeController",
            templateUrl: "/app/views/home.html"
        });

    $routeProvider.when("/home/:role",
        {
            controller: "homeyController",
            templateUrl: "/app/views/homey.html"
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

    $routeProvider.when("/clases", {
        controller: "clasesController",
        templateUrl: "/app/views/clases.html"
    });

    $routeProvider.when("/clases/new", {
        controller: "clasesController",
        templateUrl: "/app/views/newClase.html"
    });

    $routeProvider.when("/clases/edit/:id", {
        controller: "clasesController",
        templateUrl: "/app/views/newclase.html"
    });

    $routeProvider.when("/cursos", {
        controller: "cursosController",
        templateUrl: "/app/views/cursos.html"
    });

    $routeProvider.when("/cursos/new", {
        controller: "cursosController",
        templateUrl: "/app/views/newCurso.html"
    });

    $routeProvider.when("/cursos/edit/:id",
    {
        controller: "cursosController",
        templateUrl: "/app/views/newCurso.html"
    });

    $routeProvider.when("/alumnos", {
        controller: "alumnosController",
        templateUrl: "/app/views/alumnos.html"
    });

    $routeProvider.when("/alumnos/new", {
        controller: "alumnosController",
        templateUrl: "/app/views/newAlumno.html"
    });

    $routeProvider.when("/alumnos/edit/:id",
        {
            controller: "alumnosController",
            templateUrl: "/app/views/newAlumno.html"
        });

    $routeProvider.when("/profesor/alumnos",
        {
            controller: "profesoresController",
            templateUrl: "/app/views/profesor/alumnos.html"
        });

    $routeProvider.when("/data",
        {
            controller: "dataController",
            templateUrl:"/app/views/data.html"
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