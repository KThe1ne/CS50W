webpackHotUpdate("main",{

/***/ "./src/components/NavItems.js":
/*!************************************!*\
  !*** ./src/components/NavItems.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/index.js\");\n\n\nvar PAGEURLS = {\n  \"Home\": \"/\",\n  \"Portfolio\": \"/portfolio\",\n  \"Profile\": \"/profile\",\n  \"Sign Out\": \"/sign\"\n};\n\nfunction NavItem(props) {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"a\", {\n    className: \"hover:text-secondary-color\",\n    href: \"#\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"], {\n    to: props.title\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"py-2 hover:pt-0\"\n  }, props.title)));\n}\n/* function NavItem(props) {\r\n  return (\r\n    <Link to=\"/portfolio\">\r\n      {props.title}\r\n    </Link>\r\n  );\r\n} */\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (NavItem);\n\n//# sourceURL=webpack:///./src/components/NavItems.js?");

/***/ })

})