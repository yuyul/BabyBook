using BabyBook.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BabyBook.Api.Repositories
{
    public class AgendaRepository
    {
        private BbContext _ctx;

        public AgendaRepository()
        {
            _ctx = new BbContext();
        }

        public IEnumerable<ControlDiario> GetAllByAlulmno(int alumnoId)
        {
            return _ctx.ControlDiarios.Where(c => c.AlumnoId == alumnoId);
        }

        public ControlDiario GetById(int controlId)
        {
            return _ctx.ControlDiarios.Find(controlId);
        }

    }
}