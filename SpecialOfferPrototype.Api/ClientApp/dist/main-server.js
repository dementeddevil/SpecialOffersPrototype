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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_domain_task__ = __webpack_require__(19);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_thunk__ = __webpack_require__(20);
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
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store_SpecialOffers__ = __webpack_require__(5);
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

var _propTypes = __webpack_require__(21);

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

module.exports = (__webpack_require__(0))(148);

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(156);

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(5);

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(79);

/***/ })
/******/ ])));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTcwMDAxOWU1MWU3MjVhNjBmNGYiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiLi92ZW5kb3JcIiIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0L3JlYWN0LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvciIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci1kb20vaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yIiwid2VicGFjazovLy9kZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvbGliL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvciIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci1yZWR1eC9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3IiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL3N0b3JlL1NwZWNpYWxPZmZlcnMudHMiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2NvbmZpZ3VyZVN0b3JlLnRzIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9yb3V0ZXMudHN4Iiwid2VicGFjazovLy9kZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvYXNwbmV0LXByZXJlbmRlcmluZy9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3IiLCJ3ZWJwYWNrOi8vL2RlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9oaXN0b3J5L2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvciIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0LWRvbS9zZXJ2ZXIuanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9ib290LXNlcnZlci50c3giLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2NvbXBvbmVudHMvSG9tZS50c3giLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2NvbXBvbmVudHMvTGF5b3V0LnRzeCIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvY29tcG9uZW50cy9OYXZNZW51LnRzeCIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvY29tcG9uZW50cy9TcGVjaWFsT2ZmZXJzLnRzeCIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvc3RvcmUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1mb250YXdlc29tZS9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1mb250YXdlc29tZS9saWIvc2NyZWVuLXJlYWRlci1zdHlsZXMuanMiLCJ3ZWJwYWNrOi8vL2RlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9kb21haW4tdGFzay9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3IiLCJ3ZWJwYWNrOi8vL2RlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yZWR1eC10aHVuay9saWIvaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yIiwid2VicGFjazovLy9kZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3IiLCJ3ZWJwYWNrOi8vL2RlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yZWR1eC9saWIvaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FB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T0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxRQUFRO0FBQ25CLFdBQVcsT0FBTztBQUNsQixXQUFXLFFBQVE7QUFDbkIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsUUFBUTtBQUNuQixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsUUFBUTtBQUNuQixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDJEQUEyRCxVQUFVLHVEQUF1RCxzREFBc0Qsc0NBQXNDO0FBQ3hOO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQzs7Ozs7OztBQzVJQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0M7Ozs7OztBQ2ZBLCtDOzs7Ozs7QUNBQSwrQzs7Ozs7O0FDQUEsNkM7Ozs7OztBQ0FBLDhDIiwiZmlsZSI6Im1haW4tc2VydmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJkaXN0L1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDExKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAxNzAwMDE5ZTUxZTcyNWE2MGY0ZiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vdmVuZG9yXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiLi92ZW5kb3JcIlxuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDApKSgzKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcmVhY3QvcmVhY3QuanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gKF9fd2VicGFja19yZXF1aXJlX18oMCkpKDE1NCk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci1kb20vaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gKF9fd2VicGFja19yZXF1aXJlX18oMCkpKDE1Myk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2xpYi9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3Jcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygwKSkoMTU1KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyLXJlZHV4L2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvclxuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBmZXRjaCwgYWRkVGFzayB9IGZyb20gJ2RvbWFpbi10YXNrJztcclxuaW1wb3J0IHsgQWN0aW9uLCBSZWR1Y2VyLCBBY3Rpb25DcmVhdG9yIH0gZnJvbSAncmVkdXgnO1xyXG5pbXBvcnQgeyBBcHBUaHVua0FjdGlvbiB9IGZyb20gJy4vJztcclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vIFNUQVRFIC0gVGhpcyBkZWZpbmVzIHRoZSB0eXBlIG9mIGRhdGEgbWFpbnRhaW5lZCBpbiB0aGUgUmVkdXggc3RvcmUuXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFNwZWNpYWxPZmZlcnNTdGF0ZSB7XHJcbiAgICBpc0xvYWRpbmc6IGJvb2xlYW47XHJcbiAgICBwYWdlU2l6ZTogbnVtYmVyO1xyXG4gICAgZmlsdGVyOiBzdHJpbmcgfCBudWxsO1xyXG4gICAgY2F0ZWdvcnlJZDogc3RyaW5nIHwgbnVsbDtcclxuICAgIGxvY2F0aW9uSWQ6IHN0cmluZyB8IG51bGw7XHJcbiAgICBwYWdlVXJsOiBzdHJpbmcgfCBudWxsO1xyXG4gICAgb2ZmZXJzOiBJU3BlY2lhbE9mZmVyW107XHJcbiAgICB0b3RhbFJlc3VsdHM6IG51bWJlcjtcclxuICAgIHRvdGFsUGFnZXM6IG51bWJlcjtcclxuICAgIHBhZ2U6IG51bWJlcjtcclxuICAgIGZpcnN0UGFnZVVybDogc3RyaW5nIHwgbnVsbDtcclxuICAgIHByZXZQYWdlVXJsOiBzdHJpbmcgfCBudWxsO1xyXG4gICAgbmV4dFBhZ2VVcmw6IHN0cmluZyB8IG51bGw7XHJcbiAgICBsYXN0UGFnZVVybDogc3RyaW5nIHwgbnVsbDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJU3BlY2lhbE9mZmVyIHtcclxuICAgIGlkOiBzdHJpbmc7XHJcbiAgICBjYXRlZ29yeUlkOiBzdHJpbmc7XHJcbiAgICBjb3VudHlJZDogc3RyaW5nO1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcclxuICAgIGltYWdlVXJsOiBzdHJpbmc7XHJcbiAgICBvZmZlclVybDogc3RyaW5nO1xyXG4gICAgdmFsaWRVbnRpbDogRGF0ZTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJSGFsTGluayB7XHJcbiAgICBocmVmOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVNwZWNpYWxPZmZlcnNIYWwge1xyXG4gICAgdG90YWxSZXN1bHRzOiBudW1iZXI7XHJcbiAgICB0b3RhbFBhZ2VzOiBudW1iZXI7XHJcbiAgICBwYWdlOiBudW1iZXI7XHJcbiAgICByZXNvdXJjZUxpc3Q6IGFueVtdIHwgbnVsbDtcclxuICAgIF9saW5rczoge1xyXG4gICAgICAgIFtrZXk6IHN0cmluZ106IElIYWxMaW5rO1xyXG4gICAgfTtcclxuICAgIF9lbWJlZGRlZDoge1xyXG4gICAgICAgIFwic3BlY2lhbC1vZmZlclwiOiBJU3BlY2lhbE9mZmVyW107XHJcbiAgICB9O1xyXG59XHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyBBQ1RJT05TIC0gVGhlc2UgYXJlIHNlcmlhbGl6YWJsZSAoaGVuY2UgcmVwbGF5YWJsZSkgZGVzY3JpcHRpb25zIG9mIHN0YXRlIHRyYW5zaXRpb25zLlxyXG4vLyBUaGV5IGRvIG5vdCB0aGVtc2VsdmVzIGhhdmUgYW55IHNpZGUtZWZmZWN0czsgdGhleSBqdXN0IGRlc2NyaWJlIHNvbWV0aGluZyB0aGF0IGlzIGdvaW5nIHRvIGhhcHBlbi5cclxuXHJcbmludGVyZmFjZSBSZXF1ZXN0U3BlY2lhbE9mZmVyc0FjdGlvbiB7XHJcbiAgICB0eXBlOiAnUkVRVUVTVF9TUEVDSUFMX09GRkVSUyc7XHJcbiAgICBwYWdlU2l6ZTogbnVtYmVyO1xyXG4gICAgZmlsdGVyOiBzdHJpbmcgfCBudWxsO1xyXG4gICAgY2F0ZWdvcnlJZDogc3RyaW5nIHwgbnVsbDtcclxuICAgIGxvY2F0aW9uSWQ6IHN0cmluZyB8IG51bGw7XHJcbn1cclxuXHJcbmludGVyZmFjZSBSZWNlaXZlU3BlY2lhbE9mZmVyc0FjdGlvbiB7XHJcbiAgICB0eXBlOiAnUkVDRUlWRV9TUEVDSUFMX09GRkVSUyc7XHJcbiAgICBwYWdlVXJsOiBzdHJpbmc7XHJcbiAgICBwYWdlU2l6ZTogbnVtYmVyO1xyXG4gICAgZmlsdGVyOiBzdHJpbmcgfCBudWxsO1xyXG4gICAgY2F0ZWdvcnlJZDogc3RyaW5nIHwgbnVsbDtcclxuICAgIGxvY2F0aW9uSWQ6IHN0cmluZyB8IG51bGw7XHJcbiAgICBvZmZlcnM6IElTcGVjaWFsT2ZmZXJbXTtcclxuICAgIHRvdGFsUmVzdWx0czogbnVtYmVyO1xyXG4gICAgdG90YWxQYWdlczogbnVtYmVyO1xyXG4gICAgcGFnZTogbnVtYmVyO1xyXG4gICAgZmlyc3RQYWdlVXJsOiBzdHJpbmcgfCBudWxsO1xyXG4gICAgcHJldlBhZ2VVcmw6IHN0cmluZyB8IG51bGw7XHJcbiAgICBuZXh0UGFnZVVybDogc3RyaW5nIHwgbnVsbDtcclxuICAgIGxhc3RQYWdlVXJsOiBzdHJpbmcgfCBudWxsO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgUmVxdWVzdFNwZWNpYWxPZmZlcnNQYWdlQWN0aW9uIHtcclxuICAgIHR5cGU6ICdSRVFVRVNUX1NQRUNJQUxfT0ZGRVJTX1BBR0UnO1xyXG4gICAgcGFnZVVybDogc3RyaW5nIHwgbnVsbDtcclxufVxyXG5cclxuaW50ZXJmYWNlIFJlY2VpdmVTcGVjaWFsT2ZmZXJzUGFnZUFjdGlvbiB7XHJcbiAgICB0eXBlOiAnUkVDRUlWRV9TUEVDSUFMX09GRkVSU19QQUdFJztcclxuICAgIHBhZ2VVcmw6IHN0cmluZztcclxuICAgIG9mZmVyczogSVNwZWNpYWxPZmZlcltdO1xyXG4gICAgdG90YWxSZXN1bHRzOiBudW1iZXI7XHJcbiAgICB0b3RhbFBhZ2VzOiBudW1iZXI7XHJcbiAgICBwYWdlOiBudW1iZXI7XHJcbiAgICBmaXJzdFBhZ2VVcmw6IHN0cmluZyB8IG51bGw7XHJcbiAgICBwcmV2UGFnZVVybDogc3RyaW5nIHwgbnVsbDtcclxuICAgIG5leHRQYWdlVXJsOiBzdHJpbmcgfCBudWxsO1xyXG4gICAgbGFzdFBhZ2VVcmw6IHN0cmluZyB8IG51bGw7XHJcbn1cclxuXHJcbi8vIERlY2xhcmUgYSAnZGlzY3JpbWluYXRlZCB1bmlvbicgdHlwZS4gVGhpcyBndWFyYW50ZWVzIHRoYXQgYWxsIHJlZmVyZW5jZXMgdG8gJ3R5cGUnIHByb3BlcnRpZXMgY29udGFpbiBvbmUgb2YgdGhlXHJcbi8vIGRlY2xhcmVkIHR5cGUgc3RyaW5ncyAoYW5kIG5vdCBhbnkgb3RoZXIgYXJiaXRyYXJ5IHN0cmluZykuXHJcbnR5cGUgS25vd25BY3Rpb24gPVxyXG4gICAgUmVxdWVzdFNwZWNpYWxPZmZlcnNBY3Rpb24gfFxyXG4gICAgUmVjZWl2ZVNwZWNpYWxPZmZlcnNBY3Rpb24gfFxyXG4gICAgUmVxdWVzdFNwZWNpYWxPZmZlcnNQYWdlQWN0aW9uIHxcclxuICAgIFJlY2VpdmVTcGVjaWFsT2ZmZXJzUGFnZUFjdGlvbjtcclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS1cclxuLy8gQUNUSU9OIENSRUFUT1JTIC0gVGhlc2UgYXJlIGZ1bmN0aW9ucyBleHBvc2VkIHRvIFVJIGNvbXBvbmVudHMgdGhhdCB3aWxsIHRyaWdnZXIgYSBzdGF0ZSB0cmFuc2l0aW9uLlxyXG4vLyBUaGV5IGRvbid0IGRpcmVjdGx5IG11dGF0ZSBzdGF0ZSwgYnV0IHRoZXkgY2FuIGhhdmUgZXh0ZXJuYWwgc2lkZS1lZmZlY3RzIChzdWNoIGFzIGxvYWRpbmcgZGF0YSkuXHJcblxyXG5leHBvcnQgY29uc3QgYWN0aW9uQ3JlYXRvcnMgPSB7XHJcbiAgICByZXF1ZXN0U3BlY2lhbE9mZmVyczogKFxyXG4gICAgICAgIHBhZ2VTaXplOiBudW1iZXIgPSAxMCxcclxuICAgICAgICBmaWx0ZXI6IHN0cmluZyB8IG51bGwsXHJcbiAgICAgICAgY2F0ZWdvcnlJZDogc3RyaW5nIHwgbnVsbCxcclxuICAgICAgICBsb2NhdGlvbklkOiBzdHJpbmcgfCBudWxsKTogQXBwVGh1bmtBY3Rpb248S25vd25BY3Rpb24+ID0+XHJcbiAgICAgICAgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgLy8gT25seSBsb2FkIGRhdGEgaWYgaXQncyBzb21ldGhpbmcgd2UgZG9uJ3QgYWxyZWFkeSBoYXZlIChhbmQgYXJlIG5vdCBhbHJlYWR5IGxvYWRpbmcpXHJcbiAgICAgICAgICAgIGlmIChwYWdlU2l6ZSAhPT0gZ2V0U3RhdGUoKS5zcGVjaWFsT2ZmZXJzLnBhZ2VTaXplIHx8XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXIgIT09IGdldFN0YXRlKCkuc3BlY2lhbE9mZmVycy5maWx0ZXIgfHxcclxuICAgICAgICAgICAgICAgIGNhdGVnb3J5SWQgIT09IGdldFN0YXRlKCkuc3BlY2lhbE9mZmVycy5jYXRlZ29yeUlkIHx8XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbklkICE9PSBnZXRTdGF0ZSgpLnNwZWNpYWxPZmZlcnMubG9jYXRpb25JZCkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEJ1aWxkIHJlcXVlc3QgVVJJXHJcbiAgICAgICAgICAgICAgICB2YXIgdXJpID0gJ2FwaS9zcGVjaWFsLW9mZmVycyc7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNhdGVnb3J5SWQgIT09IG51bGwgJiYgY2F0ZWdvcnlJZC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJpICs9IGAvY2F0ZWdvcnkvJHtjYXRlZ29yeUlkfWA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2NhdGlvbklkICE9PSBudWxsICYmIGxvY2F0aW9uSWQubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmkgKz0gYC9sb2NhdGlvbi8ke2xvY2F0aW9uSWR9YDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdXJpICs9IGA/cGFnZUluZGV4PTEmcGFnZVNpemU9JHtwYWdlU2l6ZX1gO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIgIT09IG51bGwgJiYgZmlsdGVyLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB1cmkgKz0gYCZmaWx0ZXI9JHtmaWx0ZXJ9YDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZmV0Y2hUYXNrID0gZmV0Y2godXJpKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSBhcyBQcm9taXNlPElTcGVjaWFsT2ZmZXJzSGFsPilcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ1JFQ0VJVkVfU1BFQ0lBTF9PRkZFUlMnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFnZVVybDogdXJpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFnZVNpemU6IHBhZ2VTaXplLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyOiBmaWx0ZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeUlkOiBjYXRlZ29yeUlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb25JZDogbG9jYXRpb25JZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9mZmVyczogZGF0YS5fZW1iZWRkZWRbXCJzcGVjaWFsLW9mZmVyXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG90YWxSZXN1bHRzOiBkYXRhLnRvdGFsUmVzdWx0cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdGFsUGFnZXM6IGRhdGEudG90YWxQYWdlcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2U6IGRhdGEucGFnZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0UGFnZVVybDogKHR5cGVvZiBkYXRhLl9saW5rc1tcImZpcnN0XCJdICE9PSAndW5kZWZpbmVkJykgPyBkYXRhLl9saW5rc1tcImZpcnN0XCJdLmhyZWYgOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldlBhZ2VVcmw6ICh0eXBlb2YgZGF0YS5fbGlua3NbXCJwcmV2XCJdICE9PSAndW5kZWZpbmVkJykgPyBkYXRhLl9saW5rc1tcInByZXZcIl0uaHJlZiA6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0UGFnZVVybDogKHR5cGVvZiBkYXRhLl9saW5rc1tcIm5leHRcIl0gIT09ICd1bmRlZmluZWQnKSA/IGRhdGEuX2xpbmtzW1wibmV4dFwiXS5ocmVmIDogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RQYWdlVXJsOiAodHlwZW9mIGRhdGEuX2xpbmtzW1wibGFzdFwiXSAhPT0gJ3VuZGVmaW5lZCcpID8gZGF0YS5fbGlua3NbXCJsYXN0XCJdLmhyZWYgOiBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGFkZFRhc2soZmV0Y2hUYXNrKTsgLy8gRW5zdXJlIHNlcnZlci1zaWRlIHByZXJlbmRlcmluZyB3YWl0cyBmb3IgdGhpcyB0byBjb21wbGV0ZVxyXG4gICAgICAgICAgICAgICAgZGlzcGF0Y2goe1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdSRVFVRVNUX1NQRUNJQUxfT0ZGRVJTJyxcclxuICAgICAgICAgICAgICAgICAgICBwYWdlU2l6ZTogcGFnZVNpemUsXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyOiBmaWx0ZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnlJZDogY2F0ZWdvcnlJZCxcclxuICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbklkOiBsb2NhdGlvbklkXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICByZXF1ZXN0U3BlY2lhbE9mZmVyUGFnZTogKHBhZ2VVcmk6IHN0cmluZyk6IEFwcFRodW5rQWN0aW9uPEtub3duQWN0aW9uPiA9PlxyXG4gICAgICAgIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcclxuICAgICAgICAgICAgLy8gT25seSBsb2FkIGRhdGEgaWYgcGFnZSBVUkkgaXMgYm90aCB2YWxpZCBhbmQgZGlmZmVyZW50IGZyb20gY3VycmVudFxyXG4gICAgICAgICAgICBpZiAocGFnZVVyaSAhPT0gbnVsbCAmJlxyXG4gICAgICAgICAgICAgICAgcGFnZVVyaSAhPT0gZ2V0U3RhdGUoKS5zcGVjaWFsT2ZmZXJzLnBhZ2VVcmwpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZmV0Y2hUYXNrID0gZmV0Y2gocGFnZVVyaSlcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkgYXMgUHJvbWlzZTxJU3BlY2lhbE9mZmVyc0hhbD4pXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdSRUNFSVZFX1NQRUNJQUxfT0ZGRVJTX1BBR0UnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFnZVVybDogcGFnZVVyaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9mZmVyczogZGF0YS5fZW1iZWRkZWRbXCJzcGVjaWFsLW9mZmVyXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG90YWxSZXN1bHRzOiBkYXRhLnRvdGFsUmVzdWx0cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdGFsUGFnZXM6IGRhdGEudG90YWxQYWdlcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2U6IGRhdGEucGFnZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0UGFnZVVybDogKHR5cGVvZiBkYXRhLl9saW5rc1tcImZpcnN0XCJdICE9PSAndW5kZWZpbmVkJykgPyBkYXRhLl9saW5rc1tcImZpcnN0XCJdLmhyZWYgOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldlBhZ2VVcmw6ICh0eXBlb2YgZGF0YS5fbGlua3NbXCJwcmV2XCJdICE9PSAndW5kZWZpbmVkJykgPyBkYXRhLl9saW5rc1tcInByZXZcIl0uaHJlZiA6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0UGFnZVVybDogKHR5cGVvZiBkYXRhLl9saW5rc1tcIm5leHRcIl0gIT09ICd1bmRlZmluZWQnKSA/IGRhdGEuX2xpbmtzW1wibmV4dFwiXS5ocmVmIDogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RQYWdlVXJsOiAodHlwZW9mIGRhdGEuX2xpbmtzW1wibGFzdFwiXSAhPT0gJ3VuZGVmaW5lZCcpID8gZGF0YS5fbGlua3NbXCJsYXN0XCJdLmhyZWYgOiBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGFkZFRhc2soZmV0Y2hUYXNrKTsgLy8gRW5zdXJlIHNlcnZlci1zaWRlIHByZXJlbmRlcmluZyB3YWl0cyBmb3IgdGhpcyB0byBjb21wbGV0ZVxyXG4gICAgICAgICAgICAgICAgZGlzcGF0Y2goe1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdSRVFVRVNUX1NQRUNJQUxfT0ZGRVJTX1BBR0UnLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VVcmw6IHBhZ2VVcmlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG59O1xyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyBSRURVQ0VSIC0gRm9yIGEgZ2l2ZW4gc3RhdGUgYW5kIGFjdGlvbiwgcmV0dXJucyB0aGUgbmV3IHN0YXRlLiBUbyBzdXBwb3J0IHRpbWUgdHJhdmVsLCB0aGlzIG11c3Qgbm90IG11dGF0ZSB0aGUgb2xkIHN0YXRlLlxyXG5cclxuY29uc3QgdW5sb2FkZWRTdGF0ZTogU3BlY2lhbE9mZmVyc1N0YXRlID0ge1xyXG4gICAgaXNMb2FkaW5nOiBmYWxzZSxcclxuICAgIHBhZ2VTaXplOiAwLFxyXG4gICAgcGFnZVVybDogbnVsbCxcclxuICAgIGZpbHRlcjogbnVsbCxcclxuICAgIGNhdGVnb3J5SWQ6IG51bGwsXHJcbiAgICBsb2NhdGlvbklkOiBudWxsLFxyXG4gICAgb2ZmZXJzOiBbXSxcclxuICAgIHRvdGFsUmVzdWx0czogMCxcclxuICAgIHRvdGFsUGFnZXM6IDAsXHJcbiAgICBwYWdlOiAwLFxyXG4gICAgZmlyc3RQYWdlVXJsOiBudWxsLFxyXG4gICAgcHJldlBhZ2VVcmw6IG51bGwsXHJcbiAgICBuZXh0UGFnZVVybDogbnVsbCxcclxuICAgIGxhc3RQYWdlVXJsOiBudWxsXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgcmVkdWNlcjogUmVkdWNlcjxTcGVjaWFsT2ZmZXJzU3RhdGU+ID0gKHN0YXRlOiBTcGVjaWFsT2ZmZXJzU3RhdGUsIGluY29taW5nQWN0aW9uOiBBY3Rpb24pID0+IHtcclxuICAgIGNvbnN0IGFjdGlvbiA9IGluY29taW5nQWN0aW9uIGFzIEtub3duQWN0aW9uO1xyXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xyXG4gICAgICAgIGNhc2UgJ1JFUVVFU1RfU1BFQ0lBTF9PRkZFUlMnOlxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgcGFnZVNpemU6IGFjdGlvbi5wYWdlU2l6ZSxcclxuICAgICAgICAgICAgICAgIGZpbHRlcjogYWN0aW9uLmZpbHRlcixcclxuICAgICAgICAgICAgICAgIGNhdGVnb3J5SWQ6IGFjdGlvbi5jYXRlZ29yeUlkLFxyXG4gICAgICAgICAgICAgICAgbG9jYXRpb25JZDogYWN0aW9uLmxvY2F0aW9uSWQsXHJcbiAgICAgICAgICAgICAgICBwYWdlVXJsOiBzdGF0ZS5wYWdlVXJsLFxyXG4gICAgICAgICAgICAgICAgb2ZmZXJzOiBzdGF0ZS5vZmZlcnMsXHJcbiAgICAgICAgICAgICAgICB0b3RhbFJlc3VsdHM6IHN0YXRlLnRvdGFsUmVzdWx0cyxcclxuICAgICAgICAgICAgICAgIHRvdGFsUGFnZXM6IHN0YXRlLnRvdGFsUGFnZXMsXHJcbiAgICAgICAgICAgICAgICBwYWdlOiBzdGF0ZS5wYWdlLFxyXG4gICAgICAgICAgICAgICAgZmlyc3RQYWdlVXJsOiBzdGF0ZS5maXJzdFBhZ2VVcmwsXHJcbiAgICAgICAgICAgICAgICBwcmV2UGFnZVVybDogc3RhdGUucHJldlBhZ2VVcmwsXHJcbiAgICAgICAgICAgICAgICBuZXh0UGFnZVVybDogc3RhdGUubmV4dFBhZ2VVcmwsXHJcbiAgICAgICAgICAgICAgICBsYXN0UGFnZVVybDogc3RhdGUubGFzdFBhZ2VVcmwsXHJcbiAgICAgICAgICAgICAgICBpc0xvYWRpbmc6IHRydWVcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICBjYXNlICdSRUNFSVZFX1NQRUNJQUxfT0ZGRVJTJzpcclxuICAgICAgICAgICAgLy8gT25seSBhY2NlcHQgdGhlIGluY29taW5nIGRhdGEgaWYgaXQgbWF0Y2hlcyB0aGUgbW9zdCByZWNlbnQgcmVxdWVzdC4gVGhpcyBlbnN1cmVzIHdlIGNvcnJlY3RseVxyXG4gICAgICAgICAgICAvLyBoYW5kbGUgb3V0LW9mLW9yZGVyIHJlc3BvbnNlcy5cclxuICAgICAgICAgICAgaWYgKGFjdGlvbi5wYWdlU2l6ZSA9PT0gc3RhdGUucGFnZVNpemUgJiZcclxuICAgICAgICAgICAgICAgIGFjdGlvbi5maWx0ZXIgPT09IHN0YXRlLmZpbHRlciAmJlxyXG4gICAgICAgICAgICAgICAgYWN0aW9uLmNhdGVnb3J5SWQgPT09IHN0YXRlLmNhdGVnb3J5SWQgJiZcclxuICAgICAgICAgICAgICAgIGFjdGlvbi5sb2NhdGlvbklkID09PSBzdGF0ZS5sb2NhdGlvbklkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VTaXplOiBhY3Rpb24ucGFnZVNpemUsXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyOiBhY3Rpb24uZmlsdGVyLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5SWQ6IGFjdGlvbi5jYXRlZ29yeUlkLFxyXG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uSWQ6IGFjdGlvbi5sb2NhdGlvbklkLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VVcmw6IGFjdGlvbi5wYWdlVXJsLFxyXG4gICAgICAgICAgICAgICAgICAgIG9mZmVyczogYWN0aW9uLm9mZmVycyxcclxuICAgICAgICAgICAgICAgICAgICB0b3RhbFJlc3VsdHM6IGFjdGlvbi50b3RhbFJlc3VsdHMsXHJcbiAgICAgICAgICAgICAgICAgICAgdG90YWxQYWdlczogYWN0aW9uLnRvdGFsUGFnZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZTogYWN0aW9uLnBhZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RQYWdlVXJsOiBhY3Rpb24uZmlyc3RQYWdlVXJsLFxyXG4gICAgICAgICAgICAgICAgICAgIHByZXZQYWdlVXJsOiBhY3Rpb24ucHJldlBhZ2VVcmwsXHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dFBhZ2VVcmw6IGFjdGlvbi5uZXh0UGFnZVVybCxcclxuICAgICAgICAgICAgICAgICAgICBsYXN0UGFnZVVybDogYWN0aW9uLmxhc3RQYWdlVXJsLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzTG9hZGluZzogZmFsc2VcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnUkVRVUVTVF9TUEVDSUFMX09GRkVSU19QQUdFJzpcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHBhZ2VVcmw6IGFjdGlvbi5wYWdlVXJsLFxyXG4gICAgICAgICAgICAgICAgcGFnZVNpemU6IHN0YXRlLnBhZ2VTaXplLFxyXG4gICAgICAgICAgICAgICAgZmlsdGVyOiBzdGF0ZS5maWx0ZXIsXHJcbiAgICAgICAgICAgICAgICBjYXRlZ29yeUlkOiBzdGF0ZS5jYXRlZ29yeUlkLFxyXG4gICAgICAgICAgICAgICAgbG9jYXRpb25JZDogc3RhdGUubG9jYXRpb25JZCxcclxuICAgICAgICAgICAgICAgIG9mZmVyczogc3RhdGUub2ZmZXJzLFxyXG4gICAgICAgICAgICAgICAgdG90YWxSZXN1bHRzOiBzdGF0ZS50b3RhbFJlc3VsdHMsXHJcbiAgICAgICAgICAgICAgICB0b3RhbFBhZ2VzOiBzdGF0ZS50b3RhbFBhZ2VzLFxyXG4gICAgICAgICAgICAgICAgcGFnZTogc3RhdGUucGFnZSxcclxuICAgICAgICAgICAgICAgIGZpcnN0UGFnZVVybDogc3RhdGUuZmlyc3RQYWdlVXJsLFxyXG4gICAgICAgICAgICAgICAgcHJldlBhZ2VVcmw6IHN0YXRlLnByZXZQYWdlVXJsLFxyXG4gICAgICAgICAgICAgICAgbmV4dFBhZ2VVcmw6IHN0YXRlLm5leHRQYWdlVXJsLFxyXG4gICAgICAgICAgICAgICAgbGFzdFBhZ2VVcmw6IHN0YXRlLmxhc3RQYWdlVXJsLFxyXG4gICAgICAgICAgICAgICAgaXNMb2FkaW5nOiB0cnVlXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgY2FzZSAnUkVDRUlWRV9TUEVDSUFMX09GRkVSU19QQUdFJzpcclxuICAgICAgICAgICAgLy8gT25seSBhY2NlcHQgdGhlIGluY29taW5nIGRhdGEgaWYgaXQgbWF0Y2hlcyB0aGUgbW9zdCByZWNlbnQgcmVxdWVzdC4gVGhpcyBlbnN1cmVzIHdlIGNvcnJlY3RseVxyXG4gICAgICAgICAgICAvLyBoYW5kbGUgb3V0LW9mLW9yZGVyIHJlc3BvbnNlcy5cclxuICAgICAgICAgICAgaWYgKGFjdGlvbi5wYWdlVXJsID09PSBzdGF0ZS5wYWdlVXJsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VVcmw6IGFjdGlvbi5wYWdlVXJsLFxyXG4gICAgICAgICAgICAgICAgICAgIG9mZmVyczogYWN0aW9uLm9mZmVycyxcclxuICAgICAgICAgICAgICAgICAgICB0b3RhbFJlc3VsdHM6IGFjdGlvbi50b3RhbFJlc3VsdHMsXHJcbiAgICAgICAgICAgICAgICAgICAgdG90YWxQYWdlczogYWN0aW9uLnRvdGFsUGFnZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZTogYWN0aW9uLnBhZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RQYWdlVXJsOiBhY3Rpb24uZmlyc3RQYWdlVXJsLFxyXG4gICAgICAgICAgICAgICAgICAgIHByZXZQYWdlVXJsOiBhY3Rpb24ucHJldlBhZ2VVcmwsXHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dFBhZ2VVcmw6IGFjdGlvbi5uZXh0UGFnZVVybCxcclxuICAgICAgICAgICAgICAgICAgICBsYXN0UGFnZVVybDogYWN0aW9uLmxhc3RQYWdlVXJsLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VTaXplOiBzdGF0ZS5wYWdlU2l6ZSxcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXI6IHN0YXRlLmZpbHRlcixcclxuICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeUlkOiBzdGF0ZS5jYXRlZ29yeUlkLFxyXG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uSWQ6IHN0YXRlLmxvY2F0aW9uSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgaXNMb2FkaW5nOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAvLyBUaGUgZm9sbG93aW5nIGxpbmUgZ3VhcmFudGVlcyB0aGF0IGV2ZXJ5IGFjdGlvbiBpbiB0aGUgS25vd25BY3Rpb24gdW5pb24gaGFzIGJlZW4gY292ZXJlZCBieSBhIGNhc2UgYWJvdmVcclxuICAgICAgICAgICAgY29uc3QgZXhoYXVzdGl2ZUNoZWNrOiBuZXZlciA9IGFjdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc3RhdGUgfHwgdW5sb2FkZWRTdGF0ZTtcclxufTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQ2xpZW50QXBwL3N0b3JlL1NwZWNpYWxPZmZlcnMudHMiLCJpbXBvcnQgeyBjcmVhdGVTdG9yZSwgYXBwbHlNaWRkbGV3YXJlLCBjb21wb3NlLCBjb21iaW5lUmVkdWNlcnMsIEdlbmVyaWNTdG9yZUVuaGFuY2VyLCBTdG9yZSwgU3RvcmVFbmhhbmNlclN0b3JlQ3JlYXRvciwgUmVkdWNlcnNNYXBPYmplY3QgfSBmcm9tICdyZWR1eCc7XHJcbmltcG9ydCB0aHVuayBmcm9tICdyZWR1eC10aHVuayc7XHJcbmltcG9ydCB7IHJvdXRlclJlZHVjZXIsIHJvdXRlck1pZGRsZXdhcmUgfSBmcm9tICdyZWFjdC1yb3V0ZXItcmVkdXgnO1xyXG5pbXBvcnQgKiBhcyBTdG9yZU1vZHVsZSBmcm9tICcuL3N0b3JlJztcclxuaW1wb3J0IHsgQXBwbGljYXRpb25TdGF0ZSwgcmVkdWNlcnMgfSBmcm9tICcuL3N0b3JlJztcclxuaW1wb3J0IHsgSGlzdG9yeSB9IGZyb20gJ2hpc3RvcnknO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29uZmlndXJlU3RvcmUoaGlzdG9yeTogSGlzdG9yeSwgaW5pdGlhbFN0YXRlPzogQXBwbGljYXRpb25TdGF0ZSkge1xyXG4gICAgLy8gQnVpbGQgbWlkZGxld2FyZS4gVGhlc2UgYXJlIGZ1bmN0aW9ucyB0aGF0IGNhbiBwcm9jZXNzIHRoZSBhY3Rpb25zIGJlZm9yZSB0aGV5IHJlYWNoIHRoZSBzdG9yZS5cclxuICAgIGNvbnN0IHdpbmRvd0lmRGVmaW5lZCA9IHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnID8gbnVsbCA6IHdpbmRvdyBhcyBhbnk7XHJcblxyXG4gICAgLy8gSWYgZGV2VG9vbHMgaXMgaW5zdGFsbGVkLCBjb25uZWN0IHRvIGl0XHJcbiAgICBjb25zdCBkZXZUb29sc0V4dGVuc2lvbiA9IHdpbmRvd0lmRGVmaW5lZCAmJiB3aW5kb3dJZkRlZmluZWQuX19SRURVWF9ERVZUT09MU19FWFRFTlNJT05fXyBhcyAoKSA9PiBHZW5lcmljU3RvcmVFbmhhbmNlcjtcclxuICAgIGNvbnN0IGNyZWF0ZVN0b3JlV2l0aE1pZGRsZXdhcmUgPSBjb21wb3NlKFxyXG4gICAgICAgIGFwcGx5TWlkZGxld2FyZSh0aHVuaywgcm91dGVyTWlkZGxld2FyZShoaXN0b3J5KSksXHJcbiAgICAgICAgZGV2VG9vbHNFeHRlbnNpb24gPyBkZXZUb29sc0V4dGVuc2lvbigpIDogPFM+KG5leHQ6IFN0b3JlRW5oYW5jZXJTdG9yZUNyZWF0b3I8Uz4pID0+IG5leHRcclxuICAgICkoY3JlYXRlU3RvcmUpO1xyXG5cclxuICAgIC8vIENvbWJpbmUgYWxsIHJlZHVjZXJzIGFuZCBpbnN0YW50aWF0ZSB0aGUgYXBwLXdpZGUgc3RvcmUgaW5zdGFuY2VcclxuICAgIGNvbnN0IGFsbFJlZHVjZXJzID0gYnVpbGRSb290UmVkdWNlcihyZWR1Y2Vycyk7XHJcbiAgICBjb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlV2l0aE1pZGRsZXdhcmUoYWxsUmVkdWNlcnMsIGluaXRpYWxTdGF0ZSkgYXMgU3RvcmU8QXBwbGljYXRpb25TdGF0ZT47XHJcblxyXG4gICAgLy8gRW5hYmxlIFdlYnBhY2sgaG90IG1vZHVsZSByZXBsYWNlbWVudCBmb3IgcmVkdWNlcnNcclxuICAgIGlmIChtb2R1bGUuaG90KSB7XHJcbiAgICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoJy4vc3RvcmUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5leHRSb290UmVkdWNlciA9IHJlcXVpcmU8dHlwZW9mIFN0b3JlTW9kdWxlPignLi9zdG9yZScpO1xyXG4gICAgICAgICAgICBzdG9yZS5yZXBsYWNlUmVkdWNlcihidWlsZFJvb3RSZWR1Y2VyKG5leHRSb290UmVkdWNlci5yZWR1Y2VycykpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzdG9yZTtcclxufVxyXG5cclxuZnVuY3Rpb24gYnVpbGRSb290UmVkdWNlcihhbGxSZWR1Y2VyczogUmVkdWNlcnNNYXBPYmplY3QpIHtcclxuICAgIHJldHVybiBjb21iaW5lUmVkdWNlcnM8QXBwbGljYXRpb25TdGF0ZT4oT2JqZWN0LmFzc2lnbih7fSwgYWxsUmVkdWNlcnMsIHsgcm91dGluZzogcm91dGVyUmVkdWNlciB9KSk7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQ2xpZW50QXBwL2NvbmZpZ3VyZVN0b3JlLnRzIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBSb3V0ZSB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xyXG5pbXBvcnQgeyBMYXlvdXQgfSBmcm9tICcuL2NvbXBvbmVudHMvTGF5b3V0JztcclxuaW1wb3J0IHsgSG9tZSB9IGZyb20gJy4vY29tcG9uZW50cy9Ib21lJztcclxuaW1wb3J0IFNwZWNpYWxPZmZlcnNGZXRjaERhdGEgZnJvbSAnLi9jb21wb25lbnRzL1NwZWNpYWxPZmZlcnMnO1xyXG5cclxuZXhwb3J0IGNvbnN0IHJvdXRlcyA9IDxMYXlvdXQ+XHJcbiAgICA8Um91dGUgZXhhY3QgcGF0aD0nLycgY29tcG9uZW50PXsgSG9tZSB9IC8+XHJcbiAgICA8Um91dGUgcGF0aD0nL3NwZWNpYWwtb2ZmZXJzLzpjYXRlZ29yeUlkPy86bG9jYXRpb25JZD8nIGNvbXBvbmVudD17IFNwZWNpYWxPZmZlcnNGZXRjaERhdGEgfSAvPlxyXG48L0xheW91dD47XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0NsaWVudEFwcC9yb3V0ZXMudHN4IiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygwKSkoMTQ1KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvYXNwbmV0LXByZXJlbmRlcmluZy9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3Jcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygwKSkoMTUwKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvaGlzdG9yeS9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3Jcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygwKSkoMTUyKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcmVhY3QtZG9tL3NlcnZlci5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3Jcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1yZWR1eCc7XHJcbmltcG9ydCB7IHJlbmRlclRvU3RyaW5nIH0gZnJvbSAncmVhY3QtZG9tL3NlcnZlcic7XHJcbmltcG9ydCB7IFN0YXRpY1JvdXRlciB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xyXG5pbXBvcnQgeyByZXBsYWNlIH0gZnJvbSAncmVhY3Qtcm91dGVyLXJlZHV4JztcclxuaW1wb3J0IHsgY3JlYXRlTWVtb3J5SGlzdG9yeSB9IGZyb20gJ2hpc3RvcnknO1xyXG5pbXBvcnQgeyBjcmVhdGVTZXJ2ZXJSZW5kZXJlciwgUmVuZGVyUmVzdWx0IH0gZnJvbSAnYXNwbmV0LXByZXJlbmRlcmluZyc7XHJcbmltcG9ydCB7IHJvdXRlcyB9IGZyb20gJy4vcm91dGVzJztcclxuaW1wb3J0IGNvbmZpZ3VyZVN0b3JlIGZyb20gJy4vY29uZmlndXJlU3RvcmUnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlU2VydmVyUmVuZGVyZXIocGFyYW1zID0+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxSZW5kZXJSZXN1bHQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAvLyBQcmVwYXJlIFJlZHV4IHN0b3JlIHdpdGggaW4tbWVtb3J5IGhpc3RvcnksIGFuZCBkaXNwYXRjaCBhIG5hdmlnYXRpb24gZXZlbnRcclxuICAgICAgICAvLyBjb3JyZXNwb25kaW5nIHRvIHRoZSBpbmNvbWluZyBVUkxcclxuICAgICAgICBjb25zdCBiYXNlbmFtZSA9IHBhcmFtcy5iYXNlVXJsLnN1YnN0cmluZygwLCBwYXJhbXMuYmFzZVVybC5sZW5ndGggLSAxKTsgLy8gUmVtb3ZlIHRyYWlsaW5nIHNsYXNoXHJcbiAgICAgICAgY29uc3QgdXJsQWZ0ZXJCYXNlbmFtZSA9IHBhcmFtcy51cmwuc3Vic3RyaW5nKGJhc2VuYW1lLmxlbmd0aCk7XHJcbiAgICAgICAgY29uc3Qgc3RvcmUgPSBjb25maWd1cmVTdG9yZShjcmVhdGVNZW1vcnlIaXN0b3J5KCkpO1xyXG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKHJlcGxhY2UodXJsQWZ0ZXJCYXNlbmFtZSkpO1xyXG5cclxuICAgICAgICAvLyBQcmVwYXJlIGFuIGluc3RhbmNlIG9mIHRoZSBhcHBsaWNhdGlvbiBhbmQgcGVyZm9ybSBhbiBpbml0YWwgcmVuZGVyIHRoYXQgd2lsbFxyXG4gICAgICAgIC8vIGNhdXNlIGFueSBhc3luYyB0YXNrcyAoZS5nLiwgZGF0YSBhY2Nlc3MpIHRvIGJlZ2luXHJcbiAgICAgICAgY29uc3Qgcm91dGVyQ29udGV4dDogYW55ID0ge307XHJcbiAgICAgICAgY29uc3QgYXBwID0gKFxyXG4gICAgICAgICAgICA8UHJvdmlkZXIgc3RvcmU9eyBzdG9yZSB9PlxyXG4gICAgICAgICAgICAgICAgPFN0YXRpY1JvdXRlciBiYXNlbmFtZT17IGJhc2VuYW1lIH0gY29udGV4dD17IHJvdXRlckNvbnRleHQgfSBsb2NhdGlvbj17IHBhcmFtcy5sb2NhdGlvbi5wYXRoIH0gY2hpbGRyZW49eyByb3V0ZXMgfSAvPlxyXG4gICAgICAgICAgICA8L1Byb3ZpZGVyPlxyXG4gICAgICAgICk7XHJcbiAgICAgICAgcmVuZGVyVG9TdHJpbmcoYXBwKTtcclxuXHJcbiAgICAgICAgLy8gSWYgdGhlcmUncyBhIHJlZGlyZWN0aW9uLCBqdXN0IHNlbmQgdGhpcyBpbmZvcm1hdGlvbiBiYWNrIHRvIHRoZSBob3N0IGFwcGxpY2F0aW9uXHJcbiAgICAgICAgaWYgKHJvdXRlckNvbnRleHQudXJsKSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUoeyByZWRpcmVjdFVybDogcm91dGVyQ29udGV4dC51cmwgfSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gT25jZSBhbnkgYXN5bmMgdGFza3MgYXJlIGRvbmUsIHdlIGNhbiBwZXJmb3JtIHRoZSBmaW5hbCByZW5kZXJcclxuICAgICAgICAvLyBXZSBhbHNvIHNlbmQgdGhlIHJlZHV4IHN0b3JlIHN0YXRlLCBzbyB0aGUgY2xpZW50IGNhbiBjb250aW51ZSBleGVjdXRpb24gd2hlcmUgdGhlIHNlcnZlciBsZWZ0IG9mZlxyXG4gICAgICAgIHBhcmFtcy5kb21haW5UYXNrcy50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgcmVzb2x2ZSh7XHJcbiAgICAgICAgICAgICAgICBodG1sOiByZW5kZXJUb1N0cmluZyhhcHApLFxyXG4gICAgICAgICAgICAgICAgZ2xvYmFsczogeyBpbml0aWFsUmVkdXhTdGF0ZTogc3RvcmUuZ2V0U3RhdGUoKSB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sIHJlamVjdCk7IC8vIEFsc28gcHJvcGFnYXRlIGFueSBlcnJvcnMgYmFjayBpbnRvIHRoZSBob3N0IGFwcGxpY2F0aW9uXHJcbiAgICB9KTtcclxufSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0NsaWVudEFwcC9ib290LXNlcnZlci50c3giLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IFJvdXRlQ29tcG9uZW50UHJvcHMgfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xyXG5cclxuZXhwb3J0IGNsYXNzIEhvbWUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8Um91dGVDb21wb25lbnRQcm9wczxhbnk+LCBhbnk+IHtcclxuICAgIHB1YmxpYyByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIDxkaXY+XHJcbiAgICAgICAgICAgIDxoMT5IZWxsbywgd29ybGQhPC9oMT5cclxuICAgICAgICAgICAgPHA+V2VsY29tZSB0byB5b3VyIG5ldyBzaW5nbGUtcGFnZSBhcHBsaWNhdGlvbiwgYnVpbHQgd2l0aDo8L3A+XHJcbiAgICAgICAgICAgIDx1bD5cclxuICAgICAgICAgICAgICAgIDxsaT48YSBocmVmPSdodHRwczovL2dldC5hc3AubmV0Lyc+QVNQLk5FVCBDb3JlPC9hPiBhbmQgPGEgaHJlZj0naHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS82N2VmOHNiZC5hc3B4Jz5DIzwvYT4gZm9yIGNyb3NzLXBsYXRmb3JtIHNlcnZlci1zaWRlIGNvZGU8L2xpPlxyXG4gICAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9J2h0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0Lyc+UmVhY3Q8L2E+IGFuZCA8YSBocmVmPSdodHRwOi8vd3d3LnR5cGVzY3JpcHRsYW5nLm9yZy8nPlR5cGVTY3JpcHQ8L2E+IGZvciBjbGllbnQtc2lkZSBjb2RlPC9saT5cclxuICAgICAgICAgICAgICAgIDxsaT48YSBocmVmPSdodHRwczovL3dlYnBhY2suZ2l0aHViLmlvLyc+V2VicGFjazwvYT4gZm9yIGJ1aWxkaW5nIGFuZCBidW5kbGluZyBjbGllbnQtc2lkZSByZXNvdXJjZXM8L2xpPlxyXG4gICAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9J2h0dHA6Ly9nZXRib290c3RyYXAuY29tLyc+Qm9vdHN0cmFwPC9hPiBmb3IgbGF5b3V0IGFuZCBzdHlsaW5nPC9saT5cclxuICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgPHA+VG8gaGVscCB5b3UgZ2V0IHN0YXJ0ZWQsIHdlJ3ZlIGFsc28gc2V0IHVwOjwvcD5cclxuICAgICAgICAgICAgPHVsPlxyXG4gICAgICAgICAgICAgICAgPGxpPjxzdHJvbmc+Q2xpZW50LXNpZGUgbmF2aWdhdGlvbjwvc3Ryb25nPi4gRm9yIGV4YW1wbGUsIGNsaWNrIDxlbT5Db3VudGVyPC9lbT4gdGhlbiA8ZW0+QmFjazwvZW0+IHRvIHJldHVybiBoZXJlLjwvbGk+XHJcbiAgICAgICAgICAgICAgICA8bGk+PHN0cm9uZz5XZWJwYWNrIGRldiBtaWRkbGV3YXJlPC9zdHJvbmc+LiBJbiBkZXZlbG9wbWVudCBtb2RlLCB0aGVyZSdzIG5vIG5lZWQgdG8gcnVuIHRoZSA8Y29kZT53ZWJwYWNrPC9jb2RlPiBidWlsZCB0b29sLiBZb3VyIGNsaWVudC1zaWRlIHJlc291cmNlcyBhcmUgZHluYW1pY2FsbHkgYnVpbHQgb24gZGVtYW5kLiBVcGRhdGVzIGFyZSBhdmFpbGFibGUgYXMgc29vbiBhcyB5b3UgbW9kaWZ5IGFueSBmaWxlLjwvbGk+XHJcbiAgICAgICAgICAgICAgICA8bGk+PHN0cm9uZz5Ib3QgbW9kdWxlIHJlcGxhY2VtZW50PC9zdHJvbmc+LiBJbiBkZXZlbG9wbWVudCBtb2RlLCB5b3UgZG9uJ3QgZXZlbiBuZWVkIHRvIHJlbG9hZCB0aGUgcGFnZSBhZnRlciBtYWtpbmcgbW9zdCBjaGFuZ2VzLiBXaXRoaW4gc2Vjb25kcyBvZiBzYXZpbmcgY2hhbmdlcyB0byBmaWxlcywgcmVidWlsdCBSZWFjdCBjb21wb25lbnRzIHdpbGwgYmUgaW5qZWN0ZWQgZGlyZWN0bHkgaW50byB5b3VyIHJ1bm5pbmcgYXBwbGljYXRpb24sIHByZXNlcnZpbmcgaXRzIGxpdmUgc3RhdGUuPC9saT5cclxuICAgICAgICAgICAgICAgIDxsaT48c3Ryb25nPkVmZmljaWVudCBwcm9kdWN0aW9uIGJ1aWxkczwvc3Ryb25nPi4gSW4gcHJvZHVjdGlvbiBtb2RlLCBkZXZlbG9wbWVudC10aW1lIGZlYXR1cmVzIGFyZSBkaXNhYmxlZCwgYW5kIHRoZSA8Y29kZT53ZWJwYWNrPC9jb2RlPiBidWlsZCB0b29sIHByb2R1Y2VzIG1pbmlmaWVkIHN0YXRpYyBDU1MgYW5kIEphdmFTY3JpcHQgZmlsZXMuPC9saT5cclxuICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgPGg0PkdvaW5nIGZ1cnRoZXI8L2g0PlxyXG4gICAgICAgICAgICA8cD5cclxuICAgICAgICAgICAgICAgIEZvciBsYXJnZXIgYXBwbGljYXRpb25zLCBvciBmb3Igc2VydmVyLXNpZGUgcHJlcmVuZGVyaW5nIChpLmUuLCBmb3IgPGVtPmlzb21vcnBoaWM8L2VtPiBvciA8ZW0+dW5pdmVyc2FsPC9lbT4gYXBwbGljYXRpb25zKSwgeW91IHNob3VsZCBjb25zaWRlciB1c2luZyBhIEZsdXgvUmVkdXgtbGlrZSBhcmNoaXRlY3R1cmUuXHJcbiAgICAgICAgICAgICAgICBZb3UgY2FuIGdlbmVyYXRlIGFuIEFTUC5ORVQgQ29yZSBhcHBsaWNhdGlvbiB3aXRoIFJlYWN0IGFuZCBSZWR1eCB1c2luZyA8Y29kZT5kb3RuZXQgbmV3IHJlYWN0cmVkdXg8L2NvZGU+IGluc3RlYWQgb2YgdXNpbmcgdGhpcyB0ZW1wbGF0ZS5cclxuICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgIDwvZGl2PjtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9DbGllbnRBcHAvY29tcG9uZW50cy9Ib21lLnRzeCIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgTmF2TWVudSB9IGZyb20gJy4vTmF2TWVudSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIExheW91dFByb3BzIHtcclxuICAgIGNoaWxkcmVuPzogUmVhY3QuUmVhY3ROb2RlO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTGF5b3V0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PExheW91dFByb3BzLCB7fT4ge1xyXG4gICAgcHVibGljIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9J2NvbnRhaW5lci1mbHVpZCc+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cnPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbC1zbS0xMic+XHJcbiAgICAgICAgICAgICAgICAgICAgPE5hdk1lbnUgLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3Jvdyc+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sLXNtLTEyJz5cclxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj47XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQ2xpZW50QXBwL2NvbXBvbmVudHMvTGF5b3V0LnRzeCIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgTGluaywgTmF2TGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xyXG5pbXBvcnQgKiBhcyBGb250QXdlc29tZSBmcm9tICdyZWFjdC1mb250YXdlc29tZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgTmF2TWVudSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7fSwge30+IHtcclxuICAgIHB1YmxpYyByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPSdtYWluLW5hdic+XHJcbiAgICAgICAgICAgIDxuYXYgY2xhc3NOYW1lPSduYXZiYXIgbmF2YmFyLWV4cGFuZC1zbSBuYXZiYXItZGFyayBiZy1kYXJrJz5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSduYXZiYXItaGVhZGVyJz5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9J2J1dHRvbicgY2xhc3NOYW1lPSduYXZiYXItdG9nZ2xlcicgZGF0YS10b2dnbGU9J2NvbGxhcHNlJyBkYXRhLXRhcmdldD0nLm5hdmJhci1jb2xsYXBzZScgYXJpYS1jb250cm9scz0nbmF2YmFyU3VwcG9ydGVkQ29udGVudCcgYXJpYS1leHBhbmRlZD0nZmFsc2UnIGFyaWEtbGFiZWw9J1RvZ2dsZSBuYXZpZ2F0aW9uJz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibmF2YmFyLXRvZ2dsZXItaWNvblwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8TGluayBjbGFzc05hbWU9J25hdmJhci1icmFuZCcgdG89eycvJ30+U3BlY2lhbCBPZmZlcnMgUHJvdG90eXBlPC9MaW5rPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY2xlYXJmaXgnPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J25hdmJhci1jb2xsYXBzZSBjb2xsYXBzZSc+XHJcbiAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT0nbmF2YmFyLW5hdiBtci1hdXRvJz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPE5hdkxpbmsgdG89eycvJ30gZXhhY3QgY2xhc3NOYW1lPVwibmF2LWl0ZW0gbmF2LWxpbmtcIiBhY3RpdmVDbGFzc05hbWU9J2FjdGl2ZSc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9udEF3ZXNvbWUgbmFtZT0naG9tZScgLz4gSG9tZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L05hdkxpbms+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxOYXZMaW5rIHRvPXsnL3NwZWNpYWwtb2ZmZXJzJ30gY2xhc3NOYW1lPVwibmF2LWl0ZW0gbmF2LWxpbmtcIiBhY3RpdmVDbGFzc05hbWU9J2FjdGl2ZSc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9udEF3ZXNvbWUgbmFtZT0nbWFnaWMnIC8+IFNwZWNpYWwgT2ZmZXJzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvTmF2TGluaz5cclxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvbmF2PlxyXG4gICAgICAgIDwvZGl2PjtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9DbGllbnRBcHAvY29tcG9uZW50cy9OYXZNZW51LnRzeCIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgTGluaywgUm91dGVDb21wb25lbnRQcm9wcyB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xyXG5pbXBvcnQgeyBBcHBsaWNhdGlvblN0YXRlIH0gZnJvbSAnLi4vc3RvcmUnO1xyXG5pbXBvcnQgKiBhcyBTcGVjaWFsT2ZmZXJzU3RhdGUgZnJvbSAnLi4vc3RvcmUvU3BlY2lhbE9mZmVycyc7XHJcblxyXG4vLyBBdCBydW50aW1lLCBSZWR1eCB3aWxsIG1lcmdlIHRvZ2V0aGVyLi4uXHJcbnR5cGUgU3BlY2lhbE9mZmVyc1Byb3BzID1cclxuICAgIFNwZWNpYWxPZmZlcnNTdGF0ZS5TcGVjaWFsT2ZmZXJzU3RhdGUgICAgICAgICAgICAgIC8vIC4uLiBzdGF0ZSB3ZSd2ZSByZXF1ZXN0ZWQgZnJvbSB0aGUgUmVkdXggc3RvcmVcclxuICAgICYgdHlwZW9mIFNwZWNpYWxPZmZlcnNTdGF0ZS5hY3Rpb25DcmVhdG9ycyAgICAgICAgIC8vIC4uLiBwbHVzIGFjdGlvbiBjcmVhdG9ycyB3ZSd2ZSByZXF1ZXN0ZWRcclxuICAgICYgUm91dGVDb21wb25lbnRQcm9wczx7IGNhdGVnb3J5SWQ6IHN0cmluZyB8IG51bGwsIGxvY2F0aW9uSWQ6IHN0cmluZyB8IG51bGwgfT47IC8vIC4uLiBwbHVzIGluY29taW5nIHJvdXRpbmcgcGFyYW1ldGVyc1xyXG5cclxuY2xhc3MgU3BlY2lhbE9mZmVyc0ZldGNoRGF0YSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxTcGVjaWFsT2ZmZXJzUHJvcHMsIHt9PiB7XHJcbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XHJcbiAgICAgICAgLy8gVGhpcyBtZXRob2QgcnVucyB3aGVuIHRoZSBjb21wb25lbnQgaXMgZmlyc3QgYWRkZWQgdG8gdGhlIHBhZ2VcclxuICAgICAgICB0aGlzLnByb3BzLnJlcXVlc3RTcGVjaWFsT2ZmZXJzKFxyXG4gICAgICAgICAgICAxMCxcclxuICAgICAgICAgICAgbnVsbCxcclxuICAgICAgICAgICAgKHR5cGVvZiB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5jYXRlZ29yeUlkID09PSAndW5kZWZpbmVkJykgPyBudWxsIDogdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuY2F0ZWdvcnlJZCxcclxuICAgICAgICAgICAgKHR5cGVvZiB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5sb2NhdGlvbklkID09PSAndW5kZWZpbmVkJykgPyBudWxsIDogdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMubG9jYXRpb25JZCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHM6IFNwZWNpYWxPZmZlcnNQcm9wcykge1xyXG4gICAgICAgIC8vIFRoaXMgbWV0aG9kIHJ1bnMgd2hlbiBpbmNvbWluZyBwcm9wcyAoZS5nLiwgcm91dGUgcGFyYW1zKSBjaGFuZ2VcclxuICAgICAgICB0aGlzLnByb3BzLnJlcXVlc3RTcGVjaWFsT2ZmZXJzKFxyXG4gICAgICAgICAgICAxMCxcclxuICAgICAgICAgICAgbnVsbCxcclxuICAgICAgICAgICAgKHR5cGVvZiB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5jYXRlZ29yeUlkID09PSAndW5kZWZpbmVkJykgPyBudWxsIDogdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuY2F0ZWdvcnlJZCxcclxuICAgICAgICAgICAgKHR5cGVvZiB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5sb2NhdGlvbklkID09PSAndW5kZWZpbmVkJykgPyBudWxsIDogdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMubG9jYXRpb25JZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgPGgxPk91ciBTcGVjaWFsIE9mZmVyczwvaDE+XHJcbiAgICAgICAgICAgICAgICA8cD5UaGlzIGNvbXBvbmVudCBkZW1vbnN0cmF0ZXMgZmV0Y2hpbmcgZGF0YSBmcm9tIHRoZSBzZXJ2ZXI8L3A+XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJTcGVjaWFsT2ZmZXJzKCl9XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJQYWdpbmF0aW9uKCl9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZW5kZXJTcGVjaWFsT2ZmZXJzKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdzcGVjaWFsb2ZmZXJzJz5cclxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLm9mZmVycy5tYXAob2ZmZXIgPT5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY2FyZCcga2V5PXtvZmZlci5pZH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3NOYW1lPSdjYXJkLWltZy10b3AnIHNyYz17b2ZmZXIuaW1hZ2VVcmx9IGFsdD17b2ZmZXIubmFtZX0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NhcmQtYm9keSc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDUgY2xhc3NOYW1lPSdjYXJkLXRpdGxlJz57b2ZmZXIubmFtZX08L2g1PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdjYXJkLXRleHQnPntvZmZlci5kZXNjcmlwdGlvbn08L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9J2J0biBidG4tcHJpbWFyeScgaHJlZj17b2ZmZXIub2ZmZXJVcmx9PkxlYXJuIE1vcmU8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlbmRlclBhZ2luYXRpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2Zvb3Rlcic+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncGFnaW5hdGlvbic+XHJcbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuZmlyc3RQYWdlVXJsICE9PSBudWxsID8gPHNwYW4+Rmlyc3QgcGFnZTwvc3Bhbj4gOiBbXX1cclxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5wcmV2UGFnZVVybCAhPT0gbnVsbCA/IDxzcGFuPlByZXYgcGFnZTwvc3Bhbj4gOiBbXX1cclxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5uZXh0UGFnZVVybCAhPT0gbnVsbCA/IDxzcGFuPk5leHQgcGFnZTwvc3Bhbj4gOiBbXX1cclxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5sYXN0UGFnZVVybCAhPT0gbnVsbCA/IDxzcGFuPkxhc3QgcGFnZTwvc3Bhbj4gOiBbXX1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsb2FkaW5nXCI+XHJcbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuaXNMb2FkaW5nID8gPHNwYW4+TG9hZGluZy4uLjwvc3Bhbj4gOiBbXX1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxyXG4gICAgKHN0YXRlOiBBcHBsaWNhdGlvblN0YXRlKSA9PiBzdGF0ZS5zcGVjaWFsT2ZmZXJzLCAvLyBTZWxlY3RzIHdoaWNoIHN0YXRlIHByb3BlcnRpZXMgYXJlIG1lcmdlZCBpbnRvIHRoZSBjb21wb25lbnQncyBwcm9wc1xyXG4gICAgU3BlY2lhbE9mZmVyc1N0YXRlLmFjdGlvbkNyZWF0b3JzICAgICAgICAgICAgICAgICAvLyBTZWxlY3RzIHdoaWNoIGFjdGlvbiBjcmVhdG9ycyBhcmUgbWVyZ2VkIGludG8gdGhlIGNvbXBvbmVudCdzIHByb3BzXHJcbikoU3BlY2lhbE9mZmVyc0ZldGNoRGF0YSkgYXMgdHlwZW9mIFNwZWNpYWxPZmZlcnNGZXRjaERhdGE7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0NsaWVudEFwcC9jb21wb25lbnRzL1NwZWNpYWxPZmZlcnMudHN4IiwiaW1wb3J0ICogYXMgU3BlY2lhbE9mZmVycyBmcm9tICcuL1NwZWNpYWxPZmZlcnMnO1xyXG5cclxuLy8gVGhlIHRvcC1sZXZlbCBzdGF0ZSBvYmplY3RcclxuZXhwb3J0IGludGVyZmFjZSBBcHBsaWNhdGlvblN0YXRlIHtcclxuICAgIHNwZWNpYWxPZmZlcnM6IFNwZWNpYWxPZmZlcnMuU3BlY2lhbE9mZmVyc1N0YXRlO1xyXG59XHJcblxyXG4vLyBXaGVuZXZlciBhbiBhY3Rpb24gaXMgZGlzcGF0Y2hlZCwgUmVkdXggd2lsbCB1cGRhdGUgZWFjaCB0b3AtbGV2ZWwgYXBwbGljYXRpb24gc3RhdGUgcHJvcGVydHkgdXNpbmdcclxuLy8gdGhlIHJlZHVjZXIgd2l0aCB0aGUgbWF0Y2hpbmcgbmFtZS4gSXQncyBpbXBvcnRhbnQgdGhhdCB0aGUgbmFtZXMgbWF0Y2ggZXhhY3RseSwgYW5kIHRoYXQgdGhlIHJlZHVjZXJcclxuLy8gYWN0cyBvbiB0aGUgY29ycmVzcG9uZGluZyBBcHBsaWNhdGlvblN0YXRlIHByb3BlcnR5IHR5cGUuXHJcbmV4cG9ydCBjb25zdCByZWR1Y2VycyA9IHtcclxuICAgIHNwZWNpYWxPZmZlcnM6IFNwZWNpYWxPZmZlcnMucmVkdWNlclxyXG59O1xyXG5cclxuLy8gVGhpcyB0eXBlIGNhbiBiZSB1c2VkIGFzIGEgaGludCBvbiBhY3Rpb24gY3JlYXRvcnMgc28gdGhhdCBpdHMgJ2Rpc3BhdGNoJyBhbmQgJ2dldFN0YXRlJyBwYXJhbXMgYXJlXHJcbi8vIGNvcnJlY3RseSB0eXBlZCB0byBtYXRjaCB5b3VyIHN0b3JlLlxyXG5leHBvcnQgaW50ZXJmYWNlIEFwcFRodW5rQWN0aW9uPFRBY3Rpb24+IHtcclxuICAgIChkaXNwYXRjaDogKGFjdGlvbjogVEFjdGlvbikgPT4gdm9pZCwgZ2V0U3RhdGU6ICgpID0+IEFwcGxpY2F0aW9uU3RhdGUpOiB2b2lkO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0NsaWVudEFwcC9zdG9yZS9pbmRleC50cyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX3Byb3BUeXBlcyA9IHJlcXVpcmUoJ3Byb3AtdHlwZXMnKTtcblxudmFyIF9wcm9wVHlwZXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcHJvcFR5cGVzKTtcblxudmFyIF9zY3JlZW5SZWFkZXJTdHlsZXMgPSByZXF1aXJlKCcuL3NjcmVlbi1yZWFkZXItc3R5bGVzJyk7XG5cbnZhciBfc2NyZWVuUmVhZGVyU3R5bGVzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3NjcmVlblJlYWRlclN0eWxlcyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhvYmosIGtleXMpIHsgdmFyIHRhcmdldCA9IHt9OyBmb3IgKHZhciBpIGluIG9iaikgeyBpZiAoa2V5cy5pbmRleE9mKGkpID49IDApIGNvbnRpbnVlOyBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGkpKSBjb250aW51ZTsgdGFyZ2V0W2ldID0gb2JqW2ldOyB9IHJldHVybiB0YXJnZXQ7IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG4vKipcbiAqIEEgUmVhY3QgY29tcG9uZW50IGZvciB0aGUgZm9udC1hd2Vzb21lIGljb24gbGlicmFyeS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gW2FyaWFMYWJlbF0gQW4gZXh0cmEgYWNjZXNzaWJpbGl0eSBsYWJlbCB0byBwdXQgb24gdGhlIGljb25cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW2JvcmRlcj1mYWxzZV0gV2hldGhlciBvciBub3QgdG8gc2hvdyBhIGJvcmRlciByYWRpdXNcbiAqIEBwYXJhbSB7U3RyaW5nfSBbY2xhc3NOYW1lXSBBbiBleHRyYSBzZXQgb2YgQ1NTIGNsYXNzZXMgdG8gYWRkIHRvIHRoZSBjb21wb25lbnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBbY3NzTW9kdWxlXSBPcHRpb24gdG8gcGFzcyBGb250QXdlc29tZSBDU1MgYXMgYSBtb2R1bGVcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW2ZpeGVkV2lkdGg9ZmFsc2VdIE1ha2UgYnV0dG9ucyBmaXhlZCB3aWR0aFxuICogQHBhcmFtIHtTdHJpbmd9IFtmbGlwPWZhbHNlXSBGbGlwIHRoZSBpY29uJ3Mgb3JpZW50YXRpb24uXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtpbnZlcnNlPWZhbHNlXUludmVyc2UgdGhlIGljb24ncyBjb2xvclxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgTmFtZSBvZiB0aGUgaWNvbiB0byB1c2VcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW3B1bHNlPWZhbHNlXSBSb3RhdGUgaWNvbiB3aXRoIDggc3RlcHMsIHJhdGhlciB0aGFuIHNtb290aGx5XG4gKiBAcGFyYW0ge051bWJlcn0gW3JvdGF0ZV0gVGhlIGRlZ3Jlc3MgdG8gcm90YXRlIHRoZSBpY29uIGJ5XG4gKiBAcGFyYW0ge1N0cmluZ30gW3NpemVdIFRoZSBpY29uIHNjYWxpbmcgc2l6ZVxuICogQHBhcmFtIHtCb29sZWFufSBbc3Bpbj1mYWxzZV0gU3BpbiB0aGUgaWNvblxuICogQHBhcmFtIHtTdHJpbmd9IFtzdGFja10gU3RhY2sgYW4gaWNvbiBvbiB0b3Agb2YgYW5vdGhlclxuICogQHBhcmFtIHtTdHJpbmd9IFt0YWc9c3Bhbl0gVGhlIEhUTUwgdGFnIHRvIHVzZSBhcyBhIHN0cmluZywgZWcgJ2knIG9yICdlbSdcbiAqIEBtb2R1bGUgRm9udEF3ZXNvbWVcbiAqIEB0eXBlIHtSZWFjdENsYXNzfVxuICovXG52YXIgRm9udEF3ZXNvbWUgPSBmdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICBfaW5oZXJpdHMoRm9udEF3ZXNvbWUsIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIEZvbnRBd2Vzb21lKCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBGb250QXdlc29tZSk7XG5cbiAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoRm9udEF3ZXNvbWUuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihGb250QXdlc29tZSkpLmNhbGwodGhpcykpO1xuXG4gICAgX3RoaXMuZGlzcGxheU5hbWUgPSAnRm9udEF3ZXNvbWUnO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhGb250QXdlc29tZSwgW3tcbiAgICBrZXk6ICdyZW5kZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICB2YXIgX3Byb3BzID0gdGhpcy5wcm9wcyxcbiAgICAgICAgICBib3JkZXIgPSBfcHJvcHMuYm9yZGVyLFxuICAgICAgICAgIGNzc01vZHVsZSA9IF9wcm9wcy5jc3NNb2R1bGUsXG4gICAgICAgICAgY2xhc3NOYW1lID0gX3Byb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICBmaXhlZFdpZHRoID0gX3Byb3BzLmZpeGVkV2lkdGgsXG4gICAgICAgICAgZmxpcCA9IF9wcm9wcy5mbGlwLFxuICAgICAgICAgIGludmVyc2UgPSBfcHJvcHMuaW52ZXJzZSxcbiAgICAgICAgICBuYW1lID0gX3Byb3BzLm5hbWUsXG4gICAgICAgICAgcHVsc2UgPSBfcHJvcHMucHVsc2UsXG4gICAgICAgICAgcm90YXRlID0gX3Byb3BzLnJvdGF0ZSxcbiAgICAgICAgICBzaXplID0gX3Byb3BzLnNpemUsXG4gICAgICAgICAgc3BpbiA9IF9wcm9wcy5zcGluLFxuICAgICAgICAgIHN0YWNrID0gX3Byb3BzLnN0YWNrLFxuICAgICAgICAgIF9wcm9wcyR0YWcgPSBfcHJvcHMudGFnLFxuICAgICAgICAgIHRhZyA9IF9wcm9wcyR0YWcgPT09IHVuZGVmaW5lZCA/ICdzcGFuJyA6IF9wcm9wcyR0YWcsXG4gICAgICAgICAgYXJpYUxhYmVsID0gX3Byb3BzLmFyaWFMYWJlbCxcbiAgICAgICAgICBwcm9wcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhfcHJvcHMsIFsnYm9yZGVyJywgJ2Nzc01vZHVsZScsICdjbGFzc05hbWUnLCAnZml4ZWRXaWR0aCcsICdmbGlwJywgJ2ludmVyc2UnLCAnbmFtZScsICdwdWxzZScsICdyb3RhdGUnLCAnc2l6ZScsICdzcGluJywgJ3N0YWNrJywgJ3RhZycsICdhcmlhTGFiZWwnXSk7XG5cbiAgICAgIHZhciBjbGFzc05hbWVzID0gW107XG5cbiAgICAgIGlmIChjc3NNb2R1bGUpIHtcbiAgICAgICAgY2xhc3NOYW1lcy5wdXNoKGNzc01vZHVsZVsnZmEnXSk7XG4gICAgICAgIGNsYXNzTmFtZXMucHVzaChjc3NNb2R1bGVbJ2ZhLScgKyBuYW1lXSk7XG4gICAgICAgIHNpemUgJiYgY2xhc3NOYW1lcy5wdXNoKGNzc01vZHVsZVsnZmEtJyArIHNpemVdKTtcbiAgICAgICAgc3BpbiAmJiBjbGFzc05hbWVzLnB1c2goY3NzTW9kdWxlWydmYS1zcGluJ10pO1xuICAgICAgICBwdWxzZSAmJiBjbGFzc05hbWVzLnB1c2goY3NzTW9kdWxlWydmYS1wdWxzZSddKTtcbiAgICAgICAgYm9yZGVyICYmIGNsYXNzTmFtZXMucHVzaChjc3NNb2R1bGVbJ2ZhLWJvcmRlciddKTtcbiAgICAgICAgZml4ZWRXaWR0aCAmJiBjbGFzc05hbWVzLnB1c2goY3NzTW9kdWxlWydmYS1mdyddKTtcbiAgICAgICAgaW52ZXJzZSAmJiBjbGFzc05hbWVzLnB1c2goY3NzTW9kdWxlWydmYS1pbnZlcnNlJ10pO1xuICAgICAgICBmbGlwICYmIGNsYXNzTmFtZXMucHVzaChjc3NNb2R1bGVbJ2ZhLWZsaXAtJyArIGZsaXBdKTtcbiAgICAgICAgcm90YXRlICYmIGNsYXNzTmFtZXMucHVzaChjc3NNb2R1bGVbJ2ZhLXJvdGF0ZS0nICsgcm90YXRlXSk7XG4gICAgICAgIHN0YWNrICYmIGNsYXNzTmFtZXMucHVzaChjc3NNb2R1bGVbJ2ZhLXN0YWNrLScgKyBzdGFja10pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2xhc3NOYW1lcy5wdXNoKCdmYScpO1xuICAgICAgICBjbGFzc05hbWVzLnB1c2goJ2ZhLScgKyBuYW1lKTtcbiAgICAgICAgc2l6ZSAmJiBjbGFzc05hbWVzLnB1c2goJ2ZhLScgKyBzaXplKTtcbiAgICAgICAgc3BpbiAmJiBjbGFzc05hbWVzLnB1c2goJ2ZhLXNwaW4nKTtcbiAgICAgICAgcHVsc2UgJiYgY2xhc3NOYW1lcy5wdXNoKCdmYS1wdWxzZScpO1xuICAgICAgICBib3JkZXIgJiYgY2xhc3NOYW1lcy5wdXNoKCdmYS1ib3JkZXInKTtcbiAgICAgICAgZml4ZWRXaWR0aCAmJiBjbGFzc05hbWVzLnB1c2goJ2ZhLWZ3Jyk7XG4gICAgICAgIGludmVyc2UgJiYgY2xhc3NOYW1lcy5wdXNoKCdmYS1pbnZlcnNlJyk7XG4gICAgICAgIGZsaXAgJiYgY2xhc3NOYW1lcy5wdXNoKCdmYS1mbGlwLScgKyBmbGlwKTtcbiAgICAgICAgcm90YXRlICYmIGNsYXNzTmFtZXMucHVzaCgnZmEtcm90YXRlLScgKyByb3RhdGUpO1xuICAgICAgICBzdGFjayAmJiBjbGFzc05hbWVzLnB1c2goJ2ZhLXN0YWNrLScgKyBzdGFjayk7XG4gICAgICB9XG5cbiAgICAgIC8vIEFkZCBhbnkgY3VzdG9tIGNsYXNzIG5hbWVzIGF0IHRoZSBlbmQuXG4gICAgICBjbGFzc05hbWUgJiYgY2xhc3NOYW1lcy5wdXNoKGNsYXNzTmFtZSk7XG4gICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQodGFnLCBfZXh0ZW5kcyh7fSwgcHJvcHMsIHsgJ2FyaWEtaGlkZGVuJzogdHJ1ZSwgY2xhc3NOYW1lOiBjbGFzc05hbWVzLmpvaW4oJyAnKSB9KSwgYXJpYUxhYmVsID8gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7IHN0eWxlOiBfc2NyZWVuUmVhZGVyU3R5bGVzMi5kZWZhdWx0IH0sIGFyaWFMYWJlbCkgOiBudWxsKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gRm9udEF3ZXNvbWU7XG59KF9yZWFjdDIuZGVmYXVsdC5Db21wb25lbnQpO1xuXG5Gb250QXdlc29tZS5wcm9wVHlwZXMgPSB7XG4gIGFyaWFMYWJlbDogX3Byb3BUeXBlczIuZGVmYXVsdC5zdHJpbmcsXG4gIGJvcmRlcjogX3Byb3BUeXBlczIuZGVmYXVsdC5ib29sLFxuICBjbGFzc05hbWU6IF9wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nLFxuICBjc3NNb2R1bGU6IF9wcm9wVHlwZXMyLmRlZmF1bHQub2JqZWN0LFxuICBmaXhlZFdpZHRoOiBfcHJvcFR5cGVzMi5kZWZhdWx0LmJvb2wsXG4gIGZsaXA6IF9wcm9wVHlwZXMyLmRlZmF1bHQub25lT2YoWydob3Jpem9udGFsJywgJ3ZlcnRpY2FsJ10pLFxuICBpbnZlcnNlOiBfcHJvcFR5cGVzMi5kZWZhdWx0LmJvb2wsXG4gIG5hbWU6IF9wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHB1bHNlOiBfcHJvcFR5cGVzMi5kZWZhdWx0LmJvb2wsXG4gIHJvdGF0ZTogX3Byb3BUeXBlczIuZGVmYXVsdC5vbmVPZihbOTAsIDE4MCwgMjcwXSksXG4gIHNpemU6IF9wcm9wVHlwZXMyLmRlZmF1bHQub25lT2YoWydsZycsICcyeCcsICczeCcsICc0eCcsICc1eCddKSxcbiAgc3BpbjogX3Byb3BUeXBlczIuZGVmYXVsdC5ib29sLFxuICBzdGFjazogX3Byb3BUeXBlczIuZGVmYXVsdC5vbmVPZihbJzF4JywgJzJ4J10pLFxuICB0YWc6IF9wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nXG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBGb250QXdlc29tZTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yZWFjdC1mb250YXdlc29tZS9saWIvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHtcbiAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gIHdpZHRoOiAnMXB4JyxcbiAgaGVpZ2h0OiAnMXB4JyxcbiAgcGFkZGluZzogJzBweCcsXG4gIG1hcmdpbjogJy0xcHgnLFxuICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gIGNsaXA6ICdyZWN0KDBweCwgMHB4LCAwcHgsIDBweCknLFxuICBib3JkZXI6ICcwcHgnXG59O1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JlYWN0LWZvbnRhd2Vzb21lL2xpYi9zY3JlZW4tcmVhZGVyLXN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygwKSkoMTQ4KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvZG9tYWluLXRhc2svaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDApKSgxNTYpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yZWR1eC10aHVuay9saWIvaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDApKSg1KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3Jcbi8vIG1vZHVsZSBpZCA9IDIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gKF9fd2VicGFja19yZXF1aXJlX18oMCkpKDc5KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcmVkdXgvbGliL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvclxuLy8gbW9kdWxlIGlkID0gMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==