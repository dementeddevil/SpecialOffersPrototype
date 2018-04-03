import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import 'halson';

const SpecialOfferContext = React.createContext();

class SpecialOfferProvider extends React.Component<{}, ISpecialOfferState> {
    constructor(props: {}, context?: any) {
        super(props, context);

        console.log('SpecialOfferProvider -> ctor');

        this.state = {
            offers: [],
            totalResults: 0,
            totalPages: 0,
            page: 1,
            firstPageUrl: null,
            prevPageUrl: null,
            nextPageUrl: null,
            lastPageUrl: null,
            loading: false,
            gotoFirstPage: () => {
                this.fetchViaPageUrl(this.state.firstPageUrl);
            },
            gotoPrevPage: () => {
                this.fetchViaPageUrl(this.state.prevPageUrl);
            },
            gotoNextPage: () => {
                this.fetchViaPageUrl(this.state.nextPageUrl);
            },
            gotoLastPage: () => {
                this.fetchViaPageUrl(this.state.lastPageUrl);
            }
        }

        this.fetchOffers(null, null, null, 1, 10);
    }

    fetchOffers(
        filter: string | null,
        categoryId: string | null,
        locationId: string | null,
        pageIndex: number,
        pageSize: number) {

        var uri = 'api/special-offers';

        if (categoryId !== null && categoryId.length > 0) {
            uri += `/category/${categoryId}`;

            if (locationId !== null && locationId.length > 0) {
                uri += `/location/${locationId}`;
            }
        }

        uri += `?pageIndex=${pageIndex}&pageSize=${pageSize}`;

        if (filter !== null && filter.length > 0) {
            uri += `&filter=${filter}`;
        }

        this.fetchViaPageUrl(uri);
    }

    fetchViaPageUrl(uri: string | null) {
        if (uri === null) {
            return;
        }

        this.setState({
            offers: [],
            loading: true
        });

        console.log(`requesting data from server at : ${uri}`);
        fetch(uri)
            .then(response => response.json() as Promise<ISpecialOffersHal>)
            .then(data => {
                let newState = {
                    offers: data._embedded["special-offer"],
                    totalResults: data.totalResults,
                    totalPages: data.totalPages,
                    page: data.page,
                    firstPageUrl: (typeof data._links["first"] !== 'undefined') ? data._links["first"].href : null,
                    prevPageUrl: (typeof data._links["prev"] !== 'undefined') ? data._links["prev"].href : null,
                    nextPageUrl: (typeof data._links["next"] !== 'undefined') ? data._links["next"].href : null,
                    lastPageUrl: (typeof data._links["last"] !== 'undefined') ? data._links["last"].href : null,
                    loading: false
                };
                this.setState(newState);
            });
    }

    render() {
        return (
            <SpecialOfferContext.Provider value={{
                state: this.state
            }}>
                {this.props.children}
            </SpecialOfferContext.Provider>
        );
    }
}

interface ISpecialOfferState {
    offers: ISpecialOffer[];
    totalResults: number;
    totalPages: number;
    page: number;
    firstPageUrl: string | null;
    prevPageUrl: string | null;
    nextPageUrl: string | null;
    lastPageUrl: string | null;
    loading: boolean;

    gotoFirstPage: () => void;
    gotoPrevPage: () => void;
    gotoNextPage: () => void;
    gotoLastPage: () => void;
}

interface IHalLink {
    href: string;
}

interface ISpecialOffersHal {
    totalResults: number;
    totalPages: number;
    page: number;
    resourceList: any[] | null;
    _links: {
        [key: string]: IHalLink;
    };
    _embedded: {
        "special-offer": ISpecialOffer[];
    };
}


interface ISpecialOffer {
    id: string;
    categoryId: string;
    countyId: string;
    name: string;
    description: string;
    imageUrl: string;
    offerUrl: string;
    validUntil: Date;
}

export class SpecialOffers extends React.Component<RouteComponentProps<any>> {
    constructor(props: RouteComponentProps<any>, context?: any) {
        super(props, context);

        //this.fetchOffers(null, 1, 10);
    }

    public render() {
        let contents = <p><em>Loading...</em></p>;

        //this.context.Provider.state.loading
        //    ? <p><em>Loading...</em></p>
        //    : SpecialOffers.renderOffersTable(this.context.Provider.state.offers);

        return (
            <SpecialOfferContext.Consumer>
                {(context: any) => {
                        console.log(`context: ${context}`);
                    context.Provider.fetchOffers(null, 1, 10);

                    return (
                        <div>
                            <h1>Special Offers</h1>
                            <p>Take} a look at our current special offers.</p>
                            {context.state.name}
                        </div>
                    );
                }
                }
            </SpecialOfferContext.Consumer>
        );
    }

    private static renderOffersTable(offers: ISpecialOffer[]) {
        return <div className='specialoffers'>
            {offers.map(offer =>
                <div className='card' key={offer.id}>
                    <img className='card-img-top' src={offer.imageUrl} alt={offer.name} />
                    <div className='card-body'>
                        <h5 className='card-title'>{offer.name}</h5>
                        <p className='card-text'>{offer.description}</p>
                        <a className='btn btn-primary' href={offer.offerUrl}>Learn More</a>
                    </div>
                </div>
            )}
        </div>;
    }
}
