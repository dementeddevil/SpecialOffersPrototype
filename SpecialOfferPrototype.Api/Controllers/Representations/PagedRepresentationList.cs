using System.Collections.Generic;
using WebApi.Hal;

namespace SpecialOfferPrototype.Api.Controllers.Representations
{
    public abstract class PagedRepresentationList<TRepresentation> :
        SimpleListRepresentation<TRepresentation>
        where TRepresentation : Representation
    {
        private readonly Link _uriTemplate;
        private readonly Link _parentUriTemplate;

        protected PagedRepresentationList(
            IList<TRepresentation> res,
            int totalResults,
            int totalPages,
            int oneBasedPageIndex,
            Link uriTemplate,
            Link parentUriTemplate,
            params object[] uriTemplateSubstitutionParams)
            : base(res)
        {
            _uriTemplate = uriTemplate;
            _parentUriTemplate = parentUriTemplate;
            
            TotalResults = totalResults;
            TotalPages = totalPages;
            Page = oneBasedPageIndex;
            UriTemplateSubstitutionParams = uriTemplateSubstitutionParams;
        }

        public int TotalResults { get; set; }

        public int TotalPages { get; set; }

        public int Page { get; set; }

        protected object[] UriTemplateSubstitutionParams { get; }

        protected override void CreateHypermedia()
        {
            Href = Href ?? _uriTemplate.CreateLink(BuildTemplateParameters(Page)).Href;

            Links.Add(new Link { Href = Href, Rel = "self" });

            if (Page > 1)
            {
                Links.Add(_uriTemplate.CreateLink("first", BuildTemplateParameters(1)));
                Links.Add(_uriTemplate.CreateLink("prev", BuildTemplateParameters(Page - 1)));
            }

            if (Page < TotalPages)
            {
                Links.Add(_uriTemplate.CreateLink("next", BuildTemplateParameters(Page + 1)));
                Links.Add(_uriTemplate.CreateLink("last", BuildTemplateParameters(TotalPages)));
            }

            if (_parentUriTemplate != null)
            {
                Links.Add(_parentUriTemplate.CreateLink("up", BuildTemplateParameters(1)));
            }

            Links.Add(new Link("page", _uriTemplate.Href));
        }

        private object[] BuildTemplateParameters(int pageIndex)
        {
            var prms =
                new List<object>
                {
                    new
                    {
                        page = pageIndex
                    }
                };
            if (UriTemplateSubstitutionParams != null)
            {
                prms.AddRange(UriTemplateSubstitutionParams);
            }

            return prms.ToArray();
        }
    }
}