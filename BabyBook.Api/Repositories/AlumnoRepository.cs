using BabyBook.Api.Models;
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
            return _ctx.Alumnos.ToList();
        }

        public Alumno AddAlumno(Alumno alumno)
        {
            Alumno newAlumno = _ctx.Alumnos.Add(alumno);

            return newAlumno;
        }
    }
}