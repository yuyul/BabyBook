using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BabyBook.Api.Models
{
    public class Clase
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public int CentroId { get; set; }
        public virtual Centro Centro { get; set; }
    
    }
}