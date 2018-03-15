using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SpecialOfferPrototype.Api.Infrastructure
{
    public class SpecialOffersRepository : ISpecialOffersRepository
    {
        private class SpecialOffer : ISpecialOffer
        {
            public SpecialOffer(
                string id,
                string name,
                string description,
                string imageUrl,
                string offerUrl,
                string categoryId,
                string countyId,
                DateTime validFrom,
                DateTime validTo,
                int sortOrder)
            {
                Id = id;
                Name = name;
                Description = description;
                ImageUrl = imageUrl;
                OfferUrl = offerUrl;
                CategoryId = categoryId;
                CountyId = countyId;
                ValidFrom = validFrom;
                ValidTo = validTo;
                SortOrder = sortOrder;
            }

            public string Id { get; }

            public string CategoryId { get; }

            public string CountyId { get; }

            public string Name { get; }

            public string Description { get; }

            public string ImageUrl { get; }

            public string OfferUrl { get; }

            public DateTime ValidFrom { get; }

            public DateTime ValidTo { get; }

            public int SortOrder { get; }
        }

        private class SpecialOffers:ISpecialOffers
        {
            public SpecialOffers(int total, ICollection<ISpecialOffer> offers)
            {
                Total = total;
                Offers = offers;
            }

            public int Total { get; }

            public ICollection<ISpecialOffer> Offers { get; }
        }

        private readonly List<SpecialOffer> _specialOffers = new List<SpecialOffer>();

        public SpecialOffersRepository()
        {
            // Create set of SO elements
            for (int index = 0; index < 1000; ++index)
            {
                _specialOffers.Add(
                    new SpecialOffer(
                        $"Foo-{index}",
                        $"Pamper yourself with Foo {index}",
                        "This special offer is for foo company to receive a couples pampering at our world-class spa resort with a 20% discount",
                        $"http://foo.org/specialoffer/product/{index}/image?source=hitched",
                        $"http://foo.org/specialoffer/product/{index}?source=hitched",
                        "SpaServices",
                        "Essex",
                        DateTime.MinValue,
                        DateTime.UtcNow.AddDays(1),
                        index));
            }
        }

        public async Task<ISpecialOffers> GetSpecialOffersAsync(
            string categoryId,
            string countyId,
            string filter,
            int pageIndex,
            int pageSize,
            CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            var now = DateTime.UtcNow;
            var entireSet = await Task.FromResult(_specialOffers
                .Where(_ =>
                    (string.IsNullOrWhiteSpace(categoryId) || _.CategoryId == categoryId) &&
                    (string.IsNullOrWhiteSpace(countyId) || _.CountyId == countyId) &&
                    (string.IsNullOrWhiteSpace(filter) || _.Name.Contains(filter)) &&
                    _.ValidFrom <= now && _.ValidTo >= now)
                .Cast<ISpecialOffer>()
                .ToList());
            
            return new SpecialOffers(
                entireSet.Count,
                entireSet
                    .Skip(pageIndex * pageSize)
                    .Take(pageSize)
                    .ToList());
        }
    }

    public interface ISpecialOffers
    {
        int Total { get; }

        ICollection<ISpecialOffer> Offers { get; }
    }

    public interface ISpecialOffer
    {
        string Id { get; }

        string CategoryId { get; }

        string CountyId { get; }

        string Name { get; }

        string Description { get; }

        string ImageUrl { get; }

        string OfferUrl { get; }

        DateTime ValidTo { get; }
    }
}
