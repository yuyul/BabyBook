using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BabyBook.Api.Models;
using BabyBook.Api.Repositories;
using Microsoft.AspNet.Identity;
using System.Security.Claims;

namespace BabyBook.Api.Controllers
{
    [RoutePrefix("api/Centros")]
    public class CentrosController : ApiController
    {
        private CentroRepository _repository;

        public CentrosController()
        {
            _repository = new CentroRepository();
        }

        [Authorize]
        [Route("")]
        public IHttpActionResult Get()
        {
            
            return Ok(_repository.GetAll());
        }

        [Authorize]
        [Route("GetByUserId")]
        public IHttpActionResult GetByUserId()
        {
            var userName = User.Identity.Name;

            return Ok(_repository.GetByUserId(userName));
        }

        [Authorize]
        [Route("")]
        public IHttpActionResult AddCentro(Centro centro)
        {
            var userName = User.Identity.Name;

            return Ok(_repository.AddCentro(userName, centro));
        }

        [ActionName("UpdateCentro")]
        [HttpPut]
        public IHttpActionResult UpdateCentro(int id, [FromBody]Centro centro)
        {
            return Ok(_repository.UpdateCentro(id, centro));

        }

        [ActionName("DeleteCentro")]
        [HttpDelete]
        public IHttpActionResult DeleteCentro(int id)
        {
            return Ok(_repository.DeleteCentro(id));
        }
        //public IEnumerable<Centro> Get()
        //{

        //    var name = ClaimsPrincipal.Current.Identity.Name;
        //    var name1 = User.Identity.Name;

        //    return _repository.GetAll();
        //}


    }
}
