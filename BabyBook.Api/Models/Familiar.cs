using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BabyBook.Api.Models
{
    public class Familiar
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string PrimerApellido { get; set; }
        public string SegundoApellido { get; set; }
        
        [NotMapped]
        public string Email { get; set; }

        public string DNI { get; set; }
        public string UserId { get; set; }
    }
}