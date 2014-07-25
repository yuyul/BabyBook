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
            Matriculas = new HashSet<Matricula>();
        }

        public int Id { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }

        public ICollection<Matricula> Matriculas { get; set; } 

    }
}
