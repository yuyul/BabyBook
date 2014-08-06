using BabyBook.Api.Models;
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

        public IEnumerable<Curso> GetByCentro(int centroId)
        {
            return _ctx.Cursos.Where(c => c.CentroId == centroId);
        }

        public Curso AddCurso(Curso curso)
        {
            Curso newcurso = _ctx.Cursos.Add(curso);

            _ctx.SaveChanges();

            return newcurso;
        }
    }
}