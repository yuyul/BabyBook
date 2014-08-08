using BabyBook.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BabyBook.Api.Controllers
{
    public class MatriculasController : ApiController
    {
        // GET api/matriculas
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/matriculas/5
        [ActionName("get")]
        public string Get(int id)
        {
            return "value";
        }

        [ActionName("getbyids")]
        public IEnumerable<int> GetByIds([FromUri] IEnumerable<int> id)
        {
            return id;
        }
        
        /*public string Get([FromUri] string value)
        {
            return value;
        }*/

        // POST api/matriculas
        public void Post([FromBody]string value)
        {
        }

        // PUT api/matriculas/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/matriculas/5
        public void Delete(int id)
        {
        }
    }
}
