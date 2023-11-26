"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/auth/signin";
exports.ids = ["pages/api/auth/signin"];
exports.modules = {

/***/ "@supabase/supabase-js":
/*!****************************************!*\
  !*** external "@supabase/supabase-js" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@supabase/supabase-js");

/***/ }),

/***/ "(api)/./helpers/supabase.ts":
/*!*****************************!*\
  !*** ./helpers/supabase.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/supabase-js */ \"@supabase/supabase-js\");\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__);\n\nconst supabaseUrl = \"https://ayrtqhylxnysxfuhiuyi.supabase.co\";\nconst supabaseAnonKey = \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5cnRxaHlseG55c3hmdWhpdXlpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMDg4NjM1MiwiZXhwIjoyMDE2NDYyMzUyfQ.N0Ghz-kRwBXDkcGaYpux34iCnmVovYiFmtQZB4-yYXg\";\nconst supabase = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(supabaseUrl, supabaseAnonKey);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (supabase);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9oZWxwZXJzL3N1cGFiYXNlLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFxRDtBQUVyRCxNQUFNQyxXQUFXLEdBQUdDLDBDQUFvQztBQUN4RCxNQUFNRyxlQUFlLEdBQUdILDZOQUF5QztBQUNqRSxNQUFNSyxRQUFRLEdBQUdQLG1FQUFZLENBQUNDLFdBQVcsRUFBRUksZUFBZSxDQUFDO0FBRTNELGlFQUFlRSxRQUFRLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jaGFyY2VudHJpYy8uL2hlbHBlcnMvc3VwYWJhc2UudHM/NGQ4OCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVDbGllbnQgfSBmcm9tIFwiQHN1cGFiYXNlL3N1cGFiYXNlLWpzXCI7XG5cbmNvbnN0IHN1cGFiYXNlVXJsID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU1VQQUJBU0VfVVJMO1xuY29uc3Qgc3VwYWJhc2VBbm9uS2V5ID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU1VQQUJBU0VfQU5PTl9LRVk7XG5jb25zdCBzdXBhYmFzZSA9IGNyZWF0ZUNsaWVudChzdXBhYmFzZVVybCwgc3VwYWJhc2VBbm9uS2V5KTtcblxuZXhwb3J0IGRlZmF1bHQgc3VwYWJhc2U7XG4iXSwibmFtZXMiOlsiY3JlYXRlQ2xpZW50Iiwic3VwYWJhc2VVcmwiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfU1VQQUJBU0VfVVJMIiwic3VwYWJhc2VBbm9uS2V5IiwiTkVYVF9QVUJMSUNfU1VQQUJBU0VfQU5PTl9LRVkiLCJzdXBhYmFzZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./helpers/supabase.ts\n");

/***/ }),

/***/ "(api)/./pages/api/auth/signin.ts":
/*!**********************************!*\
  !*** ./pages/api/auth/signin.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _helpers_supabase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../helpers/supabase */ \"(api)/./helpers/supabase.ts\");\n\nconst handler = async (req, res)=>{\n    if (req.method !== \"POST\") {\n        res.status(405).json({\n            message: \"Method not allowed.\"\n        });\n        return;\n    }\n    try {\n        const { email , password  } = req.body;\n        const { user , session , error  } = await _helpers_supabase__WEBPACK_IMPORTED_MODULE_0__[\"default\"].auth.signIn({\n            email,\n            password\n        });\n        if (error) {\n            throw error;\n        }\n        res.status(200).json({\n            data: {\n                user,\n                session\n            },\n            message: \"User successfully signed in.\"\n        });\n    } catch (error) {\n        res.status(error.status).json({\n            message: error.message\n        });\n    }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handler);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvYXV0aC9zaWduaW4udHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFaUQ7QUFVakQsTUFBTUMsT0FBTyxHQUFHLE9BQU9DLEdBQW1CLEVBQUVDLEdBQTZCLEdBQUs7SUFDNUUsSUFBSUQsR0FBRyxDQUFDRSxNQUFNLEtBQUssTUFBTSxFQUFFO1FBQ3pCRCxHQUFHLENBQUNFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO1lBQUVDLE9BQU8sRUFBRSxxQkFBcUI7U0FBRSxDQUFDLENBQUM7UUFDekQsT0FBTztLQUNSO0lBRUQsSUFBSTtRQUNGLE1BQU0sRUFBRUMsS0FBSyxHQUFFQyxRQUFRLEdBQUUsR0FBR1AsR0FBRyxDQUFDUSxJQUFJO1FBS3BDLE1BQU0sRUFBRUMsSUFBSSxHQUFFQyxPQUFPLEdBQUVDLEtBQUssR0FBRSxHQUFHLE1BQU1iLHFFQUFvQixDQUFDO1lBQzFEUSxLQUFLO1lBQ0xDLFFBQVE7U0FDVCxDQUFDO1FBRUYsSUFBSUksS0FBSyxFQUFFO1lBQ1QsTUFBTUEsS0FBSyxDQUFDO1NBQ2I7UUFFRFYsR0FBRyxDQUFDRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztZQUNuQlUsSUFBSSxFQUFFO2dCQUNKTCxJQUFJO2dCQUNKQyxPQUFPO2FBQ1I7WUFDREwsT0FBTyxFQUFFLDhCQUE4QjtTQUN4QyxDQUFDLENBQUM7S0FDSixDQUFDLE9BQU9NLEtBQUssRUFBTztRQUNuQlYsR0FBRyxDQUFDRSxNQUFNLENBQUNRLEtBQUssQ0FBQ1IsTUFBTSxDQUFDLENBQUNDLElBQUksQ0FBQztZQUFFQyxPQUFPLEVBQUVNLEtBQUssQ0FBQ04sT0FBTztTQUFFLENBQUMsQ0FBQztLQUMzRDtDQUNGO0FBRUQsaUVBQWVOLE9BQU8sRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2NoYXJjZW50cmljLy4vcGFnZXMvYXBpL2F1dGgvc2lnbmluLnRzP2M0ZDAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBOZXh0QXBpUmVxdWVzdCwgTmV4dEFwaVJlc3BvbnNlIH0gZnJvbSBcIm5leHRcIjtcblxuaW1wb3J0IHN1cGFiYXNlIGZyb20gXCIuLi8uLi8uLi9oZWxwZXJzL3N1cGFiYXNlXCI7XG5cbnR5cGUgQ29udGVudCA9IHtcbiAgZGF0YT86IHtcbiAgICB1c2VyOiBhbnk7XG4gICAgc2Vzc2lvbjogYW55O1xuICB9O1xuICBtZXNzYWdlOiBzdHJpbmc7XG59O1xuXG5jb25zdCBoYW5kbGVyID0gYXN5bmMgKHJlcTogTmV4dEFwaVJlcXVlc3QsIHJlczogTmV4dEFwaVJlc3BvbnNlPENvbnRlbnQ+KSA9PiB7XG4gIGlmIChyZXEubWV0aG9kICE9PSBcIlBPU1RcIikge1xuICAgIHJlcy5zdGF0dXMoNDA1KS5qc29uKHsgbWVzc2FnZTogXCJNZXRob2Qgbm90IGFsbG93ZWQuXCIgfSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCB7IGVtYWlsLCBwYXNzd29yZCB9ID0gcmVxLmJvZHkgYXMge1xuICAgICAgZW1haWw6IHN0cmluZztcbiAgICAgIHBhc3N3b3JkOiBzdHJpbmc7XG4gICAgfTtcblxuICAgIGNvbnN0IHsgdXNlciwgc2Vzc2lvbiwgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguc2lnbkluKHtcbiAgICAgIGVtYWlsLFxuICAgICAgcGFzc3dvcmQsXG4gICAgfSk7XG5cbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cblxuICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgdXNlcixcbiAgICAgICAgc2Vzc2lvbixcbiAgICAgIH0sXG4gICAgICBtZXNzYWdlOiBcIlVzZXIgc3VjY2Vzc2Z1bGx5IHNpZ25lZCBpbi5cIixcbiAgICB9KTtcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIHJlcy5zdGF0dXMoZXJyb3Iuc3RhdHVzKS5qc29uKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSB9KTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgaGFuZGxlcjtcbiJdLCJuYW1lcyI6WyJzdXBhYmFzZSIsImhhbmRsZXIiLCJyZXEiLCJyZXMiLCJtZXRob2QiLCJzdGF0dXMiLCJqc29uIiwibWVzc2FnZSIsImVtYWlsIiwicGFzc3dvcmQiLCJib2R5IiwidXNlciIsInNlc3Npb24iLCJlcnJvciIsImF1dGgiLCJzaWduSW4iLCJkYXRhIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./pages/api/auth/signin.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/auth/signin.ts"));
module.exports = __webpack_exports__;

})();