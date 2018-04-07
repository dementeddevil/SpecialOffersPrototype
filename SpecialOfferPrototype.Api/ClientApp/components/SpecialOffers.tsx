import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as SpecialOffersState from '../store/SpecialOffers';
import styled, { StyledFunction } from 'styled-components';

// Styling
export interface SpecialOfferGridProps {
    display?: string;
    gridTemplateColumns?: string;
    gridGap?: string;
}

const SpecialOfferGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1rem;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const FooterContainer = styled.div`
    display: grid;
    margin-top: 1rem;
`;

const PaginationButtonContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1rem;
`;

function styledComponentWithProps<T, U extends HTMLElement = HTMLElement>(styledFunction: StyledFunction<React.HTMLProps<U>>): StyledFunction<T & React.HTMLProps<U>> {
    return styledFunction as StyledFunction<T & React.HTMLProps<U>>;
}

export interface ColumnPositionalButtonProps {
    gridColumn: number;
}

const ColumnPositionalButton = styledComponentWithProps<ColumnPositionalButtonProps, HTMLButtonElement>(styled.button) `
    grid-column: ${p => p.gridColumn};
`;

// At runtime, Redux will merge together...
type SpecialOffersProps =
    SpecialOffersState.SpecialOffersState              // ... state we've requested from the Redux store
    & typeof SpecialOffersState.actionCreators         // ... plus action creators we've requested
    & RouteComponentProps<{ categoryId: string | null, locationId: string | null }>; // ... plus incoming routing parameters

class SpecialOffersFetchData extends React.Component<SpecialOffersProps> {
    componentWillMount() {
        // This method runs when the component is first added to the page
        this.props.requestSpecialOffers(
            12,
            null,
            (typeof this.props.match.params.categoryId === 'undefined') ? null : this.props.match.params.categoryId,
            (typeof this.props.match.params.locationId === 'undefined') ? null : this.props.match.params.locationId);
    }

    componentWillReceiveProps(nextProps: SpecialOffersProps) {
        // This method runs when incoming props (e.g., route params) change
        this.props.requestSpecialOffers(
            12,
            null,
            (typeof this.props.match.params.categoryId === 'undefined') ? null : this.props.match.params.categoryId,
            (typeof this.props.match.params.locationId === 'undefined') ? null : this.props.match.params.locationId);
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

    private gotoLinkedPage(pageUrl: string | null) {
        this.props.requestSpecialOfferPage(pageUrl);
    }

    private renderSpecialOffers() {
        return (
            <SpecialOfferGrid>
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
            </SpecialOfferGrid>
        );
    }

    private renderPagination() {
        return (
            <FooterContainer>
                <PaginationButtonContainer>
                    {this.props.firstPageUrl !== null ? <ColumnPositionalButton className='btn btn-outline-primary' gridColumn={1} onClick={() => this.gotoLinkedPage(this.props.firstPageUrl)}>First page</ColumnPositionalButton> : [] }
                    {this.props.prevPageUrl !== null ? <ColumnPositionalButton className='btn btn-outline-primary' gridColumn={2} onClick={() => this.gotoLinkedPage(this.props.prevPageUrl)}>Prev page</ColumnPositionalButton> : [] }
                    {this.props.nextPageUrl !== null ? <ColumnPositionalButton className='btn btn-outline-primary' gridColumn={3} onClick={() => this.gotoLinkedPage(this.props.nextPageUrl)}>Next page</ColumnPositionalButton> : [] }
                    {this.props.lastPageUrl !== null ? <ColumnPositionalButton className='btn btn-outline-primary' gridColumn={4} onClick={() => this.gotoLinkedPage(this.props.lastPageUrl)}>Last page</ColumnPositionalButton> : [] }
                </PaginationButtonContainer>
                <div className="loading">
                    {this.props.isLoading ? <span>Loading...</span> : []}
                </div>
            </FooterContainer>
        );
    }
}

export default connect<SpecialOffersState.SpecialOffersState, SpecialOffersProps, SpecialOffersProps>(
    (state: ApplicationState) => state.specialOffers, // Selects which state properties are merged into the component's props
    SpecialOffersState.actionCreators                 // Selects which action creators are merged into the component's props
)(SpecialOffersFetchData) as typeof SpecialOffersFetchData;
