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
            bool isNewFamiliar = true;
            int idFamiliar = 0;
            Familiar tFamiliar = _ctx.Familiares.Where(f => f.DNI == familiar.DNI).First();

            UserModel user = new UserModel();

            user.UserName = familiar.DNI;
            user.Password = "123456";
            user.Email = familiar.Email;

            if (tFamiliar == null)
            {



                UserApp userapp = _userRepository.RegisterUser(user, "Familiar");

                familiar.UserId = userapp.Id;

                tFamiliar = _ctx.Familiares.Add(familiar);

                _ctx.SaveChanges();

                idFamiliar = tFamiliar.Id;
            }else{
                idFamiliar = tFamiliar.Id;
                isNewFamiliar = false;
            }

            AlumnoFamiliar nuevaAsignacion = new AlumnoFamiliar();

            nuevaAsignacion.AlumnoId = alumnoId;
            nuevaAsignacion.FamiliarId = idFamiliar;

            _ctx.AlumnosFamiliares.Add(nuevaAsignacion);

            _ctx.SaveChanges();
            
            //enviar mail
            Alumno alumnoasignado = _ctx.Alumnos.Find(alumnoId);

            if (isNewFamiliar)
            {
                SendMail envioMail = new SendMail();

                envioMail.EnvioMail("julian.caro@gmail.com", "Alta Familiar", "Se ha dado de alta su usuario como Familiar del alumno " + alumnoasignado.Nombre + " . Usuario: " + user.UserName + " Password: " + user.Password);
            }

            return tFamiliar;
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