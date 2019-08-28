using System;
using System.Collections.Generic;

namespace Gerontocracy.Core.BusinessObjects.Account
{
    public class UserOverView
    {
        public long Id { get; set; }
        public string UserName { get; set; }
        public DateTime RegisterDate { get; set; }
    }
}
