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
    public class AgendasController : ApiController
    {
        private AgendaRepository _repository;

        public AgendasController()
        {
            _repository = new AgendaRepository();
        }

        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        public ControlDiario Get(int id)
        {
            return _repository.GetById(id);
        }

        [ActionName("getbyalumnoid")]
        [HttpGet]
        public IEnumerable<ControlDiario> GetByAlumnoId(int id)
        {
            return _repository.GetAllByAlulmno(id);
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}