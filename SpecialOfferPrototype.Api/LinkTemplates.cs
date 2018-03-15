using WebApi.Hal;

namespace SpecialOfferPrototype.Api
{
    public class LinkTemplates
    {
        public class SpecialOffers
        {
            public static Link AllSpecialOffers => new Link("special-offers", "~/special-offers{?q,pi,ps}");

            public static Link CountySpecialOffers => new Link("special-offers", "~/special-offers/county/{countyId}/{?q,pi,ps}");

            public static Link CategorySpecialOffers => new Link("special-offers", "~/special-offers/category/{categoryId}/{?q,pi,ps}");

            public static Link CategoryCountySpecialOffers => new Link("special-offers", "~/special-offers/category/{categoryId}/county/{countyId}/{?q,pi,ps}");
        }

        public class SpecialOffer
        {
            public static Link GetSpecialOffer => new Link("special-offer", "~/special-offer/{?id}");
        }
    }
}