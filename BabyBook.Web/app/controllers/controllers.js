﻿///#source 1 1 /app/controllers/adminCentrosController.js
app.controller('adminCentrosController', [
    '$scope', 'centrosService', '$rootScope', function ($scope, centrosService, $rootScope) {

        console.log('centros');

        $scope.centros = [];

        centrosService.getCentros().then(function (results) {

            $scope.centros = results.data;
        }, function (error) {
            console.log('error');
        });

        $scope.seleccionaCentro = function (centroId) {
            $rootScope.centroSeleccionado = centroId;
        };
    }
]);
///#source 1 1 /app/controllers/agendasController.js
app.controller('agendasController', ['$scope', '$routeParams', 'agendasService', '$location', function ($scope, $routeParams, agendasService, $location) {

    $scope.controles = [];
    $scope.control = {};
    $scope.newControl = '';

    agendasService.getByAlumnoId($routeParams.id).then(function(results) {
        $scope.controles = results.data;
    });
    
    $scope.editControl = function (control)
    {
        if (control === 'new') {

            var fecha = new Date();
            $scope.newControl = true;
            $scope.control = {
                fecha: fecha,
                alumnoId: $routeParams.id,
                observacionesCasa: '',
                observacionesCentro: '',
                estadoDia: '',
                comida: '',
                siesta: '',
                merienda: '',
                deposicion: ''
            }
        } else {
            $scope.newControl = false;
            $scope.control = control;
        }
        
    }

    $scope.save = function (control) {
        var save = true;
        if ($scope.newControl) {
            var result = $scope.controles.filter(function (elem) {
                var fecha = new Date(elem.fecha);

                return fecha.getDate() == control.fecha.getDate() && fecha.getMonth() == control.fecha.getMonth() && fecha.getFullYear() == control.fecha.getFullYear();
            });

            if (result.length > 0)
            {
                save = false;
                alert('Ya existe un control para el día seleccionado. Los datos no serán guardados.');
            }
        }

        if (save) {
            if ($scope.newControl) {
                control.fecha = (control.fecha.getMonth() + 1) + '/' + control.fecha.getDate() + '/' + control.fecha.getFullYear();
            }

            agendasService.saveControl(control);

            setTimeout(function () {
                agendasService.getByAlumnoId($routeParams.id).then(function (results) {
                    $scope.controles = results.data;
                });
            }, 1000);
        }
    };

    
}]);
///#source 1 1 /app/controllers/AlumnosController.js
app.controller('alumnosController', ['$scope', 'alumnosService', '$rootScope', '$location', '$routeParams', function ($scope, alumnosService, $rootScope, $location, $routeParams) {

    $scope.alumnos = [];
    $scope.familiares = [];

    $scope.consulta = "";

    $scope.familiar = {
        id: 0,
        nombre: '',
        primerApellido: '',
        segundoApellido: '',
        email: '',
        dni: ''
    };

    $scope.alumno = {
        id: '',
        nombre: '',
        primerApellido: '',
        segundoApellido: '',
        fechaAlta: '',
        fechaBaja: '',
        fechaNacimiento: '',
        centroId: '',
        foto:''
    };
    
    $scope.message = '';
    $scope.messageok = '';

    $scope.files = [];

    $scope.newAlumno = '';

    $scope.onFileSelect = function ($files) {
        $scope.files = $files;
    }

    if ($routeParams.id === undefined) {
        alumnosService.getAlumnosByCentro($rootScope.centroSeleccionado).then(function (results) {
            $scope.alumnos = results.data;
        });
    } else {
        alumnosService.getAlumnoById($routeParams.id).then(function (results) {
            $scope.alumno = results.data;
        });
    }

    $scope.editAlumno = function (alumno) {
        if (alumno === 'new') {
            $scope.newAlumno = true;
            $scope.alumno = {
                id: 0,
                nombre: '',
                primerApellido: '',
                segundoApellido: '',
                fechaNacimiento: '',
                centroId: $rootScope.centroSeleccionado,
                foto: ''
            };
        } else {
            $scope.newAlumno = false;
            $scope.alumno = alumno;
        }
    }

    $scope.save = function (alumno) {
        if ($scope.newAlumno) {
            alumno.fechaNacimiento = (alumno.fechaNacimiento.getMonth() + 1) + '/' + alumno.fechaNacimiento.getDate() + '/' + alumno.fechaNacimiento.getFullYear();
        }
        alumnosService.uploadAlumno(alumno, $scope.files[0]);

        cargarAlumnos();

    };

    $scope.editFamiliar = function(familiar) {
        limpiaMensajes();
        if (familiar === 'new') {
            $scope.newFamiliar = true;
            $scope.familiar = {
                id: 0,
                nombre: '',
                primerApellido: '',
                segundoApellido: '',
                email: '',
                dni: ''
            };
        } else {
            $scope.familiar = familiar;
            $scope.newFamiliar = false;
        }

    };

    $scope.addFamiliar = function (familiar) {
        if ($scope.newFamiliar) {
            alumnosService.addFamiliar($scope.alumno.id, familiar);
        } else {
            alumnosService.updateFamiliar(familiar.id, familiar);
        }
        cargarFamiliares();
    };

    $scope.deleteAsignacion = function(familiarId) {
        alumnosService.deleteAsignacion(familiarId, $scope.alumno.id);
        cargarFamiliares();
    };

    $scope.verFamiliares = function (alumno) {
        limpiaMensajes();
        $scope.alumno = alumno;
        alumnosService.getFamiliaresByAlumno(alumno.id).then(function (results) {
            $scope.familiares = results.data;
        });
    };

    $scope.deleteAlumno = function(alumnoId) {
        alumnosService.deleteAlumno(alumnoId);
        cargarAlumnos();
    };

    var cargarAlumnos = function() {
        setTimeout(function() {
            alumnosService.getAlumnosByCentro($rootScope.centroSeleccionado).then(function(results) {
                $scope.alumnos = results.data;
            });
        }, 2000);
    }

    var cargarFamiliares = function() {
        
        setTimeout(function () {
            alumnosService.getFamiliaresByAlumno($scope.alumno.id).then(function (results) {
                $scope.familiares = results.data;
            });
        }, 3000);

    }

    var limpiaMensajes = function() {
        $scope.message = '';
        $scope.messageok = '';
    }
}]);
///#source 1 1 /app/controllers/centrosController.js
app.controller('centrosController', [
    '$scope', '$location', 'centrosService', '$rootScope', function ($scope, $location, centrosService, $rootScope) {

        console.log('centros');

        $scope.centros = [];

        $scope.centro = {
            id: 0,
            nombre: '',
            direccion: ''
        };

        $scope.message = '';
        $scope.messageok = '';
        $scope.newCentro = '';

        centrosService.getCentrosByUser().then(function(results) {

            $scope.centros = results.data;
        }, function(error) {
            console.log('error');
        });

        $scope.save = function(centro) {

            if ($scope.newCentro) {
                centrosService.addCentro($scope.centro).then(function (response) {
                    $scope.messageok = "Centro guardado correctamente";
                }, function (err) {
                    $scope.message = err.error_description;
                });
                cargarCentros();
            } else {
                centrosService.updateCentro(centro).then(function (response) {
                    $scope.messageok = "Centro guardado correctamente";
                }, function (err) {
                    $scope.message = err.error_description;
                });
            }

        };

        $scope.seleccionaCentro = function (centroId) {
            $rootScope.centroSeleccionado = centroId;
        };

        $scope.editCentro = function (centro) {
            limpiaMensajes();
            if (centro === 'new') {
                $scope.newCentro = true;
                $scope.centro = {
                    id: 0,
                    nombre: '',
                    direccion: ''
                };
            } else {
                $scope.newCentro = false;
                $scope.centro = centro;
            }

        };

        $scope.deleteCentro = function (centroId) {
            centrosService.deleteCentro(centroId);
            cargarCentros();

        };

        var cargarCentros = function() {
            setTimeout(function() {
                centrosService.getCentrosByUser().then(function(results) {

                    $scope.centros = results.data;
                }, function(error) {
                    console.log('error');
                });
            }, 1000);
        };

        var limpiaMensajes = function() {
            $scope.message = '';
            $scope.messageok = '';
        }
    }
]);
///#source 1 1 /app/controllers/clasesController.js
app.controller('clasesController', ['$scope', '$location', 'clasesService', '$rootScope', 'alumnosService', 'cursosService', '$routeParams', function ($scope, $location, clasesService, $rootScope, alumnosService, cursosService, $routeParams) {

    console.log('clases');

    $scope.clases = [];

    $scope.clase = {
        id: '',
        nombre: '',
        centroId: ''
    };

    $scope.asignacion = {
        AlumnoId: '',
        ClaseId: '',
        CursoId: ''
    };

    $scope.alumnos = [];
    $scope.cursos = [];

    $scope.cursoSeleccionado = '';

    $scope.message = '';
    $scope.messageok = '';
    $scope.isAsignacion = false;
    $scope.isVerAlumnos = false;
    $scope.newClase = true;

    if ($routeParams.id === undefined) {
        clasesService.getClasesByCentro($rootScope.centroSeleccionado).then(function(results) {
            $scope.clases = results.data;
        }, function(error) {
            console.log('error');
        });
    } else {
        clasesService.getByClaseId($routeParams.id).then(function(results) {
            $scope.clase = results.data;
        }, function(error) {
            console.log('error');
        });
    }

    $scope.save = function() {
        if ($scope.clase.id == '') {
            addClase();
        } else {
            updateClase();
        }
        cargarClases();
    };

    var addClase = function () {
        $scope.clase.CentroId = $rootScope.centroSeleccionado;

        clasesService.createClase($scope.clase).then(function (response) {
            $scope.messageok = "Clase guardada corretamente";
        }, function (err) {
            $scope.message = err.error_description;
        });
    };

    var updateClase = function () {
        clasesService.updateClase($scope.clase).then(function (response) {
            $scope.messageok = "Clase guardada correctamente";
        }, function (error) {
            $scope.message = error.error_description;
        });
    };

    $scope.editClase = function (clase) {
        borraMensajes();
        if (clase === 'new') {
            $scope.newClase = true;

            $scope.clase = {
                id: 0,
                nombre: '',
                centroId: $rootScope.centroSeleccionado
            }

        } else {
            $scope.newClase = false;
            $scope.clase = clase;
        }
    };

    $scope.cargarAlumnos = function (cursoId) {

        if ($scope.isAsignacion) {
            alumnosService.getAlumnosSinAsignarByCentroCurso($rootScope.centroSeleccionado, cursoId).then(function (results) {
                $scope.alumnos = results.data;
            }, function (error) {
                console.log('error');
            });
        } else {
            alumnosService.getAlumnosByClaseCurso($scope.clase.id, cursoId).then(function (results) {
                $scope.alumnos = results.data;
            }, function (error) {
                console.log('error');
            });
        }
    };

    $scope.mostrarAlumnos = function (clase) {
        $scope.isAsignacion = true;
        $scope.isVerAlumnos = false;
        $scope.clase = clase;
        $scope.alumnos = [];

        cargaCursos();
        borraMensajes();
    };

    $scope.verAlumnos = function (clase) {
        $scope.isVerAlumnos = true;
        $scope.isAsignacion = false;
        $scope.clase = clase;
        $scope.alumnos = [];

        cargaCursos();
        borraMensajes();
    };

    $scope.asignarAlumnos = function(claseId, cursoId) {
        //console.log($scope.alumnos);

        var asignaciones = [];

        $scope.alumnos.filter(function(element) {
            return element.seleccionado == true;
        }).forEach(function(element, index, array) {
            var asignacion = {
                alumnoId: element.id,
                cursoId: cursoId,
                claseId: claseId
            };

            asignaciones.push(asignacion);
        });

        clasesService.asignarAlumnos(asignaciones).then(function(response) {
            $scope.messageok = "Asignación guardada correctamente";
        }, function(error) {
            $scope.message = error.error_description;
        });
    };

    $scope.eliminarAsignacion = function (claseId, cursoId) {
        var asignaciones = [];

        $scope.alumnos.filter(function (element) {
            return element.seleccionado == true;
        }).forEach(function (element, index, array) {
            var asignacion = {
                alumnoId: element.id,
                cursoId: cursoId,
                claseId: claseId
            };

            asignaciones.push(asignacion);
        });

        clasesService.eliminarAsignacion(asignaciones).then(function(response) {
            $scope.messageok = "Asignación eliminada correctamente";
        }, function(error) {
            $scope.message = error.error_description;
        });
    };

   

    var cargaCursos = function () {
        cursosService.getCursosByCentro($rootScope.centroSeleccionado).then(function (results) {
            $scope.cursos = results.data;
        }, function (error) {
            console.log('error');
        });
    };

    $scope.muestraCurso = function (curso) {
        alert(curso.id);
    };

    var borraMensajes = function() {
        $scope.message = '';
        $scope.messageok = '';
    }

    var cargarClases = function () {
        setTimeout(function () {
            clasesService.getClasesByCentro($rootScope.centroSeleccionado).then(function (results) {
                $scope.clases = results.data;
            }, function (error) {
                console.log('error');
            });
        }, 1000);
    };
}]);
///#source 1 1 /app/controllers/cursosController.js
app.controller('cursosController', ['$scope', '$location', 'cursosService', '$rootScope', '$routeParams', function ($scope, $location, cursosService, $rootScope, $routeParams) {

    console.log('cursos');

    $scope.cursos = [];

    $scope.curso = {
        id: '',
        descripcion: '',
        fechaInicio: '',
        fechaFin: '',
        centroId: ''
    };

    $scope.message = '';
    $scope.messageok = '';
    $scope.newCurso = true;

    if ($routeParams.id === undefined) {
        cursosService.getCursosByCentro($rootScope.centroSeleccionado).then(function(results) {
            $scope.cursos = results.data;
        }, function(error) {
            console.log('error');
        });
    } else {
        cursosService.getCursoById($routeParams.id).then(function(results) {
            $scope.curso = results.data;
        }, function(error) {
            console.log('error');
        });
    }

    $scope.createCurso = function () {

        $scope.curso.fechaFin = ($scope.curso.fechaFin.getMonth() + 1) + '/' + $scope.curso.fechaFin.getDate() + '/' + $scope.curso.fechaFin.getFullYear();
        $scope.curso.fechaInicio = ($scope.curso.fechaInicio.getMonth() + 1) + '/' + $scope.curso.fechaInicio.getDate() + '/' + $scope.curso.fechaInicio.getFullYear();

        if ($scope.newCurso) {
            $scope.curso.centroId = $rootScope.centroSeleccionado;

            cursosService.createCurso($scope.curso).then(function(response) {
                $scope.messageok = "Curso guardado correctamente";
            }, function(err) {
                $scope.message = err.error_description;
            });
        } else {
            cursosService.updateCurso($scope.curso).then(function(response) {
                $scope.messageok = "Curso actualizado correctamente";
            }, function(err) {
                $scope.message = err.error_description;
            });
            
        }
        cargarCursos();
    };

    $scope.editCurso = function (curso) {
        limpiarMensajes();
        if (curso === 'new') {
            $scope.newCurso = true;
            $scope.curso = {
                id: '0',
                descripcion: '',
                fechaInicio: '',
                fechafin: '',
                centroId: $rootScope.centroSeleccionado
            };
        } else {
            $scope.newCurso = false;
            $scope.curso = curso;
        }
    };

    var limpiarMensajes = function() {
        $scope.message = '';
        $scope.messageok = '';
    };

    var cargarCursos = function () {
        setTimeout(function () {
            cursosService.getCursosByCentro($rootScope.centroSeleccionado).then(function (results) {
                $scope.cursos = results.data;
            }, function (error) {
                console.log('error');
            });
        }, 1000);
    };
}]);
///#source 1 1 /app/controllers/dataController.js
app.controller('dataController', function ($scope) {
    $scope.data = {
        text: "Hello"
    }
});
///#source 1 1 /app/controllers/familiaresController.js
app.controller('familiaresController', ['$scope', 'alumnosService', function($scope, alumnosService) {
    $scope.alumnos = [];

    alumnosService.getAlumnosByFamiliar().then(function (results) {
        $scope.alumnos = results.data;
    });
}]);
///#source 1 1 /app/controllers/homeController.js
app.controller('homeController', ['$scope', '$location', 'authService', '$rootScope', 'centrosService', '$route', function ($scope, $location, authService, $rootScope, centrosService, $route) {

    console.log('home');

    var authentication = authService.authentication;

    $scope.isAdmin = authentication.roleName === "Admin";
    $scope.isGestor = authentication.roleName === "Gestor";
    $scope.isProfesor = authentication.roleName === "Profesor";
    $scope.isFamiliar = authentication.roleName === "Familiar";

    $scope.authentication = authentication;

    $scope.centerSelected = $rootScope.centroSeleccionado != "" ;

    $scope.centros = [];

    $scope.seleccionaCentro = function (centroId) {
        $rootScope.centroSeleccionado = centroId;
        $route.reload();
    };

    if (authentication.isAuth) {
        centrosService.getCentrosByUser().then(function (results) {
            $scope.centros = results.data;
        });
    }
}]);
///#source 1 1 /app/controllers/homeyController.js
app.controller('homeyController', ['$scope', '$routeParams', function ($scope, $routeParams) {
    $scope.roleName = $routeParams.role;
}]);
///#source 1 1 /app/controllers/indexController.js
app.controller('indexController', ['$translate', '$scope', '$location', 'authService', '$rootScope', function ($translate, $scope, $location, authService, $rootScope) {

    console.log('index');

    $scope.logOut = function() {
        authService.logOut();
        $rootScope.centroSeleccionado = "";
        $location.path('/home');
    };

    $scope.cambiarCentro = function() {
        $rootScope.centroSeleccionado = "";
        $location.path("/");
    };

    $scope.changeLanguage = function (langkey) {
        $translate.use(langkey);
    };

    $scope.authentication = authService.authentication;

}]);
///#source 1 1 /app/controllers/loginController.js
app.controller('loginController', ['$scope', '$location', 'authService', function ($scope, $location, authService) {

    console.log('login');

    $scope.loginData = {
        userName: "",
        password: ""
    };

    $scope.message = "";

    $scope.login = function () {

        authService.login($scope.loginData).then(function (response) {
            
            $location.path('/home');
            //$location.path('/home/' + response.roleName);

        },
         function (err) {
             $scope.message = err.error_description;
         });
    };

}]);
///#source 1 1 /app/controllers/profesoresController.js
app.controller('profesoresController', ['$scope', '$location', 'profesoresService', '$rootScope', 'clasesService', 'alumnosService', function ($scope, $location, profesoresService, $rootScope, clasesService, alumnosService) {

    console.log('profesores');

    $scope.profesores = [];
    $scope.clases = [];

    $scope.profesor = {
        id: 0,
        nombre: '',
        primerApellido: '',
        segundoApelido: '',
        email: '',
        centroId: '',
        claseId: ''
    };

    $scope.message = '';
    $scope.messageok = '';

    $scope.alumnos = [];
    $scope.claseSeleccionada = 0;

    if ($location.path() == "/profesores") {
        profesoresService.getProfesoresByCentro($rootScope.centroSeleccionado).then(function (results) {
            $scope.profesores = results.data;
        }, function (error) {
            console.log('error');
        });
    } else {
        alumnosService.getAlumnosByProfesor().then(function (results) {
            $scope.alumnos = results.data;
        }, function (error) {
            console.log('error');
        });
        //$scope.message = $location.path();
    }

    $scope.editProfesor = function (profesor) {
        limpiaMensajes();
        if (profesor === 'new') {
            $scope.newProfesor = true;
            $scope.profesor = {
                id: 0,
                nombre: '',
                primerApellido: '',
                segundoApelido: '',
                email: '',
                centroId: $rootScope.centroSeleccionado,
                claseId: ''
            };
        } else {
            $scope.newProfesor = false;
            $scope.profesor = profesor;
        }
    }

    $scope.save = function(profesor) {

        if ($scope.newProfesor) {
            profesoresService.createProfesor(profesor).then(function (response) {
                $scope.messageok = "Profesor guardado correctamente";
            }, function(err) {
                $scope.message = err.error_description;
            });
            cargarProfesores();
        } else {
            profesoresService.updateProfesor(profesor).then(function(response) {
                $scope.messageok = "Profesor guardado correctamente";
            }, function(err) {
                $scope.message = err.error_description;
            });
        }
    };

    $scope.mostrarClases = function (profesor) {
        limpiaMensajes();
        $scope.profesor = profesor;
        $scope.claseSeleccionada = profesor.claseId;
        clasesService.getClasesByCentro($rootScope.centroSeleccionado).then(function (results) {
            $scope.clases = results.data;
        }, function (error) {
            console.log('error');
        });

    };

    $scope.asignarClase = function (profesor) {

        profesoresService.updateProfesor(profesor).then(function (response) {
            $scope.messageok = "Asignación guardada correctamente";
        }, function (error) {
            $scope.message = error.error_description;
            console.log('error');
        });
        cargarProfesores();

    };

    $scope.deleteProfesor = function(profesorId) {
        profesoresService.deleteProfesor(profesorId);
        cargarProfesores();
    };

    var cargarProfesores = function () {
        setTimeout(function () {
            profesoresService.getProfesoresByCentro($rootScope.centroSeleccionado).then(function (results) {
                $scope.profesores = results.data;
            }, function (error) {
                console.log('error');
            });
        }, 1000);
    };

    $scope.eliminarProfesor = function (profesorId) {
        profesoresService.deleteProfesor(profesorId).then(function (response) {
            cargarProfesores();
        });
    };

    var limpiaMensajes = function() {
        $scope.message = '';
        $scope.messageok = '';
    }

}]);
///#source 1 1 /app/controllers/signupController.js
app.controller('signupController', ['$scope', '$location', '$timeout', 'authService', function ($scope, $location, $timeout, authService) {

    $scope.savedSuccessfully = false;
    $scope.message = "";

    $scope.registration = {
        userName: "",
        password: "",
        confirmPassword: "",
        email: ""
    };

    $scope.signUp = function () {

        authService.saveRegistration($scope.registration).then(function (response) {

            $scope.savedSuccessfully = true;
            $scope.message = "User has been registered successfully, you will be redicted to login page in 2 seconds.";
            startTimer();

        },
         function (response) {
             var errors = [];
             for (var key in response.data.modelState) {
                 for (var i = 0; i < response.data.modelState[key].length; i++) {
                     errors.push(response.data.modelState[key][i]);
                 }
             }
             $scope.message = "Failed to register user due to:" + errors.join(' ');
         });
    };

    var startTimer = function() {
        var timer = $timeout(function() {
            $timeout.cancel(timer);
            $location.path('/login');
        }, 2000);
    };

}]);
///#source 1 1 /app/controllers/usuariosController.js
app.controller('usuariosController', [
    '$scope', 'usuariosService', function($scope, usuariosService) {

        console.log('usuarios');

        $scope.usuarios = [];

        usuariosService.getUsuarios().then(function(results) {
            $scope.usuarios = results.data;
        }, function(error) {
            console.log('error');
        });

    }
]);
///#source 1 1 /app/controllers/usuarioController.js
app.controller("usuarioController", ['$scope', function($scope) {
    $scope.message = '';
}]);
