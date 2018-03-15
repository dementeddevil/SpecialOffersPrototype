using System;
using WebApi.Hal;

namespace SpecialOfferPrototype.Api.Controllers.Representations
{
    public class SpecialOfferRepresentation : Representation
    {
        public string Id { get; set; }

        public string CategoryId { get; set; }

        public string CountyId { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string ImageUrl { get; set; }

        public string OfferUrl { get; set; }

        public DateTimeOffset ValidUntil { get; set; }

        public override string Rel
        {
            get => LinkTemplates.SpecialOffers.SpecialOffer.Rel;
            set { }
        }

        public override string Href
        {
            get => LinkTemplates.SpecialOffers.SpecialOffer.CreateLink(new { id = Id }).Href;
            set { }
        }

        protected override void CreateHypermedia()
        {
            // TODO: If special offers can have related items then add links to those things here
            //  for example we could add links to allow search by category and/or county...
            Links.Add(new Link { Rel = "self" });
        }
    }
}