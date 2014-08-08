using BabyBook.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BabyBook.Api.Repositories
{
    public class MatriculRepository
    {
        private BbContext _ctx;

        public MatriculRepository()
        {
            _ctx = new BbContext();
        }

        public IEnumerable<Matricula> GetByClaseAndCurso(int claseId, int cursoId)
        {
            return _ctx.Matriculas.Where(m => m.ClaseId == claseId && m.CursoId == cursoId);
        }
    }
}