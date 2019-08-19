using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using Gerontocracy.Data.Entities.Account;

namespace Gerontocracy.Data.Entities.Task
{
    public class AufgabeOverview
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        public TaskType TaskType { get; set; }

        public string Beschreibung { get; set; }

        public DateTime EingereichtAm { get; set; }

        public bool Erledigt { get; set; }

        [ForeignKey(nameof(Einreicher))]
        public long EinreicherId { get; set; }
        public User Einreicher { get; set; }

        [ForeignKey(nameof(Uebernommen))]
        public long UebernommenId { get; set; }
        public User Uebernommen { get; set; }
    }
}
