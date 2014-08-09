using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace BabyBook.Api.Models
{
    public class Alumno
    {
        public Alumno()
        {
            Clases   = new HashSet<AlumnoClase>();
        }

        public int Id { get; set; }
        [Required]
        public string Nombre { get; set; }
        public string PrimerApellido { get; set; }
        public string SegundoApellido { get; set; }
        [Required]
        public DateTime FechaAlta { get; set; }

        public DateTime? FechaBaja { get; set; }

        public DateTime FechaNacimiento { get; set; }

        public int CentroId { get; set; }
        public virtual Centro Centro { get; set; }

        public ICollection<AlumnoClase> Clases { get; set; } 
    }
}