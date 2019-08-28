using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gerontocracy.App.Models.Account
{
    /// <summary>
    /// Defines a user overview
    /// </summary>
    [Serializable]
    public class UserOverView
    {                     
            /// <summary>
            /// The users Id
            /// </summary>
            public long Id { get; set; }

            /// <summary>
            /// The users name
            /// </summary>
            public string UserName { get; set; }

            /// <summary>
            /// The users join date
            /// </summary>
            public DateTime RegisterDate { get; set; }           
        
    }
}
