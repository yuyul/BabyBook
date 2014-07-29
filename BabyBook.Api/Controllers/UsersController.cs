using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BabyBook.Api.Models;
using BabyBook.Api.Repositories;

namespace BabyBook.Api.Controllers
{
    public class UsersController : ApiController
    {
        private UserRepository _repository;

        public UsersController()
        {
            _repository = new UserRepository();
        }

        [Authorize]
        public IEnumerable<UserApp> GetAll()
        {
            return _repository.GetUsers();
        }
    }
}
