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
    }
}