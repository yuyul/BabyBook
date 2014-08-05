using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BabyBook.Api.Models;

namespace BabyBook.Api.Repositories
{
    public class ProfesorRepository
    {
        private BbContext _ctx;

        public ProfesorRepository()
        {
            _ctx = new BbContext();
        }

        public IEnumerable<Profesor> GetByCentro(int centroId)
        {
            List<Profesor> profesores = _ctx.Profesores.Where(p => p.CentroId == centroId).ToList();

            return profesores;
        }

        public IEnumerable<Profesor> GetAll()
        {
            return _ctx.Profesores.ToList();
        }

        public Profesor GetById(int id)
        {
            return _ctx.Profesores.Find(id);
        }

        public Profesor AddProfesor(Profesor profesor)
        {
            Profesor newProfesor = _ctx.Profesores.Add(profesor);

            _ctx.SaveChanges();

            return newProfesor;
        }
    }
}