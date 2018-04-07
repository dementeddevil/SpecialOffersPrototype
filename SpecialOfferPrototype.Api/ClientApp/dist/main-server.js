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
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("./vendor");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(5);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(172);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(171);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(173);

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store__ = __webpack_require__(16);




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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Layout__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Home__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_SpecialOffers__ = __webpack_require__(15);





var routes = __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__components_Layout__["a" /* Layout */], null,
    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Route"], { exact: true, path: '/', component: __WEBPACK_IMPORTED_MODULE_3__components_Home__["a" /* Home */] }),
    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Route"], { path: '/special-offers/:categoryId?/:locationId?', component: __WEBPACK_IMPORTED_MODULE_4__components_SpecialOffers__["a" /* default */] }));


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(163);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(168);

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(170);

/***/ }),
/* 11 */
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
/* 12 */
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

var Home = /** @class */ (function (_super) {
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
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Layout; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__NavMenu__ = __webpack_require__(14);
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


var Layout = /** @class */ (function (_super) {
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
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavMenu; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_fontawesome__ = __webpack_require__(17);
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



var NavMenu = /** @class */ (function (_super) {
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
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store_SpecialOffers__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_styled_components__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_styled_components___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_styled_components__);
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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




var SpecialOfferGrid = __WEBPACK_IMPORTED_MODULE_3_styled_components___default.a.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    display: grid;\n    grid-template-columns: repeat(4, 1fr);\n    grid-gap: 1rem;\n\n    @media (max-width: 768px) {\n        grid-template-columns: 1fr;\n    }\n"], ["\n    display: grid;\n    grid-template-columns: repeat(4, 1fr);\n    grid-gap: 1rem;\n\n    @media (max-width: 768px) {\n        grid-template-columns: 1fr;\n    }\n"])));
var FooterContainer = __WEBPACK_IMPORTED_MODULE_3_styled_components___default.a.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    display: grid;\n    margin-top: 1rem;\n"], ["\n    display: grid;\n    margin-top: 1rem;\n"])));
var PaginationButtonContainer = __WEBPACK_IMPORTED_MODULE_3_styled_components___default.a.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    display: grid;\n    grid-template-columns: repeat(4, 1fr);\n    grid-gap: 1rem;\n"], ["\n    display: grid;\n    grid-template-columns: repeat(4, 1fr);\n    grid-gap: 1rem;\n"])));
function styledComponentWithProps(styledFunction) {
    return styledFunction;
}
var ColumnPositionalButton = styledComponentWithProps(__WEBPACK_IMPORTED_MODULE_3_styled_components___default.a.button)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    grid-column: ", ";\n"], ["\n    grid-column: ", ";\n"])), function (p) { return p.gridColumn; });
var SpecialOffersFetchData = /** @class */ (function (_super) {
    __extends(SpecialOffersFetchData, _super);
    function SpecialOffersFetchData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SpecialOffersFetchData.prototype.componentWillMount = function () {
        // This method runs when the component is first added to the page
        this.props.requestSpecialOffers(12, null, (typeof this.props.match.params.categoryId === 'undefined') ? null : this.props.match.params.categoryId, (typeof this.props.match.params.locationId === 'undefined') ? null : this.props.match.params.locationId);
    };
    SpecialOffersFetchData.prototype.componentWillReceiveProps = function (nextProps) {
        // This method runs when incoming props (e.g., route params) change
        this.props.requestSpecialOffers(12, null, (typeof this.props.match.params.categoryId === 'undefined') ? null : this.props.match.params.categoryId, (typeof this.props.match.params.locationId === 'undefined') ? null : this.props.match.params.locationId);
    };
    SpecialOffersFetchData.prototype.render = function () {
        return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null,
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("h1", null, "Our Special Offers"),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("p", null, "This component demonstrates fetching data from the server"),
            this.renderSpecialOffers(),
            this.renderPagination()));
    };
    SpecialOffersFetchData.prototype.gotoLinkedPage = function (pageUrl) {
        this.props.requestSpecialOfferPage(pageUrl);
    };
    SpecialOffersFetchData.prototype.renderSpecialOffers = function () {
        return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](SpecialOfferGrid, null, this.props.offers.map(function (offer) {
            return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'card', key: offer.id },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("img", { className: 'card-img-top', src: offer.imageUrl, alt: offer.name }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'card-body' },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("h5", { className: 'card-title' }, offer.name),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("p", { className: 'card-text' }, offer.description),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("a", { className: 'btn btn-primary', href: offer.offerUrl }, "Learn More")));
        })));
    };
    SpecialOffersFetchData.prototype.renderPagination = function () {
        var _this = this;
        return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](FooterContainer, null,
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](PaginationButtonContainer, null,
                this.props.firstPageUrl !== null ? __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](ColumnPositionalButton, { className: 'btn btn-outline-primary', gridColumn: 1, onClick: function () { return _this.gotoLinkedPage(_this.props.firstPageUrl); } }, "First page") : [],
                this.props.prevPageUrl !== null ? __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](ColumnPositionalButton, { className: 'btn btn-outline-primary', gridColumn: 2, onClick: function () { return _this.gotoLinkedPage(_this.props.prevPageUrl); } }, "Prev page") : [],
                this.props.nextPageUrl !== null ? __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](ColumnPositionalButton, { className: 'btn btn-outline-primary', gridColumn: 3, onClick: function () { return _this.gotoLinkedPage(_this.props.nextPageUrl); } }, "Next page") : [],
                this.props.lastPageUrl !== null ? __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](ColumnPositionalButton, { className: 'btn btn-outline-primary', gridColumn: 4, onClick: function () { return _this.gotoLinkedPage(_this.props.lastPageUrl); } }, "Last page") : []),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "loading" }, this.props.isLoading ? __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", null, "Loading...") : [])));
    };
    return SpecialOffersFetchData;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));
/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(function (state) { return state.specialOffers; }, // Selects which state properties are merged into the component's props
__WEBPACK_IMPORTED_MODULE_2__store_SpecialOffers__["a" /* actionCreators */] // Selects which action creators are merged into the component's props
)(SpecialOffersFetchData));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;


/***/ }),
/* 16 */
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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(19);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _screenReaderStyles = __webpack_require__(18);

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
/* 18 */
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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(0);

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(166);

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(174);

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(175);

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(82);

/***/ })
/******/ ])));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzlmZWQ5OTVhZGViOWMxNDEyMzciLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiLi92ZW5kb3JcIiIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0L3JlYWN0LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvciIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci1kb20vaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yIiwid2VicGFjazovLy9kZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvbGliL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvciIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci1yZWR1eC9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3IiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL3N0b3JlL1NwZWNpYWxPZmZlcnMudHMiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2NvbmZpZ3VyZVN0b3JlLnRzIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9yb3V0ZXMudHN4Iiwid2VicGFjazovLy9kZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvYXNwbmV0LXByZXJlbmRlcmluZy9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3IiLCJ3ZWJwYWNrOi8vL2RlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9oaXN0b3J5L2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvciIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0LWRvbS9zZXJ2ZXIuanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9ib290LXNlcnZlci50c3giLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2NvbXBvbmVudHMvSG9tZS50c3giLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2NvbXBvbmVudHMvTGF5b3V0LnRzeCIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvY29tcG9uZW50cy9OYXZNZW51LnRzeCIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvY29tcG9uZW50cy9TcGVjaWFsT2ZmZXJzLnRzeCIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvc3RvcmUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1mb250YXdlc29tZS9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1mb250YXdlc29tZS9saWIvc2NyZWVuLXJlYWRlci1zdHlsZXMuanMiLCJ3ZWJwYWNrOi8vL2RlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvciIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL2RvbWFpbi10YXNrL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvciIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlZHV4LXRodW5rL2xpYi9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3IiLCJ3ZWJwYWNrOi8vL2RlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9zdHlsZWQtY29tcG9uZW50cy9saWIvaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yIiwid2VicGFjazovLy9kZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcmVkdXgvbGliL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvciJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7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LENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DOzs7Ozs7QUNmQSw2Qzs7Ozs7O0FDQUEsK0M7Ozs7OztBQ0FBLCtDOzs7Ozs7QUNBQSwrQzs7Ozs7O0FDQUEsOEMiLCJmaWxlIjoibWFpbi1zZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcImRpc3QvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGM5ZmVkOTk1YWRlYjljMTQxMjM3IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi92ZW5kb3JcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCIuL3ZlbmRvclwiXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gKF9fd2VicGFja19yZXF1aXJlX18oMCkpKDUpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yZWFjdC9yZWFjdC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3Jcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygwKSkoMTcyKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyLWRvbS9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3Jcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygwKSkoMTcxKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvbGliL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvclxuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDApKSgxNzMpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXItcmVkdXgvaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IGZldGNoLCBhZGRUYXNrIH0gZnJvbSAnZG9tYWluLXRhc2snO1xyXG5pbXBvcnQgeyBBY3Rpb24sIFJlZHVjZXIsIEFjdGlvbkNyZWF0b3IgfSBmcm9tICdyZWR1eCc7XHJcbmltcG9ydCB7IEFwcFRodW5rQWN0aW9uIH0gZnJvbSAnLi8nO1xyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gU1RBVEUgLSBUaGlzIGRlZmluZXMgdGhlIHR5cGUgb2YgZGF0YSBtYWludGFpbmVkIGluIHRoZSBSZWR1eCBzdG9yZS5cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU3BlY2lhbE9mZmVyc1N0YXRlIHtcclxuICAgIGlzTG9hZGluZzogYm9vbGVhbjtcclxuICAgIHBhZ2VTaXplOiBudW1iZXI7XHJcbiAgICBmaWx0ZXI6IHN0cmluZyB8IG51bGw7XHJcbiAgICBjYXRlZ29yeUlkOiBzdHJpbmcgfCBudWxsO1xyXG4gICAgbG9jYXRpb25JZDogc3RyaW5nIHwgbnVsbDtcclxuICAgIHBhZ2VVcmw6IHN0cmluZyB8IG51bGw7XHJcbiAgICBvZmZlcnM6IElTcGVjaWFsT2ZmZXJbXTtcclxuICAgIHRvdGFsUmVzdWx0czogbnVtYmVyO1xyXG4gICAgdG90YWxQYWdlczogbnVtYmVyO1xyXG4gICAgcGFnZTogbnVtYmVyO1xyXG4gICAgZmlyc3RQYWdlVXJsOiBzdHJpbmcgfCBudWxsO1xyXG4gICAgcHJldlBhZ2VVcmw6IHN0cmluZyB8IG51bGw7XHJcbiAgICBuZXh0UGFnZVVybDogc3RyaW5nIHwgbnVsbDtcclxuICAgIGxhc3RQYWdlVXJsOiBzdHJpbmcgfCBudWxsO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElTcGVjaWFsT2ZmZXIge1xyXG4gICAgaWQ6IHN0cmluZztcclxuICAgIGNhdGVnb3J5SWQ6IHN0cmluZztcclxuICAgIGNvdW50eUlkOiBzdHJpbmc7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gICAgaW1hZ2VVcmw6IHN0cmluZztcclxuICAgIG9mZmVyVXJsOiBzdHJpbmc7XHJcbiAgICB2YWxpZFVudGlsOiBEYXRlO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElIYWxMaW5rIHtcclxuICAgIGhyZWY6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJU3BlY2lhbE9mZmVyc0hhbCB7XHJcbiAgICB0b3RhbFJlc3VsdHM6IG51bWJlcjtcclxuICAgIHRvdGFsUGFnZXM6IG51bWJlcjtcclxuICAgIHBhZ2U6IG51bWJlcjtcclxuICAgIHJlc291cmNlTGlzdDogYW55W10gfCBudWxsO1xyXG4gICAgX2xpbmtzOiB7XHJcbiAgICAgICAgW2tleTogc3RyaW5nXTogSUhhbExpbms7XHJcbiAgICB9O1xyXG4gICAgX2VtYmVkZGVkOiB7XHJcbiAgICAgICAgXCJzcGVjaWFsLW9mZmVyXCI6IElTcGVjaWFsT2ZmZXJbXTtcclxuICAgIH07XHJcbn1cclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vIEFDVElPTlMgLSBUaGVzZSBhcmUgc2VyaWFsaXphYmxlIChoZW5jZSByZXBsYXlhYmxlKSBkZXNjcmlwdGlvbnMgb2Ygc3RhdGUgdHJhbnNpdGlvbnMuXHJcbi8vIFRoZXkgZG8gbm90IHRoZW1zZWx2ZXMgaGF2ZSBhbnkgc2lkZS1lZmZlY3RzOyB0aGV5IGp1c3QgZGVzY3JpYmUgc29tZXRoaW5nIHRoYXQgaXMgZ29pbmcgdG8gaGFwcGVuLlxyXG5cclxuaW50ZXJmYWNlIFJlcXVlc3RTcGVjaWFsT2ZmZXJzQWN0aW9uIHtcclxuICAgIHR5cGU6ICdSRVFVRVNUX1NQRUNJQUxfT0ZGRVJTJztcclxuICAgIHBhZ2VTaXplOiBudW1iZXI7XHJcbiAgICBmaWx0ZXI6IHN0cmluZyB8IG51bGw7XHJcbiAgICBjYXRlZ29yeUlkOiBzdHJpbmcgfCBudWxsO1xyXG4gICAgbG9jYXRpb25JZDogc3RyaW5nIHwgbnVsbDtcclxufVxyXG5cclxuaW50ZXJmYWNlIFJlY2VpdmVTcGVjaWFsT2ZmZXJzQWN0aW9uIHtcclxuICAgIHR5cGU6ICdSRUNFSVZFX1NQRUNJQUxfT0ZGRVJTJztcclxuICAgIHBhZ2VVcmw6IHN0cmluZztcclxuICAgIHBhZ2VTaXplOiBudW1iZXI7XHJcbiAgICBmaWx0ZXI6IHN0cmluZyB8IG51bGw7XHJcbiAgICBjYXRlZ29yeUlkOiBzdHJpbmcgfCBudWxsO1xyXG4gICAgbG9jYXRpb25JZDogc3RyaW5nIHwgbnVsbDtcclxuICAgIG9mZmVyczogSVNwZWNpYWxPZmZlcltdO1xyXG4gICAgdG90YWxSZXN1bHRzOiBudW1iZXI7XHJcbiAgICB0b3RhbFBhZ2VzOiBudW1iZXI7XHJcbiAgICBwYWdlOiBudW1iZXI7XHJcbiAgICBmaXJzdFBhZ2VVcmw6IHN0cmluZyB8IG51bGw7XHJcbiAgICBwcmV2UGFnZVVybDogc3RyaW5nIHwgbnVsbDtcclxuICAgIG5leHRQYWdlVXJsOiBzdHJpbmcgfCBudWxsO1xyXG4gICAgbGFzdFBhZ2VVcmw6IHN0cmluZyB8IG51bGw7XHJcbn1cclxuXHJcbmludGVyZmFjZSBSZXF1ZXN0U3BlY2lhbE9mZmVyc1BhZ2VBY3Rpb24ge1xyXG4gICAgdHlwZTogJ1JFUVVFU1RfU1BFQ0lBTF9PRkZFUlNfUEFHRSc7XHJcbiAgICBwYWdlVXJsOiBzdHJpbmcgfCBudWxsO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgUmVjZWl2ZVNwZWNpYWxPZmZlcnNQYWdlQWN0aW9uIHtcclxuICAgIHR5cGU6ICdSRUNFSVZFX1NQRUNJQUxfT0ZGRVJTX1BBR0UnO1xyXG4gICAgcGFnZVVybDogc3RyaW5nO1xyXG4gICAgb2ZmZXJzOiBJU3BlY2lhbE9mZmVyW107XHJcbiAgICB0b3RhbFJlc3VsdHM6IG51bWJlcjtcclxuICAgIHRvdGFsUGFnZXM6IG51bWJlcjtcclxuICAgIHBhZ2U6IG51bWJlcjtcclxuICAgIGZpcnN0UGFnZVVybDogc3RyaW5nIHwgbnVsbDtcclxuICAgIHByZXZQYWdlVXJsOiBzdHJpbmcgfCBudWxsO1xyXG4gICAgbmV4dFBhZ2VVcmw6IHN0cmluZyB8IG51bGw7XHJcbiAgICBsYXN0UGFnZVVybDogc3RyaW5nIHwgbnVsbDtcclxufVxyXG5cclxuLy8gRGVjbGFyZSBhICdkaXNjcmltaW5hdGVkIHVuaW9uJyB0eXBlLiBUaGlzIGd1YXJhbnRlZXMgdGhhdCBhbGwgcmVmZXJlbmNlcyB0byAndHlwZScgcHJvcGVydGllcyBjb250YWluIG9uZSBvZiB0aGVcclxuLy8gZGVjbGFyZWQgdHlwZSBzdHJpbmdzIChhbmQgbm90IGFueSBvdGhlciBhcmJpdHJhcnkgc3RyaW5nKS5cclxudHlwZSBLbm93bkFjdGlvbiA9XHJcbiAgICBSZXF1ZXN0U3BlY2lhbE9mZmVyc0FjdGlvbiB8XHJcbiAgICBSZWNlaXZlU3BlY2lhbE9mZmVyc0FjdGlvbiB8XHJcbiAgICBSZXF1ZXN0U3BlY2lhbE9mZmVyc1BhZ2VBY3Rpb24gfFxyXG4gICAgUmVjZWl2ZVNwZWNpYWxPZmZlcnNQYWdlQWN0aW9uO1xyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyBBQ1RJT04gQ1JFQVRPUlMgLSBUaGVzZSBhcmUgZnVuY3Rpb25zIGV4cG9zZWQgdG8gVUkgY29tcG9uZW50cyB0aGF0IHdpbGwgdHJpZ2dlciBhIHN0YXRlIHRyYW5zaXRpb24uXHJcbi8vIFRoZXkgZG9uJ3QgZGlyZWN0bHkgbXV0YXRlIHN0YXRlLCBidXQgdGhleSBjYW4gaGF2ZSBleHRlcm5hbCBzaWRlLWVmZmVjdHMgKHN1Y2ggYXMgbG9hZGluZyBkYXRhKS5cclxuXHJcbmV4cG9ydCBjb25zdCBhY3Rpb25DcmVhdG9ycyA9IHtcclxuICAgIHJlcXVlc3RTcGVjaWFsT2ZmZXJzOiAoXHJcbiAgICAgICAgcGFnZVNpemU6IG51bWJlciA9IDEwLFxyXG4gICAgICAgIGZpbHRlcjogc3RyaW5nIHwgbnVsbCxcclxuICAgICAgICBjYXRlZ29yeUlkOiBzdHJpbmcgfCBudWxsLFxyXG4gICAgICAgIGxvY2F0aW9uSWQ6IHN0cmluZyB8IG51bGwpOiBBcHBUaHVua0FjdGlvbjxLbm93bkFjdGlvbj4gPT5cclxuICAgICAgICAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAvLyBPbmx5IGxvYWQgZGF0YSBpZiBpdCdzIHNvbWV0aGluZyB3ZSBkb24ndCBhbHJlYWR5IGhhdmUgKGFuZCBhcmUgbm90IGFscmVhZHkgbG9hZGluZylcclxuICAgICAgICAgICAgaWYgKHBhZ2VTaXplICE9PSBnZXRTdGF0ZSgpLnNwZWNpYWxPZmZlcnMucGFnZVNpemUgfHxcclxuICAgICAgICAgICAgICAgIGZpbHRlciAhPT0gZ2V0U3RhdGUoKS5zcGVjaWFsT2ZmZXJzLmZpbHRlciB8fFxyXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnlJZCAhPT0gZ2V0U3RhdGUoKS5zcGVjaWFsT2ZmZXJzLmNhdGVnb3J5SWQgfHxcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uSWQgIT09IGdldFN0YXRlKCkuc3BlY2lhbE9mZmVycy5sb2NhdGlvbklkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQnVpbGQgcmVxdWVzdCBVUklcclxuICAgICAgICAgICAgICAgIHZhciB1cmkgPSAnYXBpL3NwZWNpYWwtb2ZmZXJzJztcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY2F0ZWdvcnlJZCAhPT0gbnVsbCAmJiBjYXRlZ29yeUlkLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB1cmkgKz0gYC9jYXRlZ29yeS8ke2NhdGVnb3J5SWR9YDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxvY2F0aW9uSWQgIT09IG51bGwgJiYgbG9jYXRpb25JZC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVyaSArPSBgL2xvY2F0aW9uLyR7bG9jYXRpb25JZH1gO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB1cmkgKz0gYD9wYWdlSW5kZXg9MSZwYWdlU2l6ZT0ke3BhZ2VTaXplfWA7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlciAhPT0gbnVsbCAmJiBmaWx0ZXIubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVyaSArPSBgJmZpbHRlcj0ke2ZpbHRlcn1gO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBmZXRjaFRhc2sgPSBmZXRjaCh1cmkpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpIGFzIFByb21pc2U8SVNwZWNpYWxPZmZlcnNIYWw+KVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnUkVDRUlWRV9TUEVDSUFMX09GRkVSUycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWdlVXJsOiB1cmksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWdlU2l6ZTogcGFnZVNpemUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXI6IGZpbHRlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5SWQ6IGNhdGVnb3J5SWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbklkOiBsb2NhdGlvbklkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2ZmZXJzOiBkYXRhLl9lbWJlZGRlZFtcInNwZWNpYWwtb2ZmZXJcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3RhbFJlc3VsdHM6IGRhdGEudG90YWxSZXN1bHRzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG90YWxQYWdlczogZGF0YS50b3RhbFBhZ2VzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFnZTogZGF0YS5wYWdlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RQYWdlVXJsOiAodHlwZW9mIGRhdGEuX2xpbmtzW1wiZmlyc3RcIl0gIT09ICd1bmRlZmluZWQnKSA/IGRhdGEuX2xpbmtzW1wiZmlyc3RcIl0uaHJlZiA6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2UGFnZVVybDogKHR5cGVvZiBkYXRhLl9saW5rc1tcInByZXZcIl0gIT09ICd1bmRlZmluZWQnKSA/IGRhdGEuX2xpbmtzW1wicHJldlwiXS5ocmVmIDogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRQYWdlVXJsOiAodHlwZW9mIGRhdGEuX2xpbmtzW1wibmV4dFwiXSAhPT0gJ3VuZGVmaW5lZCcpID8gZGF0YS5fbGlua3NbXCJuZXh0XCJdLmhyZWYgOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFBhZ2VVcmw6ICh0eXBlb2YgZGF0YS5fbGlua3NbXCJsYXN0XCJdICE9PSAndW5kZWZpbmVkJykgPyBkYXRhLl9saW5rc1tcImxhc3RcIl0uaHJlZiA6IG51bGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgYWRkVGFzayhmZXRjaFRhc2spOyAvLyBFbnN1cmUgc2VydmVyLXNpZGUgcHJlcmVuZGVyaW5nIHdhaXRzIGZvciB0aGlzIHRvIGNvbXBsZXRlXHJcbiAgICAgICAgICAgICAgICBkaXNwYXRjaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ1JFUVVFU1RfU1BFQ0lBTF9PRkZFUlMnLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VTaXplOiBwYWdlU2l6ZSxcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXI6IGZpbHRlcixcclxuICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeUlkOiBjYXRlZ29yeUlkLFxyXG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uSWQ6IGxvY2F0aW9uSWRcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgIHJlcXVlc3RTcGVjaWFsT2ZmZXJQYWdlOiAocGFnZVVyaTogc3RyaW5nIHwgbnVsbCk6IEFwcFRodW5rQWN0aW9uPEtub3duQWN0aW9uPiA9PlxyXG4gICAgICAgIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcclxuICAgICAgICAgICAgLy8gT25seSBsb2FkIGRhdGEgaWYgcGFnZSBVUkkgaXMgYm90aCB2YWxpZCBhbmQgZGlmZmVyZW50IGZyb20gY3VycmVudFxyXG4gICAgICAgICAgICBpZiAocGFnZVVyaSAhPT0gbnVsbCAmJlxyXG4gICAgICAgICAgICAgICAgcGFnZVVyaSAhPT0gZ2V0U3RhdGUoKS5zcGVjaWFsT2ZmZXJzLnBhZ2VVcmwpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZmV0Y2hUYXNrID0gZmV0Y2gocGFnZVVyaSlcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkgYXMgUHJvbWlzZTxJU3BlY2lhbE9mZmVyc0hhbD4pXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdSRUNFSVZFX1NQRUNJQUxfT0ZGRVJTX1BBR0UnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFnZVVybDogcGFnZVVyaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9mZmVyczogZGF0YS5fZW1iZWRkZWRbXCJzcGVjaWFsLW9mZmVyXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG90YWxSZXN1bHRzOiBkYXRhLnRvdGFsUmVzdWx0cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdGFsUGFnZXM6IGRhdGEudG90YWxQYWdlcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2U6IGRhdGEucGFnZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0UGFnZVVybDogKHR5cGVvZiBkYXRhLl9saW5rc1tcImZpcnN0XCJdICE9PSAndW5kZWZpbmVkJykgPyBkYXRhLl9saW5rc1tcImZpcnN0XCJdLmhyZWYgOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldlBhZ2VVcmw6ICh0eXBlb2YgZGF0YS5fbGlua3NbXCJwcmV2XCJdICE9PSAndW5kZWZpbmVkJykgPyBkYXRhLl9saW5rc1tcInByZXZcIl0uaHJlZiA6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0UGFnZVVybDogKHR5cGVvZiBkYXRhLl9saW5rc1tcIm5leHRcIl0gIT09ICd1bmRlZmluZWQnKSA/IGRhdGEuX2xpbmtzW1wibmV4dFwiXS5ocmVmIDogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RQYWdlVXJsOiAodHlwZW9mIGRhdGEuX2xpbmtzW1wibGFzdFwiXSAhPT0gJ3VuZGVmaW5lZCcpID8gZGF0YS5fbGlua3NbXCJsYXN0XCJdLmhyZWYgOiBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGFkZFRhc2soZmV0Y2hUYXNrKTsgLy8gRW5zdXJlIHNlcnZlci1zaWRlIHByZXJlbmRlcmluZyB3YWl0cyBmb3IgdGhpcyB0byBjb21wbGV0ZVxyXG4gICAgICAgICAgICAgICAgZGlzcGF0Y2goe1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdSRVFVRVNUX1NQRUNJQUxfT0ZGRVJTX1BBR0UnLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VVcmw6IHBhZ2VVcmlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG59O1xyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyBSRURVQ0VSIC0gRm9yIGEgZ2l2ZW4gc3RhdGUgYW5kIGFjdGlvbiwgcmV0dXJucyB0aGUgbmV3IHN0YXRlLiBUbyBzdXBwb3J0IHRpbWUgdHJhdmVsLCB0aGlzIG11c3Qgbm90IG11dGF0ZSB0aGUgb2xkIHN0YXRlLlxyXG5cclxuY29uc3QgdW5sb2FkZWRTdGF0ZTogU3BlY2lhbE9mZmVyc1N0YXRlID0ge1xyXG4gICAgaXNMb2FkaW5nOiBmYWxzZSxcclxuICAgIHBhZ2VTaXplOiAwLFxyXG4gICAgcGFnZVVybDogbnVsbCxcclxuICAgIGZpbHRlcjogbnVsbCxcclxuICAgIGNhdGVnb3J5SWQ6IG51bGwsXHJcbiAgICBsb2NhdGlvbklkOiBudWxsLFxyXG4gICAgb2ZmZXJzOiBbXSxcclxuICAgIHRvdGFsUmVzdWx0czogMCxcclxuICAgIHRvdGFsUGFnZXM6IDAsXHJcbiAgICBwYWdlOiAwLFxyXG4gICAgZmlyc3RQYWdlVXJsOiBudWxsLFxyXG4gICAgcHJldlBhZ2VVcmw6IG51bGwsXHJcbiAgICBuZXh0UGFnZVVybDogbnVsbCxcclxuICAgIGxhc3RQYWdlVXJsOiBudWxsXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgcmVkdWNlcjogUmVkdWNlcjxTcGVjaWFsT2ZmZXJzU3RhdGU+ID0gKHN0YXRlOiBTcGVjaWFsT2ZmZXJzU3RhdGUsIGluY29taW5nQWN0aW9uOiBBY3Rpb24pID0+IHtcclxuICAgIGNvbnN0IGFjdGlvbiA9IGluY29taW5nQWN0aW9uIGFzIEtub3duQWN0aW9uO1xyXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xyXG4gICAgICAgIGNhc2UgJ1JFUVVFU1RfU1BFQ0lBTF9PRkZFUlMnOlxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgcGFnZVNpemU6IGFjdGlvbi5wYWdlU2l6ZSxcclxuICAgICAgICAgICAgICAgIGZpbHRlcjogYWN0aW9uLmZpbHRlcixcclxuICAgICAgICAgICAgICAgIGNhdGVnb3J5SWQ6IGFjdGlvbi5jYXRlZ29yeUlkLFxyXG4gICAgICAgICAgICAgICAgbG9jYXRpb25JZDogYWN0aW9uLmxvY2F0aW9uSWQsXHJcbiAgICAgICAgICAgICAgICBwYWdlVXJsOiBzdGF0ZS5wYWdlVXJsLFxyXG4gICAgICAgICAgICAgICAgb2ZmZXJzOiBzdGF0ZS5vZmZlcnMsXHJcbiAgICAgICAgICAgICAgICB0b3RhbFJlc3VsdHM6IHN0YXRlLnRvdGFsUmVzdWx0cyxcclxuICAgICAgICAgICAgICAgIHRvdGFsUGFnZXM6IHN0YXRlLnRvdGFsUGFnZXMsXHJcbiAgICAgICAgICAgICAgICBwYWdlOiBzdGF0ZS5wYWdlLFxyXG4gICAgICAgICAgICAgICAgZmlyc3RQYWdlVXJsOiBzdGF0ZS5maXJzdFBhZ2VVcmwsXHJcbiAgICAgICAgICAgICAgICBwcmV2UGFnZVVybDogc3RhdGUucHJldlBhZ2VVcmwsXHJcbiAgICAgICAgICAgICAgICBuZXh0UGFnZVVybDogc3RhdGUubmV4dFBhZ2VVcmwsXHJcbiAgICAgICAgICAgICAgICBsYXN0UGFnZVVybDogc3RhdGUubGFzdFBhZ2VVcmwsXHJcbiAgICAgICAgICAgICAgICBpc0xvYWRpbmc6IHRydWVcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICBjYXNlICdSRUNFSVZFX1NQRUNJQUxfT0ZGRVJTJzpcclxuICAgICAgICAgICAgLy8gT25seSBhY2NlcHQgdGhlIGluY29taW5nIGRhdGEgaWYgaXQgbWF0Y2hlcyB0aGUgbW9zdCByZWNlbnQgcmVxdWVzdC4gVGhpcyBlbnN1cmVzIHdlIGNvcnJlY3RseVxyXG4gICAgICAgICAgICAvLyBoYW5kbGUgb3V0LW9mLW9yZGVyIHJlc3BvbnNlcy5cclxuICAgICAgICAgICAgaWYgKGFjdGlvbi5wYWdlU2l6ZSA9PT0gc3RhdGUucGFnZVNpemUgJiZcclxuICAgICAgICAgICAgICAgIGFjdGlvbi5maWx0ZXIgPT09IHN0YXRlLmZpbHRlciAmJlxyXG4gICAgICAgICAgICAgICAgYWN0aW9uLmNhdGVnb3J5SWQgPT09IHN0YXRlLmNhdGVnb3J5SWQgJiZcclxuICAgICAgICAgICAgICAgIGFjdGlvbi5sb2NhdGlvbklkID09PSBzdGF0ZS5sb2NhdGlvbklkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VTaXplOiBhY3Rpb24ucGFnZVNpemUsXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyOiBhY3Rpb24uZmlsdGVyLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5SWQ6IGFjdGlvbi5jYXRlZ29yeUlkLFxyXG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uSWQ6IGFjdGlvbi5sb2NhdGlvbklkLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VVcmw6IGFjdGlvbi5wYWdlVXJsLFxyXG4gICAgICAgICAgICAgICAgICAgIG9mZmVyczogYWN0aW9uLm9mZmVycyxcclxuICAgICAgICAgICAgICAgICAgICB0b3RhbFJlc3VsdHM6IGFjdGlvbi50b3RhbFJlc3VsdHMsXHJcbiAgICAgICAgICAgICAgICAgICAgdG90YWxQYWdlczogYWN0aW9uLnRvdGFsUGFnZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZTogYWN0aW9uLnBhZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RQYWdlVXJsOiBhY3Rpb24uZmlyc3RQYWdlVXJsLFxyXG4gICAgICAgICAgICAgICAgICAgIHByZXZQYWdlVXJsOiBhY3Rpb24ucHJldlBhZ2VVcmwsXHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dFBhZ2VVcmw6IGFjdGlvbi5uZXh0UGFnZVVybCxcclxuICAgICAgICAgICAgICAgICAgICBsYXN0UGFnZVVybDogYWN0aW9uLmxhc3RQYWdlVXJsLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzTG9hZGluZzogZmFsc2VcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnUkVRVUVTVF9TUEVDSUFMX09GRkVSU19QQUdFJzpcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHBhZ2VVcmw6IGFjdGlvbi5wYWdlVXJsLFxyXG4gICAgICAgICAgICAgICAgcGFnZVNpemU6IHN0YXRlLnBhZ2VTaXplLFxyXG4gICAgICAgICAgICAgICAgZmlsdGVyOiBzdGF0ZS5maWx0ZXIsXHJcbiAgICAgICAgICAgICAgICBjYXRlZ29yeUlkOiBzdGF0ZS5jYXRlZ29yeUlkLFxyXG4gICAgICAgICAgICAgICAgbG9jYXRpb25JZDogc3RhdGUubG9jYXRpb25JZCxcclxuICAgICAgICAgICAgICAgIG9mZmVyczogc3RhdGUub2ZmZXJzLFxyXG4gICAgICAgICAgICAgICAgdG90YWxSZXN1bHRzOiBzdGF0ZS50b3RhbFJlc3VsdHMsXHJcbiAgICAgICAgICAgICAgICB0b3RhbFBhZ2VzOiBzdGF0ZS50b3RhbFBhZ2VzLFxyXG4gICAgICAgICAgICAgICAgcGFnZTogc3RhdGUucGFnZSxcclxuICAgICAgICAgICAgICAgIGZpcnN0UGFnZVVybDogc3RhdGUuZmlyc3RQYWdlVXJsLFxyXG4gICAgICAgICAgICAgICAgcHJldlBhZ2VVcmw6IHN0YXRlLnByZXZQYWdlVXJsLFxyXG4gICAgICAgICAgICAgICAgbmV4dFBhZ2VVcmw6IHN0YXRlLm5leHRQYWdlVXJsLFxyXG4gICAgICAgICAgICAgICAgbGFzdFBhZ2VVcmw6IHN0YXRlLmxhc3RQYWdlVXJsLFxyXG4gICAgICAgICAgICAgICAgaXNMb2FkaW5nOiB0cnVlXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgY2FzZSAnUkVDRUlWRV9TUEVDSUFMX09GRkVSU19QQUdFJzpcclxuICAgICAgICAgICAgLy8gT25seSBhY2NlcHQgdGhlIGluY29taW5nIGRhdGEgaWYgaXQgbWF0Y2hlcyB0aGUgbW9zdCByZWNlbnQgcmVxdWVzdC4gVGhpcyBlbnN1cmVzIHdlIGNvcnJlY3RseVxyXG4gICAgICAgICAgICAvLyBoYW5kbGUgb3V0LW9mLW9yZGVyIHJlc3BvbnNlcy5cclxuICAgICAgICAgICAgaWYgKGFjdGlvbi5wYWdlVXJsID09PSBzdGF0ZS5wYWdlVXJsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VVcmw6IGFjdGlvbi5wYWdlVXJsLFxyXG4gICAgICAgICAgICAgICAgICAgIG9mZmVyczogYWN0aW9uLm9mZmVycyxcclxuICAgICAgICAgICAgICAgICAgICB0b3RhbFJlc3VsdHM6IGFjdGlvbi50b3RhbFJlc3VsdHMsXHJcbiAgICAgICAgICAgICAgICAgICAgdG90YWxQYWdlczogYWN0aW9uLnRvdGFsUGFnZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZTogYWN0aW9uLnBhZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RQYWdlVXJsOiBhY3Rpb24uZmlyc3RQYWdlVXJsLFxyXG4gICAgICAgICAgICAgICAgICAgIHByZXZQYWdlVXJsOiBhY3Rpb24ucHJldlBhZ2VVcmwsXHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dFBhZ2VVcmw6IGFjdGlvbi5uZXh0UGFnZVVybCxcclxuICAgICAgICAgICAgICAgICAgICBsYXN0UGFnZVVybDogYWN0aW9uLmxhc3RQYWdlVXJsLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VTaXplOiBzdGF0ZS5wYWdlU2l6ZSxcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXI6IHN0YXRlLmZpbHRlcixcclxuICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeUlkOiBzdGF0ZS5jYXRlZ29yeUlkLFxyXG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uSWQ6IHN0YXRlLmxvY2F0aW9uSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgaXNMb2FkaW5nOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAvLyBUaGUgZm9sbG93aW5nIGxpbmUgZ3VhcmFudGVlcyB0aGF0IGV2ZXJ5IGFjdGlvbiBpbiB0aGUgS25vd25BY3Rpb24gdW5pb24gaGFzIGJlZW4gY292ZXJlZCBieSBhIGNhc2UgYWJvdmVcclxuICAgICAgICAgICAgY29uc3QgZXhoYXVzdGl2ZUNoZWNrOiBuZXZlciA9IGFjdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc3RhdGUgfHwgdW5sb2FkZWRTdGF0ZTtcclxufTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQ2xpZW50QXBwL3N0b3JlL1NwZWNpYWxPZmZlcnMudHMiLCJpbXBvcnQgeyBjcmVhdGVTdG9yZSwgYXBwbHlNaWRkbGV3YXJlLCBjb21wb3NlLCBjb21iaW5lUmVkdWNlcnMsIEdlbmVyaWNTdG9yZUVuaGFuY2VyLCBTdG9yZSwgU3RvcmVFbmhhbmNlclN0b3JlQ3JlYXRvciwgUmVkdWNlcnNNYXBPYmplY3QgfSBmcm9tICdyZWR1eCc7XHJcbmltcG9ydCB0aHVuayBmcm9tICdyZWR1eC10aHVuayc7XHJcbmltcG9ydCB7IHJvdXRlclJlZHVjZXIsIHJvdXRlck1pZGRsZXdhcmUgfSBmcm9tICdyZWFjdC1yb3V0ZXItcmVkdXgnO1xyXG5pbXBvcnQgKiBhcyBTdG9yZU1vZHVsZSBmcm9tICcuL3N0b3JlJztcclxuaW1wb3J0IHsgQXBwbGljYXRpb25TdGF0ZSwgcmVkdWNlcnMgfSBmcm9tICcuL3N0b3JlJztcclxuaW1wb3J0IHsgSGlzdG9yeSB9IGZyb20gJ2hpc3RvcnknO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29uZmlndXJlU3RvcmUoaGlzdG9yeTogSGlzdG9yeSwgaW5pdGlhbFN0YXRlPzogQXBwbGljYXRpb25TdGF0ZSkge1xyXG4gICAgLy8gQnVpbGQgbWlkZGxld2FyZS4gVGhlc2UgYXJlIGZ1bmN0aW9ucyB0aGF0IGNhbiBwcm9jZXNzIHRoZSBhY3Rpb25zIGJlZm9yZSB0aGV5IHJlYWNoIHRoZSBzdG9yZS5cclxuICAgIGNvbnN0IHdpbmRvd0lmRGVmaW5lZCA9IHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnID8gbnVsbCA6IHdpbmRvdyBhcyBhbnk7XHJcblxyXG4gICAgLy8gSWYgZGV2VG9vbHMgaXMgaW5zdGFsbGVkLCBjb25uZWN0IHRvIGl0XHJcbiAgICBjb25zdCBkZXZUb29sc0V4dGVuc2lvbiA9IHdpbmRvd0lmRGVmaW5lZCAmJiB3aW5kb3dJZkRlZmluZWQuX19SRURVWF9ERVZUT09MU19FWFRFTlNJT05fXyBhcyAoKSA9PiBHZW5lcmljU3RvcmVFbmhhbmNlcjtcclxuICAgIGNvbnN0IGNyZWF0ZVN0b3JlV2l0aE1pZGRsZXdhcmUgPSBjb21wb3NlPFN0b3JlRW5oYW5jZXJTdG9yZUNyZWF0b3I8YW55Pj4oXHJcbiAgICAgICAgYXBwbHlNaWRkbGV3YXJlKHRodW5rLCByb3V0ZXJNaWRkbGV3YXJlKGhpc3RvcnkpKSxcclxuICAgICAgICBkZXZUb29sc0V4dGVuc2lvbiA/IGRldlRvb2xzRXh0ZW5zaW9uKCkgOiA8Uz4obmV4dDogU3RvcmVFbmhhbmNlclN0b3JlQ3JlYXRvcjxTPikgPT4gbmV4dFxyXG4gICAgKShjcmVhdGVTdG9yZSk7XHJcblxyXG4gICAgLy8gQ29tYmluZSBhbGwgcmVkdWNlcnMgYW5kIGluc3RhbnRpYXRlIHRoZSBhcHAtd2lkZSBzdG9yZSBpbnN0YW5jZVxyXG4gICAgY29uc3QgYWxsUmVkdWNlcnMgPSBidWlsZFJvb3RSZWR1Y2VyKHJlZHVjZXJzKTtcclxuICAgIGNvbnN0IHN0b3JlID0gY3JlYXRlU3RvcmVXaXRoTWlkZGxld2FyZShhbGxSZWR1Y2VycywgaW5pdGlhbFN0YXRlKSBhcyBTdG9yZTxBcHBsaWNhdGlvblN0YXRlPjtcclxuXHJcbiAgICAvLyBFbmFibGUgV2VicGFjayBob3QgbW9kdWxlIHJlcGxhY2VtZW50IGZvciByZWR1Y2Vyc1xyXG4gICAgaWYgKG1vZHVsZS5ob3QpIHtcclxuICAgICAgICBtb2R1bGUuaG90LmFjY2VwdCgnLi9zdG9yZScsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbmV4dFJvb3RSZWR1Y2VyID0gcmVxdWlyZTx0eXBlb2YgU3RvcmVNb2R1bGU+KCcuL3N0b3JlJyk7XHJcbiAgICAgICAgICAgIHN0b3JlLnJlcGxhY2VSZWR1Y2VyKGJ1aWxkUm9vdFJlZHVjZXIobmV4dFJvb3RSZWR1Y2VyLnJlZHVjZXJzKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHN0b3JlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBidWlsZFJvb3RSZWR1Y2VyKGFsbFJlZHVjZXJzOiBSZWR1Y2Vyc01hcE9iamVjdCkge1xyXG4gICAgcmV0dXJuIGNvbWJpbmVSZWR1Y2VyczxBcHBsaWNhdGlvblN0YXRlPihPYmplY3QuYXNzaWduKHt9LCBhbGxSZWR1Y2VycywgeyByb3V0aW5nOiByb3V0ZXJSZWR1Y2VyIH0pKTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9DbGllbnRBcHAvY29uZmlndXJlU3RvcmUudHMiLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IFJvdXRlIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XHJcbmltcG9ydCB7IExheW91dCB9IGZyb20gJy4vY29tcG9uZW50cy9MYXlvdXQnO1xyXG5pbXBvcnQgeyBIb21lIH0gZnJvbSAnLi9jb21wb25lbnRzL0hvbWUnO1xyXG5pbXBvcnQgU3BlY2lhbE9mZmVyc0ZldGNoRGF0YSBmcm9tICcuL2NvbXBvbmVudHMvU3BlY2lhbE9mZmVycyc7XHJcblxyXG5leHBvcnQgY29uc3Qgcm91dGVzID0gPExheW91dD5cclxuICAgIDxSb3V0ZSBleGFjdCBwYXRoPScvJyBjb21wb25lbnQ9eyBIb21lIH0gLz5cclxuICAgIDxSb3V0ZSBwYXRoPScvc3BlY2lhbC1vZmZlcnMvOmNhdGVnb3J5SWQ/Lzpsb2NhdGlvbklkPycgY29tcG9uZW50PXsgU3BlY2lhbE9mZmVyc0ZldGNoRGF0YSB9IC8+XHJcbjwvTGF5b3V0PjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQ2xpZW50QXBwL3JvdXRlcy50c3giLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDApKSgxNjMpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9hc3BuZXQtcHJlcmVuZGVyaW5nL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvclxuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDApKSgxNjgpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9oaXN0b3J5L2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvclxuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDApKSgxNzApO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yZWFjdC1kb20vc2VydmVyLmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvclxuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcclxuaW1wb3J0IHsgcmVuZGVyVG9TdHJpbmcgfSBmcm9tICdyZWFjdC1kb20vc2VydmVyJztcclxuaW1wb3J0IHsgU3RhdGljUm91dGVyIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XHJcbmltcG9ydCB7IHJlcGxhY2UgfSBmcm9tICdyZWFjdC1yb3V0ZXItcmVkdXgnO1xyXG5pbXBvcnQgeyBjcmVhdGVNZW1vcnlIaXN0b3J5IH0gZnJvbSAnaGlzdG9yeSc7XHJcbmltcG9ydCB7IGNyZWF0ZVNlcnZlclJlbmRlcmVyLCBSZW5kZXJSZXN1bHQgfSBmcm9tICdhc3BuZXQtcHJlcmVuZGVyaW5nJztcclxuaW1wb3J0IHsgcm91dGVzIH0gZnJvbSAnLi9yb3V0ZXMnO1xyXG5pbXBvcnQgY29uZmlndXJlU3RvcmUgZnJvbSAnLi9jb25maWd1cmVTdG9yZSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVTZXJ2ZXJSZW5kZXJlcihwYXJhbXMgPT4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPFJlbmRlclJlc3VsdD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIC8vIFByZXBhcmUgUmVkdXggc3RvcmUgd2l0aCBpbi1tZW1vcnkgaGlzdG9yeSwgYW5kIGRpc3BhdGNoIGEgbmF2aWdhdGlvbiBldmVudFxyXG4gICAgICAgIC8vIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGluY29taW5nIFVSTFxyXG4gICAgICAgIGNvbnN0IGJhc2VuYW1lID0gcGFyYW1zLmJhc2VVcmwuc3Vic3RyaW5nKDAsIHBhcmFtcy5iYXNlVXJsLmxlbmd0aCAtIDEpOyAvLyBSZW1vdmUgdHJhaWxpbmcgc2xhc2hcclxuICAgICAgICBjb25zdCB1cmxBZnRlckJhc2VuYW1lID0gcGFyYW1zLnVybC5zdWJzdHJpbmcoYmFzZW5hbWUubGVuZ3RoKTtcclxuICAgICAgICBjb25zdCBzdG9yZSA9IGNvbmZpZ3VyZVN0b3JlKGNyZWF0ZU1lbW9yeUhpc3RvcnkoKSk7XHJcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2gocmVwbGFjZSh1cmxBZnRlckJhc2VuYW1lKSk7XHJcblxyXG4gICAgICAgIC8vIFByZXBhcmUgYW4gaW5zdGFuY2Ugb2YgdGhlIGFwcGxpY2F0aW9uIGFuZCBwZXJmb3JtIGFuIGluaXRhbCByZW5kZXIgdGhhdCB3aWxsXHJcbiAgICAgICAgLy8gY2F1c2UgYW55IGFzeW5jIHRhc2tzIChlLmcuLCBkYXRhIGFjY2VzcykgdG8gYmVnaW5cclxuICAgICAgICBjb25zdCByb3V0ZXJDb250ZXh0OiBhbnkgPSB7fTtcclxuICAgICAgICBjb25zdCBhcHAgPSAoXHJcbiAgICAgICAgICAgIDxQcm92aWRlciBzdG9yZT17IHN0b3JlIH0+XHJcbiAgICAgICAgICAgICAgICA8U3RhdGljUm91dGVyIGJhc2VuYW1lPXsgYmFzZW5hbWUgfSBjb250ZXh0PXsgcm91dGVyQ29udGV4dCB9IGxvY2F0aW9uPXsgcGFyYW1zLmxvY2F0aW9uLnBhdGggfSBjaGlsZHJlbj17IHJvdXRlcyB9IC8+XHJcbiAgICAgICAgICAgIDwvUHJvdmlkZXI+XHJcbiAgICAgICAgKTtcclxuICAgICAgICByZW5kZXJUb1N0cmluZyhhcHApO1xyXG5cclxuICAgICAgICAvLyBJZiB0aGVyZSdzIGEgcmVkaXJlY3Rpb24sIGp1c3Qgc2VuZCB0aGlzIGluZm9ybWF0aW9uIGJhY2sgdG8gdGhlIGhvc3QgYXBwbGljYXRpb25cclxuICAgICAgICBpZiAocm91dGVyQ29udGV4dC51cmwpIHtcclxuICAgICAgICAgICAgcmVzb2x2ZSh7IHJlZGlyZWN0VXJsOiByb3V0ZXJDb250ZXh0LnVybCB9KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBPbmNlIGFueSBhc3luYyB0YXNrcyBhcmUgZG9uZSwgd2UgY2FuIHBlcmZvcm0gdGhlIGZpbmFsIHJlbmRlclxyXG4gICAgICAgIC8vIFdlIGFsc28gc2VuZCB0aGUgcmVkdXggc3RvcmUgc3RhdGUsIHNvIHRoZSBjbGllbnQgY2FuIGNvbnRpbnVlIGV4ZWN1dGlvbiB3aGVyZSB0aGUgc2VydmVyIGxlZnQgb2ZmXHJcbiAgICAgICAgcGFyYW1zLmRvbWFpblRhc2tzLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICByZXNvbHZlKHtcclxuICAgICAgICAgICAgICAgIGh0bWw6IHJlbmRlclRvU3RyaW5nKGFwcCksXHJcbiAgICAgICAgICAgICAgICBnbG9iYWxzOiB7IGluaXRpYWxSZWR1eFN0YXRlOiBzdG9yZS5nZXRTdGF0ZSgpIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgcmVqZWN0KTsgLy8gQWxzbyBwcm9wYWdhdGUgYW55IGVycm9ycyBiYWNrIGludG8gdGhlIGhvc3QgYXBwbGljYXRpb25cclxuICAgIH0pO1xyXG59KTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQ2xpZW50QXBwL2Jvb3Qtc2VydmVyLnRzeCIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgUm91dGVDb21wb25lbnRQcm9wcyB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XHJcblxyXG5leHBvcnQgY2xhc3MgSG9tZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxSb3V0ZUNvbXBvbmVudFByb3BzPGFueT4sIGFueT4ge1xyXG4gICAgcHVibGljIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPGRpdj5cclxuICAgICAgICAgICAgPGgxPkhlbGxvLCB3b3JsZCE8L2gxPlxyXG4gICAgICAgICAgICA8cD5XZWxjb21lIHRvIHlvdXIgbmV3IHNpbmdsZS1wYWdlIGFwcGxpY2F0aW9uLCBidWlsdCB3aXRoOjwvcD5cclxuICAgICAgICAgICAgPHVsPlxyXG4gICAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9J2h0dHBzOi8vZ2V0LmFzcC5uZXQvJz5BU1AuTkVUIENvcmU8L2E+IGFuZCA8YSBocmVmPSdodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5LzY3ZWY4c2JkLmFzcHgnPkMjPC9hPiBmb3IgY3Jvc3MtcGxhdGZvcm0gc2VydmVyLXNpZGUgY29kZTwvbGk+XHJcbiAgICAgICAgICAgICAgICA8bGk+PGEgaHJlZj0naHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvJz5SZWFjdDwvYT4gYW5kIDxhIGhyZWY9J2h0dHA6Ly93d3cudHlwZXNjcmlwdGxhbmcub3JnLyc+VHlwZVNjcmlwdDwvYT4gZm9yIGNsaWVudC1zaWRlIGNvZGU8L2xpPlxyXG4gICAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9J2h0dHBzOi8vd2VicGFjay5naXRodWIuaW8vJz5XZWJwYWNrPC9hPiBmb3IgYnVpbGRpbmcgYW5kIGJ1bmRsaW5nIGNsaWVudC1zaWRlIHJlc291cmNlczwvbGk+XHJcbiAgICAgICAgICAgICAgICA8bGk+PGEgaHJlZj0naHR0cDovL2dldGJvb3RzdHJhcC5jb20vJz5Cb290c3RyYXA8L2E+IGZvciBsYXlvdXQgYW5kIHN0eWxpbmc8L2xpPlxyXG4gICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICA8cD5UbyBoZWxwIHlvdSBnZXQgc3RhcnRlZCwgd2UndmUgYWxzbyBzZXQgdXA6PC9wPlxyXG4gICAgICAgICAgICA8dWw+XHJcbiAgICAgICAgICAgICAgICA8bGk+PHN0cm9uZz5DbGllbnQtc2lkZSBuYXZpZ2F0aW9uPC9zdHJvbmc+LiBGb3IgZXhhbXBsZSwgY2xpY2sgPGVtPkNvdW50ZXI8L2VtPiB0aGVuIDxlbT5CYWNrPC9lbT4gdG8gcmV0dXJuIGhlcmUuPC9saT5cclxuICAgICAgICAgICAgICAgIDxsaT48c3Ryb25nPldlYnBhY2sgZGV2IG1pZGRsZXdhcmU8L3N0cm9uZz4uIEluIGRldmVsb3BtZW50IG1vZGUsIHRoZXJlJ3Mgbm8gbmVlZCB0byBydW4gdGhlIDxjb2RlPndlYnBhY2s8L2NvZGU+IGJ1aWxkIHRvb2wuIFlvdXIgY2xpZW50LXNpZGUgcmVzb3VyY2VzIGFyZSBkeW5hbWljYWxseSBidWlsdCBvbiBkZW1hbmQuIFVwZGF0ZXMgYXJlIGF2YWlsYWJsZSBhcyBzb29uIGFzIHlvdSBtb2RpZnkgYW55IGZpbGUuPC9saT5cclxuICAgICAgICAgICAgICAgIDxsaT48c3Ryb25nPkhvdCBtb2R1bGUgcmVwbGFjZW1lbnQ8L3N0cm9uZz4uIEluIGRldmVsb3BtZW50IG1vZGUsIHlvdSBkb24ndCBldmVuIG5lZWQgdG8gcmVsb2FkIHRoZSBwYWdlIGFmdGVyIG1ha2luZyBtb3N0IGNoYW5nZXMuIFdpdGhpbiBzZWNvbmRzIG9mIHNhdmluZyBjaGFuZ2VzIHRvIGZpbGVzLCByZWJ1aWx0IFJlYWN0IGNvbXBvbmVudHMgd2lsbCBiZSBpbmplY3RlZCBkaXJlY3RseSBpbnRvIHlvdXIgcnVubmluZyBhcHBsaWNhdGlvbiwgcHJlc2VydmluZyBpdHMgbGl2ZSBzdGF0ZS48L2xpPlxyXG4gICAgICAgICAgICAgICAgPGxpPjxzdHJvbmc+RWZmaWNpZW50IHByb2R1Y3Rpb24gYnVpbGRzPC9zdHJvbmc+LiBJbiBwcm9kdWN0aW9uIG1vZGUsIGRldmVsb3BtZW50LXRpbWUgZmVhdHVyZXMgYXJlIGRpc2FibGVkLCBhbmQgdGhlIDxjb2RlPndlYnBhY2s8L2NvZGU+IGJ1aWxkIHRvb2wgcHJvZHVjZXMgbWluaWZpZWQgc3RhdGljIENTUyBhbmQgSmF2YVNjcmlwdCBmaWxlcy48L2xpPlxyXG4gICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICA8aDQ+R29pbmcgZnVydGhlcjwvaDQ+XHJcbiAgICAgICAgICAgIDxwPlxyXG4gICAgICAgICAgICAgICAgRm9yIGxhcmdlciBhcHBsaWNhdGlvbnMsIG9yIGZvciBzZXJ2ZXItc2lkZSBwcmVyZW5kZXJpbmcgKGkuZS4sIGZvciA8ZW0+aXNvbW9ycGhpYzwvZW0+IG9yIDxlbT51bml2ZXJzYWw8L2VtPiBhcHBsaWNhdGlvbnMpLCB5b3Ugc2hvdWxkIGNvbnNpZGVyIHVzaW5nIGEgRmx1eC9SZWR1eC1saWtlIGFyY2hpdGVjdHVyZS5cclxuICAgICAgICAgICAgICAgIFlvdSBjYW4gZ2VuZXJhdGUgYW4gQVNQLk5FVCBDb3JlIGFwcGxpY2F0aW9uIHdpdGggUmVhY3QgYW5kIFJlZHV4IHVzaW5nIDxjb2RlPmRvdG5ldCBuZXcgcmVhY3RyZWR1eDwvY29kZT4gaW5zdGVhZCBvZiB1c2luZyB0aGlzIHRlbXBsYXRlLlxyXG4gICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgPC9kaXY+O1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0NsaWVudEFwcC9jb21wb25lbnRzL0hvbWUudHN4IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBOYXZNZW51IH0gZnJvbSAnLi9OYXZNZW51JztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTGF5b3V0UHJvcHMge1xyXG4gICAgY2hpbGRyZW4/OiBSZWFjdC5SZWFjdE5vZGU7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBMYXlvdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8TGF5b3V0UHJvcHMsIHt9PiB7XHJcbiAgICBwdWJsaWMgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT0nY29udGFpbmVyLWZsdWlkJz5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3Jvdyc+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sLXNtLTEyJz5cclxuICAgICAgICAgICAgICAgICAgICA8TmF2TWVudSAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93Jz5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2wtc20tMTInPlxyXG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PjtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9DbGllbnRBcHAvY29tcG9uZW50cy9MYXlvdXQudHN4IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBMaW5rLCBOYXZMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XHJcbmltcG9ydCAqIGFzIEZvbnRBd2Vzb21lIGZyb20gJ3JlYWN0LWZvbnRhd2Vzb21lJztcclxuXHJcbmV4cG9ydCBjbGFzcyBOYXZNZW51IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHt9LCB7fT4ge1xyXG4gICAgcHVibGljIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9J21haW4tbmF2Jz5cclxuICAgICAgICAgICAgPG5hdiBjbGFzc05hbWU9J25hdmJhciBuYXZiYXItZXhwYW5kLXNtIG5hdmJhci1kYXJrIGJnLWRhcmsnPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J25hdmJhci1oZWFkZXInPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT0nYnV0dG9uJyBjbGFzc05hbWU9J25hdmJhci10b2dnbGVyJyBkYXRhLXRvZ2dsZT0nY29sbGFwc2UnIGRhdGEtdGFyZ2V0PScubmF2YmFyLWNvbGxhcHNlJyBhcmlhLWNvbnRyb2xzPSduYXZiYXJTdXBwb3J0ZWRDb250ZW50JyBhcmlhLWV4cGFuZGVkPSdmYWxzZScgYXJpYS1sYWJlbD0nVG9nZ2xlIG5hdmlnYXRpb24nPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJuYXZiYXItdG9nZ2xlci1pY29uXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxMaW5rIGNsYXNzTmFtZT0nbmF2YmFyLWJyYW5kJyB0bz17Jy8nfT5TcGVjaWFsIE9mZmVycyBQcm90b3R5cGU8L0xpbms+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjbGVhcmZpeCc+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbmF2YmFyLWNvbGxhcHNlIGNvbGxhcHNlJz5cclxuICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPSduYXZiYXItbmF2IG1yLWF1dG8nPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8TmF2TGluayB0bz17Jy8nfSBleGFjdCBjbGFzc05hbWU9XCJuYXYtaXRlbSBuYXYtbGlua1wiIGFjdGl2ZUNsYXNzTmFtZT0nYWN0aXZlJz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb250QXdlc29tZSBuYW1lPSdob21lJyAvPiBIb21lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvTmF2TGluaz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPE5hdkxpbmsgdG89eycvc3BlY2lhbC1vZmZlcnMnfSBjbGFzc05hbWU9XCJuYXYtaXRlbSBuYXYtbGlua1wiIGFjdGl2ZUNsYXNzTmFtZT0nYWN0aXZlJz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb250QXdlc29tZSBuYW1lPSdtYWdpYycgLz4gU3BlY2lhbCBPZmZlcnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9OYXZMaW5rPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9uYXY+XHJcbiAgICAgICAgPC9kaXY+O1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0NsaWVudEFwcC9jb21wb25lbnRzL05hdk1lbnUudHN4IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBMaW5rLCBSb3V0ZUNvbXBvbmVudFByb3BzIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XHJcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XHJcbmltcG9ydCB7IEFwcGxpY2F0aW9uU3RhdGUgfSBmcm9tICcuLi9zdG9yZSc7XHJcbmltcG9ydCAqIGFzIFNwZWNpYWxPZmZlcnNTdGF0ZSBmcm9tICcuLi9zdG9yZS9TcGVjaWFsT2ZmZXJzJztcclxuaW1wb3J0IHN0eWxlZCwgeyBTdHlsZWRGdW5jdGlvbiB9IGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcclxuXHJcbi8vIFN0eWxpbmdcclxuZXhwb3J0IGludGVyZmFjZSBTcGVjaWFsT2ZmZXJHcmlkUHJvcHMge1xyXG4gICAgZGlzcGxheT86IHN0cmluZztcclxuICAgIGdyaWRUZW1wbGF0ZUNvbHVtbnM/OiBzdHJpbmc7XHJcbiAgICBncmlkR2FwPzogc3RyaW5nO1xyXG59XHJcblxyXG5jb25zdCBTcGVjaWFsT2ZmZXJHcmlkID0gc3R5bGVkLmRpdmBcclxuICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg0LCAxZnIpO1xyXG4gICAgZ3JpZC1nYXA6IDFyZW07XHJcblxyXG4gICAgQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XHJcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XHJcbiAgICB9XHJcbmA7XHJcblxyXG5jb25zdCBGb290ZXJDb250YWluZXIgPSBzdHlsZWQuZGl2YFxyXG4gICAgZGlzcGxheTogZ3JpZDtcclxuICAgIG1hcmdpbi10b3A6IDFyZW07XHJcbmA7XHJcblxyXG5jb25zdCBQYWdpbmF0aW9uQnV0dG9uQ29udGFpbmVyID0gc3R5bGVkLmRpdmBcclxuICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg0LCAxZnIpO1xyXG4gICAgZ3JpZC1nYXA6IDFyZW07XHJcbmA7XHJcblxyXG5mdW5jdGlvbiBzdHlsZWRDb21wb25lbnRXaXRoUHJvcHM8VCwgVSBleHRlbmRzIEhUTUxFbGVtZW50ID0gSFRNTEVsZW1lbnQ+KHN0eWxlZEZ1bmN0aW9uOiBTdHlsZWRGdW5jdGlvbjxSZWFjdC5IVE1MUHJvcHM8VT4+KTogU3R5bGVkRnVuY3Rpb248VCAmIFJlYWN0LkhUTUxQcm9wczxVPj4ge1xyXG4gICAgcmV0dXJuIHN0eWxlZEZ1bmN0aW9uIGFzIFN0eWxlZEZ1bmN0aW9uPFQgJiBSZWFjdC5IVE1MUHJvcHM8VT4+O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENvbHVtblBvc2l0aW9uYWxCdXR0b25Qcm9wcyB7XHJcbiAgICBncmlkQ29sdW1uOiBudW1iZXI7XHJcbn1cclxuXHJcbmNvbnN0IENvbHVtblBvc2l0aW9uYWxCdXR0b24gPSBzdHlsZWRDb21wb25lbnRXaXRoUHJvcHM8Q29sdW1uUG9zaXRpb25hbEJ1dHRvblByb3BzLCBIVE1MQnV0dG9uRWxlbWVudD4oc3R5bGVkLmJ1dHRvbikgYFxyXG4gICAgZ3JpZC1jb2x1bW46ICR7cCA9PiBwLmdyaWRDb2x1bW59O1xyXG5gO1xyXG5cclxuLy8gQXQgcnVudGltZSwgUmVkdXggd2lsbCBtZXJnZSB0b2dldGhlci4uLlxyXG50eXBlIFNwZWNpYWxPZmZlcnNQcm9wcyA9XHJcbiAgICBTcGVjaWFsT2ZmZXJzU3RhdGUuU3BlY2lhbE9mZmVyc1N0YXRlICAgICAgICAgICAgICAvLyAuLi4gc3RhdGUgd2UndmUgcmVxdWVzdGVkIGZyb20gdGhlIFJlZHV4IHN0b3JlXHJcbiAgICAmIHR5cGVvZiBTcGVjaWFsT2ZmZXJzU3RhdGUuYWN0aW9uQ3JlYXRvcnMgICAgICAgICAvLyAuLi4gcGx1cyBhY3Rpb24gY3JlYXRvcnMgd2UndmUgcmVxdWVzdGVkXHJcbiAgICAmIFJvdXRlQ29tcG9uZW50UHJvcHM8eyBjYXRlZ29yeUlkOiBzdHJpbmcgfCBudWxsLCBsb2NhdGlvbklkOiBzdHJpbmcgfCBudWxsIH0+OyAvLyAuLi4gcGx1cyBpbmNvbWluZyByb3V0aW5nIHBhcmFtZXRlcnNcclxuXHJcbmNsYXNzIFNwZWNpYWxPZmZlcnNGZXRjaERhdGEgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8U3BlY2lhbE9mZmVyc1Byb3BzPiB7XHJcbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XHJcbiAgICAgICAgLy8gVGhpcyBtZXRob2QgcnVucyB3aGVuIHRoZSBjb21wb25lbnQgaXMgZmlyc3QgYWRkZWQgdG8gdGhlIHBhZ2VcclxuICAgICAgICB0aGlzLnByb3BzLnJlcXVlc3RTcGVjaWFsT2ZmZXJzKFxyXG4gICAgICAgICAgICAxMixcclxuICAgICAgICAgICAgbnVsbCxcclxuICAgICAgICAgICAgKHR5cGVvZiB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5jYXRlZ29yeUlkID09PSAndW5kZWZpbmVkJykgPyBudWxsIDogdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuY2F0ZWdvcnlJZCxcclxuICAgICAgICAgICAgKHR5cGVvZiB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5sb2NhdGlvbklkID09PSAndW5kZWZpbmVkJykgPyBudWxsIDogdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMubG9jYXRpb25JZCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHM6IFNwZWNpYWxPZmZlcnNQcm9wcykge1xyXG4gICAgICAgIC8vIFRoaXMgbWV0aG9kIHJ1bnMgd2hlbiBpbmNvbWluZyBwcm9wcyAoZS5nLiwgcm91dGUgcGFyYW1zKSBjaGFuZ2VcclxuICAgICAgICB0aGlzLnByb3BzLnJlcXVlc3RTcGVjaWFsT2ZmZXJzKFxyXG4gICAgICAgICAgICAxMixcclxuICAgICAgICAgICAgbnVsbCxcclxuICAgICAgICAgICAgKHR5cGVvZiB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5jYXRlZ29yeUlkID09PSAndW5kZWZpbmVkJykgPyBudWxsIDogdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuY2F0ZWdvcnlJZCxcclxuICAgICAgICAgICAgKHR5cGVvZiB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5sb2NhdGlvbklkID09PSAndW5kZWZpbmVkJykgPyBudWxsIDogdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMubG9jYXRpb25JZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgPGgxPk91ciBTcGVjaWFsIE9mZmVyczwvaDE+XHJcbiAgICAgICAgICAgICAgICA8cD5UaGlzIGNvbXBvbmVudCBkZW1vbnN0cmF0ZXMgZmV0Y2hpbmcgZGF0YSBmcm9tIHRoZSBzZXJ2ZXI8L3A+XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJTcGVjaWFsT2ZmZXJzKCl9XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJQYWdpbmF0aW9uKCl9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnb3RvTGlua2VkUGFnZShwYWdlVXJsOiBzdHJpbmcgfCBudWxsKSB7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5yZXF1ZXN0U3BlY2lhbE9mZmVyUGFnZShwYWdlVXJsKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlbmRlclNwZWNpYWxPZmZlcnMoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPFNwZWNpYWxPZmZlckdyaWQ+XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5vZmZlcnMubWFwKG9mZmVyID0+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NhcmQnIGtleT17b2ZmZXIuaWR9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIGNsYXNzTmFtZT0nY2FyZC1pbWctdG9wJyBzcmM9e29mZmVyLmltYWdlVXJsfSBhbHQ9e29mZmVyLm5hbWV9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjYXJkLWJvZHknPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg1IGNsYXNzTmFtZT0nY2FyZC10aXRsZSc+e29mZmVyLm5hbWV9PC9oNT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0nY2FyZC10ZXh0Jz57b2ZmZXIuZGVzY3JpcHRpb259PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPSdidG4gYnRuLXByaW1hcnknIGhyZWY9e29mZmVyLm9mZmVyVXJsfT5MZWFybiBNb3JlPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIDwvU3BlY2lhbE9mZmVyR3JpZD5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVuZGVyUGFnaW5hdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8Rm9vdGVyQ29udGFpbmVyPlxyXG4gICAgICAgICAgICAgICAgPFBhZ2luYXRpb25CdXR0b25Db250YWluZXI+XHJcbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuZmlyc3RQYWdlVXJsICE9PSBudWxsID8gPENvbHVtblBvc2l0aW9uYWxCdXR0b24gY2xhc3NOYW1lPSdidG4gYnRuLW91dGxpbmUtcHJpbWFyeScgZ3JpZENvbHVtbj17MX0gb25DbGljaz17KCkgPT4gdGhpcy5nb3RvTGlua2VkUGFnZSh0aGlzLnByb3BzLmZpcnN0UGFnZVVybCl9PkZpcnN0IHBhZ2U8L0NvbHVtblBvc2l0aW9uYWxCdXR0b24+IDogW10gfVxyXG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLnByZXZQYWdlVXJsICE9PSBudWxsID8gPENvbHVtblBvc2l0aW9uYWxCdXR0b24gY2xhc3NOYW1lPSdidG4gYnRuLW91dGxpbmUtcHJpbWFyeScgZ3JpZENvbHVtbj17Mn0gb25DbGljaz17KCkgPT4gdGhpcy5nb3RvTGlua2VkUGFnZSh0aGlzLnByb3BzLnByZXZQYWdlVXJsKX0+UHJldiBwYWdlPC9Db2x1bW5Qb3NpdGlvbmFsQnV0dG9uPiA6IFtdIH1cclxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5uZXh0UGFnZVVybCAhPT0gbnVsbCA/IDxDb2x1bW5Qb3NpdGlvbmFsQnV0dG9uIGNsYXNzTmFtZT0nYnRuIGJ0bi1vdXRsaW5lLXByaW1hcnknIGdyaWRDb2x1bW49ezN9IG9uQ2xpY2s9eygpID0+IHRoaXMuZ290b0xpbmtlZFBhZ2UodGhpcy5wcm9wcy5uZXh0UGFnZVVybCl9Pk5leHQgcGFnZTwvQ29sdW1uUG9zaXRpb25hbEJ1dHRvbj4gOiBbXSB9XHJcbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMubGFzdFBhZ2VVcmwgIT09IG51bGwgPyA8Q29sdW1uUG9zaXRpb25hbEJ1dHRvbiBjbGFzc05hbWU9J2J0biBidG4tb3V0bGluZS1wcmltYXJ5JyBncmlkQ29sdW1uPXs0fSBvbkNsaWNrPXsoKSA9PiB0aGlzLmdvdG9MaW5rZWRQYWdlKHRoaXMucHJvcHMubGFzdFBhZ2VVcmwpfT5MYXN0IHBhZ2U8L0NvbHVtblBvc2l0aW9uYWxCdXR0b24+IDogW10gfVxyXG4gICAgICAgICAgICAgICAgPC9QYWdpbmF0aW9uQnV0dG9uQ29udGFpbmVyPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsb2FkaW5nXCI+XHJcbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuaXNMb2FkaW5nID8gPHNwYW4+TG9hZGluZy4uLjwvc3Bhbj4gOiBbXX1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L0Zvb3RlckNvbnRhaW5lcj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0PFNwZWNpYWxPZmZlcnNTdGF0ZS5TcGVjaWFsT2ZmZXJzU3RhdGUsIFNwZWNpYWxPZmZlcnNQcm9wcywgU3BlY2lhbE9mZmVyc1Byb3BzPihcclxuICAgIChzdGF0ZTogQXBwbGljYXRpb25TdGF0ZSkgPT4gc3RhdGUuc3BlY2lhbE9mZmVycywgLy8gU2VsZWN0cyB3aGljaCBzdGF0ZSBwcm9wZXJ0aWVzIGFyZSBtZXJnZWQgaW50byB0aGUgY29tcG9uZW50J3MgcHJvcHNcclxuICAgIFNwZWNpYWxPZmZlcnNTdGF0ZS5hY3Rpb25DcmVhdG9ycyAgICAgICAgICAgICAgICAgLy8gU2VsZWN0cyB3aGljaCBhY3Rpb24gY3JlYXRvcnMgYXJlIG1lcmdlZCBpbnRvIHRoZSBjb21wb25lbnQncyBwcm9wc1xyXG4pKFNwZWNpYWxPZmZlcnNGZXRjaERhdGEpIGFzIHR5cGVvZiBTcGVjaWFsT2ZmZXJzRmV0Y2hEYXRhO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9DbGllbnRBcHAvY29tcG9uZW50cy9TcGVjaWFsT2ZmZXJzLnRzeCIsImltcG9ydCAqIGFzIFNwZWNpYWxPZmZlcnMgZnJvbSAnLi9TcGVjaWFsT2ZmZXJzJztcclxuXHJcbi8vIFRoZSB0b3AtbGV2ZWwgc3RhdGUgb2JqZWN0XHJcbmV4cG9ydCBpbnRlcmZhY2UgQXBwbGljYXRpb25TdGF0ZSB7XHJcbiAgICBzcGVjaWFsT2ZmZXJzOiBTcGVjaWFsT2ZmZXJzLlNwZWNpYWxPZmZlcnNTdGF0ZTtcclxufVxyXG5cclxuLy8gV2hlbmV2ZXIgYW4gYWN0aW9uIGlzIGRpc3BhdGNoZWQsIFJlZHV4IHdpbGwgdXBkYXRlIGVhY2ggdG9wLWxldmVsIGFwcGxpY2F0aW9uIHN0YXRlIHByb3BlcnR5IHVzaW5nXHJcbi8vIHRoZSByZWR1Y2VyIHdpdGggdGhlIG1hdGNoaW5nIG5hbWUuIEl0J3MgaW1wb3J0YW50IHRoYXQgdGhlIG5hbWVzIG1hdGNoIGV4YWN0bHksIGFuZCB0aGF0IHRoZSByZWR1Y2VyXHJcbi8vIGFjdHMgb24gdGhlIGNvcnJlc3BvbmRpbmcgQXBwbGljYXRpb25TdGF0ZSBwcm9wZXJ0eSB0eXBlLlxyXG5leHBvcnQgY29uc3QgcmVkdWNlcnMgPSB7XHJcbiAgICBzcGVjaWFsT2ZmZXJzOiBTcGVjaWFsT2ZmZXJzLnJlZHVjZXJcclxufTtcclxuXHJcbi8vIFRoaXMgdHlwZSBjYW4gYmUgdXNlZCBhcyBhIGhpbnQgb24gYWN0aW9uIGNyZWF0b3JzIHNvIHRoYXQgaXRzICdkaXNwYXRjaCcgYW5kICdnZXRTdGF0ZScgcGFyYW1zIGFyZVxyXG4vLyBjb3JyZWN0bHkgdHlwZWQgdG8gbWF0Y2ggeW91ciBzdG9yZS5cclxuZXhwb3J0IGludGVyZmFjZSBBcHBUaHVua0FjdGlvbjxUQWN0aW9uPiB7XHJcbiAgICAoZGlzcGF0Y2g6IChhY3Rpb246IFRBY3Rpb24pID0+IHZvaWQsIGdldFN0YXRlOiAoKSA9PiBBcHBsaWNhdGlvblN0YXRlKTogdm9pZDtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9DbGllbnRBcHAvc3RvcmUvaW5kZXgudHMiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9wcm9wVHlwZXMgPSByZXF1aXJlKCdwcm9wLXR5cGVzJyk7XG5cbnZhciBfcHJvcFR5cGVzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Byb3BUeXBlcyk7XG5cbnZhciBfc2NyZWVuUmVhZGVyU3R5bGVzID0gcmVxdWlyZSgnLi9zY3JlZW4tcmVhZGVyLXN0eWxlcycpO1xuXG52YXIgX3NjcmVlblJlYWRlclN0eWxlczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zY3JlZW5SZWFkZXJTdHlsZXMpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMob2JqLCBrZXlzKSB7IHZhciB0YXJnZXQgPSB7fTsgZm9yICh2YXIgaSBpbiBvYmopIHsgaWYgKGtleXMuaW5kZXhPZihpKSA+PSAwKSBjb250aW51ZTsgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBpKSkgY29udGludWU7IHRhcmdldFtpXSA9IG9ialtpXTsgfSByZXR1cm4gdGFyZ2V0OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuLyoqXG4gKiBBIFJlYWN0IGNvbXBvbmVudCBmb3IgdGhlIGZvbnQtYXdlc29tZSBpY29uIGxpYnJhcnkuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IFthcmlhTGFiZWxdIEFuIGV4dHJhIGFjY2Vzc2liaWxpdHkgbGFiZWwgdG8gcHV0IG9uIHRoZSBpY29uXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtib3JkZXI9ZmFsc2VdIFdoZXRoZXIgb3Igbm90IHRvIHNob3cgYSBib3JkZXIgcmFkaXVzXG4gKiBAcGFyYW0ge1N0cmluZ30gW2NsYXNzTmFtZV0gQW4gZXh0cmEgc2V0IG9mIENTUyBjbGFzc2VzIHRvIGFkZCB0byB0aGUgY29tcG9uZW50XG4gKiBAcGFyYW0ge09iamVjdH0gW2Nzc01vZHVsZV0gT3B0aW9uIHRvIHBhc3MgRm9udEF3ZXNvbWUgQ1NTIGFzIGEgbW9kdWxlXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtmaXhlZFdpZHRoPWZhbHNlXSBNYWtlIGJ1dHRvbnMgZml4ZWQgd2lkdGhcbiAqIEBwYXJhbSB7U3RyaW5nfSBbZmxpcD1mYWxzZV0gRmxpcCB0aGUgaWNvbidzIG9yaWVudGF0aW9uLlxuICogQHBhcmFtIHtCb29sZWFufSBbaW52ZXJzZT1mYWxzZV1JbnZlcnNlIHRoZSBpY29uJ3MgY29sb3JcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIE5hbWUgb2YgdGhlIGljb24gdG8gdXNlXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtwdWxzZT1mYWxzZV0gUm90YXRlIGljb24gd2l0aCA4IHN0ZXBzLCByYXRoZXIgdGhhbiBzbW9vdGhseVxuICogQHBhcmFtIHtOdW1iZXJ9IFtyb3RhdGVdIFRoZSBkZWdyZXNzIHRvIHJvdGF0ZSB0aGUgaWNvbiBieVxuICogQHBhcmFtIHtTdHJpbmd9IFtzaXplXSBUaGUgaWNvbiBzY2FsaW5nIHNpemVcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW3NwaW49ZmFsc2VdIFNwaW4gdGhlIGljb25cbiAqIEBwYXJhbSB7U3RyaW5nfSBbc3RhY2tdIFN0YWNrIGFuIGljb24gb24gdG9wIG9mIGFub3RoZXJcbiAqIEBwYXJhbSB7U3RyaW5nfSBbdGFnPXNwYW5dIFRoZSBIVE1MIHRhZyB0byB1c2UgYXMgYSBzdHJpbmcsIGVnICdpJyBvciAnZW0nXG4gKiBAbW9kdWxlIEZvbnRBd2Vzb21lXG4gKiBAdHlwZSB7UmVhY3RDbGFzc31cbiAqL1xudmFyIEZvbnRBd2Vzb21lID0gZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgX2luaGVyaXRzKEZvbnRBd2Vzb21lLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBGb250QXdlc29tZSgpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRm9udEF3ZXNvbWUpO1xuXG4gICAgdmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKEZvbnRBd2Vzb21lLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRm9udEF3ZXNvbWUpKS5jYWxsKHRoaXMpKTtcblxuICAgIF90aGlzLmRpc3BsYXlOYW1lID0gJ0ZvbnRBd2Vzb21lJztcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoRm9udEF3ZXNvbWUsIFt7XG4gICAga2V5OiAncmVuZGVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgdmFyIF9wcm9wcyA9IHRoaXMucHJvcHMsXG4gICAgICAgICAgYm9yZGVyID0gX3Byb3BzLmJvcmRlcixcbiAgICAgICAgICBjc3NNb2R1bGUgPSBfcHJvcHMuY3NzTW9kdWxlLFxuICAgICAgICAgIGNsYXNzTmFtZSA9IF9wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgZml4ZWRXaWR0aCA9IF9wcm9wcy5maXhlZFdpZHRoLFxuICAgICAgICAgIGZsaXAgPSBfcHJvcHMuZmxpcCxcbiAgICAgICAgICBpbnZlcnNlID0gX3Byb3BzLmludmVyc2UsXG4gICAgICAgICAgbmFtZSA9IF9wcm9wcy5uYW1lLFxuICAgICAgICAgIHB1bHNlID0gX3Byb3BzLnB1bHNlLFxuICAgICAgICAgIHJvdGF0ZSA9IF9wcm9wcy5yb3RhdGUsXG4gICAgICAgICAgc2l6ZSA9IF9wcm9wcy5zaXplLFxuICAgICAgICAgIHNwaW4gPSBfcHJvcHMuc3BpbixcbiAgICAgICAgICBzdGFjayA9IF9wcm9wcy5zdGFjayxcbiAgICAgICAgICBfcHJvcHMkdGFnID0gX3Byb3BzLnRhZyxcbiAgICAgICAgICB0YWcgPSBfcHJvcHMkdGFnID09PSB1bmRlZmluZWQgPyAnc3BhbicgOiBfcHJvcHMkdGFnLFxuICAgICAgICAgIGFyaWFMYWJlbCA9IF9wcm9wcy5hcmlhTGFiZWwsXG4gICAgICAgICAgcHJvcHMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoX3Byb3BzLCBbJ2JvcmRlcicsICdjc3NNb2R1bGUnLCAnY2xhc3NOYW1lJywgJ2ZpeGVkV2lkdGgnLCAnZmxpcCcsICdpbnZlcnNlJywgJ25hbWUnLCAncHVsc2UnLCAncm90YXRlJywgJ3NpemUnLCAnc3BpbicsICdzdGFjaycsICd0YWcnLCAnYXJpYUxhYmVsJ10pO1xuXG4gICAgICB2YXIgY2xhc3NOYW1lcyA9IFtdO1xuXG4gICAgICBpZiAoY3NzTW9kdWxlKSB7XG4gICAgICAgIGNsYXNzTmFtZXMucHVzaChjc3NNb2R1bGVbJ2ZhJ10pO1xuICAgICAgICBjbGFzc05hbWVzLnB1c2goY3NzTW9kdWxlWydmYS0nICsgbmFtZV0pO1xuICAgICAgICBzaXplICYmIGNsYXNzTmFtZXMucHVzaChjc3NNb2R1bGVbJ2ZhLScgKyBzaXplXSk7XG4gICAgICAgIHNwaW4gJiYgY2xhc3NOYW1lcy5wdXNoKGNzc01vZHVsZVsnZmEtc3BpbiddKTtcbiAgICAgICAgcHVsc2UgJiYgY2xhc3NOYW1lcy5wdXNoKGNzc01vZHVsZVsnZmEtcHVsc2UnXSk7XG4gICAgICAgIGJvcmRlciAmJiBjbGFzc05hbWVzLnB1c2goY3NzTW9kdWxlWydmYS1ib3JkZXInXSk7XG4gICAgICAgIGZpeGVkV2lkdGggJiYgY2xhc3NOYW1lcy5wdXNoKGNzc01vZHVsZVsnZmEtZncnXSk7XG4gICAgICAgIGludmVyc2UgJiYgY2xhc3NOYW1lcy5wdXNoKGNzc01vZHVsZVsnZmEtaW52ZXJzZSddKTtcbiAgICAgICAgZmxpcCAmJiBjbGFzc05hbWVzLnB1c2goY3NzTW9kdWxlWydmYS1mbGlwLScgKyBmbGlwXSk7XG4gICAgICAgIHJvdGF0ZSAmJiBjbGFzc05hbWVzLnB1c2goY3NzTW9kdWxlWydmYS1yb3RhdGUtJyArIHJvdGF0ZV0pO1xuICAgICAgICBzdGFjayAmJiBjbGFzc05hbWVzLnB1c2goY3NzTW9kdWxlWydmYS1zdGFjay0nICsgc3RhY2tdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNsYXNzTmFtZXMucHVzaCgnZmEnKTtcbiAgICAgICAgY2xhc3NOYW1lcy5wdXNoKCdmYS0nICsgbmFtZSk7XG4gICAgICAgIHNpemUgJiYgY2xhc3NOYW1lcy5wdXNoKCdmYS0nICsgc2l6ZSk7XG4gICAgICAgIHNwaW4gJiYgY2xhc3NOYW1lcy5wdXNoKCdmYS1zcGluJyk7XG4gICAgICAgIHB1bHNlICYmIGNsYXNzTmFtZXMucHVzaCgnZmEtcHVsc2UnKTtcbiAgICAgICAgYm9yZGVyICYmIGNsYXNzTmFtZXMucHVzaCgnZmEtYm9yZGVyJyk7XG4gICAgICAgIGZpeGVkV2lkdGggJiYgY2xhc3NOYW1lcy5wdXNoKCdmYS1mdycpO1xuICAgICAgICBpbnZlcnNlICYmIGNsYXNzTmFtZXMucHVzaCgnZmEtaW52ZXJzZScpO1xuICAgICAgICBmbGlwICYmIGNsYXNzTmFtZXMucHVzaCgnZmEtZmxpcC0nICsgZmxpcCk7XG4gICAgICAgIHJvdGF0ZSAmJiBjbGFzc05hbWVzLnB1c2goJ2ZhLXJvdGF0ZS0nICsgcm90YXRlKTtcbiAgICAgICAgc3RhY2sgJiYgY2xhc3NOYW1lcy5wdXNoKCdmYS1zdGFjay0nICsgc3RhY2spO1xuICAgICAgfVxuXG4gICAgICAvLyBBZGQgYW55IGN1c3RvbSBjbGFzcyBuYW1lcyBhdCB0aGUgZW5kLlxuICAgICAgY2xhc3NOYW1lICYmIGNsYXNzTmFtZXMucHVzaChjbGFzc05hbWUpO1xuICAgICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHRhZywgX2V4dGVuZHMoe30sIHByb3BzLCB7ICdhcmlhLWhpZGRlbic6IHRydWUsIGNsYXNzTmFtZTogY2xhc3NOYW1lcy5qb2luKCcgJykgfSksIGFyaWFMYWJlbCA/IF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KCdzcGFuJywgeyBzdHlsZTogX3NjcmVlblJlYWRlclN0eWxlczIuZGVmYXVsdCB9LCBhcmlhTGFiZWwpIDogbnVsbCk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEZvbnRBd2Vzb21lO1xufShfcmVhY3QyLmRlZmF1bHQuQ29tcG9uZW50KTtcblxuRm9udEF3ZXNvbWUucHJvcFR5cGVzID0ge1xuICBhcmlhTGFiZWw6IF9wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nLFxuICBib3JkZXI6IF9wcm9wVHlwZXMyLmRlZmF1bHQuYm9vbCxcbiAgY2xhc3NOYW1lOiBfcHJvcFR5cGVzMi5kZWZhdWx0LnN0cmluZyxcbiAgY3NzTW9kdWxlOiBfcHJvcFR5cGVzMi5kZWZhdWx0Lm9iamVjdCxcbiAgZml4ZWRXaWR0aDogX3Byb3BUeXBlczIuZGVmYXVsdC5ib29sLFxuICBmbGlwOiBfcHJvcFR5cGVzMi5kZWZhdWx0Lm9uZU9mKFsnaG9yaXpvbnRhbCcsICd2ZXJ0aWNhbCddKSxcbiAgaW52ZXJzZTogX3Byb3BUeXBlczIuZGVmYXVsdC5ib29sLFxuICBuYW1lOiBfcHJvcFR5cGVzMi5kZWZhdWx0LnN0cmluZy5pc1JlcXVpcmVkLFxuICBwdWxzZTogX3Byb3BUeXBlczIuZGVmYXVsdC5ib29sLFxuICByb3RhdGU6IF9wcm9wVHlwZXMyLmRlZmF1bHQub25lT2YoWzkwLCAxODAsIDI3MF0pLFxuICBzaXplOiBfcHJvcFR5cGVzMi5kZWZhdWx0Lm9uZU9mKFsnbGcnLCAnMngnLCAnM3gnLCAnNHgnLCAnNXgnXSksXG4gIHNwaW46IF9wcm9wVHlwZXMyLmRlZmF1bHQuYm9vbCxcbiAgc3RhY2s6IF9wcm9wVHlwZXMyLmRlZmF1bHQub25lT2YoWycxeCcsICcyeCddKSxcbiAgdGFnOiBfcHJvcFR5cGVzMi5kZWZhdWx0LnN0cmluZ1xufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gRm9udEF3ZXNvbWU7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmVhY3QtZm9udGF3ZXNvbWUvbGliL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB7XG4gIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICB3aWR0aDogJzFweCcsXG4gIGhlaWdodDogJzFweCcsXG4gIHBhZGRpbmc6ICcwcHgnLFxuICBtYXJnaW46ICctMXB4JyxcbiAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICBjbGlwOiAncmVjdCgwcHgsIDBweCwgMHB4LCAwcHgpJyxcbiAgYm9yZGVyOiAnMHB4J1xufTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yZWFjdC1mb250YXdlc29tZS9saWIvc2NyZWVuLXJlYWRlci1zdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gKF9fd2VicGFja19yZXF1aXJlX18oMCkpKDApO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvclxuLy8gbW9kdWxlIGlkID0gMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygwKSkoMTY2KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvZG9tYWluLXRhc2svaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDApKSgxNzQpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yZWR1eC10aHVuay9saWIvaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yXG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDApKSgxNzUpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9zdHlsZWQtY29tcG9uZW50cy9saWIvaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yXG4vLyBtb2R1bGUgaWQgPSAyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDApKSg4Mik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlZHV4L2xpYi9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3Jcbi8vIG1vZHVsZSBpZCA9IDIzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=