﻿using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SpecialOfferPrototype.Api.Controllers.Representations;
using SpecialOfferPrototype.Api.Infrastructure;

namespace SpecialOfferPrototype.Api.Controllers
{
    [Produces("application/json")]
    [Route("api/SpecialOffers")]
    public class SpecialOffersController : Controller
    {
        private readonly ISpecialOffersRepository _specialOffersRepository;

        public SpecialOffersController(ISpecialOffersRepository repository)
        {
            _specialOffersRepository = repository;
        }

        /// <summary>
        /// Gets the list of matching special offers.
        /// </summary>
        /// <param name="cancellationToken">The cancellation token.</param>
        /// <param name="filter">The filter.</param>
        /// <param name="pageIndex">Index of the page.</param>
        /// <param name="pageSize">Size of the page.</param>
        /// <returns></returns>
        [HttpGet]
        [Route("special-offers")]
        [Produces("application/hal+json", "application/json", Type = typeof(SpecialOfferListRepresentation))]
        [ProducesResponseType(typeof(SpecialOfferListRepresentation), 200)]
        public Task<IActionResult> GetSpecialOffersAsync(
            CancellationToken cancellationToken,
            [FromQuery(Name = "q")] string filter = null,
            [FromQuery(Name = "pi")] int pageIndex = 1,
            [FromQuery(Name = "ps")] int pageSize = 10)
        {
            return GetSpecialOffersAsync(
                cancellationToken,
                null,
                null,
                filter,
                pageIndex,
                pageSize);
        }

        /// <summary>
        /// Gets the list of matching special offers.
        /// </summary>
        /// <param name="cancellationToken">The cancellation token.</param>
        /// <param name="categoryId">The category identifier.</param>
        /// <param name="filter">The filter.</param>
        /// <param name="pageIndex">Index of the page.</param>
        /// <param name="pageSize">Size of the page.</param>
        /// <returns></returns>
        [HttpGet]
        [Route("special-offers/category/{categoryId}")]
        [Produces("application/hal+json", "application/json", Type = typeof(SpecialOfferListRepresentation))]
        [ProducesResponseType(typeof(SpecialOfferListRepresentation), 200)]
        public Task<IActionResult> GetSpecialOffersAsync(
            CancellationToken cancellationToken,
            [FromRoute] string categoryId,
            [FromQuery(Name = "q")] string filter = null,
            [FromQuery(Name = "pi")] int pageIndex = 1,
            [FromQuery(Name = "ps")] int pageSize = 10)
        {
            return GetSpecialOffersAsync(
                cancellationToken,
                categoryId,
                null,
                filter,
                pageIndex,
                pageSize);
        }

        /// <summary>
        /// Gets the list of matching special offers.
        /// </summary>
        /// <param name="cancellationToken">The cancellation token.</param>
        /// <param name="categoryId">The category identifier.</param>
        /// <param name="countyId">The county identifier.</param>
        /// <param name="filter">The filter.</param>
        /// <param name="pageIndex">Index of the page.</param>
        /// <param name="pageSize">Size of the page.</param>
        /// <returns></returns>
        [HttpGet]
        [Route("special-offers/category/{categoryId}/county/{countyId}")]
        [Produces("application/hal+json", "application/json", Type = typeof(SpecialOfferListRepresentation))]
        [ProducesResponseType(typeof(SpecialOfferListRepresentation), 200)]
        public async Task<IActionResult> GetSpecialOffersAsync(
            CancellationToken cancellationToken,
            [FromRoute] string categoryId,
            [FromRoute] string countyId,
            [FromQuery(Name = "q")] string filter = null,
            [FromQuery(Name = "pi")] int pageIndex = 1,
            [FromQuery(Name = "ps")] int pageSize = 10)
        {
            if (pageIndex < 1 || pageSize < 1)
            {
                return BadRequest();
            }

            var results = await _specialOffersRepository
                .GetSpecialOffersAsync(categoryId, countyId, filter, pageIndex - 1, pageSize, cancellationToken)
                .ConfigureAwait(true);

            var pagedItems = results
                .Offers
                .Select(
                    offer =>
                    new SpecialOfferRepresentation
                    {
                        Id = offer.Id,
                        CategoryId = offer.CategoryId,
                        CountyId = offer.CountyId,
                        Name = offer.Name,
                        Description = offer.Description,
                        ImageUrl = offer.ImageUrl,
                        OfferUrl = offer.OfferUrl,
                        ValidUntil = offer.ValidTo
                    })
                .ToList();

            var totalPages = results.Total / pageSize;
            if ((results.Total % pageSize) != 0)
            {
                ++totalPages;
            }

            var result =
                new SpecialOfferListRepresentation(
                    pagedItems,
                    filter,
                    results.Total,
                    totalPages,
                    pageIndex,
                    pageSize,
                    categoryId,
                    countyId);

            return Ok(result);
        }
    }
}