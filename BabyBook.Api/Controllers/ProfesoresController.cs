using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BabyBook.Api.Models;
using BabyBook.Api.Repositories;

namespace BabyBook.Api.Controllers
{
    public class ProfesoresController : ApiController
    {
        private ProfesorRepository _repository;

        public ProfesoresController()
        {
            _repository = new ProfesorRepository();
        }

        [Authorize]
        public IEnumerable<Profesor> GetByCentro(int centroId)
        {
            return _repository.GetByCentro(centroId);
        }
    }
}
