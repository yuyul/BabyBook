using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using BabyBook.Api.Models;

namespace BabyBook.Api.Repositories
{
    public class CentroRepository: IDisposable
    {
        private BbContext _ctx;

        public CentroRepository()
        {
            _ctx = new BbContext();
        }

        public IEnumerable<Centro> GetAll()
        {
            List<Centro> centros = _ctx.Centros.Where(c => c.FechaBaja == null).ToList();

            return centros;
        }

        public void Dispose()
        {
            _ctx.Dispose();
        }
    }
}