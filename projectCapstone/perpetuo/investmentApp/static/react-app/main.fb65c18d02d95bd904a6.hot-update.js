webpackHotUpdate("main",{

/***/ "./node_modules/chart.js/dist/chart.esm.js":
false,

/***/ "./node_modules/chart.js/dist/chunks/helpers.segment.js":
false,

/***/ "./node_modules/react-chartjs-2/dist/index.js":
false,

/***/ "./src/components/LineGraph.js":
/*!*************************************!*\
  !*** ./src/components/LineGraph.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, exports) {

eval("throw new Error(\"Module build failed (from ./node_modules/babel-loader/lib/index.js):\\nSyntaxError: C:\\\\CompApp\\\\CS50W\\\\projectCapstone\\\\perpetuo\\\\investmentApp\\\\templates\\\\react-app\\\\src\\\\components\\\\LineGraph.js: Unexpected token (9:37)\\n\\n\\u001b[0m \\u001b[90m  7 |\\u001b[39m   \\u001b[36mlet\\u001b[39m symbol \\u001b[33m=\\u001b[39m \\u001b[32m\\\"BTC-USDT\\\"\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m  8 |\\u001b[39m\\u001b[0m\\n\\u001b[0m\\u001b[31m\\u001b[1m>\\u001b[22m\\u001b[39m\\u001b[90m  9 |\\u001b[39m   fetch(\\u001b[32m`getPriceHistory/${symbol}/${}`\\u001b[39m)\\u001b[0m\\n\\u001b[0m \\u001b[90m    |\\u001b[39m                                      \\u001b[31m\\u001b[1m^\\u001b[22m\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 10 |\\u001b[39m   \\u001b[33m.\\u001b[39mthen(response \\u001b[33m=>\\u001b[39m response\\u001b[33m.\\u001b[39mjson())\\u001b[0m\\n\\u001b[0m \\u001b[90m 11 |\\u001b[39m   \\u001b[33m.\\u001b[39mthen(result \\u001b[33m=>\\u001b[39m {console\\u001b[33m.\\u001b[39mlog(result)})\\u001b[0m\\n\\u001b[0m \\u001b[90m 12 |\\u001b[39m   \\u001b[0m\\n    at instantiate (C:\\\\CompApp\\\\CS50W\\\\projectCapstone\\\\perpetuo\\\\investmentApp\\\\templates\\\\react-app\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:72:32)\\n    at constructor (C:\\\\CompApp\\\\CS50W\\\\projectCapstone\\\\perpetuo\\\\investmentApp\\\\templates\\\\react-app\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:359:12)\\n    at Object.raise (C:\\\\CompApp\\\\CS50W\\\\projectCapstone\\\\perpetuo\\\\investmentApp\\\\templates\\\\react-app\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:3339:19)\\n    at Object.unexpected (C:\\\\CompApp\\\\CS50W\\\\projectCapstone\\\\perpetuo\\\\investmentApp\\\\templates\\\\react-app\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:3377:16)\\n    at Object.parseExprAtom (C:\\\\CompApp\\\\CS50W\\\\projectCapstone\\\\perpetuo\\\\investmentApp\\\\templates\\\\react-app\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:13123:22)\\n    at Object.parseExprAtom (C:\\\\CompApp\\\\CS50W\\\\projectCapstone\\\\perpetuo\\\\investmentApp\\\\templates\\\\react-app\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:8039:20)\\n    at Object.parseExprSubscripts (C:\\\\CompApp\\\\CS50W\\\\projectCapstone\\\\perpetuo\\\\investmentApp\\\\templates\\\\react-app\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:12648:23)\\n    at Object.parseUpdate (C:\\\\CompApp\\\\CS50W\\\\projectCapstone\\\\perpetuo\\\\investmentApp\\\\templates\\\\react-app\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:12627:21)\\n    at Object.parseMaybeUnary (C:\\\\CompApp\\\\CS50W\\\\projectCapstone\\\\perpetuo\\\\investmentApp\\\\templates\\\\react-app\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:12598:23)\\n    at Object.parseMaybeUnaryOrPrivate (C:\\\\CompApp\\\\CS50W\\\\projectCapstone\\\\perpetuo\\\\investmentApp\\\\templates\\\\react-app\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:12392:61)\\n    at Object.parseExprOps (C:\\\\CompApp\\\\CS50W\\\\projectCapstone\\\\perpetuo\\\\investmentApp\\\\templates\\\\react-app\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:12399:23)\\n    at Object.parseMaybeConditional (C:\\\\CompApp\\\\CS50W\\\\projectCapstone\\\\perpetuo\\\\investmentApp\\\\templates\\\\react-app\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:12369:23)\\n    at Object.parseMaybeAssign (C:\\\\CompApp\\\\CS50W\\\\projectCapstone\\\\perpetuo\\\\investmentApp\\\\templates\\\\react-app\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:12321:21)\\n    at Object.parseExpressionBase (C:\\\\CompApp\\\\CS50W\\\\projectCapstone\\\\perpetuo\\\\investmentApp\\\\templates\\\\react-app\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:12257:23)\\n    at C:\\\\CompApp\\\\CS50W\\\\projectCapstone\\\\perpetuo\\\\investmentApp\\\\templates\\\\react-app\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:12251:39\\n    at Object.allowInAnd (C:\\\\CompApp\\\\CS50W\\\\projectCapstone\\\\perpetuo\\\\investmentApp\\\\templates\\\\react-app\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:14352:12)\\n    at Object.parseExpression (C:\\\\CompApp\\\\CS50W\\\\projectCapstone\\\\perpetuo\\\\investmentApp\\\\templates\\\\react-app\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:12251:17)\\n    at Object.parseTemplateSubstitution (C:\\\\CompApp\\\\CS50W\\\\projectCapstone\\\\perpetuo\\\\investmentApp\\\\templates\\\\react-app\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:13575:17)\\n    at Object.parseTemplate (C:\\\\CompApp\\\\CS50W\\\\projectCapstone\\\\perpetuo\\\\investmentApp\\\\templates\\\\react-app\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:13566:34)\\n    at Object.parseExprAtom (C:\\\\CompApp\\\\CS50W\\\\projectCapstone\\\\perpetuo\\\\investmentApp\\\\templates\\\\react-app\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:13017:21)\\n    at Object.parseExprAtom (C:\\\\CompApp\\\\CS50W\\\\projectCapstone\\\\perpetuo\\\\investmentApp\\\\templates\\\\react-app\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:8039:20)\\n    at Object.parseExprSubscripts (C:\\\\CompApp\\\\CS50W\\\\projectCapstone\\\\perpetuo\\\\investmentApp\\\\templates\\\\react-app\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:12648:23)\\n    at Object.parseUpdate (C:\\\\CompApp\\\\CS50W\\\\projectCapstone\\\\perpetuo\\\\investmentApp\\\\templates\\\\react-app\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:12627:21)\\n    at Object.parseMaybeUnary (C:\\\\CompApp\\\\CS50W\\\\projectCapstone\\\\perpetuo\\\\investmentApp\\\\templates\\\\react-app\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:12598:23)\\n    at Object.parseMaybeUnaryOrPrivate (C:\\\\CompApp\\\\CS50W\\\\projectCapstone\\\\perpetuo\\\\investmentApp\\\\templates\\\\react-app\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:12392:61)\\n    at Object.parseExprOps (C:\\\\CompApp\\\\CS50W\\\\projectCapstone\\\\perpetuo\\\\investmentApp\\\\templates\\\\react-app\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:12399:23)\\n    at Object.parseMaybeConditional (C:\\\\CompApp\\\\CS50W\\\\projectCapstone\\\\perpetuo\\\\investmentApp\\\\templates\\\\react-app\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:12369:23)\\n    at Object.parseMaybeAssign (C:\\\\CompApp\\\\CS50W\\\\projectCapstone\\\\perpetuo\\\\investmentApp\\\\templates\\\\react-app\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:12321:21)\\n    at C:\\\\CompApp\\\\CS50W\\\\projectCapstone\\\\perpetuo\\\\investmentApp\\\\templates\\\\react-app\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:12279:39\\n    at Object.allowInAnd (C:\\\\CompApp\\\\CS50W\\\\projectCapstone\\\\perpetuo\\\\investmentApp\\\\templates\\\\react-app\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:14352:12)\");\n\n//# sourceURL=webpack:///./src/components/LineGraph.js?");

/***/ })

})