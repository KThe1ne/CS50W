webpackHotUpdate("main",{

/***/ "./src/components/LineGraph.js":
/*!*************************************!*\
  !*** ./src/components/LineGraph.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_chartjs_2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-chartjs-2 */ \"./node_modules/react-chartjs-2/dist/index.js\");\n\n\n\nfunction LineGraph() {\n  test = {};\n  fetch(\"/getPriceHistory/\" + \"BTC-USDT\").then(function (response) {\n    return response.json;\n  }).then(function (result) {\n    console.log(result);\n  });\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, \"Line Graph!!!\");\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (LineGraph);\n\n//# sourceURL=webpack:///./src/components/LineGraph.js?");

/***/ })

})