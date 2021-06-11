using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HelperDataLib
{
    public class Delete
    {
        public static bool DeleteFile(int id)
        {
            bool status = false;
            SqlConnection con = Connection.OpenConnection();
            try
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = con;
                    cmd.CommandText = @"delete from FileUpload where ID=@id";
                    cmd.Parameters.AddWithValue("@id", id);
                 

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

        public static bool DeleteUser(int id)
        {
            bool status = false;
            SqlConnection con = Connection.OpenConnection();
            try
            {
                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = con;
                    cmd.CommandText = @"delete from [User] where ID=@id";
                    cmd.Parameters.AddWithValue("@id", id);


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

    }
}
