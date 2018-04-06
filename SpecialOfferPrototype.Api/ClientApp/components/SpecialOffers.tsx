import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as SpecialOffersState from '../store/SpecialOffers';

// At runtime, Redux will merge together...
type SpecialOffersProps =
    SpecialOffersState.SpecialOffersState              // ... state we've requested from the Redux store
    & typeof SpecialOffersState.actionCreators         // ... plus action creators we've requested
    & RouteComponentProps<{ categoryId: string | null, locationId: string | null }>; // ... plus incoming routing parameters

class SpecialOffersFetchData extends React.Component<SpecialOffersProps, {}> {
    componentWillMount() {
        // This method runs when the component is first added to the page
        this.props.requestSpecialOffers(
            10,
            null,
            this.props.match.params.categoryId,
            this.props.match.params.locationId);
    }

    componentWillReceiveProps(nextProps: SpecialOffersProps) {
        // This method runs when incoming props (e.g., route params) change
        this.props.requestSpecialOffers(
            10,
            null,
            this.props.match.params.categoryId,
            this.props.match.params.locationId);
    }

    public render() {
        return (
            <div>
                <h1>Our Special Offers</h1>
                <p>This component demonstrates fetching data from the server</p>
                {this.renderSpecialOffers()}
                {this.renderPagination()}
            </div>
        );
    }

    private renderSpecialOffers() {
        return (
            <div className='specialoffers'>
                {this.props.offers.map(offer =>
                    <div className='card' key={offer.id}>
                        <img className='card-img-top' src={offer.imageUrl} alt={offer.name} />
                        <div className='card-body'>
                            <h5 className='card-title'>{offer.name}</h5>
                            <p className='card-text'>{offer.description}</p>
                            <a className='btn btn-primary' href={offer.offerUrl}>Learn More</a>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    private renderPagination() {
        return (
            <div className='footer'>
                <div className='pagination'>
                    {this.props.firstPageUrl !== null ? <span>First page</span> : []}
                    {this.props.prevPageUrl !== null ? <span>Prev page</span> : []}
                    {this.props.nextPageUrl !== null ? <span>Next page</span> : []}
                    {this.props.lastPageUrl !== null ? <span>Last page</span> : []}
                </div>
                <div className="loading">
                    {this.props.isLoading ? <span>Loading...</span> : []}
                </div>
            </div>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.specialOffers, // Selects which state properties are merged into the component's props
    SpecialOffersState.actionCreators                 // Selects which action creators are merged into the component's props
)(SpecialOffersFetchData) as typeof SpecialOffersFetchData;
