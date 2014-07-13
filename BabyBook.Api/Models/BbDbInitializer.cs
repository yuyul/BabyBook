using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace BabyBook.Api.Models
{
    public class BbDbInitializer: DropCreateDatabaseAlways<BbContext>
    {
        protected override void Seed(BbContext context)
        {
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