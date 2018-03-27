import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import 'halson';

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
    imageUrl: string;
    offerUrl: string;
    validUntil: Date;
}

export class SpecialOffers extends React.Component<RouteComponentProps<{}>, ISpecialOfferState> {
    constructor() {
        super();
        this.state = {
            offers: [],
            totalResults: 0,
            totalPages: 0,
            page: 1,
            firstPageUrl: null,
            prevPageUrl: null,
            nextPageUrl: null,
            lastPageUrl: null,
            loading: false
        };

        this.fetchOffers(null, 1, 10);
    }

    public fetchOffers(filter: string | null, pageIndex: number, pageSize: number) {

        var uri = `api/special-offers?pageIndex=${pageIndex}&pageSize=${pageSize}`;

        if (filter !== null && filter.length > 0) {
            uri += '&filter=' + filter;
        }

        if (this._isMounted) {
            this.setState({
                offers: [],
                loading: true
            });
        }

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

    public render() {
        this._isMounted = true;
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : SpecialOffers.renderOffersTable(this.state.offers);

        return <div>
            <h1>Special Offers</h1>
            <p>Take a look at our current special offers.</p>
            {contents}
        </div>;
    }

    private static renderOffersTable(offers: ISpecialOffer[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Temp. (C)</th>
                    <th>Temp. (F)</th>
                    <th>Summary</th>
                </tr>
            </thead>
            <tbody>
                {offers.map(offer =>
                    <tr key={offer.id}>
                        <td>{offer.name}</td>
                        <td>{offer.imageUrl}</td>
                        <td>{offer.offerUrl}</td>
                    </tr>
                )}
            </tbody>
        </table>;
    }

    private _isMounted: boolean = false;
}
