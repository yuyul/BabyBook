using BabyBook.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BabyBook.Api.Repositories
{
    public class ClaseRepository
    {
        private BbContext _ctx;

        public ClaseRepository()
        {
            _ctx = new BbContext();
        }

        public IEnumerable<Clase> GetByCentro(int centroId)
        {
            return _ctx.Clases.Where(c => c.CentroId == centroId).ToList();
        }

        public Clase AddClase(Clase clase)
        {
            Clase newClase = _ctx.Clases.Add(clase);

            _ctx.SaveChanges();

            return newClase;
        }

        public AlumnoClase AsignarAlumno(AlumnoClase asignacion)
        {
            AlumnoClase newAsignacion = _ctx.AlumnosClases.Add(asignacion);

            _ctx.SaveChanges();

            return newAsignacion;
        }

        public void EliminarAsignacionAlumno(AlumnoClase asignacion)
        {
            AlumnoClase deleteAsignacion = _ctx.AlumnosClases.Where(a => a.AlumnoId == asignacion.AlumnoId && a.CursoId == asignacion.CursoId).First();

            _ctx.AlumnosClases.Remove(deleteAsignacion);

            _ctx.SaveChanges();

        }
    }
}