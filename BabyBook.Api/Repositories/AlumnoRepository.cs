﻿using System.Security.Cryptography;
using BabyBook.Api.Migrations;
using BabyBook.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace BabyBook.Api.Repositories
{
    public class AlumnoRepository
    {
        private BbContext _ctx;
        private UserManager<UserApp> _userManager;

        public AlumnoRepository()
        {
            _ctx = new BbContext();
            _userManager = new UserManager<UserApp>(new UserStore<UserApp>(_ctx));
        }

        public IEnumerable<Alumno> GetByCentro(int centroId)
        {
            return _ctx.Alumnos.Where(c=>c.CentroId==centroId && c.FechaBaja==null).ToList();
        }

        public IEnumerable<Alumno> GetSinAsignar(int centroId)
        {
            /*var query = (
                from a  in _ctx.Alumnos
                join b in _ctx.AlumnosClases on a.Id equals b.AlumnoId into inners
                from ab in inners.DefaultIfEmpty()
                select a
                );

            return query.ToList();*/

            var query = (from Alumnoes in _ctx.Alumnos
                         join AlumnoClases in _ctx.AlumnosClases on new { Id = Alumnoes.Id } equals new { Id = AlumnoClases.AlumnoId } into AlumnoClases_join
                         from AlumnoClases in AlumnoClases_join.DefaultIfEmpty()
                         where
                           AlumnoClases.AlumnoId == null &&
                           Alumnoes.CentroId == centroId &&
                           Alumnoes.FechaBaja == null
                         select Alumnoes);
            return query.ToList();

        }

        public IEnumerable<Alumno> GetSinAsignarByCentroCurso(int centroId, int cursoId)
        {
            /*var query = (
                from a  in _ctx.Alumnos
                join b in _ctx.AlumnosClases on a.Id equals b.AlumnoId into inners
                from ab in inners.DefaultIfEmpty()
                select a
                );

            return query.ToList();*/

            var query = (from Alumnoes in _ctx.Alumnos
                         join AlumnoClases in _ctx.AlumnosClases on new { Id = Alumnoes.Id , CursoId = cursoId} equals new { Id = AlumnoClases.AlumnoId, AlumnoClases.CursoId } into AlumnoClases_join
                         from AlumnoClases in AlumnoClases_join.DefaultIfEmpty()
                         where
                           AlumnoClases.AlumnoId == null &&
                           Alumnoes.CentroId == centroId &&
                           Alumnoes.FechaBaja == null 
                         select Alumnoes);
            return query.ToList();

        }

        public IEnumerable<Alumno> GetAlumnoByClase(int claseId)
        {
            var query = (
                from Alumnoes in _ctx.Alumnos
                join AlumnoClases in _ctx.AlumnosClases
                      on new { Alumnoes.Id, ClaseId = claseId }
                  equals new { Id = AlumnoClases.AlumnoId, AlumnoClases.ClaseId }
                where   
                    Alumnoes.FechaBaja == null
                select Alumnoes
                );

            return query.ToList();

        }

        public IEnumerable<Alumno> GetAlumnoByClaseCurso(int claseId, int cursoId)
        {
            var query = (
                from Alumnoes in _ctx.Alumnos
                join AlumnoClases in _ctx.AlumnosClases
                      on new { Alumnoes.Id, ClaseId = claseId, CursoId = cursoId}
                  equals new { Id = AlumnoClases.AlumnoId, AlumnoClases.ClaseId, AlumnoClases.CursoId }
                where
                  Alumnoes.FechaBaja == null
                select Alumnoes
               );

            return query.ToList();   
        }

        public Alumno AddAlumno(Alumno alumno)
        {
            Alumno newAlumno = _ctx.Alumnos.Add(alumno);

            _ctx.SaveChanges();

            return newAlumno;
        }

        public Alumno GetById(int id)
        {
            return _ctx.Alumnos.Find(id);
        }

        public Alumno UpdateAlumno(int id, Alumno alumno)
        {
            Alumno updatedAlumno = _ctx.Alumnos.Find(id);

            updatedAlumno.Nombre = alumno.Nombre;
            updatedAlumno.PrimerApellido = alumno.PrimerApellido;
            updatedAlumno.SegundoApellido = alumno.SegundoApellido;
            updatedAlumno.FechaNacimiento = alumno.FechaNacimiento;
            updatedAlumno.Foto = alumno.Foto;

            _ctx.SaveChanges();

            return updatedAlumno;
        }

        //public IEnumerable<Alumno> GetAlumnoByProfesorCurso(int profesorId, int cursoId)
        //{
        //    var query = (
        //        from AlumnoClases in _ctx.AlumnosClases
        //        join Alumnoes in _ctx.Alumnos on new { AlumnoId = AlumnoClases.AlumnoId } equals new { AlumnoId = Alumnoes.Id }
        //        join Profesors in _ctx.Profesores on new { ClaseId = AlumnoClases.ClaseId } equals new { ClaseId = (Int32)Profesors.ClaseId }
        //        where
        //            Profesors.Id == profesorId &&
        //          AlumnoClases.CursoId == cursoId &&
        //          Alumnoes.FechaBaja == null
        //        select Alumnoes
        //        );

        //    return query.ToList();
        //}

        public IEnumerable<Alumno> GetAlumnoByProfesorCurso(string userName)
        {
            string userId = _userManager.FindByName(userName).Id;

            var query = ( 
                from AlumnoClases in _ctx.AlumnosClases
                join Alumnoes in _ctx.Alumnos on new { AlumnoId = AlumnoClases.AlumnoId } equals new { AlumnoId = Alumnoes.Id }
                join Profesors in _ctx.Profesores on new { ClaseId = AlumnoClases.ClaseId } equals new { ClaseId = (Int32)Profesors.ClaseId }
                join Cursos in _ctx.Cursos on new {CursoId = AlumnoClases.CursoId} equals new {CursoId = Cursos.Id}
                where
                    Profesors.UserId == userId &&
                  Cursos.Activo == true &&
                  Alumnoes.FechaBaja == null
                select Alumnoes
            );

            return query.ToList();
        }

        public IEnumerable<Alumno> GetAlumnosByFamiliar(string userName)
        {
            string userId = _userManager.FindByName(userName).Id;

            var query = (
                from Alumnoes in _ctx.Alumnos
                join AlumnoFamiliars in _ctx.AlumnosFamiliares on new { Id = Alumnoes.Id } equals new { Id = AlumnoFamiliars.AlumnoId }
                join Familiars in _ctx.Familiares on new { Id = AlumnoFamiliars.FamiliarId } equals new { Id = Familiars.Id }
                where
                  Familiars.UserId == userId
                select Alumnoes
                );

            return query.ToList();
        }

        public void DeleteAlumno(int alumnoId)
        {
            Alumno deleteAlumno = _ctx.Alumnos.Find(alumnoId);

            if (deleteAlumno != null)
            {
                deleteAlumno.FechaBaja = DateTime.Today;

                _ctx.SaveChanges();
            }
        }
    }
}