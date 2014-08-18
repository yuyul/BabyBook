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

        public ControlDiario SaveControl(ControlDiario control)
        {
            ControlDiario editControl;
            if (control.Id == 0)
            {
                editControl = _ctx.ControlDiarios.Add(control);
            
            } else {
                editControl = _ctx.ControlDiarios.Find(control.Id);

                editControl.ObservacionesCasa = control.ObservacionesCasa;
                editControl.ObservacionesCentro = control.ObservacionesCentro;

                editControl.EstadoDia = control.EstadoDia;
                editControl.Siesta = control.Siesta;
                editControl.Comida = control.Comida;
                editControl.Merienda = control.Merienda;
                editControl.Deposicion = control.Deposicion;
            }

            _ctx.SaveChanges();

            return editControl;
        }

    }
}