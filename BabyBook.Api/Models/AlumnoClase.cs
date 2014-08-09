using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BabyBook.Api.Models
{
    public class AlumnoClase
    {
        public int Id { get; set; }

        public int AlumnoId { get; set; }
        public virtual Alumno Alumno { get; set; }

        public int CursoId { get; set; }
        public virtual Curso Curso { get; set; }

        public int ClaseId { get; set; }
        public virtual Clase Clase { get; set; }
    
    }
}