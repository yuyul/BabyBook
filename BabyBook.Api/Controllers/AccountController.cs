using System.Web.Script.Serialization;
using BabyBook.Api.Models;
using BabyBook.Api.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using BabyBook.Api.libs;

namespace BabyBook.Api.Controllers
{
    [RoutePrefix("api/Account")]
    public class AccountController : ApiController
    {
        private AuthRepository _repo = null;

        public AccountController()
        {
            _repo = new AuthRepository();
        }

        //[Authorize]
        //[Route("InfoUser")]
        //[HttpGet]
        //public IHttpActionResult InfoUser()
        //{

        //    var roleName = _repo.GetInfoUser(User.Identity.Name);
            
        //    RoleModel role = new RoleModel
        //    {
        //        RoleName =  roleName,
        //        UserName = User.Identity.Name
        //    };

        //    return Ok(role);
        //}


            // POST api/Account/Register
        [AllowAnonymous]
        [Route("Register")]
        public async Task<IHttpActionResult> Register(UserModel userModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            IdentityResult result = await _repo.RegisterUserAsync(userModel, "Gestor");

            IHttpActionResult errorResult = GetErrorResult(result);

            if (errorResult != null)
            {
                return errorResult;
            }

            
            SendMail servioMail = new SendMail();

            string cuerpo = string.Format("El usuario {0} ha sido dado de alta en nuestro sistema.",userModel.UserName);

            servioMail.EnvioMail(userModel.Email, "Alta de cuenta", cuerpo);
            
            return Ok();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _repo.Dispose();
            }

            base.Dispose(disposing);
        }

        private IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if (result == null)
            {
                return InternalServerError();
            }

            if (!result.Succeeded)
            {
                if (result.Errors != null)
                {
                    foreach (string error in result.Errors)
                    {
                        ModelState.AddModelError("", error);
                    }
                }

                if (ModelState.IsValid)
                {
                    // No ModelState errors are available to send, so just return an empty BadRequest.
                    return BadRequest();
                }

                return BadRequest(ModelState);
            }

            return null;
        }
    }
}
