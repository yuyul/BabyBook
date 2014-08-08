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
    public class AlumnosController : ApiController
    {
        private AlumnoRepository _repository;

        public AlumnosController()
        {
            _repository = new AlumnoRepository();
        }

        // GET api/alumnos
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/alumnos/5
        [ActionName("getbyuserid")]
        public Alumno Get(int id)
        {
            return _repository.GetById(id);
        }

        [ActionName("getbycentroid")]
        public IEnumerable<Alumno> GetByCentroId(int id)
        {
            return _repository.GetByCentro(id);
        }

        // POST api/alumnos
        public void Post([FromBody]Alumno value)
        {
            value.FechaAlta = DateTime.Today;
            _repository.AddAlumno(value);
        }

        // PUT api/alumnos/5
        public void Put(int id, [FromBody]Alumno value)
        {
            _repository.UpdateAlumno(id, value);
        }

        // DELETE api/alumnos/5
        public void Delete(int id)
        {
        }
    }
}
