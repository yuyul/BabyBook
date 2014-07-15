using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using BabyBook.Api.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace BabyBook.Api.Repositories
{
    public class AuthRepository: IDisposable
    {
        private BbContext _ctx;

        private UserManager<UserApp> _userManager;

        public AuthRepository()
        {
            _ctx = new BbContext();
            _userManager = new UserManager<UserApp>(new UserStore<UserApp>(_ctx));
        }

        public async Task<string> GetInfoUser(string userName)
        {
            var user = await _userManager.FindByNameAsync(userName);

            RoleManager<IdentityRole> rolemanager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(_ctx));

            var role = await rolemanager.FindByIdAsync(user.Roles.ToList()[0].RoleId);

            
            return role.Name;
        }

        public async Task<IdentityResult> RegisterUser(UserModel userModel)
        {
            UserApp user = new UserApp()
            {
                UserName = userModel.UserName
            };
            
            var result = await _userManager.CreateAsync(user, userModel.Password);

            if (result.Succeeded )
            {
                result = await _userManager.AddToRoleAsync(user.Id, "Gestor");
            }

            return result;
        }

        public async Task<UserApp> FindUser(string userName, string password)
        {
            UserApp user = await _userManager.FindAsync(userName, password);

            return user;
        }

        public void Dispose()
        {
            _ctx.Dispose();
            _userManager.Dispose();
        }
    }
}