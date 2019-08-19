﻿using System;
using System.Linq;
using Gerontocracy.Core.BusinessObjects.Shared;
using Gerontocracy.Core.BusinessObjects.Task;
using Gerontocracy.Core.Interfaces;
using Gerontocracy.Data;
using Microsoft.Data.OData;
using Microsoft.EntityFrameworkCore;

namespace Gerontocracy.Core.Providers
{
    public class TaskService : ITaskService
    {
        #region Fields

        private readonly GerontocracyContext _context;

        #endregion Fields

        #region Constructors

        public TaskService(GerontocracyContext context)
        {
            this._context = context;
        }

        #endregion Constructors

        #region Methods

        public SearchResult<AufgabeOverview> Search(SearchParameters parameters, int pageSize = 25, int pageIndex = 0)
        {
            var query = _context
                .Aufgabe
                .Include(n => n.Uebernommen)
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

            var data = query.Select(n => new AufgabeOverview()
            {
                Id = n.Id,
                Erledigt = n.Erledigt,
                EingereichtAm = n.EingereichtAm,
                TaskType = (TaskType)n.TaskType,
                Uebernommen = n.Uebernommen != null
            }).ToList();

            return new SearchResult<AufgabeOverview>
            {
                Data = data,
                MaxResults = query.Count()
            };
        }

        #endregion Methods
    }
}