parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"AaGI":[function(require,module,exports) {
"use strict";var e=1,t={offline:"offline-v"+e},n="offline.html";function c(e){var t=new Request(e,{cache:"reload"});if("cache"in t)return t;var n=new URL(e,self.location.href);return n.search+=(n.search?"&":"")+"cachebust="+Date.now(),new Request(n)}self.addEventListener("install",function(e){e.waitUntil(fetch(c(n)).then(function(e){return caches.open(t.offline).then(function(t){return t.put(n,e)})}))}),self.addEventListener("activate",function(e){var n=Object.keys(t).map(function(e){return t[e]});e.waitUntil(caches.keys().then(function(e){return Promise.all(e.map(function(e){if(-1===n.indexOf(e))return console.log("Deleting out of date cache:",e),caches.delete(e)}))}))}),self.addEventListener("fetch",function(e){("navigate"===e.request.mode||"GET"===e.request.method&&e.request.headers.get("accept").includes("text/html"))&&(console.log("Handling fetch event for",e.request.url),e.respondWith(fetch(e.request).catch(function(e){return console.log("Fetch failed; returning offline page instead.",e),caches.match(n)})))});
},{}]},{},["AaGI"], null)
//# sourceMappingURL=/service-worker.map