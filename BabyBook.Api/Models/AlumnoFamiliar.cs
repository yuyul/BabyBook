using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BabyBook.Api.Models
{
    [Table("AlumnosFamiliares")]
    public class AlumnoFamiliar
    {
        public int Id { get; set; }
        public int AlumnoId { get; set; }
        public virtual Alumno Alumno { get; set; }
        public int FamiliarId { get; set; }
        public virtual Familiar Familiar { get; set;}
    }
}