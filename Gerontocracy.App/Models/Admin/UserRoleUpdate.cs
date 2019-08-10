using System.Collections.Generic;

namespace Gerontocracy.App.Models.Admin
{
    /// <summary>
    /// Contains the data required for a user-role-update
    /// </summary>
    public class UserRoleUpdate
    {
        /// <summary>
        /// the updated user's id
        /// </summary>
        public long UserId { get; set; }

        /// <summary>
        /// the role Ids
        /// </summary>
        public List<long> RoleIds { get; set; }
    }
}
