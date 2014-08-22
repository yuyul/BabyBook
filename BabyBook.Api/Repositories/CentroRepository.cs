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
    public class CentroRepository: IDisposable
    {
        private BbContext _ctx;
        private UserManager<UserApp> _userManager;

        public CentroRepository()
        {
            _ctx = new BbContext();
            _userManager = new UserManager<UserApp>(new UserStore<UserApp>(_ctx));
        }

        public IEnumerable<Centro> GetAll()
        {
            List<Centro> centros = _ctx.Centros.Where(c => c.FechaBaja == null).ToList();
            //var query = _ctx.Centros.Where(c => c.FechaBaja == null).Select(Centro);
                                   

            return centros;
        }

        public IEnumerable<Centro> GetByUserId(string userName)
        {
            string userId = _userManager.FindByName(userName).Id;

            var query = 
                from centro in _ctx.Centros
                where  centro.GestorId == userId && centro.FechaBaja == null
                select centro;

            return query.ToList();
        }

        public Centro AddCentro(string userName, Centro centro)
        {
            string userId = _userManager.FindByName(userName).Id;

            centro.FechaAlta = DateTime.Today;
            centro.GestorId = userId;

            Centro newCentro = _ctx.Centros.Add(centro);

            _ctx.SaveChanges();

            return newCentro;
        }

        public Centro UpdateCentro(int id, Centro centro)
        {
            Centro updateCentro = _ctx.Centros.Find(id);

            updateCentro.Nombre = centro.Nombre;
            updateCentro.Direccion = centro.Direccion;

            _ctx.SaveChanges();

            return updateCentro;
        }

        public bool DeleteCentro(int centroId)
        {
            Centro centro = _ctx.Centros.Find(centroId);

            centro.FechaBaja = DateTime.Today;

            _ctx.SaveChanges();

            return true;
        }

        public void Dispose()
        {
            _ctx.Dispose();
        }
    }
}