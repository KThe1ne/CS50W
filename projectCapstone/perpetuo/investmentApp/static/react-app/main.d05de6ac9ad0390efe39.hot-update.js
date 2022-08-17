webpackHotUpdate("main",{

/***/ "./src/components/LineGraph.js":
/*!*************************************!*\
  !*** ./src/components/LineGraph.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_chartjs_2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-chartjs-2 */ \"./node_modules/react-chartjs-2/dist/index.js\");\n/* harmony import */ var chart_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! chart.js */ \"./node_modules/chart.js/dist/chart.esm.js\");\n\n\n\n\nfunction LineGraph() {\n  var period = \"4hour\";\n  var symbol = \"BTC-USDT\";\n  var data = [];\n  fetch(\"getPriceHistory/\".concat(symbol, \"/\").concat(period)).then(function (response) {\n    return response.json();\n  }).then(function (result) {\n    console.log(result);\n    result.data.forEach(function (element) {\n      data.push({\n        x: element[0],\n        y: element[3]\n      });\n    });\n    console.log(data);\n  });\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, \"Line Graph!!!\", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_chartjs_2__WEBPACK_IMPORTED_MODULE_1__[\"Line\"], {\n    data: {\n      datasets: [{\n        type: \"line\",\n        data: data\n      }]\n    }\n  }));\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (LineGraph);\n\n//# sourceURL=webpack:///./src/components/LineGraph.js?");

/***/ })

})