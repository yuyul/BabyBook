using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BabyBook.Api.Models
{
    public class ControlDiario
    {
        public int Id { get; set; }

        [Index("AlumnoFecha",1)]
        public DateTime Fecha { get; set; }
        [Index("AlumnoFecha",2, IsUnique=true)]
        public int AlumnoId { get; set; }
        public virtual Alumno Alumno{ get; set; }

        public string ObservacionesCasa { get; set; }
        public string ObservacionesCentro { get; set; }

        public int? EstadoDia { get; set; }
        public int? Comida { get; set; }
        public int? Siesta { get; set; }
        public int? Merienda { get; set; }
        public int? Deposicion { get; set; }

    }
}