using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.Identity.EntityFramework;

namespace BabyBook.Api.Models
{
    public class UserApp: IdentityUser
    {
        public string HomeTown { get; set; }
        public virtual ICollection<Centro> Centros { get; set; }
    }
}