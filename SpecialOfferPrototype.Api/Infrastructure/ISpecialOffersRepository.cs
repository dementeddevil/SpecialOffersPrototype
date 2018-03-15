using System.Threading;
using System.Threading.Tasks;

namespace SpecialOfferPrototype.Api.Infrastructure
{
    public interface ISpecialOffersRepository
    {
        Task<ISpecialOffers> GetSpecialOffersAsync(
            string categoryId,
            string countyId,
            string filter,
            int pageIndex,
            int pageSize,
            CancellationToken cancellationToken);
    }
}