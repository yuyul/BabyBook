using BabyBook.Api.Models;
using BabyBook.Api.Repositories;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace BabyBook.Api.Controllers
{
    public class AlumnosController : ApiController
    {
        private AlumnoRepository _repository;

        public AlumnosController()
        {
            _repository = new AlumnoRepository();
        }

        // GET api/alumnos/5
        [ActionName("getbyid")]
        public Alumno Get(int id)
        {
            return _repository.GetById(id);
        }

        [ActionName("getbycentroid")]
        public IEnumerable<Alumno> GetByCentroId(int id)
        {
            return _repository.GetByCentro(id);
        }


        [ActionName("getalumnossinasignar")]
        [HttpGet]
        public IEnumerable<Alumno> GetAlumnosSinAsignar(int id)
        {
            return _repository.GetSinAsignar(id);
        }

        [ActionName("getalumnossinasignarByCentroCurso")]
        [HttpGet]
        public IEnumerable<Alumno> GetAlumnosSinAsignarByCentroCurso(int centroId, int cursoId)
        {
            return _repository.GetSinAsignarByCentroCurso(centroId, cursoId);
        }

        [ActionName("getalumnosbyclase")]
        [HttpGet]
        public IEnumerable<Alumno> GetAlumnosByClase(int id)
        {
            return _repository.GetAlumnoByClase(id);
        }

        [ActionName("getalumnosbyclasecurso")]
        [HttpGet]
        public IEnumerable<Alumno> GetAlumnoByClaseCurso(int claseId, int cursoId)
        {
            return _repository.GetAlumnoByClaseCurso(claseId, cursoId);
        }

        [ActionName("getalumnosbyprofesorcurso")]
        public IEnumerable<Alumno> GetAlumnosByProfesorcurso()
        {
            var userName = User.Identity.Name;

            return _repository.GetAlumnoByProfesorCurso(userName);
        }

        [ActionName("getalumnosbyfamiliar")]
        public IEnumerable<Alumno> GetAlumnosByFamiliar()
        {
            var userName = User.Identity.Name;

            return _repository.GetAlumnosByFamiliar(userName);
        }

        // POST api/alumnos
        [ActionName("creaAlumno")]
        [HttpPost]
        public void Post([FromBody]Alumno value)
        {
            value.FechaAlta = DateTime.Today;
            _repository.AddAlumno(value);
        }

        [ActionName("uploadAlumno")]
        [HttpPost]
        public async Task<HttpResponseMessage> UploadAlumno()
        {
            bool updateFoto = false;

            if (!Request.Content.IsMimeMultipartContent())
            {
                this.Request.CreateResponse(HttpStatusCode.UnsupportedMediaType);
            }

            var provider = GetMultipartProvider();
            var result = await Request.Content.ReadAsMultipartAsync(provider);

            var originalFileName = "niño.jpg";

            if (result.FileData.Count > 0)
            {
                originalFileName = GetDeserializedFileName(result.FileData.First());

                var uploadFileInfo = new FileInfo(result.FileData.First().LocalFileName);

                if (File.Exists(uploadFileInfo.DirectoryName + '\\' + originalFileName))
                {
                    File.Delete(uploadFileInfo.DirectoryName + '\\' + originalFileName);
                }

                File.Move(uploadFileInfo.FullName, uploadFileInfo.DirectoryName + '\\' + originalFileName);

                updateFoto = true;
            }


            Alumno fileUploadObj = (Alumno)GetFormData<Alumno>(result);

            
            fileUploadObj.Foto = originalFileName;

            Alumno returnData ;
            if (fileUploadObj.Id == 0)
            {
                fileUploadObj.FechaAlta = DateTime.Today;
                returnData = _repository.AddAlumno(fileUploadObj);
            }
            else
            {
                if (updateFoto) fileUploadObj.Foto = originalFileName;

                returnData = _repository.UpdateAlumno(fileUploadObj.Id, fileUploadObj);
            }

            
            return this.Request.CreateResponse(HttpStatusCode.OK, new { returnData });
            
        }

        // PUT api/alumnos/5
        /*public void Put(int id, [FromBody]Alumno value)
        {
            _repository.UpdateAlumno(id, value);
        }*/

        /*public async Task<HttpResponseMessage> UpdateAlumno(int id)
        {
            if (!Request.Content.IsMimeMultipartContent())
            {
                this.Request.CreateResponse(HttpStatusCode.UnsupportedMediaType);
            }

            var provider = GetMultipartProvider();
            var result = await Request.Content.ReadAsMultipartAsync(provider);

            var originalFileName = "";

            if (result.FileData.Count > 0)
            {
                originalFileName = GetDeserializedFileName(result.FileData.First());

                var uploadFileInfo = new FileInfo(result.FileData.First().LocalFileName);

                if (File.Exists(uploadFileInfo.DirectoryName + '\\' + originalFileName))
                {
                    File.Delete(uploadFileInfo.DirectoryName + '\\' + originalFileName);
                }

                File.Move(uploadFileInfo.FullName, uploadFileInfo.DirectoryName + '\\' + originalFileName);

            }


            Alumno fileUploadObj = (Alumno)GetFormData<Alumno>(result);

            fileUploadObj.FechaAlta = DateTime.Today;
            if (originalFileName != "") fileUploadObj.Foto = originalFileName;

            _repository.UpdateAlumno(id, fileUploadObj);

            var returnData = "ReturnTest";
            return this.Request.CreateResponse(HttpStatusCode.OK, new { returnData });
        }*/

        // DELETE api/alumnos/5
        public void Delete(int id)
        {
        }

        // You could extract these two private methods to a separate utility class since
        // they do not really belong to a controller class but that is up to you
        private MultipartFormDataStreamProvider GetMultipartProvider()
        {
            // IMPORTANT: replace "(tilde)" with the real tilde character
            // (our editor doesn't allow it, so I just wrote "(tilde)" instead)
            var uploadFolder = "~/Public/alumnos"; // you could put this to web.config
            var root = HttpContext.Current.Server.MapPath(uploadFolder);
            Directory.CreateDirectory(root);
            return new MultipartFormDataStreamProvider(root);
        }

        // Extracts Request FormatData as a strongly typed model
        private object GetFormData<T>(MultipartFormDataStreamProvider result)
        {
            if (result.FormData.HasKeys())
            {
                var unescapedFormData = Uri.UnescapeDataString(result.FormData
                    .GetValues(0).FirstOrDefault() ?? String.Empty);
                if (!String.IsNullOrEmpty(unescapedFormData))
                    return JsonConvert.DeserializeObject<T>(unescapedFormData);
            }

            return null;
        }

        private string GetDeserializedFileName(MultipartFileData fileData)
        {
            var fileName = GetFileName(fileData);
            return JsonConvert.DeserializeObject(fileName).ToString();
        }

        public string GetFileName(MultipartFileData fileData)
        {
            return fileData.Headers.ContentDisposition.FileName;
        }
    }
}
