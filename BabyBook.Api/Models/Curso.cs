using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BabyBook.Api.Models
{
    public class Curso
    {
        public Curso()
        {
            Matriculas = new HashSet<AlumnoClase>();
        }

        public int Id { get; set; }
        public string Descripcion { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }
        public Boolean Activo { get; set; }

        public ICollection<AlumnoClase> Matriculas { get; set; }

        public int CentroId { get; set; }
        public Centro Centro { get; set; }

    }
}
