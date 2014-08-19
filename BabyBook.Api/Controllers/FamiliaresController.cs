using BabyBook.Api.Models;
using BabyBook.Api.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BabyBook.Api.Controllers
{
    public class FamiliaresController : ApiController
    {
        private FamiliarRepository _repository;

        public FamiliaresController()
        {
            _repository = new FamiliarRepository();
        }

        [ActionName("getfamiliaresbyalumno")]
        [HttpGet]
        public IEnumerable<Familiar> GetFamiliaresByAlumno(int id)
        {
            return _repository.GetFamiliaresByAlumno(id);
        }


        [ActionName("nuevoFamiliar")]
        [HttpPost]
        public Familiar nuevoFamiliar(int alumnoId, [FromBody]Familiar familiar)
        {
            return _repository.AddFamiliar(alumnoId, familiar);
        }
    }
}
