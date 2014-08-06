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
    public class ClasesController : ApiController
    {
        private ClaseRepository _repository;

        public ClasesController()
        {
            _repository = new ClaseRepository();
        }

        // GET api/clases
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/clases/5
        public string Get(int id)
        {
            return "value";
        }

        [ActionName("getbycentroid")]
        public IEnumerable<Clase> GetByCentroId(int id)
        {
            return _repository.GetByCentro(id);
        }

        // POST api/clases
        public void Post([FromBody]Clase value)
        {
            _repository.AddClase(value);
        }

        // PUT api/clases/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/clases/5
        public void Delete(int id)
        {
        }
    }
}
