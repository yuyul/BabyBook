var app = angular.module('BabyBookApp', ['ngRoute', 'LocalStorageModule', 'angular-loading-bar', 'wysiwyg.module', 'angularFileUpload', 'ngQuickDate', 'pascalprecht.translate']);

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

    $routeProvider.when("/usuario",
    {
        controller: "usuarioController",
        templateUrl:" /app/views/usuario.html"
    });

    $routeProvider.otherwise({ redirectTo: "/home" });
});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});

var translations_en = {
    HEADLINE: 'Application nurseries',
    ROLES: {
        ADMIN: 'Administrator',
        GESTOR: 'Manager',
        PROFESOR: 'Teacher',
        FAMILIAR: 'Family'
    },
    CENTROS: 'Centers',
    CENTRO: 'Center',
    PROFESORES: 'Teachers',
    PROFESOR: 'Teacher',
    CLASES: 'Classrooms',
    CLASE: 'Classroom',
    ALUMNOS: 'Students',
    ALUMNO: 'Student',
    CURSOS: 'Courses',
    CURSO: 'Course',
    USUARIOS: 'Users',
    NO_CENTRO: 'You have not selected any center to work with, choose one of the following.',
    CREAR_CENTRO: 'or create a new',
    LOGIN: 'If you have Username and Password, you can use the button below to access the secured content.',
    SIGNUP: 'Use the button below to create Username and Password to access the secured content.',
    BTN_LOGIN: 'Login',
    BTN_SIGNUP: 'Signup',
    BUTTON_LANG_ES: 'Spanish',
    BUTTON_LANG_EN: 'English',
    BUTTON_LANG_CA: 'Catalonian',
    IDIOMA: 'Language',
    SALUDO: 'Welcome',
    INICIO: 'Home',
    NUEVO: 'New',
    EDITAR: 'Edit',
    GUARDAR: 'Save',
    ELIMINAR: 'Remove',
    CENTRO_CAMPOS: {
        ID: 'Id',
        NOMBRE: 'Name',
        DIRECCION: 'Street Address',
        FECHA_ALTA: 'Date added'
    },
    PROFESOR_CAMPOS: {
        ID: 'Id',
        NOMBRE: 'Name',
        PRIMER_APELLIDO: 'First Name',
        SEGUNDO_APELLIDO: 'Second Name',
        CLASE: 'Classroom'
    },
    CLASE_CAMPOS: {
        ID: 'Id',
        NOMBRE: 'Name'
    },
    ALUMNO_CAMPOS: {
        ID: 'Id',
        NOMBRE: 'Name',
        PRIMER_APELLIDO: 'First Name',
        SEGUNDO_APELLIDO: 'Second Surname',
        APELLIDOS: 'Surnames',
        FECHA_NACIMIENTO: 'Date of birth',
        FECHA_ALTA: 'Date Added'
    },
    CURSO_CAMPOS: {
        ID: 'Id',
        DESCRIPCION: 'Description',
        FECHA_INICIO: 'Start Date',
        FECHA_FIN: 'Finish Date',
        ACTIVO: 'Active'
    },
    FAMILIAR_CAMPOS: {
        NOMBRE: 'Name',
        PRIMER_APELLIDO: 'First Name',
        SEGUNDO_APELLIDO: 'Second Surname',
        DNI: 'DNI'
    },
    EMAIL: 'Email',
    ACCIONES: 'Actions',
    ASIGNAR_CLASE: 'Assign class',
    VER_ALUMNOS: 'View Students',
    ASIGNAR_ALUMNOS: 'Assign Students',
    FILTROS: 'Filter',
    VER_FAMILIARES: 'View Family',
    FOTO: 'Photo',
    AÑADIR_FAMILIAR: 'Add Family',
    AGENDA: 'DIARY',
    FECHA: 'Date',
    VER_AGENDA: 'View',
    CONTROL_DIARIO: 'Daily Control',
    HA_PASADO_DIA: 'Has spent the day',
    HA_COMIDO: 'Has eaten',
    HA_DORMIDO: 'Has a nap',
    HA_MERENDADO: 'Has bitten',
    DEPOSICIONES: 'Has pooped',
    OBSERVACIONES_ESCUELA: 'Observations of school',
    OBSERVACIONES_CASA: 'Observations from home',
    ESTADO: {
        MAL: 'Bad',
        REGULAR: 'Regular',
        BIEN: 'Well'
    },
    VER_DETALLES_AGENDA: 'View diary',
    SOBRE_BB1: "BabyBook intenta ser un substitut virtual de les agendes físiques utilitzades a diari a les llar d’infants. On les educadores deixen constància de com ha estat el fill, si ha dinat correctament, si ha dormit bé la migdiada, i altres temes importants per als pares.  A més els pares poden posar també informació important per a les educadores com pot ser que el alumne ha de prendre un xarop, ha passat mala nit.",
    SOBRE_BB2: "BabyBook també te un mòdul que permet configurar els vincles entre alumnes, educadores i familiars. On el gestor de la llar d’infants podrà introduir les dades necessàries d’aquesta. El gestor podrà introduir les classes, les educadores, els alumnes i els familiars d’aquests.",
    SOBRE_BB3: "BabyBook permetrà crear les associacions de classes, educadores, alumnes i familiars, perquè les educadores i familiars pugin comunicar-se mitjançant l’agenda virtual."
}

var translations_es = {
    HEADLINE: 'Aplicación para guarderias',
    ROLES: {
        ADMIN: 'Administrador',
        GESTOR: 'Gestor',
        PROFESOR: 'Profesor',
        FAMILIAR: 'Familiar'
    },
    CENTROS: 'Centros',
    CENTRO: 'Centro',
    PROFESORES: 'Profesores',
    PROFESOR: 'Profesor',
    CLASES: 'Clases',
    CLASE: 'Clase',
    ALUMNOS: 'Alumnos',
    ALUMNO: 'Alumno',
    CURSOS: 'Cursos',
    CURSO: 'Curso',
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
    INICIO: 'Inicio',
    NUEVO: 'Nuevo',
    EDITAR: 'Editar',
    GUARDAR: 'Guardar',
    ELIMIAR: 'Eliminar',
    CENTRO_CAMPOS: {
        ID: 'Id',
        NOMBRE: 'Nombre',
        DIRECCION: 'Dirección',
        FECHA_ALTA: 'Fecha Alta'
    },
    PROFESOR_CAMPOS: {
        ID: 'Id',
        NOMBRE: 'Nombre',
        PRIMER_APELLIDO: 'Primer Apellido',
        SEGUNDO_APELLIDO: 'Segundo Apellido',
        CLASE: 'Clase'
    },
    CLASE_CAMPOS: {
        ID: 'Id',
        NOMBRE: 'Nombre'
    },
    ALUMNO_CAMPOS: {
        ID: 'Id',
        NOMBRE: 'Nombre',
        PRIMER_APELLIDO: 'Primer Apellido',
        SEGUNDO_APELLIDO: 'Segundo Apellido',
        APELLIDOS: 'Apellidos',
        FECHA_NACIMIENTO: 'Fecha Nacimiento',
        FECHA_ALTA: 'Fecha Alta'
    },
    CURSO_CAMPOS: {
        ID: 'Id',
        DESCRIPCION: 'Descripción',
        FECHA_INICIO: 'Fecha Inicio',
        FECHA_FIN: 'Fecha Fin',
        ACTIVO: 'Activo'
    },
    FAMILIAR_CAMPOS: {
        NOMBRE: 'Nombre',
        PRIMER_APELLIDO: 'Primer Apellido',
        SEGUNDO_APELLIDO: 'Segundo Apellido',
        DNI: 'DNI'
    },
    EMAIL: 'Dirección Email',
    ACCIONES: 'Acciones',
    ASIGNAR_CLASE: 'Asignar Clase',
    VER_ALUMNOS: 'Ver alumnos',
    ASIGNAR_ALUMNOS: 'Asignar alumnos',
    FILTROS: 'Filtro',
    VER_FAMILIARES: 'Ver Familiares',
    FOTO: 'Foto',
    AÑADIR_FAMILIAR: 'Añadir familiar',
    AGENDA: 'AGENDA',
    FECHA: 'Fecha',
    VER_AGENDA: 'Ver',
    CONTROL_DIARIO: 'Control diario',
    HA_PASADO_DIA: 'Ha pasado el día',
    HA_COMIDO: 'Ha comido',
    HA_DORMIDO: 'Ha dormido la siesta',
    HA_MERENDADO: 'Ha merendado',
    DEPOSICIONES: 'Ha hecho caca',
    OBSERVACIONES_ESCUELA: 'Observaciones de la escuela',
    OBSERVACIONES_CASA: 'Observaciones de casa',
    ESTADO: {
        MAL: 'Mal',
        REGULAR: 'Regular',
        BIEN: 'Bien'
    },
    VER_DETALLES_AGENDA: 'Ver Agenda',
    SOBRE_BB1: "BabyBook intenta ser un substitut virtual de les agendes físiques utilitzades a diari a les llar d’infants. On les educadores deixen constància de com ha estat el fill, si ha dinat correctament, si ha dormit bé la migdiada, i altres temes importants per als pares.  A més els pares poden posar també informació important per a les educadores com pot ser que el alumne ha de prendre un xarop, ha passat mala nit.",
    SOBRE_BB2: "BabyBook també te un mòdul que permet configurar els vincles entre alumnes, educadores i familiars. On el gestor de la llar d’infants podrà introduir les dades necessàries d’aquesta. El gestor podrà introduir les classes, les educadores, els alumnes i els familiars d’aquests.",
    SOBRE_BB3: "BabyBook permetrà crear les associacions de classes, educadores, alumnes i familiars, perquè les educadores i familiars pugin comunicar-se mitjançant l’agenda virtual."
}

var translations_ca = {
    HEADLINE: "Aplicació per llar d' infants",
    ROLES: {
        ADMIN: 'Administrador',
        GESTOR: 'Gestor',
        PROFESOR: 'Profesor',
        FAMILIAR: 'Familiar'
    },
    CENTROS: 'Centres',
    CENTRO: 'Centre',
    PROFESORES: 'Profesors',
    PROFESOR: 'Profesor',
    CLASES: 'Classes',
    CLASE: 'Classe',
    ALUMNOS: 'Alumnes',
    ALUMNO: 'Alumne',
    CURSOS: 'Cursos',
    CURSO: 'Curs',
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
    INICIO: 'Inici',
    NUEVO: 'Nou',
    EDITAR: 'Editar',
    GUARDAR: 'Guardar',
    ELIMINAR: 'Eliminar',
    CENTRO_CAMPOS: {
        ID: 'Id',
        NOMBRE: 'Nom',
        DIRECCION: 'Adreça',
        FECHA_ALTA: 'Data creació'
    },
    PROFESOR_CAMPOS: {
        ID: 'Id',
        NOMBRE: 'Nom',
        PRIMER_APELLIDO: 'Primer Cognom',
        SEGUNDO_APELLIDO: 'Segon Cognom',
        CLASE: 'Classe'
    },
    CLASE_CAMPOS: {
        ID: 'Id',
        NOMBRE: 'Nom'
    },
    ALUMNO_CAMPOS: {
        ID: 'Id',
        NOMBRE: 'Nom',
        PRIMER_APELLIDO: 'Primer Cognom',
        SEGUNDO_APELLIDO: 'Segon Cognom',
        APELLIDOS: 'Cognoms',
        FECHA_NACIMIENTO: 'Data Naixement',
        FECHA_ALTA: 'Data Creació'
    },
    CURSO_CAMPOS: {
        ID: 'Id',
        DESCRIPCION: 'Descripció',
        FECHA_INICIO: 'Data Inici',
        FECHA_FIN: 'Data Fi',
        ACTIVO: 'Actiu'
    },
    FAMILIAR_CAMPOS: {
        NOMBRE: 'Nom',
        PRIMER_APELLIDO: 'Primer Cognom',
        SEGUNDO_APELLIDO: 'Segon Cognom',
        DNI: 'DNI'
    },
    EMAIL: 'Adreça Email',
    ACCIONES: 'Accions',
    ASIGNAR_CLASE: 'Assignar classe',
    VER_ALUMNOS: 'Veure alumnes',
    ASIGNAR_ALUMNOS: 'Assignar alumnes',
    FILTROS: 'Filtre',
    VER_FAMILIARES: 'Veure Familiars',
    FOTO: 'Foto',
    AÑADIR_FAMILIAR: 'Afegir Familiar',
    AGENDA: 'AGENDA',
    FECHA: 'Data',
    VER_AGENDA: 'Veure',
    CONTROL_DIARIO: 'Control Diari',
    HA_PASADO_DIA: 'Ha passat el dia',
    HA_COMIDO: 'Ha dinat',
    HA_DORMIDO: 'Ha fet la migdiada',
    HA_MERENDADO: 'Ha berenat',
    DEPOSICIONES: 'Ha fet caca',
    OBSERVACIONES_ESCUELA: 'Obsercacions del centre',
    OBSERVACIONES_CASA: 'Observacions de casa',
    ESTADO: {
        MAL: 'Malament',
        REGULAR: 'Regular',
        BIEN: 'Be'
    },
    VER_DETALLES_AGENDA: 'Veure Agenda',
    SOBRE_BB1: "BabyBook intenta ser un substitut virtual de les agendes físiques utilitzades a diari a les llar d’infants. On les educadores deixen constància de com ha estat el fill, si ha dinat correctament, si ha dormit bé la migdiada, i altres temes importants per als pares.  A més els pares poden posar també informació important per a les educadores com pot ser que el alumne ha de prendre un xarop, ha passat mala nit.",
    SOBRE_BB2: "BabyBook també te un mòdul que permet configurar els vincles entre alumnes, educadores i familiars. On el gestor de la llar d’infants podrà introduir les dades necessàries d’aquesta. El gestor podrà introduir les classes, les educadores, els alumnes i els familiars d’aquests.",
    SOBRE_BB3: "BabyBook permetrà crear les associacions de classes, educadores, alumnes i familiars, perquè les educadores i familiars pugin comunicar-se mitjançant l’agenda virtual."
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