import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface SpecialOffersState {
    isLoading: boolean;
    pageSize: number;
    filter: string | null;
    categoryId: string | null;
    locationId: string | null;
    pageUrl: string | null;
    offers: ISpecialOffer[];
    totalResults: number;
    totalPages: number;
    page: number;
    firstPageUrl: string | null;
    prevPageUrl: string | null;
    nextPageUrl: string | null;
    lastPageUrl: string | null;
}

export interface ISpecialOffer {
    id: string;
    categoryId: string;
    countyId: string;
    name: string;
    description: string;
    imageUrl: string;
    offerUrl: string;
    validUntil: Date;
}

export interface IHalLink {
    href: string;
}

export interface ISpecialOffersHal {
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

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestSpecialOffersAction {
    type: 'REQUEST_SPECIAL_OFFERS';
    pageSize: number;
    filter: string | null;
    categoryId: string | null;
    locationId: string | null;
}

interface ReceiveSpecialOffersAction {
    type: 'RECEIVE_SPECIAL_OFFERS';
    pageUrl: string;
    pageSize: number;
    filter: string | null;
    categoryId: string | null;
    locationId: string | null;
    offers: ISpecialOffer[];
    totalResults: number;
    totalPages: number;
    page: number;
    firstPageUrl: string | null;
    prevPageUrl: string | null;
    nextPageUrl: string | null;
    lastPageUrl: string | null;
}

interface RequestSpecialOffersPageAction {
    type: 'REQUEST_SPECIAL_OFFERS_PAGE';
    pageUrl: string | null;
}

interface ReceiveSpecialOffersPageAction {
    type: 'RECEIVE_SPECIAL_OFFERS_PAGE';
    pageUrl: string;
    offers: ISpecialOffer[];
    totalResults: number;
    totalPages: number;
    page: number;
    firstPageUrl: string | null;
    prevPageUrl: string | null;
    nextPageUrl: string | null;
    lastPageUrl: string | null;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction =
    RequestSpecialOffersAction |
    ReceiveSpecialOffersAction |
    RequestSpecialOffersPageAction |
    ReceiveSpecialOffersPageAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestSpecialOffers: (
        pageSize: number = 10,
        filter: string | null,
        categoryId: string | null,
        locationId: string | null): AppThunkAction<KnownAction> =>
        (dispatch, getState) => {

            // Only load data if it's something we don't already have (and are not already loading)
            if (pageSize !== getState().specialOffers.pageSize ||
                filter !== getState().specialOffers.filter ||
                categoryId !== getState().specialOffers.categoryId ||
                locationId !== getState().specialOffers.locationId) {

                // Build request URI
                var uri = 'api/special-offers';

                if (categoryId !== null && categoryId.length > 0) {
                    uri += `/category/${categoryId}`;

                    if (locationId !== null && locationId.length > 0) {
                        uri += `/location/${locationId}`;
                    }
                }

                uri += `?pageIndex=1&pageSize=${pageSize}`;

                if (filter !== null && filter.length > 0) {
                    uri += `&filter=${filter}`;
                }

                let fetchTask = fetch(uri)
                    .then(response => response.json() as Promise<ISpecialOffersHal>)
                    .then(data => {
                        dispatch({
                            type: 'RECEIVE_SPECIAL_OFFERS',
                            pageUrl: uri,
                            pageSize: pageSize,
                            filter: filter,
                            categoryId: categoryId,
                            locationId: locationId,
                            offers: data._embedded["special-offer"],
                            totalResults: data.totalResults,
                            totalPages: data.totalPages,
                            page: data.page,
                            firstPageUrl: (typeof data._links["first"] !== 'undefined') ? data._links["first"].href : null,
                            prevPageUrl: (typeof data._links["prev"] !== 'undefined') ? data._links["prev"].href : null,
                            nextPageUrl: (typeof data._links["next"] !== 'undefined') ? data._links["next"].href : null,
                            lastPageUrl: (typeof data._links["last"] !== 'undefined') ? data._links["last"].href : null
                        });
                    });

                addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
                dispatch({
                    type: 'REQUEST_SPECIAL_OFFERS',
                    pageSize: pageSize,
                    filter: filter,
                    categoryId: categoryId,
                    locationId: locationId
                });
            }
        },
    requestSpecialOfferPage: (pageUri: string): AppThunkAction<KnownAction> =>
        (dispatch, getState) => {
            // Only load data if page URI is both valid and different from current
            if (pageUri !== null &&
                pageUri !== getState().specialOffers.pageUrl) {

                let fetchTask = fetch(pageUri)
                    .then(response => response.json() as Promise<ISpecialOffersHal>)
                    .then(data => {
                        dispatch({
                            type: 'RECEIVE_SPECIAL_OFFERS_PAGE',
                            pageUrl: pageUri,
                            offers: data._embedded["special-offer"],
                            totalResults: data.totalResults,
                            totalPages: data.totalPages,
                            page: data.page,
                            firstPageUrl: (typeof data._links["first"] !== 'undefined') ? data._links["first"].href : null,
                            prevPageUrl: (typeof data._links["prev"] !== 'undefined') ? data._links["prev"].href : null,
                            nextPageUrl: (typeof data._links["next"] !== 'undefined') ? data._links["next"].href : null,
                            lastPageUrl: (typeof data._links["last"] !== 'undefined') ? data._links["last"].href : null
                        });
                    });

                addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
                dispatch({
                    type: 'REQUEST_SPECIAL_OFFERS_PAGE',
                    pageUrl: pageUri
                });
            }
        }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: SpecialOffersState = {
    isLoading: false,
    pageSize: 10,
    pageUrl: null,
    filter: null,
    categoryId: null,
    locationId: null,
    offers: [],
    totalResults: 0,
    totalPages: 0,
    page: 0,
    firstPageUrl: null,
    prevPageUrl: null,
    nextPageUrl: null,
    lastPageUrl: null
};

export const reducer: Reducer<SpecialOffersState> = (state: SpecialOffersState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_SPECIAL_OFFERS':
            return {
                pageSize: action.pageSize,
                filter: action.filter,
                categoryId: action.categoryId,
                locationId: action.locationId,
                pageUrl: state.pageUrl,
                offers: state.offers,
                totalResults: state.totalResults,
                totalPages: state.totalPages,
                page: state.page,
                firstPageUrl: state.firstPageUrl,
                prevPageUrl: state.prevPageUrl,
                nextPageUrl: state.nextPageUrl,
                lastPageUrl: state.lastPageUrl,
                isLoading: true
            };
        case 'RECEIVE_SPECIAL_OFFERS':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            if (action.pageSize === state.pageSize &&
                action.filter === state.filter &&
                action.categoryId === state.categoryId &&
                action.locationId === state.locationId) {
                return {
                    pageSize: action.pageSize,
                    filter: action.filter,
                    categoryId: action.categoryId,
                    locationId: action.locationId,
                    pageUrl: action.pageUrl,
                    offers: action.offers,
                    totalResults: action.totalResults,
                    totalPages: action.totalPages,
                    page: action.page,
                    firstPageUrl: action.firstPageUrl,
                    prevPageUrl: action.prevPageUrl,
                    nextPageUrl: action.nextPageUrl,
                    lastPageUrl: action.lastPageUrl,
                    isLoading: false
                };
            }
            break;
        case 'REQUEST_SPECIAL_OFFERS_PAGE':
            return {
                pageUrl: action.pageUrl,
                pageSize: state.pageSize,
                filter: state.filter,
                categoryId: state.categoryId,
                locationId: state.locationId,
                offers: state.offers,
                totalResults: state.totalResults,
                totalPages: state.totalPages,
                page: state.page,
                firstPageUrl: state.firstPageUrl,
                prevPageUrl: state.prevPageUrl,
                nextPageUrl: state.nextPageUrl,
                lastPageUrl: state.lastPageUrl,
                isLoading: true
            };
        case 'RECEIVE_SPECIAL_OFFERS_PAGE':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            if (action.pageUrl === state.pageUrl) {
                return {
                    pageUrl: action.pageUrl,
                    offers: action.offers,
                    totalResults: action.totalResults,
                    totalPages: action.totalPages,
                    page: action.page,
                    firstPageUrl: action.firstPageUrl,
                    prevPageUrl: action.prevPageUrl,
                    nextPageUrl: action.nextPageUrl,
                    lastPageUrl: action.lastPageUrl,
                    pageSize: state.pageSize,
                    filter: state.filter,
                    categoryId: state.categoryId,
                    locationId: state.locationId,
                    isLoading: false
                };
            }
            break;
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};
