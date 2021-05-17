using FileService.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace FileService.Controllers
{
    [RoutePrefix("api/user")]
    public class UserController : ApiController
    {
        [Route("createUser")]
        [HttpPost]
        public async Task<User> CreateUser(User usr)
        {
           

            int userId =  HelperDataLib.Insert.InsertCreateUser(usr.Name, usr.Mail, usr.Password, usr.Role);
            User user = new User { ID=userId, Name = usr.Name, Mail = usr.Mail, Password = usr.Password, Role = usr.Role };

            return user;
        }

        [Route("fileListForUser")]
        [HttpGet]
       public IEnumerable<FileUpload> GetAllFileList(int userId, int roleId)
        {
            List<FileUpload> fileUploads = new List<FileUpload>();

            DataTable dt  = HelperDataLib.Select.GetAllList(userId, roleId);

           if(dt.Rows.Count !=0 && dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    FileUpload fu = new FileUpload
                    {
                        ID = Convert.ToInt32(dt.Rows[i]["ID"]),
                        UserID = Convert.ToInt32(dt.Rows[i]["UserID"]),
                        FileNames = dt.Rows[i]["FileNames"].ToString(),
                        Description = dt.Rows[i]["Description"].ToString(),
                        CreatedTimestamp = Convert.ToDateTime(dt.Rows[i]["CreatedTimestamp"]),
                        UpdatedTimestamp = Convert.ToDateTime(dt.Rows[i]["UpdatedTimestamp"]),
                        DownloadLink = dt.Rows[i]["DownloadLink"].ToString(),
                        ContentTypes = dt.Rows[i]["ContentTypes"].ToString(),
                        Names = dt.Rows[i]["Names"].ToString().Trim('"')
                    };
                    fileUploads.Add(fu);
                }
            }

            return fileUploads;
        }

        [Route("login")]
        [HttpGet]
        public User login(string mail, string password)
        {
            User user = new User();
            DataTable dt = HelperDataLib.Select.login(mail, password);

            if(dt.Rows.Count != 0 && dt != null)
            {
                user.ID = Convert.ToInt32(dt.Rows[0]["ID"]);
                user.Name = dt.Rows[0]["Name"].ToString();
                user.Mail = dt.Rows[0]["Mail"].ToString();
                user.Password = dt.Rows[0]["Password"].ToString();
                user.Role = Convert.ToInt32(dt.Rows[0]["Role"]);

                
            }

      

            return user;
        }
    }
}
