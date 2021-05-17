using FileService.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace FileService.Controllers
{
    [RoutePrefix("api/file")]
    public class FileUploadController : ApiController
    {
        private static readonly string ServerUploadFolder = ConfigurationManager.AppSettings["uploadfilepath"]; // "C:\Users\Taha\Desktop\uploadFiles"; //Path.GetTempPath();

        [Route("fileUpload")]
        [HttpPost]
        [ValidateMimeMultipartContentFilter]
        public async Task<FileUpload> UploadSingleFile()
        {
            var streamProvider = new MultipartFormDataStreamProvider(ServerUploadFolder);
            await Request.Content.ReadAsMultipartAsync(streamProvider);

            FileUpload fu = new FileUpload
            {
                UserID = Convert.ToInt32(streamProvider.FormData["UserId"]),
                FileNames = streamProvider.FileData.Select(entry => entry.LocalFileName).ToList()[0].ToString(),
                Names = streamProvider.FileData.Select(entry => entry.Headers.ContentDisposition.FileName).ToList()[0].ToString(),
                ContentTypes = streamProvider.FileData.Select(entry => entry.Headers.ContentType.MediaType).ToList()[0].ToString(),
                Description = streamProvider.FormData["description"],
                CreatedTimestamp = DateTime.UtcNow,
                UpdatedTimestamp = DateTime.UtcNow,
                DownloadLink = "TODO, will implement when file is persisited"
            };

            bool status = HelperDataLib.Insert.InsertFileUploads(fu.UserID, fu.FileNames, fu.Description, fu.CreatedTimestamp, fu.UpdatedTimestamp, fu.DownloadLink, fu.ContentTypes, fu.Names);
            
            return fu;
            
        }




        [Route("deleteFile")]
        [HttpGet]
        public bool DeleteFile(int id)
        {
            bool status = HelperDataLib.Delete.DeleteFile(id);

            return status;
        }
    }

    public class ValidateMimeMultipartContentFilter : ActionFilterAttribute
    {
        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            if (!actionContext.Request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }
        }

        public override void OnActionExecuted(HttpActionExecutedContext actionExecutedContext)
        {

        }

    }
   
}
