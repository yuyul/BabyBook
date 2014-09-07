using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BabyBook.Api.Models;
using Microsoft.AspNet.Identity;
using BabyBook.Api.libs;

namespace BabyBook.Api.Repositories
{
    public class ProfesorRepository
    {
        private BbContext _ctx;
        private AuthRepository _userRepository;

        public ProfesorRepository()
        {
            _ctx = new BbContext();
            _userRepository = new AuthRepository();
        }

        public IEnumerable<Profesor> GetByCentro(int centroId)
        {
            List<Profesor> profesores = _ctx.Profesores.Where(p => p.CentroId == centroId).ToList();

            return profesores;
        }

        public IEnumerable<Profesor> GetAll()
        {
            return _ctx.Profesores.ToList();
        }

        public Profesor GetById(int id)
        {
            return _ctx.Profesores.Find(id);
        }

        public Profesor AddProfesor(Profesor profesor)
        {
            UserModel user = new UserModel();

            user.UserName = profesor.Nombre;
            user.Password = profesor.Nombre + "123";
            user.Email = profesor.Email;

            UserApp userapp = _userRepository.RegisterUser(user, "Profesor");

            profesor.UserId = userapp.Id;

            Profesor newProfesor = _ctx.Profesores.Add(profesor);

            _ctx.SaveChanges();

            SendMail envioMail = new SendMail();

            envioMail.EnvioMail("julian.caro@gmail.com", "Alta Usuario", "Se ha dado de alta su usuario como profesor. Usuario: " + user.UserName + " Password: " + user.Password);
            

            return newProfesor;
        }

        public Profesor UpdateProfesor(int id, Profesor profesor)
        {
            Profesor editProfesor = _ctx.Profesores.Find(id);

            editProfesor.Nombre = profesor.Nombre;
            editProfesor.PrimerApellido = profesor.PrimerApellido;
            editProfesor.SegundoApellido = profesor.SegundoApellido;
            editProfesor.ClaseId = profesor.ClaseId;
            editProfesor.Email = profesor.Email;

            _ctx.SaveChanges();

            return editProfesor;
        }

        public void DeleteProfesor(int id)
        {
            Profesor deleteProfesor = _ctx.Profesores.Find(id);

            if (deleteProfesor != null)
            {
                UserApp user = _userRepository.GetUserById(deleteProfesor.UserId);

                if (user != null)
                {
                    _userRepository.DeleteUser(user);
                }

                _ctx.Profesores.Remove(deleteProfesor);
                _ctx.SaveChanges();
            }

        }
    }
}