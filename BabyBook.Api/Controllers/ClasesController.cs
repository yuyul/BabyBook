﻿using BabyBook.Api.Models;
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

        [ActionName("getbyclaseid")]
        [HttpGet]
        public Clase GetByClaseId(int id)
        {
            return _repository.GetByClaseId(id);
        }

        [ActionName("getbycentroid")]
        public IEnumerable<Clase> GetByCentroId(int id)
        {
            return _repository.GetByCentro(id);
        }

        // POST api/clases
        [HttpPost]
        [ActionName("NuevaClase")]
        public void NuevaClase([FromBody]Clase value)
        {
            _repository.AddClase(value);
        }
        
        [HttpPost]
        [ActionName("AsignarAlumno")]
        public void AsignarAlumno([FromBody] IEnumerable<AlumnoClase> value)
        {
            foreach (var asignacion in value)
            {
                _repository.AsignarAlumno(asignacion);    
            }
            
        }

        [ActionName("EliminarAsignacionAlumno")]
        [HttpPost]
        public void EliminarAsignacionAlumno([FromBody] IEnumerable<AlumnoClase> value)
        {
            foreach (var asignacion in value)
            {
                _repository.EliminarAsignacionAlumno(asignacion);
            }
        }

        //// GET api/clases
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        //// GET api/clases/5
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // PUT api/clases/5
        [ActionName("updateclase")]
        [HttpPut]
        public void Put(int id, [FromBody]Clase value)
        {
            _repository.UpdateClase(id, value);
        }

        //// DELETE api/clases/5
        //public void Delete(int id)
        //{
        //}

    }
}
