using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HelperDataLib
{
    public class Insert
    {
        public static bool InsertFileUploads(int UserID, string FileNames, string Description, DateTime CreatedTimestamp, DateTime UpdatedTimestamp, string DownloadLink, string ContentTypes, string Names)
        {
            bool status = false;
            SqlConnection con = Connection.OpenConnection();
            try
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = con;
                    cmd.CommandText = @"INSERT INTO [dbo].[FileUpload] ([UserID] ,[FileNames] ,[Description] ,[CreatedTimestamp] ,[UpdatedTimestamp] ,[DownloadLink] ,[ContentTypes] ,[Names])
                                                                VALUES (@UserID, @FileNames, @Description, @CreatedTimestamp, @UpdatedTimestamp, @DownloadLink, @ContentTypes, @Names) ";
                    cmd.Parameters.AddWithValue("@UserID", UserID);
                    cmd.Parameters.AddWithValue("@FileNames", FileNames);
                    cmd.Parameters.AddWithValue("@Description", Description);
                    cmd.Parameters.AddWithValue("@CreatedTimestamp", CreatedTimestamp);
                    cmd.Parameters.AddWithValue("@UpdatedTimestamp", UpdatedTimestamp);
                    cmd.Parameters.AddWithValue("@DownloadLink", DownloadLink);
                    cmd.Parameters.AddWithValue("@ContentTypes", ContentTypes);
                    cmd.Parameters.AddWithValue("@Names", Names);


                    if (con.State != ConnectionState.Open)
                    {
                        con.Open();
                    }

                    int result = cmd.ExecuteNonQuery();
                    if (result > 0)
                        status = true;

                    if (con.State != ConnectionState.Closed)
                    {
                        con.Close();
                    }
                }
            }
            catch (Exception ex)
            {

            }

            return status;
                 
        }

        public static int InsertCreateUser(string name, string mail, string password, int role)
        {
            int result = 0;
            bool status = false;
            SqlConnection con = Connection.OpenConnection();
            try
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = con;
                    cmd.CommandText = @"INSERT INTO [dbo].[User] ([Name] ,[Mail] ,[Password] ,[Role] )
                                                                VALUES (@name , @mail, @password, @role) select @@IDENTITY";
                    cmd.Parameters.AddWithValue("@name", name);
                    cmd.Parameters.AddWithValue("@mail", mail);
                    cmd.Parameters.AddWithValue("@password", password);
                    cmd.Parameters.AddWithValue("@role", role);


                    if (con.State != ConnectionState.Open)
                    {
                        con.Open();
                    }

                    result = Convert.ToInt32(cmd.ExecuteScalar());
                    if (result > 0)
                        status = true;

                    if (con.State != ConnectionState.Closed)
                    {
                        con.Close();
                    }
                }
            }
            catch (Exception ex)
            {

            }

            return result;

        }
    }
}
