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
            var name1 = User.Identity.Name;
            return Ok(_repository.GetAll());
        }

        //public IEnumerable<Centro> Get()
        //{

        //    var name = ClaimsPrincipal.Current.Identity.Name;
        //    var name1 = User.Identity.Name;

        //    return _repository.GetAll();
        //}
    }
}
