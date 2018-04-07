(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("./vendor");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(3);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(154);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(153);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(155);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return actionCreators; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return reducer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_domain_task__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_domain_task___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_domain_task__);

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
var actionCreators = {
    requestSpecialOffers: function (pageSize, filter, categoryId, locationId) {
        if (pageSize === void 0) { pageSize = 10; }
        return function (dispatch, getState) {
            // Only load data if it's something we don't already have (and are not already loading)
            if (pageSize !== getState().specialOffers.pageSize ||
                filter !== getState().specialOffers.filter ||
                categoryId !== getState().specialOffers.categoryId ||
                locationId !== getState().specialOffers.locationId) {
                // Build request URI
                var uri = 'api/special-offers';
                if (categoryId !== null && categoryId.length > 0) {
                    uri += "/category/" + categoryId;
                    if (locationId !== null && locationId.length > 0) {
                        uri += "/location/" + locationId;
                    }
                }
                uri += "?pageIndex=1&pageSize=" + pageSize;
                if (filter !== null && filter.length > 0) {
                    uri += "&filter=" + filter;
                }
                var fetchTask = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_domain_task__["fetch"])(uri)
                    .then(function (response) { return response.json(); })
                    .then(function (data) {
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
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_domain_task__["addTask"])(fetchTask); // Ensure server-side prerendering waits for this to complete
                dispatch({
                    type: 'REQUEST_SPECIAL_OFFERS',
                    pageSize: pageSize,
                    filter: filter,
                    categoryId: categoryId,
                    locationId: locationId
                });
            }
        };
    },
    requestSpecialOfferPage: function (pageUri) {
        return function (dispatch, getState) {
            // Only load data if page URI is both valid and different from current
            if (pageUri !== null &&
                pageUri !== getState().specialOffers.pageUrl) {
                var fetchTask = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_domain_task__["fetch"])(pageUri)
                    .then(function (response) { return response.json(); })
                    .then(function (data) {
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
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_domain_task__["addTask"])(fetchTask); // Ensure server-side prerendering waits for this to complete
                dispatch({
                    type: 'REQUEST_SPECIAL_OFFERS_PAGE',
                    pageUrl: pageUri
                });
            }
        };
    }
};
// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
var unloadedState = {
    isLoading: false,
    pageSize: 0,
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
var reducer = function (state, incomingAction) {
    var action = incomingAction;
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
            var exhaustiveCheck = action;
    }
    return state || unloadedState;
};


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = configureStore;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_thunk__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_thunk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_redux_thunk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_redux__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_router_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store__ = __webpack_require__(17);




function configureStore(history, initialState) {
    // Build middleware. These are functions that can process the actions before they reach the store.
    var windowIfDefined = typeof window === 'undefined' ? null : window;
    // If devTools is installed, connect to it
    var devToolsExtension = windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__;
    var createStoreWithMiddleware = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux__["compose"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux__["applyMiddleware"])(__WEBPACK_IMPORTED_MODULE_1_redux_thunk___default.a, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_react_router_redux__["routerMiddleware"])(history)), devToolsExtension ? devToolsExtension() : function (next) { return next; })(__WEBPACK_IMPORTED_MODULE_0_redux__["createStore"]);
    // Combine all reducers and instantiate the app-wide store instance
    var allReducers = buildRootReducer(__WEBPACK_IMPORTED_MODULE_3__store__["a" /* reducers */]);
    var store = createStoreWithMiddleware(allReducers, initialState);
    // Enable Webpack hot module replacement for reducers
    if (false) {
        module.hot.accept('./store', function () {
            var nextRootReducer = require('./store');
            store.replaceReducer(buildRootReducer(nextRootReducer.reducers));
        });
    }
    return store;
}
function buildRootReducer(allReducers) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux__["combineReducers"])(Object.assign({}, allReducers, { routing: __WEBPACK_IMPORTED_MODULE_2_react_router_redux__["routerReducer"] }));
}


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Layout__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Home__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_SpecialOffers__ = __webpack_require__(16);





var routes = __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__components_Layout__["a" /* Layout */], null,
    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Route"], { exact: true, path: '/', component: __WEBPACK_IMPORTED_MODULE_3__components_Home__["a" /* Home */] }),
    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Route"], { path: '/special-offers/:categoryId?/:locationId?', component: __WEBPACK_IMPORTED_MODULE_4__components_SpecialOffers__["a" /* default */] }));


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(145);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(150);

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(152);

/***/ }),
/* 11 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: C:\\Projects\\github\\SpecialOffersPrototype\\SpecialOfferPrototype.Api\\ClientApp\\components\\SpecialOfferStyling.scss Unexpected token (1:1)\nYou may need an appropriate loader to handle this file type.\n| ﻿.search-facets {\r\n|     display: grid;\r\n| }\r");

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom_server__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom_server___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_dom_server__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_router_dom__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_router_redux__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_router_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_router_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_history__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_history___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_history__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_aspnet_prerendering__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_aspnet_prerendering___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_aspnet_prerendering__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__routes__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__configureStore__ = __webpack_require__(6);









/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6_aspnet_prerendering__["createServerRenderer"])(function (params) {
    return new Promise(function (resolve, reject) {
        // Prepare Redux store with in-memory history, and dispatch a navigation event
        // corresponding to the incoming URL
        var basename = params.baseUrl.substring(0, params.baseUrl.length - 1); // Remove trailing slash
        var urlAfterBasename = params.url.substring(basename.length);
        var store = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__configureStore__["a" /* default */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_history__["createMemoryHistory"])());
        store.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_react_router_redux__["replace"])(urlAfterBasename));
        // Prepare an instance of the application and perform an inital render that will
        // cause any async tasks (e.g., data access) to begin
        var routerContext = {};
        var app = (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1_react_redux__["Provider"], { store: store },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_3_react_router_dom__["StaticRouter"], { basename: basename, context: routerContext, location: params.location.path, children: __WEBPACK_IMPORTED_MODULE_7__routes__["a" /* routes */] })));
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_react_dom_server__["renderToString"])(app);
        // If there's a redirection, just send this information back to the host application
        if (routerContext.url) {
            resolve({ redirectUrl: routerContext.url });
            return;
        }
        // Once any async tasks are done, we can perform the final render
        // We also send the redux store state, so the client can continue execution where the server left off
        params.domainTasks.then(function () {
            resolve({
                html: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_react_dom_server__["renderToString"])(app),
                globals: { initialReduxState: store.getState() }
            });
        }, reject); // Also propagate any errors back into the host application
    });
}));


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Home; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Home = (function (_super) {
    __extends(Home, _super);
    function Home() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Home.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null,
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("h1", null, "Hello, world!"),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("p", null, "Welcome to your new single-page application, built with:"),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("ul", null,
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("a", { href: 'https://get.asp.net/' }, "ASP.NET Core"),
                    " and ",
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("a", { href: 'https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx' }, "C#"),
                    " for cross-platform server-side code"),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("a", { href: 'https://facebook.github.io/react/' }, "React"),
                    " and ",
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("a", { href: 'http://www.typescriptlang.org/' }, "TypeScript"),
                    " for client-side code"),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("a", { href: 'https://webpack.github.io/' }, "Webpack"),
                    " for building and bundling client-side resources"),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("a", { href: 'http://getbootstrap.com/' }, "Bootstrap"),
                    " for layout and styling")),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("p", null, "To help you get started, we've also set up:"),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("ul", null,
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("strong", null, "Client-side navigation"),
                    ". For example, click ",
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("em", null, "Counter"),
                    " then ",
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("em", null, "Back"),
                    " to return here."),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("strong", null, "Webpack dev middleware"),
                    ". In development mode, there's no need to run the ",
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("code", null, "webpack"),
                    " build tool. Your client-side resources are dynamically built on demand. Updates are available as soon as you modify any file."),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("strong", null, "Hot module replacement"),
                    ". In development mode, you don't even need to reload the page after making most changes. Within seconds of saving changes to files, rebuilt React components will be injected directly into your running application, preserving its live state."),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("strong", null, "Efficient production builds"),
                    ". In production mode, development-time features are disabled, and the ",
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("code", null, "webpack"),
                    " build tool produces minified static CSS and JavaScript files.")),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("h4", null, "Going further"),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("p", null,
                "For larger applications, or for server-side prerendering (i.e., for ",
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("em", null, "isomorphic"),
                " or ",
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("em", null, "universal"),
                " applications), you should consider using a Flux/Redux-like architecture. You can generate an ASP.NET Core application with React and Redux using ",
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("code", null, "dotnet new reactredux"),
                " instead of using this template."));
    };
    return Home;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Layout; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__NavMenu__ = __webpack_require__(15);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var Layout = (function (_super) {
    __extends(Layout, _super);
    function Layout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Layout.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'container-fluid' },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'row' },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'col-sm-12' },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__NavMenu__["a" /* NavMenu */], null))),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'row' },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'col-sm-12' }, this.props.children)));
    };
    return Layout;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavMenu; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_fontawesome__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_fontawesome___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_fontawesome__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var NavMenu = (function (_super) {
    __extends(NavMenu, _super);
    function NavMenu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NavMenu.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'main-nav' },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("nav", { className: 'navbar navbar-expand-sm navbar-dark bg-dark' },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'navbar-header' },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("button", { type: 'button', className: 'navbar-toggler', "data-toggle": 'collapse', "data-target": '.navbar-collapse', "aria-controls": 'navbarSupportedContent', "aria-expanded": 'false', "aria-label": 'Toggle navigation' },
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { className: "navbar-toggler-icon" })),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Link"], { className: 'navbar-brand', to: '/' }, "Special Offers Prototype")),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'clearfix' }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'navbar-collapse collapse' },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("ul", { className: 'navbar-nav mr-auto' },
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["NavLink"], { to: '/', exact: true, className: "nav-item nav-link", activeClassName: 'active' },
                            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2_react_fontawesome__, { name: 'home' }),
                            " Home"),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["NavLink"], { to: '/special-offers', className: "nav-item nav-link", activeClassName: 'active' },
                            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2_react_fontawesome__, { name: 'magic' }),
                            " Special Offers")))));
    };
    return NavMenu;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store_SpecialOffers__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__SpecialOfferStyling_scss__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__SpecialOfferStyling_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__SpecialOfferStyling_scss__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var SpecialOffersFetchData = (function (_super) {
    __extends(SpecialOffersFetchData, _super);
    function SpecialOffersFetchData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SpecialOffersFetchData.prototype.componentWillMount = function () {
        // This method runs when the component is first added to the page
        this.props.requestSpecialOffers(10, null, (typeof this.props.match.params.categoryId === 'undefined') ? null : this.props.match.params.categoryId, (typeof this.props.match.params.locationId === 'undefined') ? null : this.props.match.params.locationId);
    };
    SpecialOffersFetchData.prototype.componentWillReceiveProps = function (nextProps) {
        // This method runs when incoming props (e.g., route params) change
        this.props.requestSpecialOffers(10, null, (typeof this.props.match.params.categoryId === 'undefined') ? null : this.props.match.params.categoryId, (typeof this.props.match.params.locationId === 'undefined') ? null : this.props.match.params.locationId);
    };
    SpecialOffersFetchData.prototype.render = function () {
        return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null,
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("h1", null, "Our Special Offers"),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("p", null, "This component demonstrates fetching data from the server"),
            this.renderSpecialOffers(),
            this.renderPagination()));
    };
    SpecialOffersFetchData.prototype.renderSpecialOffers = function () {
        return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'specialoffers' }, this.props.offers.map(function (offer) {
            return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'card', key: offer.id },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("img", { className: 'card-img-top', src: offer.imageUrl, alt: offer.name }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'card-body' },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("h5", { className: 'card-title' }, offer.name),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("p", { className: 'card-text' }, offer.description),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("a", { className: 'btn btn-primary', href: offer.offerUrl }, "Learn More")));
        })));
    };
    SpecialOffersFetchData.prototype.renderPagination = function () {
        return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'footer' },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'pagination' },
                this.props.firstPageUrl !== null ? __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", null, "First page") : [],
                this.props.prevPageUrl !== null ? __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", null, "Prev page") : [],
                this.props.nextPageUrl !== null ? __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", null, "Next page") : [],
                this.props.lastPageUrl !== null ? __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", null, "Last page") : []),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "loading" }, this.props.isLoading ? __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", null, "Loading...") : [])));
    };
    return SpecialOffersFetchData;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));
/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(function (state) { return state.specialOffers; }, // Selects which state properties are merged into the component's props
__WEBPACK_IMPORTED_MODULE_2__store_SpecialOffers__["a" /* actionCreators */] // Selects which action creators are merged into the component's props
)(SpecialOffersFetchData));


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return reducers; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SpecialOffers__ = __webpack_require__(5);

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
var reducers = {
    specialOffers: __WEBPACK_IMPORTED_MODULE_0__SpecialOffers__["b" /* reducer */]
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(22);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _screenReaderStyles = __webpack_require__(19);

var _screenReaderStyles2 = _interopRequireDefault(_screenReaderStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A React component for the font-awesome icon library.
 *
 * @param {String} [ariaLabel] An extra accessibility label to put on the icon
 * @param {Boolean} [border=false] Whether or not to show a border radius
 * @param {String} [className] An extra set of CSS classes to add to the component
 * @param {Object} [cssModule] Option to pass FontAwesome CSS as a module
 * @param {Boolean} [fixedWidth=false] Make buttons fixed width
 * @param {String} [flip=false] Flip the icon's orientation.
 * @param {Boolean} [inverse=false]Inverse the icon's color
 * @param {String} name Name of the icon to use
 * @param {Boolean} [pulse=false] Rotate icon with 8 steps, rather than smoothly
 * @param {Number} [rotate] The degress to rotate the icon by
 * @param {String} [size] The icon scaling size
 * @param {Boolean} [spin=false] Spin the icon
 * @param {String} [stack] Stack an icon on top of another
 * @param {String} [tag=span] The HTML tag to use as a string, eg 'i' or 'em'
 * @module FontAwesome
 * @type {ReactClass}
 */
var FontAwesome = function (_React$Component) {
  _inherits(FontAwesome, _React$Component);

  function FontAwesome() {
    _classCallCheck(this, FontAwesome);

    var _this = _possibleConstructorReturn(this, (FontAwesome.__proto__ || Object.getPrototypeOf(FontAwesome)).call(this));

    _this.displayName = 'FontAwesome';
    return _this;
  }

  _createClass(FontAwesome, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          border = _props.border,
          cssModule = _props.cssModule,
          className = _props.className,
          fixedWidth = _props.fixedWidth,
          flip = _props.flip,
          inverse = _props.inverse,
          name = _props.name,
          pulse = _props.pulse,
          rotate = _props.rotate,
          size = _props.size,
          spin = _props.spin,
          stack = _props.stack,
          _props$tag = _props.tag,
          tag = _props$tag === undefined ? 'span' : _props$tag,
          ariaLabel = _props.ariaLabel,
          props = _objectWithoutProperties(_props, ['border', 'cssModule', 'className', 'fixedWidth', 'flip', 'inverse', 'name', 'pulse', 'rotate', 'size', 'spin', 'stack', 'tag', 'ariaLabel']);

      var classNames = [];

      if (cssModule) {
        classNames.push(cssModule['fa']);
        classNames.push(cssModule['fa-' + name]);
        size && classNames.push(cssModule['fa-' + size]);
        spin && classNames.push(cssModule['fa-spin']);
        pulse && classNames.push(cssModule['fa-pulse']);
        border && classNames.push(cssModule['fa-border']);
        fixedWidth && classNames.push(cssModule['fa-fw']);
        inverse && classNames.push(cssModule['fa-inverse']);
        flip && classNames.push(cssModule['fa-flip-' + flip]);
        rotate && classNames.push(cssModule['fa-rotate-' + rotate]);
        stack && classNames.push(cssModule['fa-stack-' + stack]);
      } else {
        classNames.push('fa');
        classNames.push('fa-' + name);
        size && classNames.push('fa-' + size);
        spin && classNames.push('fa-spin');
        pulse && classNames.push('fa-pulse');
        border && classNames.push('fa-border');
        fixedWidth && classNames.push('fa-fw');
        inverse && classNames.push('fa-inverse');
        flip && classNames.push('fa-flip-' + flip);
        rotate && classNames.push('fa-rotate-' + rotate);
        stack && classNames.push('fa-stack-' + stack);
      }

      // Add any custom class names at the end.
      className && classNames.push(className);
      return _react2.default.createElement(tag, _extends({}, props, { 'aria-hidden': true, className: classNames.join(' ') }), ariaLabel ? _react2.default.createElement('span', { style: _screenReaderStyles2.default }, ariaLabel) : null);
    }
  }]);

  return FontAwesome;
}(_react2.default.Component);

FontAwesome.propTypes = {
  ariaLabel: _propTypes2.default.string,
  border: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  cssModule: _propTypes2.default.object,
  fixedWidth: _propTypes2.default.bool,
  flip: _propTypes2.default.oneOf(['horizontal', 'vertical']),
  inverse: _propTypes2.default.bool,
  name: _propTypes2.default.string.isRequired,
  pulse: _propTypes2.default.bool,
  rotate: _propTypes2.default.oneOf([90, 180, 270]),
  size: _propTypes2.default.oneOf(['lg', '2x', '3x', '4x', '5x']),
  spin: _propTypes2.default.bool,
  stack: _propTypes2.default.oneOf(['1x', '2x']),
  tag: _propTypes2.default.string
};

exports.default = FontAwesome;
module.exports = exports['default'];

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: '0px',
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0px, 0px, 0px, 0px)',
  border: '0px'
};
module.exports = exports['default'];

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(148);

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(156);

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(5);

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(79);

/***/ })
/******/ ])));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzk5NTAxZjY0NzM1MTUyMDQ1NzkiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiLi92ZW5kb3JcIiIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0L3JlYWN0LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvciIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci1kb20vaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yIiwid2VicGFjazovLy9kZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvbGliL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvciIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci1yZWR1eC9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3IiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL3N0b3JlL1NwZWNpYWxPZmZlcnMudHMiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2NvbmZpZ3VyZVN0b3JlLnRzIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9yb3V0ZXMudHN4Iiwid2VicGFjazovLy9kZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvYXNwbmV0LXByZXJlbmRlcmluZy9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3IiLCJ3ZWJwYWNrOi8vL2RlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9oaXN0b3J5L2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvciIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0LWRvbS9zZXJ2ZXIuanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9ib290LXNlcnZlci50c3giLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2NvbXBvbmVudHMvSG9tZS50c3giLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2NvbXBvbmVudHMvTGF5b3V0LnRzeCIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvY29tcG9uZW50cy9OYXZNZW51LnRzeCIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvY29tcG9uZW50cy9TcGVjaWFsT2ZmZXJzLnRzeCIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvc3RvcmUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1mb250YXdlc29tZS9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1mb250YXdlc29tZS9saWIvc2NyZWVuLXJlYWRlci1zdHlsZXMuanMiLCJ3ZWJwYWNrOi8vL2RlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9kb21haW4tdGFzay9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3IiLCJ3ZWJwYWNrOi8vL2RlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yZWR1eC10aHVuay9saWIvaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yIiwid2VicGFjazovLy9kZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3IiLCJ3ZWJwYWNrOi8vL2RlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yZWR1eC9saWIvaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ2hFQSxxQzs7Ozs7O0FDQUEsNkM7Ozs7OztBQ0FBLCtDOzs7Ozs7QUNBQSwrQzs7Ozs7O0FDQUEsK0M7Ozs7Ozs7Ozs7O0FDQTZDO0FBMkc3QyxtQkFBbUI7QUFDbkIsdUdBQXVHO0FBQ3ZHLG9HQUFvRztBQUU3RixJQUFNLGNBQWMsR0FBRztJQUMxQixvQkFBb0IsRUFBRSxVQUNsQixRQUFxQixFQUNyQixNQUFxQixFQUNyQixVQUF5QixFQUN6QixVQUF5QjtRQUh6Qix3Q0FBcUI7UUFJckIsaUJBQUMsUUFBUSxFQUFFLFFBQVE7WUFFZix1RkFBdUY7WUFDdkYsRUFBRSxDQUFDLENBQUMsUUFBUSxLQUFLLFFBQVEsRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRO2dCQUM5QyxNQUFNLEtBQUssUUFBUSxFQUFFLENBQUMsYUFBYSxDQUFDLE1BQU07Z0JBQzFDLFVBQVUsS0FBSyxRQUFRLEVBQUUsQ0FBQyxhQUFhLENBQUMsVUFBVTtnQkFDbEQsVUFBVSxLQUFLLFFBQVEsRUFBRSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUVyRCxvQkFBb0I7Z0JBQ3BCLElBQUksR0FBRyxHQUFHLG9CQUFvQixDQUFDO2dCQUUvQixFQUFFLENBQUMsQ0FBQyxVQUFVLEtBQUssSUFBSSxJQUFJLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDL0MsR0FBRyxJQUFJLGVBQWEsVUFBWSxDQUFDO29CQUVqQyxFQUFFLENBQUMsQ0FBQyxVQUFVLEtBQUssSUFBSSxJQUFJLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDL0MsR0FBRyxJQUFJLGVBQWEsVUFBWSxDQUFDO29CQUNyQyxDQUFDO2dCQUNMLENBQUM7Z0JBRUQsR0FBRyxJQUFJLDJCQUF5QixRQUFVLENBQUM7Z0JBRTNDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxJQUFJLElBQUksTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN2QyxHQUFHLElBQUksYUFBVyxNQUFRLENBQUM7Z0JBQy9CLENBQUM7Z0JBRUQsSUFBSSxTQUFTLEdBQUcseUVBQUssQ0FBQyxHQUFHLENBQUM7cUJBQ3JCLElBQUksQ0FBQyxrQkFBUSxJQUFJLGVBQVEsQ0FBQyxJQUFJLEVBQWdDLEVBQTdDLENBQTZDLENBQUM7cUJBQy9ELElBQUksQ0FBQyxjQUFJO29CQUNOLFFBQVEsQ0FBQzt3QkFDTCxJQUFJLEVBQUUsd0JBQXdCO3dCQUM5QixPQUFPLEVBQUUsR0FBRzt3QkFDWixRQUFRLEVBQUUsUUFBUTt3QkFDbEIsTUFBTSxFQUFFLE1BQU07d0JBQ2QsVUFBVSxFQUFFLFVBQVU7d0JBQ3RCLFVBQVUsRUFBRSxVQUFVO3dCQUN0QixNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUM7d0JBQ3ZDLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWTt3QkFDL0IsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO3dCQUMzQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7d0JBQ2YsWUFBWSxFQUFFLENBQUMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUk7d0JBQzlGLFdBQVcsRUFBRSxDQUFDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJO3dCQUMzRixXQUFXLEVBQUUsQ0FBQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssV0FBVyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSTt3QkFDM0YsV0FBVyxFQUFFLENBQUMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUk7cUJBQzlGLENBQUMsQ0FBQztnQkFDUCxDQUFDLENBQUMsQ0FBQztnQkFFUCwyRUFBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsNkRBQTZEO2dCQUNqRixRQUFRLENBQUM7b0JBQ0wsSUFBSSxFQUFFLHdCQUF3QjtvQkFDOUIsUUFBUSxFQUFFLFFBQVE7b0JBQ2xCLE1BQU0sRUFBRSxNQUFNO29CQUNkLFVBQVUsRUFBRSxVQUFVO29CQUN0QixVQUFVLEVBQUUsVUFBVTtpQkFDekIsQ0FBQyxDQUFDO1lBQ1AsQ0FBQztRQUNMLENBQUM7SUF2REQsQ0F1REM7SUFDTCx1QkFBdUIsRUFBRSxVQUFDLE9BQWU7UUFDckMsaUJBQUMsUUFBUSxFQUFFLFFBQVE7WUFDZixzRUFBc0U7WUFDdEUsRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLElBQUk7Z0JBQ2hCLE9BQU8sS0FBSyxRQUFRLEVBQUUsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFFL0MsSUFBSSxTQUFTLEdBQUcseUVBQUssQ0FBQyxPQUFPLENBQUM7cUJBQ3pCLElBQUksQ0FBQyxrQkFBUSxJQUFJLGVBQVEsQ0FBQyxJQUFJLEVBQWdDLEVBQTdDLENBQTZDLENBQUM7cUJBQy9ELElBQUksQ0FBQyxjQUFJO29CQUNOLFFBQVEsQ0FBQzt3QkFDTCxJQUFJLEVBQUUsNkJBQTZCO3dCQUNuQyxPQUFPLEVBQUUsT0FBTzt3QkFDaEIsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDO3dCQUN2QyxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVk7d0JBQy9CLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTt3QkFDM0IsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO3dCQUNmLFlBQVksRUFBRSxDQUFDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJO3dCQUM5RixXQUFXLEVBQUUsQ0FBQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssV0FBVyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSTt3QkFDM0YsV0FBVyxFQUFFLENBQUMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUk7d0JBQzNGLFdBQVcsRUFBRSxDQUFDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJO3FCQUM5RixDQUFDLENBQUM7Z0JBQ1AsQ0FBQyxDQUFDLENBQUM7Z0JBRVAsMkVBQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLDZEQUE2RDtnQkFDakYsUUFBUSxDQUFDO29CQUNMLElBQUksRUFBRSw2QkFBNkI7b0JBQ25DLE9BQU8sRUFBRSxPQUFPO2lCQUNuQixDQUFDLENBQUM7WUFDUCxDQUFDO1FBQ0wsQ0FBQztJQTVCRCxDQTRCQztDQUNSLENBQUM7QUFFRixtQkFBbUI7QUFDbkIsNkhBQTZIO0FBRTdILElBQU0sYUFBYSxHQUF1QjtJQUN0QyxTQUFTLEVBQUUsS0FBSztJQUNoQixRQUFRLEVBQUUsQ0FBQztJQUNYLE9BQU8sRUFBRSxJQUFJO0lBQ2IsTUFBTSxFQUFFLElBQUk7SUFDWixVQUFVLEVBQUUsSUFBSTtJQUNoQixVQUFVLEVBQUUsSUFBSTtJQUNoQixNQUFNLEVBQUUsRUFBRTtJQUNWLFlBQVksRUFBRSxDQUFDO0lBQ2YsVUFBVSxFQUFFLENBQUM7SUFDYixJQUFJLEVBQUUsQ0FBQztJQUNQLFlBQVksRUFBRSxJQUFJO0lBQ2xCLFdBQVcsRUFBRSxJQUFJO0lBQ2pCLFdBQVcsRUFBRSxJQUFJO0lBQ2pCLFdBQVcsRUFBRSxJQUFJO0NBQ3BCLENBQUM7QUFFSyxJQUFNLE9BQU8sR0FBZ0MsVUFBQyxLQUF5QixFQUFFLGNBQXNCO0lBQ2xHLElBQU0sTUFBTSxHQUFHLGNBQTZCLENBQUM7SUFDN0MsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbEIsS0FBSyx3QkFBd0I7WUFDekIsTUFBTSxDQUFDO2dCQUNILFFBQVEsRUFBRSxNQUFNLENBQUMsUUFBUTtnQkFDekIsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNO2dCQUNyQixVQUFVLEVBQUUsTUFBTSxDQUFDLFVBQVU7Z0JBQzdCLFVBQVUsRUFBRSxNQUFNLENBQUMsVUFBVTtnQkFDN0IsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPO2dCQUN0QixNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU07Z0JBQ3BCLFlBQVksRUFBRSxLQUFLLENBQUMsWUFBWTtnQkFDaEMsVUFBVSxFQUFFLEtBQUssQ0FBQyxVQUFVO2dCQUM1QixJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUk7Z0JBQ2hCLFlBQVksRUFBRSxLQUFLLENBQUMsWUFBWTtnQkFDaEMsV0FBVyxFQUFFLEtBQUssQ0FBQyxXQUFXO2dCQUM5QixXQUFXLEVBQUUsS0FBSyxDQUFDLFdBQVc7Z0JBQzlCLFdBQVcsRUFBRSxLQUFLLENBQUMsV0FBVztnQkFDOUIsU0FBUyxFQUFFLElBQUk7YUFDbEIsQ0FBQztRQUNOLEtBQUssd0JBQXdCO1lBQ3pCLGlHQUFpRztZQUNqRyxpQ0FBaUM7WUFDakMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsS0FBSyxLQUFLLENBQUMsUUFBUTtnQkFDbEMsTUFBTSxDQUFDLE1BQU0sS0FBSyxLQUFLLENBQUMsTUFBTTtnQkFDOUIsTUFBTSxDQUFDLFVBQVUsS0FBSyxLQUFLLENBQUMsVUFBVTtnQkFDdEMsTUFBTSxDQUFDLFVBQVUsS0FBSyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDekMsTUFBTSxDQUFDO29CQUNILFFBQVEsRUFBRSxNQUFNLENBQUMsUUFBUTtvQkFDekIsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNO29CQUNyQixVQUFVLEVBQUUsTUFBTSxDQUFDLFVBQVU7b0JBQzdCLFVBQVUsRUFBRSxNQUFNLENBQUMsVUFBVTtvQkFDN0IsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPO29CQUN2QixNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU07b0JBQ3JCLFlBQVksRUFBRSxNQUFNLENBQUMsWUFBWTtvQkFDakMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxVQUFVO29CQUM3QixJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUk7b0JBQ2pCLFlBQVksRUFBRSxNQUFNLENBQUMsWUFBWTtvQkFDakMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxXQUFXO29CQUMvQixXQUFXLEVBQUUsTUFBTSxDQUFDLFdBQVc7b0JBQy9CLFdBQVcsRUFBRSxNQUFNLENBQUMsV0FBVztvQkFDL0IsU0FBUyxFQUFFLEtBQUs7aUJBQ25CLENBQUM7WUFDTixDQUFDO1lBQ0QsS0FBSyxDQUFDO1FBQ1YsS0FBSyw2QkFBNkI7WUFDOUIsTUFBTSxDQUFDO2dCQUNILE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTztnQkFDdkIsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRO2dCQUN4QixNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU07Z0JBQ3BCLFVBQVUsRUFBRSxLQUFLLENBQUMsVUFBVTtnQkFDNUIsVUFBVSxFQUFFLEtBQUssQ0FBQyxVQUFVO2dCQUM1QixNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU07Z0JBQ3BCLFlBQVksRUFBRSxLQUFLLENBQUMsWUFBWTtnQkFDaEMsVUFBVSxFQUFFLEtBQUssQ0FBQyxVQUFVO2dCQUM1QixJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUk7Z0JBQ2hCLFlBQVksRUFBRSxLQUFLLENBQUMsWUFBWTtnQkFDaEMsV0FBVyxFQUFFLEtBQUssQ0FBQyxXQUFXO2dCQUM5QixXQUFXLEVBQUUsS0FBSyxDQUFDLFdBQVc7Z0JBQzlCLFdBQVcsRUFBRSxLQUFLLENBQUMsV0FBVztnQkFDOUIsU0FBUyxFQUFFLElBQUk7YUFDbEIsQ0FBQztRQUNOLEtBQUssNkJBQTZCO1lBQzlCLGlHQUFpRztZQUNqRyxpQ0FBaUM7WUFDakMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sS0FBSyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDbkMsTUFBTSxDQUFDO29CQUNILE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTztvQkFDdkIsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNO29CQUNyQixZQUFZLEVBQUUsTUFBTSxDQUFDLFlBQVk7b0JBQ2pDLFVBQVUsRUFBRSxNQUFNLENBQUMsVUFBVTtvQkFDN0IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJO29CQUNqQixZQUFZLEVBQUUsTUFBTSxDQUFDLFlBQVk7b0JBQ2pDLFdBQVcsRUFBRSxNQUFNLENBQUMsV0FBVztvQkFDL0IsV0FBVyxFQUFFLE1BQU0sQ0FBQyxXQUFXO29CQUMvQixXQUFXLEVBQUUsTUFBTSxDQUFDLFdBQVc7b0JBQy9CLFFBQVEsRUFBRSxLQUFLLENBQUMsUUFBUTtvQkFDeEIsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNO29CQUNwQixVQUFVLEVBQUUsS0FBSyxDQUFDLFVBQVU7b0JBQzVCLFVBQVUsRUFBRSxLQUFLLENBQUMsVUFBVTtvQkFDNUIsU0FBUyxFQUFFLEtBQUs7aUJBQ25CLENBQUM7WUFDTixDQUFDO1lBQ0QsS0FBSyxDQUFDO1FBQ1Y7WUFDSSw0R0FBNEc7WUFDNUcsSUFBTSxlQUFlLEdBQVUsTUFBTSxDQUFDO0lBQzlDLENBQUM7SUFFRCxNQUFNLENBQUMsS0FBSyxJQUFJLGFBQWEsQ0FBQztBQUNsQyxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzVHdKO0FBQzFIO0FBQ3FDO0FBRWhCO0FBR3ZDLHdCQUF5QixPQUFnQixFQUFFLFlBQStCO0lBQ3BGLGtHQUFrRztJQUNsRyxJQUFNLGVBQWUsR0FBRyxPQUFPLE1BQU0sS0FBSyxXQUFXLEdBQUcsSUFBSSxHQUFHLE1BQWEsQ0FBQztJQUU3RSwwQ0FBMEM7SUFDMUMsSUFBTSxpQkFBaUIsR0FBRyxlQUFlLElBQUksZUFBZSxDQUFDLDRCQUEwRCxDQUFDO0lBQ3hILElBQU0seUJBQXlCLEdBQUcscUVBQU8sQ0FDckMsNkVBQWUsQ0FBQyxtREFBSyxFQUFFLDJGQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQ2pELGlCQUFpQixHQUFHLGlCQUFpQixFQUFFLEdBQUcsVUFBSSxJQUFrQyxJQUFLLFdBQUksRUFBSixDQUFJLENBQzVGLENBQUMsa0RBQVcsQ0FBQyxDQUFDO0lBRWYsbUVBQW1FO0lBQ25FLElBQU0sV0FBVyxHQUFHLGdCQUFnQixDQUFDLHdEQUFRLENBQUMsQ0FBQztJQUMvQyxJQUFNLEtBQUssR0FBRyx5QkFBeUIsQ0FBQyxXQUFXLEVBQUUsWUFBWSxDQUE0QixDQUFDO0lBRTlGLHFEQUFxRDtJQUNyRCxFQUFFLENBQUMsQ0FBQyxLQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ2IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFO1lBQ3pCLElBQU0sZUFBZSxHQUFHLE9BQU8sQ0FBcUIsU0FBUyxDQUFDLENBQUM7WUFDL0QsS0FBSyxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNyRSxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxNQUFNLENBQUMsS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFFRCwwQkFBMEIsV0FBOEI7SUFDcEQsTUFBTSxDQUFDLDZFQUFlLENBQW1CLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFdBQVcsRUFBRSxFQUFFLE9BQU8sRUFBRSxpRUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3pHLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQzhCO0FBQ1U7QUFDSTtBQUNKO0FBQ3VCO0FBRXpELElBQU0sTUFBTSxHQUFHLHFEQUFDLGtFQUFNO0lBQ3pCLHFEQUFDLHVEQUFLLElBQUMsS0FBSyxRQUFDLElBQUksRUFBQyxHQUFHLEVBQUMsU0FBUyxFQUFHLDhEQUFJLEdBQUs7SUFDM0MscURBQUMsdURBQUssSUFBQyxJQUFJLEVBQUMsMkNBQTJDLEVBQUMsU0FBUyxFQUFHLDBFQUFzQixHQUFLLENBQzFGLENBQUM7Ozs7Ozs7QUNUViwrQzs7Ozs7O0FDQUEsK0M7Ozs7OztBQ0FBLCtDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBK0I7QUFDUTtBQUNXO0FBQ0Y7QUFDSDtBQUNDO0FBQzJCO0FBQ3ZDO0FBQ1k7QUFFOUMsK0RBQWUsZ0dBQW9CLENBQUMsZ0JBQU07SUFDdEMsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFlLFVBQUMsT0FBTyxFQUFFLE1BQU07UUFDN0MsOEVBQThFO1FBQzlFLG9DQUFvQztRQUNwQyxJQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyx3QkFBd0I7UUFDakcsSUFBTSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0QsSUFBTSxLQUFLLEdBQUcsdUZBQWMsQ0FBQyxtRkFBbUIsRUFBRSxDQUFDLENBQUM7UUFDcEQsS0FBSyxDQUFDLFFBQVEsQ0FBQyxrRkFBTyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztRQUUxQyxnRkFBZ0Y7UUFDaEYscURBQXFEO1FBQ3JELElBQU0sYUFBYSxHQUFRLEVBQUUsQ0FBQztRQUM5QixJQUFNLEdBQUcsR0FBRyxDQUNSLHFEQUFDLHFEQUFRLElBQUMsS0FBSyxFQUFHLEtBQUs7WUFDbkIscURBQUMsOERBQVksSUFBQyxRQUFRLEVBQUcsUUFBUSxFQUFHLE9BQU8sRUFBRyxhQUFhLEVBQUcsUUFBUSxFQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFHLFFBQVEsRUFBRyx1REFBTSxHQUFLLENBQy9HLENBQ2QsQ0FBQztRQUNGLHVGQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFcEIsb0ZBQW9GO1FBQ3BGLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLE9BQU8sQ0FBQyxFQUFFLFdBQVcsRUFBRSxhQUFhLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUM1QyxNQUFNLENBQUM7UUFDWCxDQUFDO1FBRUQsaUVBQWlFO1FBQ2pFLHFHQUFxRztRQUNyRyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztZQUNwQixPQUFPLENBQUM7Z0JBQ0osSUFBSSxFQUFFLHVGQUFjLENBQUMsR0FBRyxDQUFDO2dCQUN6QixPQUFPLEVBQUUsRUFBRSxpQkFBaUIsRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFLEVBQUU7YUFDbkQsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsMkRBQTJEO0lBQzNFLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVDNEI7QUFHL0I7SUFBMEIsd0JBQThDO0lBQXhFOztJQXlCQSxDQUFDO0lBeEJVLHFCQUFNLEdBQWI7UUFDSSxNQUFNLENBQUM7WUFDSCxpRkFBc0I7WUFDdEIsMkhBQStEO1lBQy9EO2dCQUNJO29CQUFJLDREQUFHLElBQUksRUFBQyxzQkFBc0IsbUJBQWlCOztvQkFBSyw0REFBRyxJQUFJLEVBQUMsd0RBQXdELFNBQU87MkRBQXlDO2dCQUN4SztvQkFBSSw0REFBRyxJQUFJLEVBQUMsbUNBQW1DLFlBQVU7O29CQUFLLDREQUFHLElBQUksRUFBQyxnQ0FBZ0MsaUJBQWU7NENBQTBCO2dCQUMvSTtvQkFBSSw0REFBRyxJQUFJLEVBQUMsNEJBQTRCLGNBQVk7dUVBQXFEO2dCQUN6RztvQkFBSSw0REFBRyxJQUFJLEVBQUMsMEJBQTBCLGdCQUFjOzhDQUE0QixDQUMvRTtZQUNMLDhHQUFrRDtZQUNsRDtnQkFDSTtvQkFBSSw4RkFBdUM7O29CQUFxQiwyRUFBZ0I7O29CQUFNLHdFQUFhO3VDQUFxQjtnQkFDeEg7b0JBQUksOEZBQXVDOztvQkFBa0QsNkVBQW9CO3FKQUFtSTtnQkFDcFA7b0JBQUksOEZBQXVDO3VRQUFxUDtnQkFDaFM7b0JBQUksbUdBQTRDOztvQkFBc0UsNkVBQW9CO3FGQUFtRSxDQUM1TTtZQUNMLGlGQUFzQjtZQUN0Qjs7Z0JBQ3dFLDhFQUFtQjs7Z0JBQUksNkVBQWtCOztnQkFDckMsMkZBQWtDO21EQUMxRyxDQUNGLENBQUM7SUFDWCxDQUFDO0lBQ0wsV0FBQztBQUFELENBQUMsQ0F6QnlCLGdEQUFlLEdBeUJ4Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1QjhCO0FBQ0s7QUFNcEM7SUFBNEIsMEJBQWdDO0lBQTVEOztJQWVBLENBQUM7SUFkVSx1QkFBTSxHQUFiO1FBQ0ksTUFBTSxDQUFDLDhEQUFLLFNBQVMsRUFBQyxpQkFBaUI7WUFDbkMsOERBQUssU0FBUyxFQUFDLEtBQUs7Z0JBQ2hCLDhEQUFLLFNBQVMsRUFBQyxXQUFXO29CQUN0QixxREFBQyx5REFBTyxPQUFHLENBQ1QsQ0FDSjtZQUNOLDhEQUFLLFNBQVMsRUFBQyxLQUFLO2dCQUNoQiw4REFBSyxTQUFTLEVBQUMsV0FBVyxJQUNyQixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FDbEIsQ0FDSixDQUNKLENBQUM7SUFDWCxDQUFDO0lBQ0wsYUFBQztBQUFELENBQUMsQ0FmMkIsZ0RBQWUsR0FlMUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdEI4QjtBQUNrQjtBQUNBO0FBRWpEO0lBQTZCLDJCQUF1QjtJQUFwRDs7SUF3QkEsQ0FBQztJQXZCVSx3QkFBTSxHQUFiO1FBQ0ksTUFBTSxDQUFDLDhEQUFLLFNBQVMsRUFBQyxVQUFVO1lBQzVCLDhEQUFLLFNBQVMsRUFBQyw2Q0FBNkM7Z0JBQ3hELDhEQUFLLFNBQVMsRUFBQyxlQUFlO29CQUMxQixpRUFBUSxJQUFJLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxnQkFBZ0IsaUJBQWEsVUFBVSxpQkFBYSxrQkFBa0IsbUJBQWUsd0JBQXdCLG1CQUFlLE9BQU8sZ0JBQVksbUJBQW1CO3dCQUM5TCwrREFBTSxTQUFTLEVBQUMscUJBQXFCLEdBQVEsQ0FDeEM7b0JBQ1QscURBQUMsc0RBQUksSUFBQyxTQUFTLEVBQUMsY0FBYyxFQUFDLEVBQUUsRUFBRSxHQUFHLCtCQUFpQyxDQUNyRTtnQkFDTiw4REFBSyxTQUFTLEVBQUMsVUFBVSxHQUFPO2dCQUNoQyw4REFBSyxTQUFTLEVBQUMsMEJBQTBCO29CQUNyQyw2REFBSSxTQUFTLEVBQUMsb0JBQW9CO3dCQUM5QixxREFBQyx5REFBTyxJQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsS0FBSyxRQUFDLFNBQVMsRUFBQyxtQkFBbUIsRUFBQyxlQUFlLEVBQUMsUUFBUTs0QkFDMUUscURBQUMsK0NBQVcsSUFBQyxJQUFJLEVBQUMsTUFBTSxHQUFHO29DQUNyQjt3QkFDVixxREFBQyx5REFBTyxJQUFDLEVBQUUsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUMsbUJBQW1CLEVBQUMsZUFBZSxFQUFDLFFBQVE7NEJBQ2xGLHFEQUFDLCtDQUFXLElBQUMsSUFBSSxFQUFDLE9BQU8sR0FBRzs4Q0FDdEIsQ0FDVCxDQUNILENBQ0osQ0FDSixDQUFDO0lBQ1gsQ0FBQztJQUNMLGNBQUM7QUFBRCxDQUFDLENBeEI0QixnREFBZSxHQXdCM0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUI4QjtBQUVPO0FBRXVCO0FBQ3pCO0FBUXBDO0lBQXFDLDBDQUF1QztJQUE1RTs7SUE4REEsQ0FBQztJQTdERyxtREFBa0IsR0FBbEI7UUFDSSxpRUFBaUU7UUFDakUsSUFBSSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FDM0IsRUFBRSxFQUNGLElBQUksRUFDSixDQUFDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQVUsS0FBSyxXQUFXLENBQUMsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFDdkcsQ0FBQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEtBQUssV0FBVyxDQUFDLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNqSCxDQUFDO0lBRUQsMERBQXlCLEdBQXpCLFVBQTBCLFNBQTZCO1FBQ25ELG1FQUFtRTtRQUNuRSxJQUFJLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUMzQixFQUFFLEVBQ0YsSUFBSSxFQUNKLENBQUMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBVSxLQUFLLFdBQVcsQ0FBQyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUN2RyxDQUFDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQVUsS0FBSyxXQUFXLENBQUMsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2pILENBQUM7SUFFTSx1Q0FBTSxHQUFiO1FBQ0ksTUFBTSxDQUFDLENBQ0g7WUFDSSxzRkFBMkI7WUFDM0IsNEhBQWdFO1lBQy9ELElBQUksQ0FBQyxtQkFBbUIsRUFBRTtZQUMxQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FDdEIsQ0FDVCxDQUFDO0lBQ04sQ0FBQztJQUVPLG9EQUFtQixHQUEzQjtRQUNJLE1BQU0sQ0FBQyxDQUNILDhEQUFLLFNBQVMsRUFBQyxlQUFlLElBQ3pCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxlQUFLO1lBQ3hCLHFFQUFLLFNBQVMsRUFBQyxNQUFNLEVBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxFQUFFO2dCQUMvQiw4REFBSyxTQUFTLEVBQUMsY0FBYyxFQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUMsSUFBSSxHQUFJO2dCQUN0RSw4REFBSyxTQUFTLEVBQUMsV0FBVztvQkFDdEIsNkRBQUksU0FBUyxFQUFDLFlBQVksSUFBRSxLQUFLLENBQUMsSUFBSSxDQUFNO29CQUM1Qyw0REFBRyxTQUFTLEVBQUMsV0FBVyxJQUFFLEtBQUssQ0FBQyxXQUFXLENBQUs7b0JBQ2hELDREQUFHLFNBQVMsRUFBQyxpQkFBaUIsRUFBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLFFBQVEsaUJBQWdCLENBQ2pFLENBQ0o7UUFQTixDQU9NLENBQ1QsQ0FDQyxDQUNULENBQUM7SUFDTixDQUFDO0lBRU8saURBQWdCLEdBQXhCO1FBQ0ksTUFBTSxDQUFDLENBQ0gsOERBQUssU0FBUyxFQUFDLFFBQVE7WUFDbkIsOERBQUssU0FBUyxFQUFDLFlBQVk7Z0JBQ3RCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxLQUFLLElBQUksR0FBRyxnRkFBdUIsR0FBRyxFQUFFO2dCQUMvRCxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsS0FBSyxJQUFJLEdBQUcsK0VBQXNCLEdBQUcsRUFBRTtnQkFDN0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEtBQUssSUFBSSxHQUFHLCtFQUFzQixHQUFHLEVBQUU7Z0JBQzdELElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxLQUFLLElBQUksR0FBRywrRUFBc0IsR0FBRyxFQUFFLENBQzVEO1lBQ04sOERBQUssU0FBUyxFQUFDLFNBQVMsSUFDbkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsZ0ZBQXVCLEdBQUcsRUFBRSxDQUNsRCxDQUNKLENBQ1QsQ0FBQztJQUNOLENBQUM7SUFDTCw2QkFBQztBQUFELENBQUMsQ0E5RG9DLGdEQUFlLEdBOERuRDtBQUVELHlEQUFlLDJFQUFPLENBQ2xCLFVBQUMsS0FBdUIsSUFBSyxZQUFLLENBQUMsYUFBYSxFQUFuQixDQUFtQixFQUFFLHVFQUF1RTtBQUN6SCw0RUFBaUMsQ0FBaUIsc0VBQXNFO0NBQzNILENBQUMsc0JBQXNCLENBQWtDLEVBQUM7Ozs7Ozs7Ozs7QUNoRlY7QUFPakQsc0dBQXNHO0FBQ3RHLHdHQUF3RztBQUN4Ryw0REFBNEQ7QUFDckQsSUFBTSxRQUFRLEdBQUc7SUFDcEIsYUFBYSxFQUFFLCtEQUFxQjtDQUN2QyxDQUFDOzs7Ozs7OztBQ1pGOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVELG1EQUFtRCxnQkFBZ0Isc0JBQXNCLE9BQU8sMkJBQTJCLDBCQUEwQix5REFBeUQsMkJBQTJCLEVBQUUsRUFBRSxFQUFFLGVBQWU7O0FBRTlQLGdDQUFnQywyQ0FBMkMsZ0JBQWdCLGtCQUFrQixPQUFPLDJCQUEyQix3REFBd0QsZ0NBQWdDLHVEQUF1RCwyREFBMkQsRUFBRSxFQUFFLHlEQUF5RCxxRUFBcUUsNkRBQTZELG9CQUFvQixHQUFHLEVBQUU7O0FBRWpqQjs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxzQ0FBc0MsdUNBQXVDLGdCQUFnQjs7QUFFN0YsOENBQThDLGlCQUFpQixxQkFBcUIsb0NBQW9DLDZEQUE2RCxvQkFBb0IsRUFBRSxlQUFlOztBQUUxTixpREFBaUQsMENBQTBDLDBEQUEwRCxFQUFFOztBQUV2SixpREFBaUQsYUFBYSx1RkFBdUYsRUFBRSx1RkFBdUY7O0FBRTlPLDBDQUEwQywrREFBK0QscUdBQXFHLEVBQUUseUVBQXlFLGVBQWUseUVBQXlFLEVBQUUsRUFBRSx1SEFBdUg7O0FBRTVlO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLFFBQVE7QUFDbkIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLFFBQVE7QUFDbkIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsUUFBUTtBQUNuQixXQUFXLE9BQU87QUFDbEIsV0FBVyxRQUFRO0FBQ25CLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxRQUFRO0FBQ25CLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEI7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMkRBQTJELFVBQVUsdURBQXVELHNEQUFzRCxzQ0FBc0M7QUFDeE47QUFDQSxHQUFHOztBQUVIO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9DOzs7Ozs7O0FDNUlBOztBQUVBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQzs7Ozs7O0FDZkEsK0M7Ozs7OztBQ0FBLCtDOzs7Ozs7QUNBQSw2Qzs7Ozs7O0FDQUEsOEMiLCJmaWxlIjoibWFpbi1zZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcImRpc3QvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGM5OTUwMWY2NDczNTE1MjA0NTc5IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi92ZW5kb3JcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCIuL3ZlbmRvclwiXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gKF9fd2VicGFja19yZXF1aXJlX18oMCkpKDMpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yZWFjdC9yZWFjdC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3Jcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygwKSkoMTU0KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyLWRvbS9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3Jcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygwKSkoMTUzKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvbGliL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvclxuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDApKSgxNTUpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXItcmVkdXgvaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IGZldGNoLCBhZGRUYXNrIH0gZnJvbSAnZG9tYWluLXRhc2snO1xyXG5pbXBvcnQgeyBBY3Rpb24sIFJlZHVjZXIsIEFjdGlvbkNyZWF0b3IgfSBmcm9tICdyZWR1eCc7XHJcbmltcG9ydCB7IEFwcFRodW5rQWN0aW9uIH0gZnJvbSAnLi8nO1xyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gU1RBVEUgLSBUaGlzIGRlZmluZXMgdGhlIHR5cGUgb2YgZGF0YSBtYWludGFpbmVkIGluIHRoZSBSZWR1eCBzdG9yZS5cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU3BlY2lhbE9mZmVyc1N0YXRlIHtcclxuICAgIGlzTG9hZGluZzogYm9vbGVhbjtcclxuICAgIHBhZ2VTaXplOiBudW1iZXI7XHJcbiAgICBmaWx0ZXI6IHN0cmluZyB8IG51bGw7XHJcbiAgICBjYXRlZ29yeUlkOiBzdHJpbmcgfCBudWxsO1xyXG4gICAgbG9jYXRpb25JZDogc3RyaW5nIHwgbnVsbDtcclxuICAgIHBhZ2VVcmw6IHN0cmluZyB8IG51bGw7XHJcbiAgICBvZmZlcnM6IElTcGVjaWFsT2ZmZXJbXTtcclxuICAgIHRvdGFsUmVzdWx0czogbnVtYmVyO1xyXG4gICAgdG90YWxQYWdlczogbnVtYmVyO1xyXG4gICAgcGFnZTogbnVtYmVyO1xyXG4gICAgZmlyc3RQYWdlVXJsOiBzdHJpbmcgfCBudWxsO1xyXG4gICAgcHJldlBhZ2VVcmw6IHN0cmluZyB8IG51bGw7XHJcbiAgICBuZXh0UGFnZVVybDogc3RyaW5nIHwgbnVsbDtcclxuICAgIGxhc3RQYWdlVXJsOiBzdHJpbmcgfCBudWxsO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElTcGVjaWFsT2ZmZXIge1xyXG4gICAgaWQ6IHN0cmluZztcclxuICAgIGNhdGVnb3J5SWQ6IHN0cmluZztcclxuICAgIGNvdW50eUlkOiBzdHJpbmc7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gICAgaW1hZ2VVcmw6IHN0cmluZztcclxuICAgIG9mZmVyVXJsOiBzdHJpbmc7XHJcbiAgICB2YWxpZFVudGlsOiBEYXRlO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElIYWxMaW5rIHtcclxuICAgIGhyZWY6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJU3BlY2lhbE9mZmVyc0hhbCB7XHJcbiAgICB0b3RhbFJlc3VsdHM6IG51bWJlcjtcclxuICAgIHRvdGFsUGFnZXM6IG51bWJlcjtcclxuICAgIHBhZ2U6IG51bWJlcjtcclxuICAgIHJlc291cmNlTGlzdDogYW55W10gfCBudWxsO1xyXG4gICAgX2xpbmtzOiB7XHJcbiAgICAgICAgW2tleTogc3RyaW5nXTogSUhhbExpbms7XHJcbiAgICB9O1xyXG4gICAgX2VtYmVkZGVkOiB7XHJcbiAgICAgICAgXCJzcGVjaWFsLW9mZmVyXCI6IElTcGVjaWFsT2ZmZXJbXTtcclxuICAgIH07XHJcbn1cclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vIEFDVElPTlMgLSBUaGVzZSBhcmUgc2VyaWFsaXphYmxlIChoZW5jZSByZXBsYXlhYmxlKSBkZXNjcmlwdGlvbnMgb2Ygc3RhdGUgdHJhbnNpdGlvbnMuXHJcbi8vIFRoZXkgZG8gbm90IHRoZW1zZWx2ZXMgaGF2ZSBhbnkgc2lkZS1lZmZlY3RzOyB0aGV5IGp1c3QgZGVzY3JpYmUgc29tZXRoaW5nIHRoYXQgaXMgZ29pbmcgdG8gaGFwcGVuLlxyXG5cclxuaW50ZXJmYWNlIFJlcXVlc3RTcGVjaWFsT2ZmZXJzQWN0aW9uIHtcclxuICAgIHR5cGU6ICdSRVFVRVNUX1NQRUNJQUxfT0ZGRVJTJztcclxuICAgIHBhZ2VTaXplOiBudW1iZXI7XHJcbiAgICBmaWx0ZXI6IHN0cmluZyB8IG51bGw7XHJcbiAgICBjYXRlZ29yeUlkOiBzdHJpbmcgfCBudWxsO1xyXG4gICAgbG9jYXRpb25JZDogc3RyaW5nIHwgbnVsbDtcclxufVxyXG5cclxuaW50ZXJmYWNlIFJlY2VpdmVTcGVjaWFsT2ZmZXJzQWN0aW9uIHtcclxuICAgIHR5cGU6ICdSRUNFSVZFX1NQRUNJQUxfT0ZGRVJTJztcclxuICAgIHBhZ2VVcmw6IHN0cmluZztcclxuICAgIHBhZ2VTaXplOiBudW1iZXI7XHJcbiAgICBmaWx0ZXI6IHN0cmluZyB8IG51bGw7XHJcbiAgICBjYXRlZ29yeUlkOiBzdHJpbmcgfCBudWxsO1xyXG4gICAgbG9jYXRpb25JZDogc3RyaW5nIHwgbnVsbDtcclxuICAgIG9mZmVyczogSVNwZWNpYWxPZmZlcltdO1xyXG4gICAgdG90YWxSZXN1bHRzOiBudW1iZXI7XHJcbiAgICB0b3RhbFBhZ2VzOiBudW1iZXI7XHJcbiAgICBwYWdlOiBudW1iZXI7XHJcbiAgICBmaXJzdFBhZ2VVcmw6IHN0cmluZyB8IG51bGw7XHJcbiAgICBwcmV2UGFnZVVybDogc3RyaW5nIHwgbnVsbDtcclxuICAgIG5leHRQYWdlVXJsOiBzdHJpbmcgfCBudWxsO1xyXG4gICAgbGFzdFBhZ2VVcmw6IHN0cmluZyB8IG51bGw7XHJcbn1cclxuXHJcbmludGVyZmFjZSBSZXF1ZXN0U3BlY2lhbE9mZmVyc1BhZ2VBY3Rpb24ge1xyXG4gICAgdHlwZTogJ1JFUVVFU1RfU1BFQ0lBTF9PRkZFUlNfUEFHRSc7XHJcbiAgICBwYWdlVXJsOiBzdHJpbmcgfCBudWxsO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgUmVjZWl2ZVNwZWNpYWxPZmZlcnNQYWdlQWN0aW9uIHtcclxuICAgIHR5cGU6ICdSRUNFSVZFX1NQRUNJQUxfT0ZGRVJTX1BBR0UnO1xyXG4gICAgcGFnZVVybDogc3RyaW5nO1xyXG4gICAgb2ZmZXJzOiBJU3BlY2lhbE9mZmVyW107XHJcbiAgICB0b3RhbFJlc3VsdHM6IG51bWJlcjtcclxuICAgIHRvdGFsUGFnZXM6IG51bWJlcjtcclxuICAgIHBhZ2U6IG51bWJlcjtcclxuICAgIGZpcnN0UGFnZVVybDogc3RyaW5nIHwgbnVsbDtcclxuICAgIHByZXZQYWdlVXJsOiBzdHJpbmcgfCBudWxsO1xyXG4gICAgbmV4dFBhZ2VVcmw6IHN0cmluZyB8IG51bGw7XHJcbiAgICBsYXN0UGFnZVVybDogc3RyaW5nIHwgbnVsbDtcclxufVxyXG5cclxuLy8gRGVjbGFyZSBhICdkaXNjcmltaW5hdGVkIHVuaW9uJyB0eXBlLiBUaGlzIGd1YXJhbnRlZXMgdGhhdCBhbGwgcmVmZXJlbmNlcyB0byAndHlwZScgcHJvcGVydGllcyBjb250YWluIG9uZSBvZiB0aGVcclxuLy8gZGVjbGFyZWQgdHlwZSBzdHJpbmdzIChhbmQgbm90IGFueSBvdGhlciBhcmJpdHJhcnkgc3RyaW5nKS5cclxudHlwZSBLbm93bkFjdGlvbiA9XHJcbiAgICBSZXF1ZXN0U3BlY2lhbE9mZmVyc0FjdGlvbiB8XHJcbiAgICBSZWNlaXZlU3BlY2lhbE9mZmVyc0FjdGlvbiB8XHJcbiAgICBSZXF1ZXN0U3BlY2lhbE9mZmVyc1BhZ2VBY3Rpb24gfFxyXG4gICAgUmVjZWl2ZVNwZWNpYWxPZmZlcnNQYWdlQWN0aW9uO1xyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyBBQ1RJT04gQ1JFQVRPUlMgLSBUaGVzZSBhcmUgZnVuY3Rpb25zIGV4cG9zZWQgdG8gVUkgY29tcG9uZW50cyB0aGF0IHdpbGwgdHJpZ2dlciBhIHN0YXRlIHRyYW5zaXRpb24uXHJcbi8vIFRoZXkgZG9uJ3QgZGlyZWN0bHkgbXV0YXRlIHN0YXRlLCBidXQgdGhleSBjYW4gaGF2ZSBleHRlcm5hbCBzaWRlLWVmZmVjdHMgKHN1Y2ggYXMgbG9hZGluZyBkYXRhKS5cclxuXHJcbmV4cG9ydCBjb25zdCBhY3Rpb25DcmVhdG9ycyA9IHtcclxuICAgIHJlcXVlc3RTcGVjaWFsT2ZmZXJzOiAoXHJcbiAgICAgICAgcGFnZVNpemU6IG51bWJlciA9IDEwLFxyXG4gICAgICAgIGZpbHRlcjogc3RyaW5nIHwgbnVsbCxcclxuICAgICAgICBjYXRlZ29yeUlkOiBzdHJpbmcgfCBudWxsLFxyXG4gICAgICAgIGxvY2F0aW9uSWQ6IHN0cmluZyB8IG51bGwpOiBBcHBUaHVua0FjdGlvbjxLbm93bkFjdGlvbj4gPT5cclxuICAgICAgICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAvLyBPbmx5IGxvYWQgZGF0YSBpZiBpdCdzIHNvbWV0aGluZyB3ZSBkb24ndCBhbHJlYWR5IGhhdmUgKGFuZCBhcmUgbm90IGFscmVhZHkgbG9hZGluZylcclxuICAgICAgICAgICAgaWYgKHBhZ2VTaXplICE9PSBnZXRTdGF0ZSgpLnNwZWNpYWxPZmZlcnMucGFnZVNpemUgfHxcclxuICAgICAgICAgICAgICAgIGZpbHRlciAhPT0gZ2V0U3RhdGUoKS5zcGVjaWFsT2ZmZXJzLmZpbHRlciB8fFxyXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnlJZCAhPT0gZ2V0U3RhdGUoKS5zcGVjaWFsT2ZmZXJzLmNhdGVnb3J5SWQgfHxcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uSWQgIT09IGdldFN0YXRlKCkuc3BlY2lhbE9mZmVycy5sb2NhdGlvbklkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQnVpbGQgcmVxdWVzdCBVUklcclxuICAgICAgICAgICAgICAgIHZhciB1cmkgPSAnYXBpL3NwZWNpYWwtb2ZmZXJzJztcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY2F0ZWdvcnlJZCAhPT0gbnVsbCAmJiBjYXRlZ29yeUlkLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB1cmkgKz0gYC9jYXRlZ29yeS8ke2NhdGVnb3J5SWR9YDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxvY2F0aW9uSWQgIT09IG51bGwgJiYgbG9jYXRpb25JZC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVyaSArPSBgL2xvY2F0aW9uLyR7bG9jYXRpb25JZH1gO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB1cmkgKz0gYD9wYWdlSW5kZXg9MSZwYWdlU2l6ZT0ke3BhZ2VTaXplfWA7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlciAhPT0gbnVsbCAmJiBmaWx0ZXIubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVyaSArPSBgJmZpbHRlcj0ke2ZpbHRlcn1gO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBmZXRjaFRhc2sgPSBmZXRjaCh1cmkpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpIGFzIFByb21pc2U8SVNwZWNpYWxPZmZlcnNIYWw+KVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnUkVDRUlWRV9TUEVDSUFMX09GRkVSUycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWdlVXJsOiB1cmksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWdlU2l6ZTogcGFnZVNpemUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXI6IGZpbHRlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5SWQ6IGNhdGVnb3J5SWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbklkOiBsb2NhdGlvbklkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2ZmZXJzOiBkYXRhLl9lbWJlZGRlZFtcInNwZWNpYWwtb2ZmZXJcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3RhbFJlc3VsdHM6IGRhdGEudG90YWxSZXN1bHRzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG90YWxQYWdlczogZGF0YS50b3RhbFBhZ2VzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFnZTogZGF0YS5wYWdlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RQYWdlVXJsOiAodHlwZW9mIGRhdGEuX2xpbmtzW1wiZmlyc3RcIl0gIT09ICd1bmRlZmluZWQnKSA/IGRhdGEuX2xpbmtzW1wiZmlyc3RcIl0uaHJlZiA6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2UGFnZVVybDogKHR5cGVvZiBkYXRhLl9saW5rc1tcInByZXZcIl0gIT09ICd1bmRlZmluZWQnKSA/IGRhdGEuX2xpbmtzW1wicHJldlwiXS5ocmVmIDogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRQYWdlVXJsOiAodHlwZW9mIGRhdGEuX2xpbmtzW1wibmV4dFwiXSAhPT0gJ3VuZGVmaW5lZCcpID8gZGF0YS5fbGlua3NbXCJuZXh0XCJdLmhyZWYgOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFBhZ2VVcmw6ICh0eXBlb2YgZGF0YS5fbGlua3NbXCJsYXN0XCJdICE9PSAndW5kZWZpbmVkJykgPyBkYXRhLl9saW5rc1tcImxhc3RcIl0uaHJlZiA6IG51bGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgYWRkVGFzayhmZXRjaFRhc2spOyAvLyBFbnN1cmUgc2VydmVyLXNpZGUgcHJlcmVuZGVyaW5nIHdhaXRzIGZvciB0aGlzIHRvIGNvbXBsZXRlXHJcbiAgICAgICAgICAgICAgICBkaXNwYXRjaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ1JFUVVFU1RfU1BFQ0lBTF9PRkZFUlMnLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VTaXplOiBwYWdlU2l6ZSxcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXI6IGZpbHRlcixcclxuICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeUlkOiBjYXRlZ29yeUlkLFxyXG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uSWQ6IGxvY2F0aW9uSWRcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgIHJlcXVlc3RTcGVjaWFsT2ZmZXJQYWdlOiAocGFnZVVyaTogc3RyaW5nKTogQXBwVGh1bmtBY3Rpb248S25vd25BY3Rpb24+ID0+XHJcbiAgICAgICAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xyXG4gICAgICAgICAgICAvLyBPbmx5IGxvYWQgZGF0YSBpZiBwYWdlIFVSSSBpcyBib3RoIHZhbGlkIGFuZCBkaWZmZXJlbnQgZnJvbSBjdXJyZW50XHJcbiAgICAgICAgICAgIGlmIChwYWdlVXJpICE9PSBudWxsICYmXHJcbiAgICAgICAgICAgICAgICBwYWdlVXJpICE9PSBnZXRTdGF0ZSgpLnNwZWNpYWxPZmZlcnMucGFnZVVybCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBmZXRjaFRhc2sgPSBmZXRjaChwYWdlVXJpKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSBhcyBQcm9taXNlPElTcGVjaWFsT2ZmZXJzSGFsPilcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ1JFQ0VJVkVfU1BFQ0lBTF9PRkZFUlNfUEFHRScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWdlVXJsOiBwYWdlVXJpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2ZmZXJzOiBkYXRhLl9lbWJlZGRlZFtcInNwZWNpYWwtb2ZmZXJcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3RhbFJlc3VsdHM6IGRhdGEudG90YWxSZXN1bHRzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG90YWxQYWdlczogZGF0YS50b3RhbFBhZ2VzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFnZTogZGF0YS5wYWdlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RQYWdlVXJsOiAodHlwZW9mIGRhdGEuX2xpbmtzW1wiZmlyc3RcIl0gIT09ICd1bmRlZmluZWQnKSA/IGRhdGEuX2xpbmtzW1wiZmlyc3RcIl0uaHJlZiA6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2UGFnZVVybDogKHR5cGVvZiBkYXRhLl9saW5rc1tcInByZXZcIl0gIT09ICd1bmRlZmluZWQnKSA/IGRhdGEuX2xpbmtzW1wicHJldlwiXS5ocmVmIDogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRQYWdlVXJsOiAodHlwZW9mIGRhdGEuX2xpbmtzW1wibmV4dFwiXSAhPT0gJ3VuZGVmaW5lZCcpID8gZGF0YS5fbGlua3NbXCJuZXh0XCJdLmhyZWYgOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFBhZ2VVcmw6ICh0eXBlb2YgZGF0YS5fbGlua3NbXCJsYXN0XCJdICE9PSAndW5kZWZpbmVkJykgPyBkYXRhLl9saW5rc1tcImxhc3RcIl0uaHJlZiA6IG51bGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgYWRkVGFzayhmZXRjaFRhc2spOyAvLyBFbnN1cmUgc2VydmVyLXNpZGUgcHJlcmVuZGVyaW5nIHdhaXRzIGZvciB0aGlzIHRvIGNvbXBsZXRlXHJcbiAgICAgICAgICAgICAgICBkaXNwYXRjaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ1JFUVVFU1RfU1BFQ0lBTF9PRkZFUlNfUEFHRScsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZVVybDogcGFnZVVyaVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbn07XHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tXHJcbi8vIFJFRFVDRVIgLSBGb3IgYSBnaXZlbiBzdGF0ZSBhbmQgYWN0aW9uLCByZXR1cm5zIHRoZSBuZXcgc3RhdGUuIFRvIHN1cHBvcnQgdGltZSB0cmF2ZWwsIHRoaXMgbXVzdCBub3QgbXV0YXRlIHRoZSBvbGQgc3RhdGUuXHJcblxyXG5jb25zdCB1bmxvYWRlZFN0YXRlOiBTcGVjaWFsT2ZmZXJzU3RhdGUgPSB7XHJcbiAgICBpc0xvYWRpbmc6IGZhbHNlLFxyXG4gICAgcGFnZVNpemU6IDAsXHJcbiAgICBwYWdlVXJsOiBudWxsLFxyXG4gICAgZmlsdGVyOiBudWxsLFxyXG4gICAgY2F0ZWdvcnlJZDogbnVsbCxcclxuICAgIGxvY2F0aW9uSWQ6IG51bGwsXHJcbiAgICBvZmZlcnM6IFtdLFxyXG4gICAgdG90YWxSZXN1bHRzOiAwLFxyXG4gICAgdG90YWxQYWdlczogMCxcclxuICAgIHBhZ2U6IDAsXHJcbiAgICBmaXJzdFBhZ2VVcmw6IG51bGwsXHJcbiAgICBwcmV2UGFnZVVybDogbnVsbCxcclxuICAgIG5leHRQYWdlVXJsOiBudWxsLFxyXG4gICAgbGFzdFBhZ2VVcmw6IG51bGxcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCByZWR1Y2VyOiBSZWR1Y2VyPFNwZWNpYWxPZmZlcnNTdGF0ZT4gPSAoc3RhdGU6IFNwZWNpYWxPZmZlcnNTdGF0ZSwgaW5jb21pbmdBY3Rpb246IEFjdGlvbikgPT4ge1xyXG4gICAgY29uc3QgYWN0aW9uID0gaW5jb21pbmdBY3Rpb24gYXMgS25vd25BY3Rpb247XHJcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XHJcbiAgICAgICAgY2FzZSAnUkVRVUVTVF9TUEVDSUFMX09GRkVSUyc6XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBwYWdlU2l6ZTogYWN0aW9uLnBhZ2VTaXplLFxyXG4gICAgICAgICAgICAgICAgZmlsdGVyOiBhY3Rpb24uZmlsdGVyLFxyXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnlJZDogYWN0aW9uLmNhdGVnb3J5SWQsXHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbklkOiBhY3Rpb24ubG9jYXRpb25JZCxcclxuICAgICAgICAgICAgICAgIHBhZ2VVcmw6IHN0YXRlLnBhZ2VVcmwsXHJcbiAgICAgICAgICAgICAgICBvZmZlcnM6IHN0YXRlLm9mZmVycyxcclxuICAgICAgICAgICAgICAgIHRvdGFsUmVzdWx0czogc3RhdGUudG90YWxSZXN1bHRzLFxyXG4gICAgICAgICAgICAgICAgdG90YWxQYWdlczogc3RhdGUudG90YWxQYWdlcyxcclxuICAgICAgICAgICAgICAgIHBhZ2U6IHN0YXRlLnBhZ2UsXHJcbiAgICAgICAgICAgICAgICBmaXJzdFBhZ2VVcmw6IHN0YXRlLmZpcnN0UGFnZVVybCxcclxuICAgICAgICAgICAgICAgIHByZXZQYWdlVXJsOiBzdGF0ZS5wcmV2UGFnZVVybCxcclxuICAgICAgICAgICAgICAgIG5leHRQYWdlVXJsOiBzdGF0ZS5uZXh0UGFnZVVybCxcclxuICAgICAgICAgICAgICAgIGxhc3RQYWdlVXJsOiBzdGF0ZS5sYXN0UGFnZVVybCxcclxuICAgICAgICAgICAgICAgIGlzTG9hZGluZzogdHJ1ZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIGNhc2UgJ1JFQ0VJVkVfU1BFQ0lBTF9PRkZFUlMnOlxyXG4gICAgICAgICAgICAvLyBPbmx5IGFjY2VwdCB0aGUgaW5jb21pbmcgZGF0YSBpZiBpdCBtYXRjaGVzIHRoZSBtb3N0IHJlY2VudCByZXF1ZXN0LiBUaGlzIGVuc3VyZXMgd2UgY29ycmVjdGx5XHJcbiAgICAgICAgICAgIC8vIGhhbmRsZSBvdXQtb2Ytb3JkZXIgcmVzcG9uc2VzLlxyXG4gICAgICAgICAgICBpZiAoYWN0aW9uLnBhZ2VTaXplID09PSBzdGF0ZS5wYWdlU2l6ZSAmJlxyXG4gICAgICAgICAgICAgICAgYWN0aW9uLmZpbHRlciA9PT0gc3RhdGUuZmlsdGVyICYmXHJcbiAgICAgICAgICAgICAgICBhY3Rpb24uY2F0ZWdvcnlJZCA9PT0gc3RhdGUuY2F0ZWdvcnlJZCAmJlxyXG4gICAgICAgICAgICAgICAgYWN0aW9uLmxvY2F0aW9uSWQgPT09IHN0YXRlLmxvY2F0aW9uSWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZVNpemU6IGFjdGlvbi5wYWdlU2l6ZSxcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXI6IGFjdGlvbi5maWx0ZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnlJZDogYWN0aW9uLmNhdGVnb3J5SWQsXHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb25JZDogYWN0aW9uLmxvY2F0aW9uSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZVVybDogYWN0aW9uLnBhZ2VVcmwsXHJcbiAgICAgICAgICAgICAgICAgICAgb2ZmZXJzOiBhY3Rpb24ub2ZmZXJzLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvdGFsUmVzdWx0czogYWN0aW9uLnRvdGFsUmVzdWx0cyxcclxuICAgICAgICAgICAgICAgICAgICB0b3RhbFBhZ2VzOiBhY3Rpb24udG90YWxQYWdlcyxcclxuICAgICAgICAgICAgICAgICAgICBwYWdlOiBhY3Rpb24ucGFnZSxcclxuICAgICAgICAgICAgICAgICAgICBmaXJzdFBhZ2VVcmw6IGFjdGlvbi5maXJzdFBhZ2VVcmwsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJldlBhZ2VVcmw6IGFjdGlvbi5wcmV2UGFnZVVybCxcclxuICAgICAgICAgICAgICAgICAgICBuZXh0UGFnZVVybDogYWN0aW9uLm5leHRQYWdlVXJsLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhc3RQYWdlVXJsOiBhY3Rpb24ubGFzdFBhZ2VVcmwsXHJcbiAgICAgICAgICAgICAgICAgICAgaXNMb2FkaW5nOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdSRVFVRVNUX1NQRUNJQUxfT0ZGRVJTX1BBR0UnOlxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgcGFnZVVybDogYWN0aW9uLnBhZ2VVcmwsXHJcbiAgICAgICAgICAgICAgICBwYWdlU2l6ZTogc3RhdGUucGFnZVNpemUsXHJcbiAgICAgICAgICAgICAgICBmaWx0ZXI6IHN0YXRlLmZpbHRlcixcclxuICAgICAgICAgICAgICAgIGNhdGVnb3J5SWQ6IHN0YXRlLmNhdGVnb3J5SWQsXHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbklkOiBzdGF0ZS5sb2NhdGlvbklkLFxyXG4gICAgICAgICAgICAgICAgb2ZmZXJzOiBzdGF0ZS5vZmZlcnMsXHJcbiAgICAgICAgICAgICAgICB0b3RhbFJlc3VsdHM6IHN0YXRlLnRvdGFsUmVzdWx0cyxcclxuICAgICAgICAgICAgICAgIHRvdGFsUGFnZXM6IHN0YXRlLnRvdGFsUGFnZXMsXHJcbiAgICAgICAgICAgICAgICBwYWdlOiBzdGF0ZS5wYWdlLFxyXG4gICAgICAgICAgICAgICAgZmlyc3RQYWdlVXJsOiBzdGF0ZS5maXJzdFBhZ2VVcmwsXHJcbiAgICAgICAgICAgICAgICBwcmV2UGFnZVVybDogc3RhdGUucHJldlBhZ2VVcmwsXHJcbiAgICAgICAgICAgICAgICBuZXh0UGFnZVVybDogc3RhdGUubmV4dFBhZ2VVcmwsXHJcbiAgICAgICAgICAgICAgICBsYXN0UGFnZVVybDogc3RhdGUubGFzdFBhZ2VVcmwsXHJcbiAgICAgICAgICAgICAgICBpc0xvYWRpbmc6IHRydWVcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICBjYXNlICdSRUNFSVZFX1NQRUNJQUxfT0ZGRVJTX1BBR0UnOlxyXG4gICAgICAgICAgICAvLyBPbmx5IGFjY2VwdCB0aGUgaW5jb21pbmcgZGF0YSBpZiBpdCBtYXRjaGVzIHRoZSBtb3N0IHJlY2VudCByZXF1ZXN0LiBUaGlzIGVuc3VyZXMgd2UgY29ycmVjdGx5XHJcbiAgICAgICAgICAgIC8vIGhhbmRsZSBvdXQtb2Ytb3JkZXIgcmVzcG9uc2VzLlxyXG4gICAgICAgICAgICBpZiAoYWN0aW9uLnBhZ2VVcmwgPT09IHN0YXRlLnBhZ2VVcmwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZVVybDogYWN0aW9uLnBhZ2VVcmwsXHJcbiAgICAgICAgICAgICAgICAgICAgb2ZmZXJzOiBhY3Rpb24ub2ZmZXJzLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvdGFsUmVzdWx0czogYWN0aW9uLnRvdGFsUmVzdWx0cyxcclxuICAgICAgICAgICAgICAgICAgICB0b3RhbFBhZ2VzOiBhY3Rpb24udG90YWxQYWdlcyxcclxuICAgICAgICAgICAgICAgICAgICBwYWdlOiBhY3Rpb24ucGFnZSxcclxuICAgICAgICAgICAgICAgICAgICBmaXJzdFBhZ2VVcmw6IGFjdGlvbi5maXJzdFBhZ2VVcmwsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJldlBhZ2VVcmw6IGFjdGlvbi5wcmV2UGFnZVVybCxcclxuICAgICAgICAgICAgICAgICAgICBuZXh0UGFnZVVybDogYWN0aW9uLm5leHRQYWdlVXJsLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhc3RQYWdlVXJsOiBhY3Rpb24ubGFzdFBhZ2VVcmwsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZVNpemU6IHN0YXRlLnBhZ2VTaXplLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcjogc3RhdGUuZmlsdGVyLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5SWQ6IHN0YXRlLmNhdGVnb3J5SWQsXHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb25JZDogc3RhdGUubG9jYXRpb25JZCxcclxuICAgICAgICAgICAgICAgICAgICBpc0xvYWRpbmc6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIC8vIFRoZSBmb2xsb3dpbmcgbGluZSBndWFyYW50ZWVzIHRoYXQgZXZlcnkgYWN0aW9uIGluIHRoZSBLbm93bkFjdGlvbiB1bmlvbiBoYXMgYmVlbiBjb3ZlcmVkIGJ5IGEgY2FzZSBhYm92ZVxyXG4gICAgICAgICAgICBjb25zdCBleGhhdXN0aXZlQ2hlY2s6IG5ldmVyID0gYWN0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzdGF0ZSB8fCB1bmxvYWRlZFN0YXRlO1xyXG59O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9DbGllbnRBcHAvc3RvcmUvU3BlY2lhbE9mZmVycy50cyIsImltcG9ydCB7IGNyZWF0ZVN0b3JlLCBhcHBseU1pZGRsZXdhcmUsIGNvbXBvc2UsIGNvbWJpbmVSZWR1Y2VycywgR2VuZXJpY1N0b3JlRW5oYW5jZXIsIFN0b3JlLCBTdG9yZUVuaGFuY2VyU3RvcmVDcmVhdG9yLCBSZWR1Y2Vyc01hcE9iamVjdCB9IGZyb20gJ3JlZHV4JztcclxuaW1wb3J0IHRodW5rIGZyb20gJ3JlZHV4LXRodW5rJztcclxuaW1wb3J0IHsgcm91dGVyUmVkdWNlciwgcm91dGVyTWlkZGxld2FyZSB9IGZyb20gJ3JlYWN0LXJvdXRlci1yZWR1eCc7XHJcbmltcG9ydCAqIGFzIFN0b3JlTW9kdWxlIGZyb20gJy4vc3RvcmUnO1xyXG5pbXBvcnQgeyBBcHBsaWNhdGlvblN0YXRlLCByZWR1Y2VycyB9IGZyb20gJy4vc3RvcmUnO1xyXG5pbXBvcnQgeyBIaXN0b3J5IH0gZnJvbSAnaGlzdG9yeSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb25maWd1cmVTdG9yZShoaXN0b3J5OiBIaXN0b3J5LCBpbml0aWFsU3RhdGU/OiBBcHBsaWNhdGlvblN0YXRlKSB7XHJcbiAgICAvLyBCdWlsZCBtaWRkbGV3YXJlLiBUaGVzZSBhcmUgZnVuY3Rpb25zIHRoYXQgY2FuIHByb2Nlc3MgdGhlIGFjdGlvbnMgYmVmb3JlIHRoZXkgcmVhY2ggdGhlIHN0b3JlLlxyXG4gICAgY29uc3Qgd2luZG93SWZEZWZpbmVkID0gdHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgPyBudWxsIDogd2luZG93IGFzIGFueTtcclxuXHJcbiAgICAvLyBJZiBkZXZUb29scyBpcyBpbnN0YWxsZWQsIGNvbm5lY3QgdG8gaXRcclxuICAgIGNvbnN0IGRldlRvb2xzRXh0ZW5zaW9uID0gd2luZG93SWZEZWZpbmVkICYmIHdpbmRvd0lmRGVmaW5lZC5fX1JFRFVYX0RFVlRPT0xTX0VYVEVOU0lPTl9fIGFzICgpID0+IEdlbmVyaWNTdG9yZUVuaGFuY2VyO1xyXG4gICAgY29uc3QgY3JlYXRlU3RvcmVXaXRoTWlkZGxld2FyZSA9IGNvbXBvc2UoXHJcbiAgICAgICAgYXBwbHlNaWRkbGV3YXJlKHRodW5rLCByb3V0ZXJNaWRkbGV3YXJlKGhpc3RvcnkpKSxcclxuICAgICAgICBkZXZUb29sc0V4dGVuc2lvbiA/IGRldlRvb2xzRXh0ZW5zaW9uKCkgOiA8Uz4obmV4dDogU3RvcmVFbmhhbmNlclN0b3JlQ3JlYXRvcjxTPikgPT4gbmV4dFxyXG4gICAgKShjcmVhdGVTdG9yZSk7XHJcblxyXG4gICAgLy8gQ29tYmluZSBhbGwgcmVkdWNlcnMgYW5kIGluc3RhbnRpYXRlIHRoZSBhcHAtd2lkZSBzdG9yZSBpbnN0YW5jZVxyXG4gICAgY29uc3QgYWxsUmVkdWNlcnMgPSBidWlsZFJvb3RSZWR1Y2VyKHJlZHVjZXJzKTtcclxuICAgIGNvbnN0IHN0b3JlID0gY3JlYXRlU3RvcmVXaXRoTWlkZGxld2FyZShhbGxSZWR1Y2VycywgaW5pdGlhbFN0YXRlKSBhcyBTdG9yZTxBcHBsaWNhdGlvblN0YXRlPjtcclxuXHJcbiAgICAvLyBFbmFibGUgV2VicGFjayBob3QgbW9kdWxlIHJlcGxhY2VtZW50IGZvciByZWR1Y2Vyc1xyXG4gICAgaWYgKG1vZHVsZS5ob3QpIHtcclxuICAgICAgICBtb2R1bGUuaG90LmFjY2VwdCgnLi9zdG9yZScsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbmV4dFJvb3RSZWR1Y2VyID0gcmVxdWlyZTx0eXBlb2YgU3RvcmVNb2R1bGU+KCcuL3N0b3JlJyk7XHJcbiAgICAgICAgICAgIHN0b3JlLnJlcGxhY2VSZWR1Y2VyKGJ1aWxkUm9vdFJlZHVjZXIobmV4dFJvb3RSZWR1Y2VyLnJlZHVjZXJzKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHN0b3JlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBidWlsZFJvb3RSZWR1Y2VyKGFsbFJlZHVjZXJzOiBSZWR1Y2Vyc01hcE9iamVjdCkge1xyXG4gICAgcmV0dXJuIGNvbWJpbmVSZWR1Y2VyczxBcHBsaWNhdGlvblN0YXRlPihPYmplY3QuYXNzaWduKHt9LCBhbGxSZWR1Y2VycywgeyByb3V0aW5nOiByb3V0ZXJSZWR1Y2VyIH0pKTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9DbGllbnRBcHAvY29uZmlndXJlU3RvcmUudHMiLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IFJvdXRlIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XHJcbmltcG9ydCB7IExheW91dCB9IGZyb20gJy4vY29tcG9uZW50cy9MYXlvdXQnO1xyXG5pbXBvcnQgeyBIb21lIH0gZnJvbSAnLi9jb21wb25lbnRzL0hvbWUnO1xyXG5pbXBvcnQgU3BlY2lhbE9mZmVyc0ZldGNoRGF0YSBmcm9tICcuL2NvbXBvbmVudHMvU3BlY2lhbE9mZmVycyc7XHJcblxyXG5leHBvcnQgY29uc3Qgcm91dGVzID0gPExheW91dD5cclxuICAgIDxSb3V0ZSBleGFjdCBwYXRoPScvJyBjb21wb25lbnQ9eyBIb21lIH0gLz5cclxuICAgIDxSb3V0ZSBwYXRoPScvc3BlY2lhbC1vZmZlcnMvOmNhdGVnb3J5SWQ/Lzpsb2NhdGlvbklkPycgY29tcG9uZW50PXsgU3BlY2lhbE9mZmVyc0ZldGNoRGF0YSB9IC8+XHJcbjwvTGF5b3V0PjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQ2xpZW50QXBwL3JvdXRlcy50c3giLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDApKSgxNDUpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9hc3BuZXQtcHJlcmVuZGVyaW5nL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvclxuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDApKSgxNTApO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9oaXN0b3J5L2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvclxuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDApKSgxNTIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yZWFjdC1kb20vc2VydmVyLmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvclxuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcclxuaW1wb3J0IHsgcmVuZGVyVG9TdHJpbmcgfSBmcm9tICdyZWFjdC1kb20vc2VydmVyJztcclxuaW1wb3J0IHsgU3RhdGljUm91dGVyIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XHJcbmltcG9ydCB7IHJlcGxhY2UgfSBmcm9tICdyZWFjdC1yb3V0ZXItcmVkdXgnO1xyXG5pbXBvcnQgeyBjcmVhdGVNZW1vcnlIaXN0b3J5IH0gZnJvbSAnaGlzdG9yeSc7XHJcbmltcG9ydCB7IGNyZWF0ZVNlcnZlclJlbmRlcmVyLCBSZW5kZXJSZXN1bHQgfSBmcm9tICdhc3BuZXQtcHJlcmVuZGVyaW5nJztcclxuaW1wb3J0IHsgcm91dGVzIH0gZnJvbSAnLi9yb3V0ZXMnO1xyXG5pbXBvcnQgY29uZmlndXJlU3RvcmUgZnJvbSAnLi9jb25maWd1cmVTdG9yZSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVTZXJ2ZXJSZW5kZXJlcihwYXJhbXMgPT4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPFJlbmRlclJlc3VsdD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIC8vIFByZXBhcmUgUmVkdXggc3RvcmUgd2l0aCBpbi1tZW1vcnkgaGlzdG9yeSwgYW5kIGRpc3BhdGNoIGEgbmF2aWdhdGlvbiBldmVudFxyXG4gICAgICAgIC8vIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGluY29taW5nIFVSTFxyXG4gICAgICAgIGNvbnN0IGJhc2VuYW1lID0gcGFyYW1zLmJhc2VVcmwuc3Vic3RyaW5nKDAsIHBhcmFtcy5iYXNlVXJsLmxlbmd0aCAtIDEpOyAvLyBSZW1vdmUgdHJhaWxpbmcgc2xhc2hcclxuICAgICAgICBjb25zdCB1cmxBZnRlckJhc2VuYW1lID0gcGFyYW1zLnVybC5zdWJzdHJpbmcoYmFzZW5hbWUubGVuZ3RoKTtcclxuICAgICAgICBjb25zdCBzdG9yZSA9IGNvbmZpZ3VyZVN0b3JlKGNyZWF0ZU1lbW9yeUhpc3RvcnkoKSk7XHJcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2gocmVwbGFjZSh1cmxBZnRlckJhc2VuYW1lKSk7XHJcblxyXG4gICAgICAgIC8vIFByZXBhcmUgYW4gaW5zdGFuY2Ugb2YgdGhlIGFwcGxpY2F0aW9uIGFuZCBwZXJmb3JtIGFuIGluaXRhbCByZW5kZXIgdGhhdCB3aWxsXHJcbiAgICAgICAgLy8gY2F1c2UgYW55IGFzeW5jIHRhc2tzIChlLmcuLCBkYXRhIGFjY2VzcykgdG8gYmVnaW5cclxuICAgICAgICBjb25zdCByb3V0ZXJDb250ZXh0OiBhbnkgPSB7fTtcclxuICAgICAgICBjb25zdCBhcHAgPSAoXHJcbiAgICAgICAgICAgIDxQcm92aWRlciBzdG9yZT17IHN0b3JlIH0+XHJcbiAgICAgICAgICAgICAgICA8U3RhdGljUm91dGVyIGJhc2VuYW1lPXsgYmFzZW5hbWUgfSBjb250ZXh0PXsgcm91dGVyQ29udGV4dCB9IGxvY2F0aW9uPXsgcGFyYW1zLmxvY2F0aW9uLnBhdGggfSBjaGlsZHJlbj17IHJvdXRlcyB9IC8+XHJcbiAgICAgICAgICAgIDwvUHJvdmlkZXI+XHJcbiAgICAgICAgKTtcclxuICAgICAgICByZW5kZXJUb1N0cmluZyhhcHApO1xyXG5cclxuICAgICAgICAvLyBJZiB0aGVyZSdzIGEgcmVkaXJlY3Rpb24sIGp1c3Qgc2VuZCB0aGlzIGluZm9ybWF0aW9uIGJhY2sgdG8gdGhlIGhvc3QgYXBwbGljYXRpb25cclxuICAgICAgICBpZiAocm91dGVyQ29udGV4dC51cmwpIHtcclxuICAgICAgICAgICAgcmVzb2x2ZSh7IHJlZGlyZWN0VXJsOiByb3V0ZXJDb250ZXh0LnVybCB9KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBPbmNlIGFueSBhc3luYyB0YXNrcyBhcmUgZG9uZSwgd2UgY2FuIHBlcmZvcm0gdGhlIGZpbmFsIHJlbmRlclxyXG4gICAgICAgIC8vIFdlIGFsc28gc2VuZCB0aGUgcmVkdXggc3RvcmUgc3RhdGUsIHNvIHRoZSBjbGllbnQgY2FuIGNvbnRpbnVlIGV4ZWN1dGlvbiB3aGVyZSB0aGUgc2VydmVyIGxlZnQgb2ZmXHJcbiAgICAgICAgcGFyYW1zLmRvbWFpblRhc2tzLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICByZXNvbHZlKHtcclxuICAgICAgICAgICAgICAgIGh0bWw6IHJlbmRlclRvU3RyaW5nKGFwcCksXHJcbiAgICAgICAgICAgICAgICBnbG9iYWxzOiB7IGluaXRpYWxSZWR1eFN0YXRlOiBzdG9yZS5nZXRTdGF0ZSgpIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgcmVqZWN0KTsgLy8gQWxzbyBwcm9wYWdhdGUgYW55IGVycm9ycyBiYWNrIGludG8gdGhlIGhvc3QgYXBwbGljYXRpb25cclxuICAgIH0pO1xyXG59KTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQ2xpZW50QXBwL2Jvb3Qtc2VydmVyLnRzeCIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgUm91dGVDb21wb25lbnRQcm9wcyB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XHJcblxyXG5leHBvcnQgY2xhc3MgSG9tZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxSb3V0ZUNvbXBvbmVudFByb3BzPGFueT4sIGFueT4ge1xyXG4gICAgcHVibGljIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPGRpdj5cclxuICAgICAgICAgICAgPGgxPkhlbGxvLCB3b3JsZCE8L2gxPlxyXG4gICAgICAgICAgICA8cD5XZWxjb21lIHRvIHlvdXIgbmV3IHNpbmdsZS1wYWdlIGFwcGxpY2F0aW9uLCBidWlsdCB3aXRoOjwvcD5cclxuICAgICAgICAgICAgPHVsPlxyXG4gICAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9J2h0dHBzOi8vZ2V0LmFzcC5uZXQvJz5BU1AuTkVUIENvcmU8L2E+IGFuZCA8YSBocmVmPSdodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5LzY3ZWY4c2JkLmFzcHgnPkMjPC9hPiBmb3IgY3Jvc3MtcGxhdGZvcm0gc2VydmVyLXNpZGUgY29kZTwvbGk+XHJcbiAgICAgICAgICAgICAgICA8bGk+PGEgaHJlZj0naHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvJz5SZWFjdDwvYT4gYW5kIDxhIGhyZWY9J2h0dHA6Ly93d3cudHlwZXNjcmlwdGxhbmcub3JnLyc+VHlwZVNjcmlwdDwvYT4gZm9yIGNsaWVudC1zaWRlIGNvZGU8L2xpPlxyXG4gICAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9J2h0dHBzOi8vd2VicGFjay5naXRodWIuaW8vJz5XZWJwYWNrPC9hPiBmb3IgYnVpbGRpbmcgYW5kIGJ1bmRsaW5nIGNsaWVudC1zaWRlIHJlc291cmNlczwvbGk+XHJcbiAgICAgICAgICAgICAgICA8bGk+PGEgaHJlZj0naHR0cDovL2dldGJvb3RzdHJhcC5jb20vJz5Cb290c3RyYXA8L2E+IGZvciBsYXlvdXQgYW5kIHN0eWxpbmc8L2xpPlxyXG4gICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICA8cD5UbyBoZWxwIHlvdSBnZXQgc3RhcnRlZCwgd2UndmUgYWxzbyBzZXQgdXA6PC9wPlxyXG4gICAgICAgICAgICA8dWw+XHJcbiAgICAgICAgICAgICAgICA8bGk+PHN0cm9uZz5DbGllbnQtc2lkZSBuYXZpZ2F0aW9uPC9zdHJvbmc+LiBGb3IgZXhhbXBsZSwgY2xpY2sgPGVtPkNvdW50ZXI8L2VtPiB0aGVuIDxlbT5CYWNrPC9lbT4gdG8gcmV0dXJuIGhlcmUuPC9saT5cclxuICAgICAgICAgICAgICAgIDxsaT48c3Ryb25nPldlYnBhY2sgZGV2IG1pZGRsZXdhcmU8L3N0cm9uZz4uIEluIGRldmVsb3BtZW50IG1vZGUsIHRoZXJlJ3Mgbm8gbmVlZCB0byBydW4gdGhlIDxjb2RlPndlYnBhY2s8L2NvZGU+IGJ1aWxkIHRvb2wuIFlvdXIgY2xpZW50LXNpZGUgcmVzb3VyY2VzIGFyZSBkeW5hbWljYWxseSBidWlsdCBvbiBkZW1hbmQuIFVwZGF0ZXMgYXJlIGF2YWlsYWJsZSBhcyBzb29uIGFzIHlvdSBtb2RpZnkgYW55IGZpbGUuPC9saT5cclxuICAgICAgICAgICAgICAgIDxsaT48c3Ryb25nPkhvdCBtb2R1bGUgcmVwbGFjZW1lbnQ8L3N0cm9uZz4uIEluIGRldmVsb3BtZW50IG1vZGUsIHlvdSBkb24ndCBldmVuIG5lZWQgdG8gcmVsb2FkIHRoZSBwYWdlIGFmdGVyIG1ha2luZyBtb3N0IGNoYW5nZXMuIFdpdGhpbiBzZWNvbmRzIG9mIHNhdmluZyBjaGFuZ2VzIHRvIGZpbGVzLCByZWJ1aWx0IFJlYWN0IGNvbXBvbmVudHMgd2lsbCBiZSBpbmplY3RlZCBkaXJlY3RseSBpbnRvIHlvdXIgcnVubmluZyBhcHBsaWNhdGlvbiwgcHJlc2VydmluZyBpdHMgbGl2ZSBzdGF0ZS48L2xpPlxyXG4gICAgICAgICAgICAgICAgPGxpPjxzdHJvbmc+RWZmaWNpZW50IHByb2R1Y3Rpb24gYnVpbGRzPC9zdHJvbmc+LiBJbiBwcm9kdWN0aW9uIG1vZGUsIGRldmVsb3BtZW50LXRpbWUgZmVhdHVyZXMgYXJlIGRpc2FibGVkLCBhbmQgdGhlIDxjb2RlPndlYnBhY2s8L2NvZGU+IGJ1aWxkIHRvb2wgcHJvZHVjZXMgbWluaWZpZWQgc3RhdGljIENTUyBhbmQgSmF2YVNjcmlwdCBmaWxlcy48L2xpPlxyXG4gICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICA8aDQ+R29pbmcgZnVydGhlcjwvaDQ+XHJcbiAgICAgICAgICAgIDxwPlxyXG4gICAgICAgICAgICAgICAgRm9yIGxhcmdlciBhcHBsaWNhdGlvbnMsIG9yIGZvciBzZXJ2ZXItc2lkZSBwcmVyZW5kZXJpbmcgKGkuZS4sIGZvciA8ZW0+aXNvbW9ycGhpYzwvZW0+IG9yIDxlbT51bml2ZXJzYWw8L2VtPiBhcHBsaWNhdGlvbnMpLCB5b3Ugc2hvdWxkIGNvbnNpZGVyIHVzaW5nIGEgRmx1eC9SZWR1eC1saWtlIGFyY2hpdGVjdHVyZS5cclxuICAgICAgICAgICAgICAgIFlvdSBjYW4gZ2VuZXJhdGUgYW4gQVNQLk5FVCBDb3JlIGFwcGxpY2F0aW9uIHdpdGggUmVhY3QgYW5kIFJlZHV4IHVzaW5nIDxjb2RlPmRvdG5ldCBuZXcgcmVhY3RyZWR1eDwvY29kZT4gaW5zdGVhZCBvZiB1c2luZyB0aGlzIHRlbXBsYXRlLlxyXG4gICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgPC9kaXY+O1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0NsaWVudEFwcC9jb21wb25lbnRzL0hvbWUudHN4IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBOYXZNZW51IH0gZnJvbSAnLi9OYXZNZW51JztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTGF5b3V0UHJvcHMge1xyXG4gICAgY2hpbGRyZW4/OiBSZWFjdC5SZWFjdE5vZGU7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBMYXlvdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8TGF5b3V0UHJvcHMsIHt9PiB7XHJcbiAgICBwdWJsaWMgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT0nY29udGFpbmVyLWZsdWlkJz5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3Jvdyc+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sLXNtLTEyJz5cclxuICAgICAgICAgICAgICAgICAgICA8TmF2TWVudSAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93Jz5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2wtc20tMTInPlxyXG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PjtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9DbGllbnRBcHAvY29tcG9uZW50cy9MYXlvdXQudHN4IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBMaW5rLCBOYXZMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XHJcbmltcG9ydCAqIGFzIEZvbnRBd2Vzb21lIGZyb20gJ3JlYWN0LWZvbnRhd2Vzb21lJztcclxuXHJcbmV4cG9ydCBjbGFzcyBOYXZNZW51IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHt9LCB7fT4ge1xyXG4gICAgcHVibGljIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9J21haW4tbmF2Jz5cclxuICAgICAgICAgICAgPG5hdiBjbGFzc05hbWU9J25hdmJhciBuYXZiYXItZXhwYW5kLXNtIG5hdmJhci1kYXJrIGJnLWRhcmsnPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J25hdmJhci1oZWFkZXInPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT0nYnV0dG9uJyBjbGFzc05hbWU9J25hdmJhci10b2dnbGVyJyBkYXRhLXRvZ2dsZT0nY29sbGFwc2UnIGRhdGEtdGFyZ2V0PScubmF2YmFyLWNvbGxhcHNlJyBhcmlhLWNvbnRyb2xzPSduYXZiYXJTdXBwb3J0ZWRDb250ZW50JyBhcmlhLWV4cGFuZGVkPSdmYWxzZScgYXJpYS1sYWJlbD0nVG9nZ2xlIG5hdmlnYXRpb24nPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJuYXZiYXItdG9nZ2xlci1pY29uXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxMaW5rIGNsYXNzTmFtZT0nbmF2YmFyLWJyYW5kJyB0bz17Jy8nfT5TcGVjaWFsIE9mZmVycyBQcm90b3R5cGU8L0xpbms+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjbGVhcmZpeCc+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbmF2YmFyLWNvbGxhcHNlIGNvbGxhcHNlJz5cclxuICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPSduYXZiYXItbmF2IG1yLWF1dG8nPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8TmF2TGluayB0bz17Jy8nfSBleGFjdCBjbGFzc05hbWU9XCJuYXYtaXRlbSBuYXYtbGlua1wiIGFjdGl2ZUNsYXNzTmFtZT0nYWN0aXZlJz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb250QXdlc29tZSBuYW1lPSdob21lJyAvPiBIb21lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvTmF2TGluaz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPE5hdkxpbmsgdG89eycvc3BlY2lhbC1vZmZlcnMnfSBjbGFzc05hbWU9XCJuYXYtaXRlbSBuYXYtbGlua1wiIGFjdGl2ZUNsYXNzTmFtZT0nYWN0aXZlJz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb250QXdlc29tZSBuYW1lPSdtYWdpYycgLz4gU3BlY2lhbCBPZmZlcnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9OYXZMaW5rPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9uYXY+XHJcbiAgICAgICAgPC9kaXY+O1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0NsaWVudEFwcC9jb21wb25lbnRzL05hdk1lbnUudHN4IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBMaW5rLCBSb3V0ZUNvbXBvbmVudFByb3BzIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XHJcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XHJcbmltcG9ydCB7IEFwcGxpY2F0aW9uU3RhdGUgfSBmcm9tICcuLi9zdG9yZSc7XHJcbmltcG9ydCAqIGFzIFNwZWNpYWxPZmZlcnNTdGF0ZSBmcm9tICcuLi9zdG9yZS9TcGVjaWFsT2ZmZXJzJztcclxuaW1wb3J0ICcuL1NwZWNpYWxPZmZlclN0eWxpbmcuc2Nzcyc7XHJcblxyXG4vLyBBdCBydW50aW1lLCBSZWR1eCB3aWxsIG1lcmdlIHRvZ2V0aGVyLi4uXHJcbnR5cGUgU3BlY2lhbE9mZmVyc1Byb3BzID1cclxuICAgIFNwZWNpYWxPZmZlcnNTdGF0ZS5TcGVjaWFsT2ZmZXJzU3RhdGUgICAgICAgICAgICAgIC8vIC4uLiBzdGF0ZSB3ZSd2ZSByZXF1ZXN0ZWQgZnJvbSB0aGUgUmVkdXggc3RvcmVcclxuICAgICYgdHlwZW9mIFNwZWNpYWxPZmZlcnNTdGF0ZS5hY3Rpb25DcmVhdG9ycyAgICAgICAgIC8vIC4uLiBwbHVzIGFjdGlvbiBjcmVhdG9ycyB3ZSd2ZSByZXF1ZXN0ZWRcclxuICAgICYgUm91dGVDb21wb25lbnRQcm9wczx7IGNhdGVnb3J5SWQ6IHN0cmluZyB8IG51bGwsIGxvY2F0aW9uSWQ6IHN0cmluZyB8IG51bGwgfT47IC8vIC4uLiBwbHVzIGluY29taW5nIHJvdXRpbmcgcGFyYW1ldGVyc1xyXG5cclxuY2xhc3MgU3BlY2lhbE9mZmVyc0ZldGNoRGF0YSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxTcGVjaWFsT2ZmZXJzUHJvcHMsIHt9PiB7XHJcbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XHJcbiAgICAgICAgLy8gVGhpcyBtZXRob2QgcnVucyB3aGVuIHRoZSBjb21wb25lbnQgaXMgZmlyc3QgYWRkZWQgdG8gdGhlIHBhZ2VcclxuICAgICAgICB0aGlzLnByb3BzLnJlcXVlc3RTcGVjaWFsT2ZmZXJzKFxyXG4gICAgICAgICAgICAxMCxcclxuICAgICAgICAgICAgbnVsbCxcclxuICAgICAgICAgICAgKHR5cGVvZiB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5jYXRlZ29yeUlkID09PSAndW5kZWZpbmVkJykgPyBudWxsIDogdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuY2F0ZWdvcnlJZCxcclxuICAgICAgICAgICAgKHR5cGVvZiB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5sb2NhdGlvbklkID09PSAndW5kZWZpbmVkJykgPyBudWxsIDogdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMubG9jYXRpb25JZCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHM6IFNwZWNpYWxPZmZlcnNQcm9wcykge1xyXG4gICAgICAgIC8vIFRoaXMgbWV0aG9kIHJ1bnMgd2hlbiBpbmNvbWluZyBwcm9wcyAoZS5nLiwgcm91dGUgcGFyYW1zKSBjaGFuZ2VcclxuICAgICAgICB0aGlzLnByb3BzLnJlcXVlc3RTcGVjaWFsT2ZmZXJzKFxyXG4gICAgICAgICAgICAxMCxcclxuICAgICAgICAgICAgbnVsbCxcclxuICAgICAgICAgICAgKHR5cGVvZiB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5jYXRlZ29yeUlkID09PSAndW5kZWZpbmVkJykgPyBudWxsIDogdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuY2F0ZWdvcnlJZCxcclxuICAgICAgICAgICAgKHR5cGVvZiB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5sb2NhdGlvbklkID09PSAndW5kZWZpbmVkJykgPyBudWxsIDogdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMubG9jYXRpb25JZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgPGgxPk91ciBTcGVjaWFsIE9mZmVyczwvaDE+XHJcbiAgICAgICAgICAgICAgICA8cD5UaGlzIGNvbXBvbmVudCBkZW1vbnN0cmF0ZXMgZmV0Y2hpbmcgZGF0YSBmcm9tIHRoZSBzZXJ2ZXI8L3A+XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJTcGVjaWFsT2ZmZXJzKCl9XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJQYWdpbmF0aW9uKCl9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZW5kZXJTcGVjaWFsT2ZmZXJzKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdzcGVjaWFsb2ZmZXJzJz5cclxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLm9mZmVycy5tYXAob2ZmZXIgPT5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY2FyZCcga2V5PXtvZmZlci5pZH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3NOYW1lPSdjYXJkLWltZy10b3AnIHNyYz17b2ZmZXIuaW1hZ2VVcmx9IGFsdD17b2ZmZXIubmFtZX0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NhcmQtYm9keSc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDUgY2xhc3NOYW1lPSdjYXJkLXRpdGxlJz57b2ZmZXIubmFtZX08L2g1PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdjYXJkLXRleHQnPntvZmZlci5kZXNjcmlwdGlvbn08L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9J2J0biBidG4tcHJpbWFyeScgaHJlZj17b2ZmZXIub2ZmZXJVcmx9PkxlYXJuIE1vcmU8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlbmRlclBhZ2luYXRpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2Zvb3Rlcic+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncGFnaW5hdGlvbic+XHJcbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuZmlyc3RQYWdlVXJsICE9PSBudWxsID8gPHNwYW4+Rmlyc3QgcGFnZTwvc3Bhbj4gOiBbXX1cclxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5wcmV2UGFnZVVybCAhPT0gbnVsbCA/IDxzcGFuPlByZXYgcGFnZTwvc3Bhbj4gOiBbXX1cclxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5uZXh0UGFnZVVybCAhPT0gbnVsbCA/IDxzcGFuPk5leHQgcGFnZTwvc3Bhbj4gOiBbXX1cclxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5sYXN0UGFnZVVybCAhPT0gbnVsbCA/IDxzcGFuPkxhc3QgcGFnZTwvc3Bhbj4gOiBbXX1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsb2FkaW5nXCI+XHJcbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuaXNMb2FkaW5nID8gPHNwYW4+TG9hZGluZy4uLjwvc3Bhbj4gOiBbXX1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxyXG4gICAgKHN0YXRlOiBBcHBsaWNhdGlvblN0YXRlKSA9PiBzdGF0ZS5zcGVjaWFsT2ZmZXJzLCAvLyBTZWxlY3RzIHdoaWNoIHN0YXRlIHByb3BlcnRpZXMgYXJlIG1lcmdlZCBpbnRvIHRoZSBjb21wb25lbnQncyBwcm9wc1xyXG4gICAgU3BlY2lhbE9mZmVyc1N0YXRlLmFjdGlvbkNyZWF0b3JzICAgICAgICAgICAgICAgICAvLyBTZWxlY3RzIHdoaWNoIGFjdGlvbiBjcmVhdG9ycyBhcmUgbWVyZ2VkIGludG8gdGhlIGNvbXBvbmVudCdzIHByb3BzXHJcbikoU3BlY2lhbE9mZmVyc0ZldGNoRGF0YSkgYXMgdHlwZW9mIFNwZWNpYWxPZmZlcnNGZXRjaERhdGE7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0NsaWVudEFwcC9jb21wb25lbnRzL1NwZWNpYWxPZmZlcnMudHN4IiwiaW1wb3J0ICogYXMgU3BlY2lhbE9mZmVycyBmcm9tICcuL1NwZWNpYWxPZmZlcnMnO1xyXG5cclxuLy8gVGhlIHRvcC1sZXZlbCBzdGF0ZSBvYmplY3RcclxuZXhwb3J0IGludGVyZmFjZSBBcHBsaWNhdGlvblN0YXRlIHtcclxuICAgIHNwZWNpYWxPZmZlcnM6IFNwZWNpYWxPZmZlcnMuU3BlY2lhbE9mZmVyc1N0YXRlO1xyXG59XHJcblxyXG4vLyBXaGVuZXZlciBhbiBhY3Rpb24gaXMgZGlzcGF0Y2hlZCwgUmVkdXggd2lsbCB1cGRhdGUgZWFjaCB0b3AtbGV2ZWwgYXBwbGljYXRpb24gc3RhdGUgcHJvcGVydHkgdXNpbmdcclxuLy8gdGhlIHJlZHVjZXIgd2l0aCB0aGUgbWF0Y2hpbmcgbmFtZS4gSXQncyBpbXBvcnRhbnQgdGhhdCB0aGUgbmFtZXMgbWF0Y2ggZXhhY3RseSwgYW5kIHRoYXQgdGhlIHJlZHVjZXJcclxuLy8gYWN0cyBvbiB0aGUgY29ycmVzcG9uZGluZyBBcHBsaWNhdGlvblN0YXRlIHByb3BlcnR5IHR5cGUuXHJcbmV4cG9ydCBjb25zdCByZWR1Y2VycyA9IHtcclxuICAgIHNwZWNpYWxPZmZlcnM6IFNwZWNpYWxPZmZlcnMucmVkdWNlclxyXG59O1xyXG5cclxuLy8gVGhpcyB0eXBlIGNhbiBiZSB1c2VkIGFzIGEgaGludCBvbiBhY3Rpb24gY3JlYXRvcnMgc28gdGhhdCBpdHMgJ2Rpc3BhdGNoJyBhbmQgJ2dldFN0YXRlJyBwYXJhbXMgYXJlXHJcbi8vIGNvcnJlY3RseSB0eXBlZCB0byBtYXRjaCB5b3VyIHN0b3JlLlxyXG5leHBvcnQgaW50ZXJmYWNlIEFwcFRodW5rQWN0aW9uPFRBY3Rpb24+IHtcclxuICAgIChkaXNwYXRjaDogKGFjdGlvbjogVEFjdGlvbikgPT4gdm9pZCwgZ2V0U3RhdGU6ICgpID0+IEFwcGxpY2F0aW9uU3RhdGUpOiB2b2lkO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0NsaWVudEFwcC9zdG9yZS9pbmRleC50cyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX3Byb3BUeXBlcyA9IHJlcXVpcmUoJ3Byb3AtdHlwZXMnKTtcblxudmFyIF9wcm9wVHlwZXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcHJvcFR5cGVzKTtcblxudmFyIF9zY3JlZW5SZWFkZXJTdHlsZXMgPSByZXF1aXJlKCcuL3NjcmVlbi1yZWFkZXItc3R5bGVzJyk7XG5cbnZhciBfc2NyZWVuUmVhZGVyU3R5bGVzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3NjcmVlblJlYWRlclN0eWxlcyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhvYmosIGtleXMpIHsgdmFyIHRhcmdldCA9IHt9OyBmb3IgKHZhciBpIGluIG9iaikgeyBpZiAoa2V5cy5pbmRleE9mKGkpID49IDApIGNvbnRpbnVlOyBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGkpKSBjb250aW51ZTsgdGFyZ2V0W2ldID0gb2JqW2ldOyB9IHJldHVybiB0YXJnZXQ7IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG4vKipcbiAqIEEgUmVhY3QgY29tcG9uZW50IGZvciB0aGUgZm9udC1hd2Vzb21lIGljb24gbGlicmFyeS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gW2FyaWFMYWJlbF0gQW4gZXh0cmEgYWNjZXNzaWJpbGl0eSBsYWJlbCB0byBwdXQgb24gdGhlIGljb25cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW2JvcmRlcj1mYWxzZV0gV2hldGhlciBvciBub3QgdG8gc2hvdyBhIGJvcmRlciByYWRpdXNcbiAqIEBwYXJhbSB7U3RyaW5nfSBbY2xhc3NOYW1lXSBBbiBleHRyYSBzZXQgb2YgQ1NTIGNsYXNzZXMgdG8gYWRkIHRvIHRoZSBjb21wb25lbnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBbY3NzTW9kdWxlXSBPcHRpb24gdG8gcGFzcyBGb250QXdlc29tZSBDU1MgYXMgYSBtb2R1bGVcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW2ZpeGVkV2lkdGg9ZmFsc2VdIE1ha2UgYnV0dG9ucyBmaXhlZCB3aWR0aFxuICogQHBhcmFtIHtTdHJpbmd9IFtmbGlwPWZhbHNlXSBGbGlwIHRoZSBpY29uJ3Mgb3JpZW50YXRpb24uXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtpbnZlcnNlPWZhbHNlXUludmVyc2UgdGhlIGljb24ncyBjb2xvclxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgTmFtZSBvZiB0aGUgaWNvbiB0byB1c2VcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW3B1bHNlPWZhbHNlXSBSb3RhdGUgaWNvbiB3aXRoIDggc3RlcHMsIHJhdGhlciB0aGFuIHNtb290aGx5XG4gKiBAcGFyYW0ge051bWJlcn0gW3JvdGF0ZV0gVGhlIGRlZ3Jlc3MgdG8gcm90YXRlIHRoZSBpY29uIGJ5XG4gKiBAcGFyYW0ge1N0cmluZ30gW3NpemVdIFRoZSBpY29uIHNjYWxpbmcgc2l6ZVxuICogQHBhcmFtIHtCb29sZWFufSBbc3Bpbj1mYWxzZV0gU3BpbiB0aGUgaWNvblxuICogQHBhcmFtIHtTdHJpbmd9IFtzdGFja10gU3RhY2sgYW4gaWNvbiBvbiB0b3Agb2YgYW5vdGhlclxuICogQHBhcmFtIHtTdHJpbmd9IFt0YWc9c3Bhbl0gVGhlIEhUTUwgdGFnIHRvIHVzZSBhcyBhIHN0cmluZywgZWcgJ2knIG9yICdlbSdcbiAqIEBtb2R1bGUgRm9udEF3ZXNvbWVcbiAqIEB0eXBlIHtSZWFjdENsYXNzfVxuICovXG52YXIgRm9udEF3ZXNvbWUgPSBmdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICBfaW5oZXJpdHMoRm9udEF3ZXNvbWUsIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIEZvbnRBd2Vzb21lKCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBGb250QXdlc29tZSk7XG5cbiAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoRm9udEF3ZXNvbWUuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihGb250QXdlc29tZSkpLmNhbGwodGhpcykpO1xuXG4gICAgX3RoaXMuZGlzcGxheU5hbWUgPSAnRm9udEF3ZXNvbWUnO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhGb250QXdlc29tZSwgW3tcbiAgICBrZXk6ICdyZW5kZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICB2YXIgX3Byb3BzID0gdGhpcy5wcm9wcyxcbiAgICAgICAgICBib3JkZXIgPSBfcHJvcHMuYm9yZGVyLFxuICAgICAgICAgIGNzc01vZHVsZSA9IF9wcm9wcy5jc3NNb2R1bGUsXG4gICAgICAgICAgY2xhc3NOYW1lID0gX3Byb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICBmaXhlZFdpZHRoID0gX3Byb3BzLmZpeGVkV2lkdGgsXG4gICAgICAgICAgZmxpcCA9IF9wcm9wcy5mbGlwLFxuICAgICAgICAgIGludmVyc2UgPSBfcHJvcHMuaW52ZXJzZSxcbiAgICAgICAgICBuYW1lID0gX3Byb3BzLm5hbWUsXG4gICAgICAgICAgcHVsc2UgPSBfcHJvcHMucHVsc2UsXG4gICAgICAgICAgcm90YXRlID0gX3Byb3BzLnJvdGF0ZSxcbiAgICAgICAgICBzaXplID0gX3Byb3BzLnNpemUsXG4gICAgICAgICAgc3BpbiA9IF9wcm9wcy5zcGluLFxuICAgICAgICAgIHN0YWNrID0gX3Byb3BzLnN0YWNrLFxuICAgICAgICAgIF9wcm9wcyR0YWcgPSBfcHJvcHMudGFnLFxuICAgICAgICAgIHRhZyA9IF9wcm9wcyR0YWcgPT09IHVuZGVmaW5lZCA/ICdzcGFuJyA6IF9wcm9wcyR0YWcsXG4gICAgICAgICAgYXJpYUxhYmVsID0gX3Byb3BzLmFyaWFMYWJlbCxcbiAgICAgICAgICBwcm9wcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhfcHJvcHMsIFsnYm9yZGVyJywgJ2Nzc01vZHVsZScsICdjbGFzc05hbWUnLCAnZml4ZWRXaWR0aCcsICdmbGlwJywgJ2ludmVyc2UnLCAnbmFtZScsICdwdWxzZScsICdyb3RhdGUnLCAnc2l6ZScsICdzcGluJywgJ3N0YWNrJywgJ3RhZycsICdhcmlhTGFiZWwnXSk7XG5cbiAgICAgIHZhciBjbGFzc05hbWVzID0gW107XG5cbiAgICAgIGlmIChjc3NNb2R1bGUpIHtcbiAgICAgICAgY2xhc3NOYW1lcy5wdXNoKGNzc01vZHVsZVsnZmEnXSk7XG4gICAgICAgIGNsYXNzTmFtZXMucHVzaChjc3NNb2R1bGVbJ2ZhLScgKyBuYW1lXSk7XG4gICAgICAgIHNpemUgJiYgY2xhc3NOYW1lcy5wdXNoKGNzc01vZHVsZVsnZmEtJyArIHNpemVdKTtcbiAgICAgICAgc3BpbiAmJiBjbGFzc05hbWVzLnB1c2goY3NzTW9kdWxlWydmYS1zcGluJ10pO1xuICAgICAgICBwdWxzZSAmJiBjbGFzc05hbWVzLnB1c2goY3NzTW9kdWxlWydmYS1wdWxzZSddKTtcbiAgICAgICAgYm9yZGVyICYmIGNsYXNzTmFtZXMucHVzaChjc3NNb2R1bGVbJ2ZhLWJvcmRlciddKTtcbiAgICAgICAgZml4ZWRXaWR0aCAmJiBjbGFzc05hbWVzLnB1c2goY3NzTW9kdWxlWydmYS1mdyddKTtcbiAgICAgICAgaW52ZXJzZSAmJiBjbGFzc05hbWVzLnB1c2goY3NzTW9kdWxlWydmYS1pbnZlcnNlJ10pO1xuICAgICAgICBmbGlwICYmIGNsYXNzTmFtZXMucHVzaChjc3NNb2R1bGVbJ2ZhLWZsaXAtJyArIGZsaXBdKTtcbiAgICAgICAgcm90YXRlICYmIGNsYXNzTmFtZXMucHVzaChjc3NNb2R1bGVbJ2ZhLXJvdGF0ZS0nICsgcm90YXRlXSk7XG4gICAgICAgIHN0YWNrICYmIGNsYXNzTmFtZXMucHVzaChjc3NNb2R1bGVbJ2ZhLXN0YWNrLScgKyBzdGFja10pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2xhc3NOYW1lcy5wdXNoKCdmYScpO1xuICAgICAgICBjbGFzc05hbWVzLnB1c2goJ2ZhLScgKyBuYW1lKTtcbiAgICAgICAgc2l6ZSAmJiBjbGFzc05hbWVzLnB1c2goJ2ZhLScgKyBzaXplKTtcbiAgICAgICAgc3BpbiAmJiBjbGFzc05hbWVzLnB1c2goJ2ZhLXNwaW4nKTtcbiAgICAgICAgcHVsc2UgJiYgY2xhc3NOYW1lcy5wdXNoKCdmYS1wdWxzZScpO1xuICAgICAgICBib3JkZXIgJiYgY2xhc3NOYW1lcy5wdXNoKCdmYS1ib3JkZXInKTtcbiAgICAgICAgZml4ZWRXaWR0aCAmJiBjbGFzc05hbWVzLnB1c2goJ2ZhLWZ3Jyk7XG4gICAgICAgIGludmVyc2UgJiYgY2xhc3NOYW1lcy5wdXNoKCdmYS1pbnZlcnNlJyk7XG4gICAgICAgIGZsaXAgJiYgY2xhc3NOYW1lcy5wdXNoKCdmYS1mbGlwLScgKyBmbGlwKTtcbiAgICAgICAgcm90YXRlICYmIGNsYXNzTmFtZXMucHVzaCgnZmEtcm90YXRlLScgKyByb3RhdGUpO1xuICAgICAgICBzdGFjayAmJiBjbGFzc05hbWVzLnB1c2goJ2ZhLXN0YWNrLScgKyBzdGFjayk7XG4gICAgICB9XG5cbiAgICAgIC8vIEFkZCBhbnkgY3VzdG9tIGNsYXNzIG5hbWVzIGF0IHRoZSBlbmQuXG4gICAgICBjbGFzc05hbWUgJiYgY2xhc3NOYW1lcy5wdXNoKGNsYXNzTmFtZSk7XG4gICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQodGFnLCBfZXh0ZW5kcyh7fSwgcHJvcHMsIHsgJ2FyaWEtaGlkZGVuJzogdHJ1ZSwgY2xhc3NOYW1lOiBjbGFzc05hbWVzLmpvaW4oJyAnKSB9KSwgYXJpYUxhYmVsID8gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7IHN0eWxlOiBfc2NyZWVuUmVhZGVyU3R5bGVzMi5kZWZhdWx0IH0sIGFyaWFMYWJlbCkgOiBudWxsKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gRm9udEF3ZXNvbWU7XG59KF9yZWFjdDIuZGVmYXVsdC5Db21wb25lbnQpO1xuXG5Gb250QXdlc29tZS5wcm9wVHlwZXMgPSB7XG4gIGFyaWFMYWJlbDogX3Byb3BUeXBlczIuZGVmYXVsdC5zdHJpbmcsXG4gIGJvcmRlcjogX3Byb3BUeXBlczIuZGVmYXVsdC5ib29sLFxuICBjbGFzc05hbWU6IF9wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nLFxuICBjc3NNb2R1bGU6IF9wcm9wVHlwZXMyLmRlZmF1bHQub2JqZWN0LFxuICBmaXhlZFdpZHRoOiBfcHJvcFR5cGVzMi5kZWZhdWx0LmJvb2wsXG4gIGZsaXA6IF9wcm9wVHlwZXMyLmRlZmF1bHQub25lT2YoWydob3Jpem9udGFsJywgJ3ZlcnRpY2FsJ10pLFxuICBpbnZlcnNlOiBfcHJvcFR5cGVzMi5kZWZhdWx0LmJvb2wsXG4gIG5hbWU6IF9wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHB1bHNlOiBfcHJvcFR5cGVzMi5kZWZhdWx0LmJvb2wsXG4gIHJvdGF0ZTogX3Byb3BUeXBlczIuZGVmYXVsdC5vbmVPZihbOTAsIDE4MCwgMjcwXSksXG4gIHNpemU6IF9wcm9wVHlwZXMyLmRlZmF1bHQub25lT2YoWydsZycsICcyeCcsICczeCcsICc0eCcsICc1eCddKSxcbiAgc3BpbjogX3Byb3BUeXBlczIuZGVmYXVsdC5ib29sLFxuICBzdGFjazogX3Byb3BUeXBlczIuZGVmYXVsdC5vbmVPZihbJzF4JywgJzJ4J10pLFxuICB0YWc6IF9wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nXG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBGb250QXdlc29tZTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yZWFjdC1mb250YXdlc29tZS9saWIvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHtcbiAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gIHdpZHRoOiAnMXB4JyxcbiAgaGVpZ2h0OiAnMXB4JyxcbiAgcGFkZGluZzogJzBweCcsXG4gIG1hcmdpbjogJy0xcHgnLFxuICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gIGNsaXA6ICdyZWN0KDBweCwgMHB4LCAwcHgsIDBweCknLFxuICBib3JkZXI6ICcwcHgnXG59O1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JlYWN0LWZvbnRhd2Vzb21lL2xpYi9zY3JlZW4tcmVhZGVyLXN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygwKSkoMTQ4KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvZG9tYWluLXRhc2svaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDApKSgxNTYpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yZWR1eC10aHVuay9saWIvaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yXG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDApKSg1KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3Jcbi8vIG1vZHVsZSBpZCA9IDIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gKF9fd2VicGFja19yZXF1aXJlX18oMCkpKDc5KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcmVkdXgvbGliL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvclxuLy8gbW9kdWxlIGlkID0gMjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==