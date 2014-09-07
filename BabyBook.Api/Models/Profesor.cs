using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BabyBook.Api.Models
{
    [Table("Profesores")]
    public class Profesor
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string PrimerApellido { get; set; }
        public string SegundoApellido { get; set; }

        public int CentroId { get; set; }
        public virtual Centro Centro { get; set; }

        
        public int? ClaseId { get; set; }
        public virtual Clase Clase { get; set; }

        public string Email { get; set; }

        public string UserId { get; set; }
    }
}