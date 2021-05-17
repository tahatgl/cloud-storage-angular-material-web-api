using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HelperDataLib
{
    public class Select
    {
        public static DataTable GetAllList(int userId, int roleId)
        {
            DataTable dt = new DataTable();
            SqlConnection con = Connection.OpenConnection();

            try
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = con;

                    if (roleId == Convert.ToInt32(ConfigurationManager.AppSettings["adminRoleId"]))
                        cmd.CommandText = "select * from FileUpload";
                    else
                    {
                        cmd.CommandText = @"select * from FileUpload where UserID = @userId";
                        cmd.Parameters.AddWithValue("@userId", userId);
                    }
                       

                    if (con.State != ConnectionState.Open)
                    {
                        con.Open();
                    }

                    using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                    {
                        da.Fill(dt);
                    }

                    if (con.State != ConnectionState.Closed)
                    {
                        con.Close();
                    }
                }
            }
            catch (Exception ex)
            {
                con.Close();
            }
            return dt;
        }

        public static DataTable login(string mail, string password)
        {
            DataTable dt = new DataTable();
            SqlConnection con = Connection.OpenConnection();

            try
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = con;

                    cmd.CommandText = @"select * from [User] where Mail=@mail and Password=@password";

                    cmd.Parameters.AddWithValue("@mail", mail);
                    cmd.Parameters.AddWithValue("@password", password);

                    if (con.State != ConnectionState.Open)
                    {
                        con.Open();
                    }

                    using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                    {
                        da.Fill(dt);
                    }

                    if (con.State != ConnectionState.Closed)
                    {
                        con.Close();
                    }
                }
            }
            catch (Exception ex)
            {
                con.Close();
            }
            return dt;
        }
    }
}
