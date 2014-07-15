using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
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
        [Required]
        public string Nombre { get; set; }
        public string Direccion { get; set; }
        public DateTime FechaAlta { get; set; }
        public DateTime? FechaBaja { get; set; }
        
        public virtual ICollection<Alumno> Alumnos { get; set; }
        public virtual ICollection<Profesor> Profesores { get; set; }
        public virtual ICollection<Clase> Clases { get; set; }

        public string GestorId { get; set; }
        //public virtual UserApp Gestor { get; set; }
    }
}