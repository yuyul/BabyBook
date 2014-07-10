using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BabyBook.Api.Models
{
    public class Centro
    {
        public Centro()
        {
            Alumnos = new HashSet<Alumno>();
            Profesores = new HashSet<Profesor>();
            Clases = new HashSet<Clase>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Direccion { get; set; }
        public DateTime FechaAlta { get; set; }
        public DateTime? FechaBaja { get; set; }

        public virtual ICollection<Alumno> Alumnos { get; set; }
        public virtual ICollection<Profesor> Profesores { get; set; }
        public virtual ICollection<Clase> Clases { get; set; }
    }
}