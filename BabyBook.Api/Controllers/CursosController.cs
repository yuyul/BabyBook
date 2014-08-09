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
    public class CursosController : ApiController
    {
        private CursosRepository _repository;

        public CursosController()
        {
            _repository = new CursosRepository();
        }

        // GET api/cursos
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/cursos/5
        [ActionName("getbyid")]
        public Curso Get(int id)
        {
            return _repository.GetById(id);
        }

        [ActionName("getbycentroid")]
        public IEnumerable<Curso> GetByCentroId(int id)
        {
            return _repository.GetByCentro(id);
        }

        // POST api/cursos
        [ActionName("nuevocurso")]
        public void Post([FromBody]Curso value)
        {
            _repository.AddCurso(value);
        }

        // PUT api/cursos/5
        [ActionName("updatecurso")]
        public void Put(int id, [FromBody]Curso value)
        {
            _repository.UpdateCurso(id, value);
        }

        // DELETE api/cursos/5
        public void Delete(int id)
        {
        }
    }
}
