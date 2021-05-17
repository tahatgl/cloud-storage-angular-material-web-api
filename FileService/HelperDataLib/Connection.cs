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
    public class Connection
    {
        public static SqlConnection OpenConnection()
        {
            SqlConnection con = new SqlConnection();

            try
            {
                con.ConnectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;
                if (con.State != ConnectionState.Open)
                {
                    con.Open();
                }
            }
            catch (Exception ex)
            {
                con.Close();
                
            }
            return con;
        }
    }
}
