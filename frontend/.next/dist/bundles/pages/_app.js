module.exports =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./pages/_app.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__ = __webpack_require__("@babel/runtime/regenerator");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_next_app__ = __webpack_require__("next/app");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_next_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_next_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_redux__ = __webpack_require__("react-redux");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__store_store__ = __webpack_require__("./store/store.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_next_redux_wrapper__ = __webpack_require__("next-redux-wrapper");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_next_redux_wrapper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_next_redux_wrapper__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__store_baseurl__ = __webpack_require__("./store/baseurl.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_next_router__ = __webpack_require__("next/router");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_next_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_next_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_cookie__ = __webpack_require__("cookie");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_cookie___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_cookie__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_js_cookie__ = __webpack_require__("js-cookie");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_js_cookie___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_js_cookie__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_isomorphic_fetch__ = __webpack_require__("isomorphic-fetch");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_isomorphic_fetch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_isomorphic_fetch__);

var _jsxFileName = "/tmp/pages/_app.js";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }











/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_5_next_redux_wrapper___default()(__WEBPACK_IMPORTED_MODULE_4__store_store__["a" /* default */])(
/*#__PURE__*/
function (_App) {
  _inherits(_class, _App);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          Component = _props.Component,
          pageProps = _props.pageProps,
          store = _props.store;
      return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_next_app__["Container"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 115
        }
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_redux__["Provider"], {
        store: store,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 116
        }
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(Component, _extends({}, pageProps, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 117
        }
      }))));
    }
  }], [{
    key: "getInitialProps",
    value: function () {
      var _getInitialProps = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee(_ref) {
        var Component, router, ctx, pageProps, token, isSuperAdmin, cookies, cookiesJSON, _token, response, _token2, _cookies, _cookiesJSON, _token3, _response;

        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                Component = _ref.Component, router = _ref.router, ctx = _ref.ctx;
                pageProps = {};

                if (!Component.getInitialProps) {
                  _context.next = 6;
                  break;
                }

                _context.next = 5;
                return Component.getInitialProps(ctx);

              case 5:
                pageProps = _context.sent;

              case 6:
                if (ctx.pathname.startsWith("/admin")) {}

                if (!(ctx.pathname.startsWith("/super-admin") && ctx.pathname != "/super-admin/auth")) {
                  _context.next = 45;
                  break;
                }

                if (ctx.isServer) {
                  _context.next = 21;
                  break;
                }

                token = __WEBPACK_IMPORTED_MODULE_9_js_cookie___default.a.get('token');
                isSuperAdmin = false;

                if (token) {
                  _context.next = 15;
                  break;
                }

                isSuperAdmin = false;
                _context.next = 18;
                break;

              case 15:
                _context.next = 17;
                return fetch("".concat(__WEBPACK_IMPORTED_MODULE_6__store_baseurl__["a" /* default */].frontend, "/super-admin/session-check/").concat(token));

              case 17:
                isSuperAdmin = _context.sent;

              case 18:
                if (!isSuperAdmin.ok) {
                  __WEBPACK_IMPORTED_MODULE_7_next_router___default.a.push('/super-admin/auth');
                }

                _context.next = 45;
                break;

              case 21:
                if (!(ctx.req && ctx.req.headers)) {
                  _context.next = 45;
                  break;
                }

                cookies = ctx.req.headers.cookie;

                if (cookies) {
                  _context.next = 30;
                  break;
                }

                ctx.res.writeHead(302, {
                  Location: '/super-admin/auth'
                });
                ctx.res.end();
                ctx.res.finished = true;
                console.log("null");
                _context.next = 45;
                break;

              case 30:
                if (!(typeof cookies === 'string')) {
                  _context.next = 45;
                  break;
                }

                cookiesJSON = __WEBPACK_IMPORTED_MODULE_8_cookie___default.a.parse(cookies);
                _token = cookiesJSON.token;
                console.log(_token);
                isSuperAdmin = false;

                if (_token) {
                  _context.next = 39;
                  break;
                }

                isSuperAdmin = false;
                _context.next = 44;
                break;

              case 39:
                _context.next = 41;
                return fetch("".concat(__WEBPACK_IMPORTED_MODULE_6__store_baseurl__["a" /* default */].backend, "/super-admin/session-check/").concat(_token));

              case 41:
                response = _context.sent;
                console.log(response.ok);
                isSuperAdmin = response.ok;

              case 44:
                if (!isSuperAdmin) {
                  ctx.res.writeHead(302, {
                    Location: '/super-admin/auth'
                  });
                  ctx.res.end();
                  ctx.res.finished = true;
                }

              case 45:
                if (!(ctx.pathname == "/super-admin/auth")) {
                  _context.next = 70;
                  break;
                }

                if (ctx.isServer) {
                  _context.next = 54;
                  break;
                }

                _token2 = __WEBPACK_IMPORTED_MODULE_9_js_cookie___default.a.get('token');
                _context.next = 50;
                return fetch("".concat(__WEBPACK_IMPORTED_MODULE_6__store_baseurl__["a" /* default */].frontend, "/super-admin/session-check/").concat(_token2));

              case 50:
                isSuperAdmin = _context.sent;

                if (isSuperAdmin.ok) {
                  __WEBPACK_IMPORTED_MODULE_7_next_router___default.a.push('/super-admin');
                }

                _context.next = 70;
                break;

              case 54:
                if (!(ctx.req && ctx.req.headers)) {
                  _context.next = 70;
                  break;
                }

                _cookies = ctx.req.headers.cookie;

                if (!(typeof _cookies === 'string')) {
                  _context.next = 70;
                  break;
                }

                _cookiesJSON = __WEBPACK_IMPORTED_MODULE_8_cookie___default.a.parse(_cookies);
                _token3 = _cookiesJSON.token;
                isSuperAdmin = false;

                if (_token3) {
                  _context.next = 64;
                  break;
                }

                isSuperAdmin = false;
                _context.next = 69;
                break;

              case 64:
                _context.next = 66;
                return fetch("".concat(__WEBPACK_IMPORTED_MODULE_6__store_baseurl__["a" /* default */].backend, "/super-admin/session-check/").concat(_token3));

              case 66:
                _response = _context.sent;
                console.log(_response.ok);
                isSuperAdmin = _response.ok;

              case 69:
                if (isSuperAdmin.ok) {
                  ctx.res.writeHead(302, {
                    Location: '/super-admin/'
                  });
                  ctx.res.end();
                  ctx.res.finished = true;
                }

              case 70:
                return _context.abrupt("return", {
                  pageProps: pageProps
                });

              case 71:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function getInitialProps(_x) {
        return _getInitialProps.apply(this, arguments);
      };
    }()
  }]);

  return _class;
}(__WEBPACK_IMPORTED_MODULE_1_next_app___default.a)));

/***/ }),

/***/ "./store/auth/actions.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export SIGN_OUT_REQUESTED */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SIGN_IN_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SIGN_IN_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return SIGN_IN_SUCCEEDED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return SIGN_UP_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return SIGN_UP_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return SIGN_UP_SUCCEEDED; });
/* unused harmony export VERIFICATION_REQUESTED */
/* unused harmony export VERIFICATION_FAILED */
/* unused harmony export VERIFICATION_SUCCEEDED */
/* unused harmony export RESET_ACCOUNT_REQUESTED */
/* unused harmony export RESET_ACCOUNT_FAILED */
/* unused harmony export RESET_ACCOUNT_SUCCEEDED */
/* unused harmony export RESET_PASSWORD_REQUESTED */
/* unused harmony export RESET_PASSWORD_FAILED */
/* unused harmony export RESET_PASSWORD_SUCCEEDED */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return SUPER_SIGN_IN_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return SUPER_SIGN_IN_SUCCEEDED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return SUPER_SIGN_IN_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return authSaga; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__ = __webpack_require__("@babel/runtime/regenerator");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__ = __webpack_require__("redux-saga/effects");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_saga_effects___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__baseurl__ = __webpack_require__("./store/baseurl.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_js_cookie__ = __webpack_require__("js-cookie");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_js_cookie___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_js_cookie__);




var SIGN_OUT_REQUESTED = "auth.SIGN_OUT_REQUESTED";
var SIGN_IN_REQUESTED = "auth.SIGN_IN_REQUESTED";
var SUPER_SIGN_IN_REQUESTED = "auth.SUPER_SIGN_IN_REQUESTED";
var SUPER_SIGN_IN_SUCCEEDED = "auth.SUPER_SIGN_IN_SUCCEEDED";
var SUPER_SIGN_IN_FAILED = "auth.SUPER_SIGN_IN_FAILED";
var SIGN_IN_FAILED = "auth.SIGN_IN_FAILED";
var SIGN_IN_SUCCEEDED = "auth.SIGN_IN_SUCCEDED";
var SIGN_UP_REQUESTED = "auth.SIGN_UP_REQUESTED";
var SIGN_UP_FAILED = "auth.SIGN_UP_FAILED";
var SIGN_UP_SUCCEEDED = "auth.SIGN_UP_SUCCEDED";
var VERIFICATION_REQUESTED = "auth.VERIFICATION_REQUESTED";
var VERIFICATION_FAILED = "auth.VERIFICATION_FAILED";
var VERIFICATION_SUCCEEDED = "auth.VERIFICATION_SUCCEDED";
var RESET_ACCOUNT_REQUESTED = "auth.RESET_ACCOUNT_REQUESTED";
var RESET_ACCOUNT_FAILED = "auth.RESET_ACCOUNT_FAILED";
var RESET_ACCOUNT_SUCCEEDED = "auth.RESET_ACCOUNT_SUCCEDED";
var RESET_PASSWORD_REQUESTED = "auth.RESET_PASSWORD_REQUESTED";
var RESET_PASSWORD_FAILED = "auth.RESET_PASSWORD_FAILED";
var RESET_PASSWORD_SUCCEEDED = "auth.RESET_PASSWORD_SUCCEDED";

var superAdminLogin =
/*#__PURE__*/
__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function superAdminLogin(action) {
  var response, responseData;
  return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function superAdminLogin$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["call"])(fetch, "".concat(__WEBPACK_IMPORTED_MODULE_2__baseurl__["a" /* default */].frontend, "/super-admin/login"), {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(action.payload)
          });

        case 3:
          response = _context.sent;
          _context.next = 6;
          return response.json();

        case 6:
          responseData = _context.sent;

          if (response.ok) {
            _context.next = 12;
            break;
          }

          _context.next = 10;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: SUPER_SIGN_IN_FAILED,
            payload: responseData
          });

        case 10:
          _context.next = 15;
          break;

        case 12:
          __WEBPACK_IMPORTED_MODULE_3_js_cookie___default.a.set('token', responseData.sessionID);
          _context.next = 15;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: SUPER_SIGN_IN_SUCCEEDED,
            payload: responseData
          });

        case 15:
          _context.next = 21;
          break;

        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](0);
          _context.next = 21;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: SUPER_SIGN_IN_FAILED,
            payload: _context.t0
          });

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, superAdminLogin, this, [[0, 17]]);
});

var signIn =
/*#__PURE__*/
__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function signIn(action) {
  var response;
  return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function signIn$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["call"])(fetch, "".concat(__WEBPACK_IMPORTED_MODULE_2__baseurl__["a" /* default */].frontend, "/auth/login"), {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(action.payload)
          });

        case 3:
          response = _context2.sent;

          if (response.ok) {
            _context2.next = 9;
            break;
          }

          _context2.next = 7;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: SIGN_IN_FAILED,
            payload: response.json()
          });

        case 7:
          _context2.next = 11;
          break;

        case 9:
          _context2.next = 11;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: SIGN_IN_SUCCEEDED,
            payload: response.json()
          });

        case 11:
          _context2.next = 17;
          break;

        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](0);
          _context2.next = 17;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: SIGN_IN_FAILED,
            payload: _context2.t0
          });

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  }, signIn, this, [[0, 13]]);
}); //Registration


var signUp =
/*#__PURE__*/
__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function signUp(action) {
  var response;
  return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function signUp$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["call"])(fetch, "".concat(__WEBPACK_IMPORTED_MODULE_2__baseurl__["a" /* default */].frontend, "/auth/registration/"), {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(action.payload)
          });

        case 3:
          response = _context3.sent;

          if (response.ok) {
            _context3.next = 15;
            break;
          }

          _context3.t0 = __WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"];
          _context3.t1 = SIGN_UP_FAILED;
          _context3.next = 9;
          return response.json();

        case 9:
          _context3.t2 = _context3.sent;
          _context3.t3 = {
            type: _context3.t1,
            payload: _context3.t2
          };
          _context3.next = 13;
          return (0, _context3.t0)(_context3.t3);

        case 13:
          _context3.next = 23;
          break;

        case 15:
          _context3.t4 = __WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"];
          _context3.t5 = SIGN_UP_SUCCEEDED;
          _context3.next = 19;
          return response.json();

        case 19:
          _context3.t6 = _context3.sent;
          _context3.t7 = {
            type: _context3.t5,
            payload: _context3.t6
          };
          _context3.next = 23;
          return (0, _context3.t4)(_context3.t7);

        case 23:
          _context3.next = 29;
          break;

        case 25:
          _context3.prev = 25;
          _context3.t8 = _context3["catch"](0);
          _context3.next = 29;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: SIGN_UP_FAILED,
            payload: _context3.t8
          });

        case 29:
        case "end":
          return _context3.stop();
      }
    }
  }, signUp, this, [[0, 25]]);
});

var verify =
/*#__PURE__*/
__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function verify(action) {
  var response;
  return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function verify$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["call"])(fetch, "".concat(__WEBPACK_IMPORTED_MODULE_2__baseurl__["a" /* default */].frontend, "/auth/registration/verify-email"), {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(action.payload)
          });

        case 3:
          response = _context4.sent;

          if (response.ok) {
            _context4.next = 9;
            break;
          }

          _context4.next = 7;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: VERIFICATION_FAILED,
            payload: response.json()
          });

        case 7:
          _context4.next = 11;
          break;

        case 9:
          _context4.next = 11;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: VERIFICATION_SUCCEEDED,
            payload: response.json()
          });

        case 11:
          _context4.next = 17;
          break;

        case 13:
          _context4.prev = 13;
          _context4.t0 = _context4["catch"](0);
          _context4.next = 17;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: VERIFICATION_FAILED,
            payload: _context4.t0
          });

        case 17:
        case "end":
          return _context4.stop();
      }
    }
  }, verify, this, [[0, 13]]);
});

var resetAccount =
/*#__PURE__*/
__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function resetAccount(action) {
  var response;
  return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function resetAccount$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["call"])(fetch, "".concat(__WEBPACK_IMPORTED_MODULE_2__baseurl__["a" /* default */].frontend, "/auth/reset"), {
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(action.payload)
          });

        case 3:
          response = _context5.sent;

          if (response.ok) {
            _context5.next = 9;
            break;
          }

          _context5.next = 7;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: RESET_ACCOUNT_FAILED,
            payload: response.json()
          });

        case 7:
          _context5.next = 11;
          break;

        case 9:
          _context5.next = 11;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: RESET_ACCOUNT_SUCCEEDED,
            payload: response.json()
          });

        case 11:
          _context5.next = 17;
          break;

        case 13:
          _context5.prev = 13;
          _context5.t0 = _context5["catch"](0);
          _context5.next = 17;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: RESET_ACCOUNT_FAILED,
            payload: _context5.t0
          });

        case 17:
        case "end":
          return _context5.stop();
      }
    }
  }, resetAccount, this, [[0, 13]]);
});

var resetPassword =
/*#__PURE__*/
__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function resetPassword(action) {
  var response;
  return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function resetPassword$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["call"])(fetch, "".concat(__WEBPACK_IMPORTED_MODULE_2__baseurl__["a" /* default */].frontend, "/auth/reset/confirm"), {
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(action.payload)
          });

        case 3:
          response = _context6.sent;

          if (response.ok) {
            _context6.next = 9;
            break;
          }

          _context6.next = 7;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: RESET_PASSWORD_FAILED,
            payload: response.json()
          });

        case 7:
          _context6.next = 11;
          break;

        case 9:
          _context6.next = 11;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: RESET_PASSWORD_SUCCEEDED,
            payload: response.json()
          });

        case 11:
          _context6.next = 17;
          break;

        case 13:
          _context6.prev = 13;
          _context6.t0 = _context6["catch"](0);
          _context6.next = 17;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: RESET_PASSWORD_FAILED,
            payload: _context6.t0
          });

        case 17:
        case "end":
          return _context6.stop();
      }
    }
  }, resetPassword, this, [[0, 13]]);
});

var signOut =
/*#__PURE__*/
__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function signOut() {
  var response;
  return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function signOut$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["call"])(fetch, "".concat(__WEBPACK_IMPORTED_MODULE_2__baseurl__["a" /* default */].frontend, "/auth/logout"), {
            headers: {
              'Content-Type': 'application/json'
            }
          });

        case 3:
          response = _context7.sent;

          if (response.ok) {
            _context7.next = 9;
            break;
          }

          _context7.next = 7;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: SIGN_UP_FAILED,
            payload: response.json()
          });

        case 7:
          _context7.next = 11;
          break;

        case 9:
          _context7.next = 11;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: SIGN_UP_SUCCEEDED,
            payload: response.json()
          });

        case 11:
          _context7.next = 17;
          break;

        case 13:
          _context7.prev = 13;
          _context7.t0 = _context7["catch"](0);
          _context7.next = 17;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: SIGN_UP_FAILED,
            payload: _context7.t0
          });

        case 17:
        case "end":
          return _context7.stop();
      }
    }
  }, signOut, this, [[0, 13]]);
});

var authSaga =
/*#__PURE__*/
__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function authSaga() {
  return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function authSaga$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["takeEvery"])(SIGN_IN_REQUESTED, signIn);

        case 2:
          _context8.next = 4;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["takeEvery"])(SIGN_UP_REQUESTED, signUp);

        case 4:
          _context8.next = 6;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["takeEvery"])(VERIFICATION_REQUESTED, verify);

        case 6:
          _context8.next = 8;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["takeEvery"])(RESET_ACCOUNT_REQUESTED, resetAccount);

        case 8:
          _context8.next = 10;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["takeEvery"])(RESET_PASSWORD_REQUESTED, resetPassword);

        case 10:
          _context8.next = 12;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["takeEvery"])(SIGN_OUT_REQUESTED, signOut);

        case 12:
          _context8.next = 14;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["takeEvery"])(SUPER_SIGN_IN_REQUESTED, superAdminLogin);

        case 14:
        case "end":
          return _context8.stop();
      }
    }
  }, authSaga, this);
});



/***/ }),

/***/ "./store/auth/reducer.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions__ = __webpack_require__("./store/auth/actions.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var initState = {
  authInProgress: false,
  nonFieldErrors: null,
  emailError: null,
  usernameError: null,
  passwordError: null,
  successRedirect: null
};
/* harmony default export */ __webpack_exports__["a"] = (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_0__actions__["h" /* SUPER_SIGN_IN_REQUESTED */]:
    case __WEBPACK_IMPORTED_MODULE_0__actions__["b" /* SIGN_IN_REQUESTED */]:
    case __WEBPACK_IMPORTED_MODULE_0__actions__["e" /* SIGN_UP_REQUESTED */]:
      {
        state = _objectSpread({}, state, {
          authInProgress: true,
          nonFieldErrors: null,
          emailError: null,
          usernameError: null,
          passwordError: null
        });
        return state;
      }

    case __WEBPACK_IMPORTED_MODULE_0__actions__["g" /* SUPER_SIGN_IN_FAILED */]:
    case __WEBPACK_IMPORTED_MODULE_0__actions__["a" /* SIGN_IN_FAILED */]:
    case __WEBPACK_IMPORTED_MODULE_0__actions__["d" /* SIGN_UP_FAILED */]:
      {
        state = _objectSpread({}, state, {
          authInProgress: false
        });

        if (action.payload.email && action.payload.email.length > 0) {
          state = _objectSpread({}, state, {
            emailError: action.payload.email[0]
          });
        }

        if (action.payload.username && action.payload.username.length > 0) {
          state = _objectSpread({}, state, {
            emailError: action.payload.username[0]
          });
        }

        if (action.payload.password1 && action.payload.password1.length > 0) {
          state = _objectSpread({}, state, {
            passwordError: action.payload.password1[0]
          });
        }

        if (action.payload.non_field_errors && action.payload.non_field_errors.length > 0) {
          state = _objectSpread({}, state, {
            nonFieldErrors: action.payload.non_field_errors[0]
          });
        }

        return state;
      }

    case __WEBPACK_IMPORTED_MODULE_0__actions__["i" /* SUPER_SIGN_IN_SUCCEEDED */]:
      {
        state = _objectSpread({}, state, {
          authInProgress: false,
          successRedirect: "/super-admin"
        });
        return state;
      }

    case __WEBPACK_IMPORTED_MODULE_0__actions__["f" /* SIGN_UP_SUCCEEDED */]:
      {
        state = _objectSpread({}, state, {
          authInProgress: false,
          successRedirect: "/welcome"
        });
        return state;
      }

    case __WEBPACK_IMPORTED_MODULE_0__actions__["c" /* SIGN_IN_SUCCEEDED */]:
      {
        state = _objectSpread({}, state, {
          authInProgress: false,
          successRedirect: "/"
        });
        return state;
      }
  }

  return state;
});

/***/ }),

/***/ "./store/baseurl.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  backend: "http://web:3000",
  frontend: "http://localhost:3000"
});

/***/ }),

/***/ "./store/store.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__super_admin_reducer__ = __webpack_require__("./store/super-admin/reducer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth_reducer__ = __webpack_require__("./store/auth/reducer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux__ = __webpack_require__("redux");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_redux_saga__ = __webpack_require__("redux-saga");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_redux_saga___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_redux_saga__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__auth_actions__ = __webpack_require__("./store/auth/actions.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__super_admin_auth_actions__ = __webpack_require__("./store/super-admin/auth-actions.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__super_admin_app_data_actions__ = __webpack_require__("./store/super-admin/app-data-actions.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }








var composeEnhancers = (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({// Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
}) : __WEBPACK_IMPORTED_MODULE_2_redux__["compose"];
var authSagaMiddleware = __WEBPACK_IMPORTED_MODULE_3_redux_saga___default()();
var enhancer = composeEnhancers(Object(__WEBPACK_IMPORTED_MODULE_2_redux__["applyMiddleware"])(authSagaMiddleware));
/* harmony default export */ __webpack_exports__["a"] = (function (initState) {
  var store = Object(__WEBPACK_IMPORTED_MODULE_2_redux__["createStore"])(Object(__WEBPACK_IMPORTED_MODULE_2_redux__["combineReducers"])({
    authData: __WEBPACK_IMPORTED_MODULE_1__auth_reducer__["a" /* default */],
    adminData: __WEBPACK_IMPORTED_MODULE_0__super_admin_reducer__["a" /* default */]
  }), initState, enhancer);
  authSagaMiddleware.run(__WEBPACK_IMPORTED_MODULE_4__auth_actions__["j" /* authSaga */]);
  authSagaMiddleware.run(__WEBPACK_IMPORTED_MODULE_5__super_admin_auth_actions__["d" /* adminSaga */]);
  authSagaMiddleware.run(__WEBPACK_IMPORTED_MODULE_6__super_admin_app_data_actions__["m" /* appDataSaga */]);
  return store;
});

/***/ }),

/***/ "./store/super-admin/app-data-actions.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return appDataSaga; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return DISEASES_FETCH_MATCHES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return DISEASES_FETCH_MATCHES_SUCCEDED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return DISEASES_FETCH_MATCHES_FAILED; });
/* unused harmony export DISEASES_CREATE */
/* unused harmony export DISEASES_CREATE_SUCCEDED */
/* unused harmony export DISEASES_CREATE_FAILED */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DISEASES_CLEAR_MATCHES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return PET_TYPE_FETCH_MATCHES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return PET_TYPE_CLEAR_MATCHES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return PET_TYPE_FETCH_MATCHES_SUCCEDED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return PET_TYPE_FETCH_MATCHES_FAILED; });
/* unused harmony export PET_TYPE_CREATE */
/* unused harmony export PET_TYPE_CREATE_SUCCEDED */
/* unused harmony export PET_TYPE_CREATE_FAILED */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return PET_BREED_FETCH_MATCHES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return PET_BREED_CLEAR_MATCHES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return PET_BREED_FETCH_MATCHES_SUCCEDED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return PET_BREED_FETCH_MATCHES_FAILED; });
/* unused harmony export PET_BREED_CREATE */
/* unused harmony export PET_BREED_CREATE_SUCCEDED */
/* unused harmony export PET_BREED_CREATE_FAILED */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__ = __webpack_require__("@babel/runtime/regenerator");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__ = __webpack_require__("redux-saga/effects");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_saga_effects___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__baseurl__ = __webpack_require__("./store/baseurl.js");



var DISEASES_FETCH_MATCHES = "diseases.FETCH_MATCHES";
var DISEASES_CLEAR_MATCHES = "diseases.DISEASES_CLEAR_MATCHES";
var DISEASES_FETCH_MATCHES_SUCCEDED = "diseases.FETCH_MATCHES_SUCCEDED";
var DISEASES_FETCH_MATCHES_FAILED = "diseases.FETCH_MATCHES_FAILED";
var DISEASES_CREATE = "diseases.CREATE";
var DISEASES_CREATE_SUCCEDED = "diseases.CREATE_SUCCEDED";
var DISEASES_CREATE_FAILED = "diseases.CREATE_FAILED";
var PET_TYPE_FETCH_MATCHES = "petTypes.FETCH_MATCHES";
var PET_TYPE_CLEAR_MATCHES = "petTypes.PET_TYPE_CLEAR_MATCHES";
var PET_TYPE_FETCH_MATCHES_SUCCEDED = "petTypes.PET_TYPE_FETCH_MATCHES_SUCCEDED";
var PET_TYPE_FETCH_MATCHES_FAILED = "petTypes.PET_TYPE_FETCH_MATCHES_FAILED";
var PET_TYPE_CREATE = "petTypes.PET_TYPE_CREATE";
var PET_TYPE_CREATE_SUCCEDED = "petTypes.PET_TYPE_CREATE_SUCCEDED";
var PET_TYPE_CREATE_FAILED = "petTypes.PET_TYPE_CREATE_FAILED";
var PET_BREED_FETCH_MATCHES = "petBreed.PET_BREED_FETCH_MATCHES";
var PET_BREED_CLEAR_MATCHES = "petBreed.PET_BREED_CLEAR_MATCHES";
var PET_BREED_FETCH_MATCHES_SUCCEDED = "petBreed.PET_BREED_FETCH_MATCHES_SUCCEDED";
var PET_BREED_FETCH_MATCHES_FAILED = "petBreed.PET_BREED_FETCH_MATCHES_FAILED";
var PET_BREED_CREATE = "petBreed.PET_BREED_CREATE";
var PET_BREED_CREATE_SUCCEDED = "petBreed.PET_BREED_CREATE_SUCCEDED";
var PET_BREED_CREATE_FAILED = "petBreed.PET_BREED_CREATE_FAILED";

var fetchDiseaseMatches =
/*#__PURE__*/
__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function fetchDiseaseMatches(action) {
  var response;
  return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function fetchDiseaseMatches$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["call"])(fetch, "".concat(__WEBPACK_IMPORTED_MODULE_2__baseurl__["a" /* default */].frontend, "/super-admin/diseases?q=").concat(action.payload.query));

        case 3:
          response = _context.sent;

          if (!response.ok) {
            _context.next = 15;
            break;
          }

          _context.t0 = __WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"];
          _context.t1 = DISEASES_FETCH_MATCHES_SUCCEDED;
          _context.next = 9;
          return response.json();

        case 9:
          _context.t2 = _context.sent;
          _context.t3 = {
            type: _context.t1,
            payload: _context.t2
          };
          _context.next = 13;
          return (0, _context.t0)(_context.t3);

        case 13:
          _context.next = 23;
          break;

        case 15:
          _context.t4 = __WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"];
          _context.t5 = DISEASES_FETCH_MATCHES_FAILED;
          _context.next = 19;
          return response.json();

        case 19:
          _context.t6 = _context.sent;
          _context.t7 = {
            type: _context.t5,
            payload: _context.t6
          };
          _context.next = 23;
          return (0, _context.t4)(_context.t7);

        case 23:
          _context.next = 29;
          break;

        case 25:
          _context.prev = 25;
          _context.t8 = _context["catch"](0);
          _context.next = 29;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: DISEASES_FETCH_MATCHES_FAILED,
            payload: _context.t8
          });

        case 29:
        case "end":
          return _context.stop();
      }
    }
  }, fetchDiseaseMatches, this, [[0, 25]]);
});

var fetchPetTypeMatches =
/*#__PURE__*/
__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function fetchPetTypeMatches(action) {
  var response;
  return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function fetchPetTypeMatches$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["call"])(fetch, "".concat(__WEBPACK_IMPORTED_MODULE_2__baseurl__["a" /* default */].frontend, "/super-admin/pet-types?q=").concat(action.payload.query));

        case 3:
          response = _context2.sent;

          if (!response.ok) {
            _context2.next = 15;
            break;
          }

          _context2.t0 = __WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"];
          _context2.t1 = PET_TYPE_FETCH_MATCHES_SUCCEDED;
          _context2.next = 9;
          return response.json();

        case 9:
          _context2.t2 = _context2.sent;
          _context2.t3 = {
            type: _context2.t1,
            payload: _context2.t2
          };
          _context2.next = 13;
          return (0, _context2.t0)(_context2.t3);

        case 13:
          _context2.next = 23;
          break;

        case 15:
          _context2.t4 = __WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"];
          _context2.t5 = PET_TYPE_FETCH_MATCHES_FAILED;
          _context2.next = 19;
          return response.json();

        case 19:
          _context2.t6 = _context2.sent;
          _context2.t7 = {
            type: _context2.t5,
            payload: _context2.t6
          };
          _context2.next = 23;
          return (0, _context2.t4)(_context2.t7);

        case 23:
          _context2.next = 29;
          break;

        case 25:
          _context2.prev = 25;
          _context2.t8 = _context2["catch"](0);
          _context2.next = 29;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: PET_TYPE_FETCH_MATCHES_FAILED,
            payload: _context2.t8
          });

        case 29:
        case "end":
          return _context2.stop();
      }
    }
  }, fetchPetTypeMatches, this, [[0, 25]]);
});

var fetchPetBreedMatches =
/*#__PURE__*/
__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function fetchPetBreedMatches(action) {
  var response;
  return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function fetchPetBreedMatches$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["call"])(fetch, "".concat(__WEBPACK_IMPORTED_MODULE_2__baseurl__["a" /* default */].frontend, "/super-admin/pet-types/").concat(action.payload.pet_type_id, "/breed?q=").concat(action.payload.query));

        case 3:
          response = _context3.sent;

          if (!response.ok) {
            _context3.next = 15;
            break;
          }

          _context3.t0 = __WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"];
          _context3.t1 = PET_BREED_FETCH_MATCHES_SUCCEDED;
          _context3.next = 9;
          return response.json();

        case 9:
          _context3.t2 = _context3.sent;
          _context3.t3 = {
            type: _context3.t1,
            payload: _context3.t2
          };
          _context3.next = 13;
          return (0, _context3.t0)(_context3.t3);

        case 13:
          _context3.next = 23;
          break;

        case 15:
          _context3.t4 = __WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"];
          _context3.t5 = PET_BREED_FETCH_MATCHES_FAILED;
          _context3.next = 19;
          return response.json();

        case 19:
          _context3.t6 = _context3.sent;
          _context3.t7 = {
            type: _context3.t5,
            payload: _context3.t6
          };
          _context3.next = 23;
          return (0, _context3.t4)(_context3.t7);

        case 23:
          _context3.next = 29;
          break;

        case 25:
          _context3.prev = 25;
          _context3.t8 = _context3["catch"](0);
          _context3.next = 29;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: PET_BREED_FETCH_MATCHES_FAILED,
            payload: _context3.t8
          });

        case 29:
        case "end":
          return _context3.stop();
      }
    }
  }, fetchPetBreedMatches, this, [[0, 25]]);
});

var createPetType =
/*#__PURE__*/
__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function createPetType(action) {
  var response;
  return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function createPetType$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["call"])(fetch, "".concat(__WEBPACK_IMPORTED_MODULE_2__baseurl__["a" /* default */].frontend, "/super-admin/pet-types"), {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(action.payload)
          });

        case 3:
          response = _context4.sent;

          if (!response.ok) {
            _context4.next = 15;
            break;
          }

          _context4.t0 = __WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"];
          _context4.t1 = PET_TYPE_CREATE_SUCCEDED;
          _context4.next = 9;
          return response.json();

        case 9:
          _context4.t2 = _context4.sent;
          _context4.t3 = {
            type: _context4.t1,
            payload: _context4.t2
          };
          _context4.next = 13;
          return (0, _context4.t0)(_context4.t3);

        case 13:
          _context4.next = 23;
          break;

        case 15:
          _context4.t4 = __WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"];
          _context4.t5 = PET_TYPE_CREATE_FAILED;
          _context4.next = 19;
          return response.json();

        case 19:
          _context4.t6 = _context4.sent;
          _context4.t7 = {
            type: _context4.t5,
            payload: _context4.t6
          };
          _context4.next = 23;
          return (0, _context4.t4)(_context4.t7);

        case 23:
          _context4.next = 29;
          break;

        case 25:
          _context4.prev = 25;
          _context4.t8 = _context4["catch"](0);
          _context4.next = 29;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: PET_TYPE_CREATE_FAILED,
            payload: _context4.t8
          });

        case 29:
        case "end":
          return _context4.stop();
      }
    }
  }, createPetType, this, [[0, 25]]);
});

var createDisease =
/*#__PURE__*/
__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function createDisease(action) {
  var response;
  return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function createDisease$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["call"])(fetch, "".concat(__WEBPACK_IMPORTED_MODULE_2__baseurl__["a" /* default */].frontend, "/super-admin/diseases"), {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(action.payload)
          });

        case 3:
          response = _context5.sent;

          if (!response.ok) {
            _context5.next = 15;
            break;
          }

          _context5.t0 = __WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"];
          _context5.t1 = DISEASES_CREATE_SUCCEDED;
          _context5.next = 9;
          return response.json();

        case 9:
          _context5.t2 = _context5.sent;
          _context5.t3 = {
            type: _context5.t1,
            payload: _context5.t2
          };
          _context5.next = 13;
          return (0, _context5.t0)(_context5.t3);

        case 13:
          _context5.next = 23;
          break;

        case 15:
          _context5.t4 = __WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"];
          _context5.t5 = DISEASES_CREATE_FAILED;
          _context5.next = 19;
          return response.json();

        case 19:
          _context5.t6 = _context5.sent;
          _context5.t7 = {
            type: _context5.t5,
            payload: _context5.t6
          };
          _context5.next = 23;
          return (0, _context5.t4)(_context5.t7);

        case 23:
          _context5.next = 29;
          break;

        case 25:
          _context5.prev = 25;
          _context5.t8 = _context5["catch"](0);
          _context5.next = 29;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: DISEASES_CREATE_FAILED,
            payload: _context5.t8
          });

        case 29:
        case "end":
          return _context5.stop();
      }
    }
  }, createDisease, this, [[0, 25]]);
});

var createPetBreed =
/*#__PURE__*/
__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function createPetBreed(action) {
  var response;
  return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function createPetBreed$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["call"])(fetch, "".concat(__WEBPACK_IMPORTED_MODULE_2__baseurl__["a" /* default */].frontend, "/super-admin/pet-types/").concat(action.payload.pet_type_id, "/breed"), {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(action.payload)
          });

        case 3:
          response = _context6.sent;

          if (!response.ok) {
            _context6.next = 15;
            break;
          }

          _context6.t0 = __WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"];
          _context6.t1 = PET_BREED_CREATE_SUCCEDED;
          _context6.next = 9;
          return response.json();

        case 9:
          _context6.t2 = _context6.sent;
          _context6.t3 = {
            type: _context6.t1,
            payload: _context6.t2
          };
          _context6.next = 13;
          return (0, _context6.t0)(_context6.t3);

        case 13:
          _context6.next = 23;
          break;

        case 15:
          _context6.t4 = __WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"];
          _context6.t5 = PET_BREED_CREATE_FAILED;
          _context6.next = 19;
          return response.json();

        case 19:
          _context6.t6 = _context6.sent;
          _context6.t7 = {
            type: _context6.t5,
            payload: _context6.t6
          };
          _context6.next = 23;
          return (0, _context6.t4)(_context6.t7);

        case 23:
          _context6.next = 29;
          break;

        case 25:
          _context6.prev = 25;
          _context6.t8 = _context6["catch"](0);
          _context6.next = 29;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: PET_BREED_CREATE_FAILED,
            payload: _context6.t8
          });

        case 29:
        case "end":
          return _context6.stop();
      }
    }
  }, createPetBreed, this, [[0, 25]]);
});

var appDataSaga =
/*#__PURE__*/
__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function appDataSaga() {
  return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function appDataSaga$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["takeLatest"])(DISEASES_FETCH_MATCHES, fetchDiseaseMatches);

        case 2:
          _context7.next = 4;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["takeEvery"])(DISEASES_CREATE, createDisease);

        case 4:
          _context7.next = 6;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["takeLatest"])(PET_TYPE_FETCH_MATCHES, fetchPetTypeMatches);

        case 6:
          _context7.next = 8;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["takeEvery"])(PET_TYPE_CREATE, createPetType);

        case 8:
          _context7.next = 10;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["takeLatest"])(PET_BREED_FETCH_MATCHES, fetchPetBreedMatches);

        case 10:
          _context7.next = 12;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["takeEvery"])(PET_BREED_CREATE, createPetBreed);

        case 12:
        case "end":
          return _context7.stop();
      }
    }
  }, appDataSaga, this);
});



/***/ }),

/***/ "./store/super-admin/auth-actions.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SUPER_SIGN_OUT_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SUPER_SIGN_OUT_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return SUPER_SIGN_OUT_SUCCEEDED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return adminSaga; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__ = __webpack_require__("@babel/runtime/regenerator");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__ = __webpack_require__("redux-saga/effects");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_saga_effects___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__baseurl__ = __webpack_require__("./store/baseurl.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_js_cookie__ = __webpack_require__("js-cookie");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_js_cookie___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_js_cookie__);




var SUPER_SIGN_OUT_REQUESTED = "auth.SUPER_SIGN_OUT_REQUESTED";
var SUPER_SIGN_OUT_FAILED = "auth.SUPER_SIGN_OUT_FAILED";
var SUPER_SIGN_OUT_SUCCEEDED = "auth.SUPER_SIGN_OUT_SUCCEEDED";

var signOut =
/*#__PURE__*/
__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function signOut() {
  var token, response;
  return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function signOut$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          token = __WEBPACK_IMPORTED_MODULE_3_js_cookie___default.a.get('token');
          _context.next = 4;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["call"])(fetch, "".concat(__WEBPACK_IMPORTED_MODULE_2__baseurl__["a" /* default */].frontend, "/super-admin/logout/").concat(token));

        case 4:
          response = _context.sent;

          if (response.ok) {
            _context.next = 10;
            break;
          }

          _context.next = 8;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: SUPER_SIGN_OUT_FAILED,
            payload: response.json()
          });

        case 8:
          _context.next = 12;
          break;

        case 10:
          _context.next = 12;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: SUPER_SIGN_OUT_SUCCEEDED,
            payload: response.json()
          });

        case 12:
          _context.next = 18;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](0);
          _context.next = 18;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: SUPER_SIGN_OUT_FAILED,
            payload: _context.t0
          });

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, signOut, this, [[0, 14]]);
});

var adminSaga =
/*#__PURE__*/
__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function adminSaga() {
  return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function adminSaga$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["takeEvery"])(SUPER_SIGN_OUT_REQUESTED, signOut);

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, adminSaga, this);
});



/***/ }),

/***/ "./store/super-admin/reducer.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__auth_actions__ = __webpack_require__("./store/super-admin/auth-actions.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_data_actions__ = __webpack_require__("./store/super-admin/app-data-actions.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux__ = __webpack_require__("redux");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_redux__);
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var initialAuthState = {
  authInProgress: false,
  authError: null,
  successRedirect: null
};

var authReducer = function authReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialAuthState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_0__auth_actions__["b" /* SUPER_SIGN_OUT_REQUESTED */]:
      {
        state = _objectSpread({}, state, {
          authInProgress: true,
          authError: null
        });
        return state;
      }

    case __WEBPACK_IMPORTED_MODULE_0__auth_actions__["a" /* SUPER_SIGN_OUT_FAILED */]:
      {
        state = _objectSpread({}, state, {
          authInProgress: false,
          authError: action.payload
        });
        return state;
      }

    case __WEBPACK_IMPORTED_MODULE_0__auth_actions__["c" /* SUPER_SIGN_OUT_SUCCEEDED */]:
      {
        state = _objectSpread({}, state, {
          authInProgress: false,
          successRedirect: "/super-admin/auth"
        });
        return state;
      }
  }

  return state;
};

var initialDiseases = {
  query: null,
  matched_diseases: [],
  fetch_matches_error: null,
  selected_disease: null
};

var diseaseListReducer = function diseaseListReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialDiseases;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_1__app_data_actions__["a" /* DISEASES_CLEAR_MATCHES */]:
      {
        state = _objectSpread({}, state, {
          matched_diseases: []
        });
        return state;
      }

    case __WEBPACK_IMPORTED_MODULE_1__app_data_actions__["b" /* DISEASES_FETCH_MATCHES */]:
      {
        state = _objectSpread({}, state, {
          fetch_matches_error: null,
          query: action.payload.query
        });
        return state;
      }

    case __WEBPACK_IMPORTED_MODULE_1__app_data_actions__["d" /* DISEASES_FETCH_MATCHES_SUCCEDED */]:
      {
        state = _objectSpread({}, state, {
          matched_diseases: action.payload
        });
        return state;
      }

    case __WEBPACK_IMPORTED_MODULE_1__app_data_actions__["c" /* DISEASES_FETCH_MATCHES_FAILED */]:
      {
        state = _objectSpread({}, state, {
          fetch_matches_error: action.payload
        });
        return state;
      }
  }

  return state;
};

var initialPetTypes = {
  query: null,
  matched_pet_types: [],
  fetch_matches_error: null,
  selected_type: null
};

var petTypeListReducer = function petTypeListReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialPetTypes;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_1__app_data_actions__["i" /* PET_TYPE_CLEAR_MATCHES */]:
      {
        state = _objectSpread({}, state, {
          matched_pet_types: []
        });
        return state;
      }

    case __WEBPACK_IMPORTED_MODULE_1__app_data_actions__["j" /* PET_TYPE_FETCH_MATCHES */]:
      {
        state = _objectSpread({}, state, {
          fetch_matches_error: null,
          query: action.payload.query
        });
        return state;
      }

    case __WEBPACK_IMPORTED_MODULE_1__app_data_actions__["l" /* PET_TYPE_FETCH_MATCHES_SUCCEDED */]:
      {
        state = _objectSpread({}, state, {
          matched_pet_types: action.payload
        });
        return state;
      }

    case __WEBPACK_IMPORTED_MODULE_1__app_data_actions__["k" /* PET_TYPE_FETCH_MATCHES_FAILED */]:
      {
        state = _objectSpread({}, state, {
          fetch_matches_error: action.payload
        });
        return state;
      }
  }

  return state;
};

var initialPetBreeds = {
  query: null,
  matched_pet_breeds: [],
  fetch_matches_error: null,
  selected_breed: null
};

var petBreedListReducer = function petBreedListReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialPetBreeds;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_1__app_data_actions__["e" /* PET_BREED_CLEAR_MATCHES */]:
      {
        state = _objectSpread({}, state, {
          matched_pet_breeds: []
        });
        return state;
      }

    case __WEBPACK_IMPORTED_MODULE_1__app_data_actions__["f" /* PET_BREED_FETCH_MATCHES */]:
      {
        state = _objectSpread({}, state, {
          fetch_matches_error: null,
          query: action.payload.query
        });
        return state;
      }

    case __WEBPACK_IMPORTED_MODULE_1__app_data_actions__["h" /* PET_BREED_FETCH_MATCHES_SUCCEDED */]:
      {
        state = _objectSpread({}, state, {
          matched_pet_breeds: action.payload
        });
        return state;
      }

    case __WEBPACK_IMPORTED_MODULE_1__app_data_actions__["g" /* PET_BREED_FETCH_MATCHES_FAILED */]:
      {
        state = _objectSpread({}, state, {
          fetch_matches_error: action.payload
        });
        return state;
      }
  }

  return state;
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_2_redux__["combineReducers"])({
  authData: authReducer,
  diseaseList: diseaseListReducer,
  petTypeList: petTypeListReducer,
  petBreedList: petBreedListReducer
}));

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./pages/_app.js");


/***/ }),

/***/ "@babel/runtime/regenerator":
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/regenerator");

/***/ }),

/***/ "cookie":
/***/ (function(module, exports) {

module.exports = require("cookie");

/***/ }),

/***/ "isomorphic-fetch":
/***/ (function(module, exports) {

module.exports = require("isomorphic-fetch");

/***/ }),

/***/ "js-cookie":
/***/ (function(module, exports) {

module.exports = require("js-cookie");

/***/ }),

/***/ "next-redux-wrapper":
/***/ (function(module, exports) {

module.exports = require("next-redux-wrapper");

/***/ }),

/***/ "next/app":
/***/ (function(module, exports) {

module.exports = require("next/app");

/***/ }),

/***/ "next/router":
/***/ (function(module, exports) {

module.exports = require("next/router");

/***/ }),

/***/ "react":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-redux":
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),

/***/ "redux":
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),

/***/ "redux-saga":
/***/ (function(module, exports) {

module.exports = require("redux-saga");

/***/ }),

/***/ "redux-saga/effects":
/***/ (function(module, exports) {

module.exports = require("redux-saga/effects");

/***/ })

/******/ });
//# sourceMappingURL=_app.js.map