﻿var app = angular.module('BabyBookApp', ['ngRoute', 'LocalStorageModule', 'angular-loading-bar', 'wysiwyg.module', 'angularFileUpload', 'ngQuickDate', 'pascalprecht.translate']);

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

    $routeProvider.when("/alumno/agenda/:id",
        {
            controller: "agendasController",
            templateUrl: "/app/views/agenda/agenda.html"

        });

    $routeProvider.when("/familiar/alumnos",
        {
            controller: "familiaresController",
            templateUrl: "/app/views/familiar/alumnos.html"
        });

    $routeProvider.otherwise({ redirectTo: "/home" });
});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});

var translations_en = {
    HEADLINE: 'What an awesome module!',
    ROLES: {
        ADMIN: 'Administrator',
        GESTOR: 'Manager',
        PROFESOR: 'Teacher',
        FAMILIAR: 'Family'
    },
    CENTROS: 'Centers',
    PROFESORES: 'Teachers',
    CLASES: 'Classroom',
    ALUMNOS: 'Students',
    CURSOS: 'Courses',
    USUARIOS: 'Users',
    NO_CENTRO: 'You have not selected any center to work with, choose one of the following.',
    CREAR_CENTRO: 'or create a new',
    LOGIN: 'If you have Username and Password, you can use the button below to access the secured content.',
    SIGNUP: 'Use the button below to create Username and Password to access the secured content.',
    BTN_LOGIN: 'Login',
    BTN_SIGNUP: 'Sig nup',
    BUTTON_LANG_ES: 'Spanish',
    BUTTON_LANG_EN: 'English',
    BUTTON_LANG_CA: 'Catalonian',
    IDIOMA: 'Language',
    SALUDO: 'Welcome',
    INICIO: 'Home'
}

var translations_es = {
    HEADLINE: 'Que aplicación tan increible!',
    ROLES: {
        ADMIN: 'Administrador',
        GESTOR: 'Gestor',
        PROFESOR: 'Profesor',
        FAMILIAR: 'Familiar'
    },
    CENTROS: 'Centros',
    PROFESORES: 'Profesores',
    CLASES: 'Clases',
    ALUMNOS: 'Alumnos',
    CURSOS: 'Cursos',
    USUARIOS: 'Usuarios',
    NO_CENTRO: 'No ha seleccionado ningun centro con el que trabajar, seleccione uno de los siguientes.',
    CREAR_CENTRO: 'o cree un nuevo ',
    LOGIN: 'Si usted tiene Usuario y Contraseña, usted puede usar el siguiente boton para acceder al contenido seguro.',
    SIGNUP: 'Use el siguiente boton para crear un Usuario y Contraseña para acceder al area segura.',
    BTN_LOGIN: 'Entrar',
    BTN_SIGNUP: 'Registrarse',
    BUTTON_LANG_ES: 'Castellano',
    BUTTON_LANG_EN: 'Ingles',
    BUTTON_LANG_CA: 'Catalán',
    IDIOMA: 'Idioma',
    SALUDO: 'Bienvenido',
    INICIO: 'Inicio'
}

var translations_ca = {
    HEADLINE: 'Quina aplicació tan increible!',
    ROLES: {
        ADMIN: 'Administrador',
        GESTOR: 'Gestor',
        PROFESOR: 'Profesor',
        FAMILIAR: 'Familiar'
    },
    CENTROS: 'Centres',
    PROFESORES: 'Profesors',
    CLASES: 'Clases',
    ALUMNOS: 'Alumnes',
    CURSOS: 'Cursos',
    USUARIOS: 'Usuaris',
    NO_CENTRO: 'No ha seleccionat cap centre per treballar, seleccioni un dels següents.',
    CREAR_CENTRO: 'o crei un de nou ',
    LOGIN: 'Si voste te Usuari i Contrasenya, voste pot usar el següent botó per accedir al contingut segur.',
    SIGNUP: 'Utilitzi el següent botó per crear un Usuari i Contrasenya per poder accedir al area segura.',
    BTN_LOGIN: 'Entrada',
    BTN_SIGNUP: 'Registrarse',
    BUTTON_LANG_ES: 'Castella',
    BUTTON_LANG_EN: 'Angles',
    BUTTON_LANG_CA: 'Català',
    IDIOMA: 'Idioma',
    SALUDO: 'Benvingut',
    INICIO: 'Inici'
}


app.config(['$translateProvider', function($translateProvider) 
{
    $translateProvider
        .translations('en', translations_en)
        .translations('es', translations_es)
        .translations('ca', translations_ca)
        .preferredLanguage('en');
}]);

app.run(['authService', '$rootScope', function (authService, $rootScope) {
    authService.fillAuthData();
    $rootScope.centroSeleccionado = '';
}]);