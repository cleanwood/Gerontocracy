using System;
using System.Linq;
using System.Reflection.Metadata;
using AutoMapper;
using Gerontocracy.Core.BusinessObjects.Account;
using Gerontocracy.Core.BusinessObjects.Shared;
using Gerontocracy.Core.BusinessObjects.Task;
using Gerontocracy.Core.Exceptions;
using Gerontocracy.Core.Interfaces;
using Gerontocracy.Data;

using Microsoft.EntityFrameworkCore;

using db = Gerontocracy.Data.Entities;

namespace Gerontocracy.Core.Providers
{
    public class TaskService : ITaskService
    {
        #region Fields

        private readonly GerontocracyContext _context;
        private readonly IMapper _mapper;

        #endregion Fields

        #region Constructors

        public TaskService(GerontocracyContext context, IMapper mapper)
        {
            this._context = context;
            this._mapper = mapper;
        }

        #endregion Constructors

        #region Methods

        public SearchResult<AufgabeOverview> Search(SearchParameters parameters, int pageSize = 25, int pageIndex = 0)
        {
            var query = _context
                .Aufgabe
                .Include(n => n.Bearbeiter)
                .Include(n => n.Einreicher)
                .AsQueryable();

            if (!parameters.IncludeDone)
            {
                query = query.Where(n => !n.Erledigt);
            }

            if (!string.IsNullOrEmpty(parameters.Username))
            {
                query = query.Where(n =>
                    n.Einreicher.UserName.Contains(parameters.Username, StringComparison.CurrentCultureIgnoreCase));
            }

            if (parameters.TaskType.HasValue)
            {
                query = query.Where(n => n.TaskType == (db.Task.TaskType)parameters.TaskType.Value);
            }

            var data = query.Select(n => new AufgabeOverview
            {
                Id = n.Id,
                Erledigt = n.Erledigt,
                EingereichtAm = n.EingereichtAm,
                Einreicher = n.Einreicher.UserName,
                TaskType = (TaskType)n.TaskType,
                Uebernommen = n.Bearbeiter != null
            }).ToList();

            return new SearchResult<AufgabeOverview>
            {
                Data = data,
                MaxResults = query.Count()
            };
        }

        public AufgabeDetail GetTask(long id)
        {
            var task = _context
                .Aufgabe
                .Include(n => n.Bearbeiter)
                .Include(n => n.Einreicher)
                .SingleOrDefault(n => n.Id == id);
            
            if (task == null)
                throw new TaskNotFoundException();

            return new AufgabeDetail
            {
                TaskType = (TaskType)task.TaskType,
                Id = task.Id,
                Einreicher = task.Einreicher?.UserName ?? string.Empty,
                EinreicherId = task.EinreicherId,
                Bearbeiter = task.Bearbeiter?.UserName ?? string.Empty,
                BearbeiterId = task.BearbeiterId,
                Erledigt = task.Erledigt,
                Beschreibung = task.Beschreibung,
                MetaData = task.MetaData
            };
        }

        #endregion Methods
    }
}
