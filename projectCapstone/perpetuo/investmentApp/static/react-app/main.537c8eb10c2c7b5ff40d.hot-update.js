webpackHotUpdate("main",{

/***/ "./src/components/LineGraph.js":
/*!*************************************!*\
  !*** ./src/components/LineGraph.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_chartjs_2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-chartjs-2 */ \"./node_modules/react-chartjs-2/dist/index.js\");\n/* harmony import */ var chart_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! chart.js */ \"./node_modules/chart.js/dist/chart.esm.js\");\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && iter[Symbol.iterator] != null || iter[\"@@iterator\"] != null) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n\n\n\nchart_js__WEBPACK_IMPORTED_MODULE_2__[\"Chart\"].register.apply(chart_js__WEBPACK_IMPORTED_MODULE_2__[\"Chart\"], _toConsumableArray(chart_js__WEBPACK_IMPORTED_MODULE_2__[\"registerables\"]));\n\nfunction LineGraph() {\n  var period = \"4hour\";\n  var symbol = \"BTC-USDT\";\n  var data = [];\n  fetch(\"getPriceHistory/\".concat(symbol, \"/\").concat(period)).then(function (response) {\n    return response.json();\n  }).then(function (result) {\n    console.log(result);\n    result.data.forEach(function (element) {\n      data.push({\n        x: element[0],\n        y: element[3]\n      });\n    });\n    console.log(data);\n  });\n  data.reverse();\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, \"Line Graph!!\", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_chartjs_2__WEBPACK_IMPORTED_MODULE_1__[\"Line\"], {\n    data: {\n      datasets: [{\n        type: \"line\",\n        data: data\n      }]\n    }\n  }));\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (LineGraph);\n\n//# sourceURL=webpack:///./src/components/LineGraph.js?");

/***/ })

})