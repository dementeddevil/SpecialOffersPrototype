using System.Collections.Generic;
using WebApi.Hal;

namespace SpecialOfferPrototype.Api.Controllers.Representations
{
    public class SpecialOfferListRepresentation : PagedRepresentationList<SpecialOfferRepresentation>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="SpecialOfferListRepresentation" /> class.
        /// </summary>
        /// <param name="specialOffers">The special offers.</param>
        /// <param name="queryTerm">The query term.</param>
        /// <param name="totalResults">The total results.</param>
        /// <param name="totalPages">The total pages.</param>
        /// <param name="pageIndex">Index of the page.</param>
        /// <param name="pageSize">Size of the page.</param>
        /// <param name="countyId">The county identifier.</param>
        /// <param name="categoryId">The category identifier.</param>
        public SpecialOfferListRepresentation(
            IList<SpecialOfferRepresentation> specialOffers,
            string queryTerm,
            int totalResults,
            int totalPages,
            int pageIndex,
            int pageSize,
            string categoryId = null,
            string countyId = null)
            : base(
                specialOffers,
                totalResults,
                totalPages,
                pageIndex,
                GetLinkTemplate(categoryId, countyId),
                GetParentLinkTemplate(categoryId, countyId),
                new
                {
                    term = queryTerm,
                    page = pageIndex,
                    pageSize,
                    countyId,
                    categoryId
                })
        {
            CategoryId = categoryId;
            CountyId = countyId;
        }

        public string CategoryId { get; }

        public string CountyId { get; }

        protected override void CreateHypermedia()
        {
            base.CreateHypermedia();
        }

        private static Link GetLinkTemplate(string categoryId, string countyId)
        {
            if (!string.IsNullOrEmpty(countyId) && !string.IsNullOrEmpty(categoryId))
            {
                return LinkTemplates.SpecialOffers.CategoryCountySpecialOffers;
            }

            if (!string.IsNullOrEmpty(countyId))
            {
                return LinkTemplates.SpecialOffers.CountySpecialOffers;
            }

            if (!string.IsNullOrEmpty(categoryId))
            {
                return LinkTemplates.SpecialOffers.CategorySpecialOffers;
            }

            return LinkTemplates.SpecialOffers.AllSpecialOffers;
        }

        private static Link GetParentLinkTemplate(string categoryId, string countyId)
        {
            if (!string.IsNullOrEmpty(categoryId) && !string.IsNullOrEmpty(countyId))
            {
                return LinkTemplates.SpecialOffers.CategorySpecialOffers;
            }

            if (!string.IsNullOrEmpty(countyId) || !string.IsNullOrEmpty(categoryId))
            {
                return LinkTemplates.SpecialOffers.AllSpecialOffers;
            }

            return null;
        }
    }
}