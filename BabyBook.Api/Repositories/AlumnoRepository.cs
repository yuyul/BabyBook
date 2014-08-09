﻿using BabyBook.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BabyBook.Api.Repositories
{
    public class AlumnoRepository
    {
        private BbContext _ctx;

        public AlumnoRepository()
        {
            _ctx = new BbContext();
        }

        public IEnumerable<Alumno> GetByCentro(int centroId)
        {
            return _ctx.Alumnos.Where(c=>c.CentroId==centroId).ToList();
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

            _ctx.SaveChanges();

            return updatedAlumno;
        }
    }
}