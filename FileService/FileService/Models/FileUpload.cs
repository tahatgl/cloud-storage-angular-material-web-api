//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace FileService.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class FileUpload
    {
        public int ID { get; set; }
        public Nullable<int> UserID { get; set; }
        public string FileNames { get; set; }
        public string Description { get; set; }
        public Nullable<System.DateTime> CreatedTimestamp { get; set; }
        public Nullable<System.DateTime> UpdatedTimestamp { get; set; }
        public string DownloadLink { get; set; }
        public string ContentTypes { get; set; }
        public string Names { get; set; }
    
        public virtual User User { get; set; }
    }
}
