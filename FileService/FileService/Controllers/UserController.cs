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
        public async Task<UserModel> CreateUser(UserModel usr)
        {
           

            int userId =  HelperDataLib.Insert.InsertCreateUser(usr.Name, usr.Mail, usr.Password, usr.Role);
            UserModel user = new UserModel { ID=userId, Name = usr.Name, Mail = usr.Mail, Password = usr.Password, Role = usr.Role };

            return user;
        }

        [Route("fileListForUser/{userId}/{roleId}")]
        [HttpGet]
       public IEnumerable<FileUploadModel> GetAllFileList(int userId, int roleId)
        {
            List<FileUploadModel> fileUploads = new List<FileUploadModel>();

            DataTable dt  = HelperDataLib.Select.GetAllList(userId, roleId);

           if(dt.Rows.Count !=0 && dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    FileUploadModel fu = new FileUploadModel
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
        public UserModel login(string mail, string password)
        {
            UserModel user = new UserModel();
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

        [Route("userList")]
        [HttpGet]
        public IEnumerable<UserModel> GetUserList(int roleId)
        {
            List<UserModel> list = new List<UserModel>();
            DataTable dt = HelperDataLib.Select.GetUserList(roleId);

            if(dt.Rows.Count != 0 && dt != null)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    UserModel us = new UserModel
                    {
                        ID = Convert.ToInt32(dt.Rows[i]["ID"]),
                        Name = dt.Rows[i]["Name"].ToString(),
                        Mail = dt.Rows[i]["Mail"].ToString(),
                        Password = dt.Rows[i]["Password"].ToString(),
                        Role = Convert.ToInt32(dt.Rows[i]["Role"])
                    };
                    list.Add(us);
                }
            }

            return list;
        }

        [Route("updateUser")]
        [HttpPut]
        public ResultModel UserUpdate(UserModel model) //ADO net ile yapmayı bir türlü beceremedim
        {
            ResultModel result = new ResultModel();
            fileUploadEntities db = new fileUploadEntities();

            User user = db.User.Where(q => q.ID == model.ID).SingleOrDefault();

            if(user == null)
            {
                result.process = false;
                result.message = "Üye bulunamadı!";
                return result;
            }
            user.Name = model.Name;
            user.Mail = model.Mail;
            user.Password = model.Password;
            user.Role = model.Role;

            db.SaveChanges();

            result.process = true;
            result.message = "Üye bilgileri güncellendi";
            return result;
        }
    }
}
