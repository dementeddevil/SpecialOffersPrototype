using WebApi.Hal;

namespace SpecialOfferPrototype.Api
{
    public class LinkTemplates
    {
        public class SpecialOffers
        {
            public static Link AllSpecialOffers => new Link("special-offers", "~/api/special-offers{?filter,page,pageSize}");

            public static Link CountySpecialOffers => new Link("special-offers", "~/api/special-offers/county/{countyId}/{?filter,page,pageSize}");

            public static Link CategorySpecialOffers => new Link("special-offers", "~/api/special-offers/category/{categoryId}/{?filter,page,pageSize}");

            public static Link CategoryCountySpecialOffers => new Link("special-offers", "~/api/special-offers/category/{categoryId}/county/{countyId}/{?filter,page,pageSize}");

            public static Link SpecialOffer => new Link("special-offer", "~/api/special-offers/{id}");
        }
    }
}