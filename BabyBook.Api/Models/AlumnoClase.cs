using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BabyBook.Api.Models
{
    [Table("AlumnosClases")]
    public class AlumnoClase
    {
        public int Id { get; set; }

        [Index("AlumnoCursoClase", 1)]
        public int AlumnoId { get; set; }
        public virtual Alumno Alumno { get; set; }


        [Index("AlumnoCursoClase", 2)]
        public int CursoId { get; set; }
        public virtual Curso Curso { get; set; }


        [Index("AlumnoCursoClase", 3, IsUnique = true)]
        public int ClaseId { get; set; }
        public virtual Clase Clase { get; set; }
    
    }
}