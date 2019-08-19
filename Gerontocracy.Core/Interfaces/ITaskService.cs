using Gerontocracy.Core.BusinessObjects.Shared;
using Gerontocracy.Core.BusinessObjects.Task;

namespace Gerontocracy.Core.Interfaces
{
    public interface ITaskService
    {
        SearchResult<AufgabeOverview> Search(SearchParameters parameters, int pageSize = 25, int pageIndex = 0);
    }
}
