﻿using BabyBook.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BabyBook.Api.Repositories
{
    public class CursosRepository
    {
        private BbContext _ctx;

        public CursosRepository()
        {
            _ctx = new BbContext();
        }

        public Curso GetById(int id)
        {
            return _ctx.Cursos.Find(id);
        }

        public IEnumerable<Curso> GetByCentro(int centroId)
        {
            //return _ctx.Cursos.Where(c => c.CentroId == centroId && c.Activo==true);
            return _ctx.Cursos.Where(c => c.CentroId == centroId );
        }

        public Curso AddCurso(Curso curso)
        {
            Curso newcurso = _ctx.Cursos.Add(curso);

            newcurso.Activo = true;

            _ctx.SaveChanges();

            return newcurso;
        }

        public Curso UpdateCurso(int id, Curso curso)
        {
            Curso updatedCurso = _ctx.Cursos.Find(id);

            updatedCurso.FechaInicio = curso.FechaInicio;
            updatedCurso.FechaFin = curso.FechaFin.Date;
            updatedCurso.Descripcion = curso.Descripcion;
            updatedCurso.Activo = curso.Activo;

            _ctx.SaveChanges();

            return updatedCurso;
        }
    }
}