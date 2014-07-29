using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BabyBook.Api.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace BabyBook.Api.Repositories
{
    public class UserRepository
    {
        private BbContext _ctx;
        private UserManager<UserApp> _userManager;

        public UserRepository()
        {
            _ctx = new BbContext();
            _userManager = new UserManager<UserApp>(new UserStore<UserApp>(_ctx));
        }


        public IEnumerable<UserApp> GetUsers()
        {
            return _userManager.Users;
        }
    }
}