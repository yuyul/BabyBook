﻿using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace BabyBook.Api.Models
{
    public class BbDbInitializer: DropCreateDatabaseAlways<BbContext>
    {
        protected override void Seed(BbContext context)
        {
            var UserManager = new UserManager<UserApp>(new UserStore<UserApp>(context));
            var RoleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(context));

            string Name = "Admin";
            string password = "123456";

            if (!RoleManager.RoleExists(Name))
            {
                var roleresult = RoleManager.Create(new IdentityRole(Name));
            }

            RoleManager.Create(new IdentityRole("Gestor"));
            RoleManager.Create(new IdentityRole("Profesor"));
            RoleManager.Create(new IdentityRole("Familiar"));

            var user = new UserApp();

            user.UserName = Name;

            var adminresult = UserManager.Create(user, password);

            if (adminresult.Succeeded)
            {
                var result = UserManager.AddToRole(user.Id, Name);
            }

            /*int contador = 0;

            for (contador = 1; contador < 10; contador++)
            {
                context.Centros.Add(new Centro() { Nombre = "Centro" + contador, Direccion = "Direccion" + contador, FechaAlta = DateTime.Today, GestorId = user.Id});
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

            context.SaveChanges();*/

            base.Seed(context);
        }
    }
}
