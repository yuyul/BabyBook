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
    public class ProfesoresController : ApiController
    {
        private ProfesorRepository _repository;

        public ProfesoresController()
        {
            _repository = new ProfesorRepository();
        }

        // GET api/profesores
        public IEnumerable<Profesor> Get()
        {
            return _repository.GetAll();
        }

        // GET api/profesores/5
        public Profesor Get(int id)
        {
            return _repository.GetById(id);
        }

        [ActionName("getbycentroid")]
        public IEnumerable<Profesor> GetByCentroId(int id)
        {
            return _repository.GetByCentro(id);
        }

        // POST api/profesores
        public void Post([FromBody]Profesor value)
        {
            _repository.AddProfesor(value);
        }

        // PUT api/profesores/5
        [ActionName("updateProfesor")]
        [HttpPut]
        public void Put(int id, [FromBody]Profesor value)
        {
            _repository.UpdateProfesor(id, value);
        }

        // DELETE api/profesores/5
        [ActionName("deleteProfesor")]
        [HttpDelete]
        public void Delete(int id)
        {
            _repository.DeleteProfesor(id);
        }
    }
}
