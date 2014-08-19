using BabyBook.Api.libs;
using BabyBook.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BabyBook.Api.Repositories
{
    public class FamiliarRepository
    {
        private BbContext _ctx;
        private AuthRepository _userRepository;

        public FamiliarRepository()
        {
            _ctx = new BbContext();
            _userRepository = new AuthRepository();
        }

        public Familiar AddFamiliar(int alumnoId, Familiar familiar)
        {
            UserModel user = new UserModel();

            user.UserName = familiar.DNI;
            user.Password = "123456";
            user.Email = familiar.Email;

            UserApp userapp = _userRepository.RegisterUser(user, "Familiar");

            familiar.UserId = userapp.Id;

            Familiar newFamiliar = _ctx.Familiares.Add(familiar);

            _ctx.SaveChanges();
            
            AlumnoFamiliar nuevaAsignacion = new AlumnoFamiliar();

            nuevaAsignacion.AlumnoId = alumnoId;
            nuevaAsignacion.FamiliarId = newFamiliar.Id;

            _ctx.AlumnosFamiliares.Add(nuevaAsignacion);

            _ctx.SaveChanges();
            
            //enviar mail
            Alumno alumnoasignado = _ctx.Alumnos.Find(alumnoId);

            SendMail envioMail = new SendMail();

            envioMail.EnvioMail("julian.caro@gmail.com", "Alta Familiar", "Se ha dado de alta su usuario como Familiar del alumno " + alumnoasignado.Nombre + " . Usuario: " + user.UserName + " Password: " + user.Password);
       

            return newFamiliar;
        }

        public IEnumerable<Familiar> GetFamiliaresByAlumno(int alumnoId)
        {
            var query = (
                from Alumnoes in _ctx.Alumnos
                join AlumnoFamiliars in _ctx.AlumnosFamiliares on new { Id = Alumnoes.Id } equals new { Id = AlumnoFamiliars.AlumnoId }
                join Familiars in _ctx.Familiares on new { Id = AlumnoFamiliars.FamiliarId } equals new { Id = Familiars.Id }
                where
                  Alumnoes.Id == alumnoId
                select Familiars
                );

            return query.ToList();
        }

    }
}