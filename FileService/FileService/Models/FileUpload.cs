using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FileService.Models
{
    public class FileUpload
    {
        public int ID { get; set; }
        public int UserID { get; set; }
        public string FileNames { get; set; }
        public string Description { get; set; }
        public DateTime CreatedTimestamp { get; set; }
        public DateTime UpdatedTimestamp { get; set; }
        public string DownloadLink { get; set; }
        public string ContentTypes { get; set; }
        public string Names { get; set; }
    }
}