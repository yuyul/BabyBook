using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace BabyBook.Api.Models
{
    public class AppDbInitializer: DropCreateDatabaseAlways<AppDBContext>
    {
        protected override void Seed(AppDBContext context)
        {

            var UserManager = new UserManager<UserModel>(new UserStore<UserModel>(context));

            var RoleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(context));


            string name = "Admin";

            string password = "123456";

            //Create role Admin if it does not exist
            if (!RoleManager.RoleExists(name))
            {
                var roleresult = RoleManager.Create(new IdentityRole(name));
            }

            //Create User=Admin with password = 123456
            var user = new UserModel();

            user.UserName = name;

            var adminresult = UserManager.Create(user, password);

            if (adminresult.Succeeded)
            {
                var result = UserManager.AddToRole(user.Id, name);
            }


            int contador = 0;

            for (contador = 1; contador < 10; contador++)
            {
                context.Centros.Add(new Centro() { Nombre = "Centro" + contador, Direccion = "Direccion" + contador, FechaAlta = DateTime.Today });
            }


            context.SaveChanges();

            foreach (var centro in context.Centros)
            {
               context.Profesores.Add(new Profesor(){Nombre = "Profesor" + centro.Id, Centro = centro});
            }

            context.SaveChanges();

            foreach (var centro in context.Centros)
            {
                context.Clases.Add(new Clase(){Nombre = "Clase" + centro.Id, Centro = centro});
            }

            context.SaveChanges();

            foreach (var centro in context.Centros)
            {
                context.Alumnos.Add(new Alumno() { Nombre = "Alumno" + centro.Id, Centro = centro, FechaAlta = DateTime.Today });
            }

            context.SaveChanges();

            base.Seed(context);
        }
    }
}