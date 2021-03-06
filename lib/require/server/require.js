/*** Generated by streamline 0.1.44rt2 - DO NOT EDIT ***/ "use strict"; var __rt=require('streamline-runtime')(__filename),__func=__rt.__func,__tryCatch=__rt.__tryCatch,__cb=__rt.__cb,__propagate=__rt.__propagate,__trap=__rt.__trap,__future=__rt.__future,__setEF=__rt.__setEF,__g=__rt.__g; var fs = require("fs");










var depend = require("./depend");
var flows = require("streamline/lib/util/flows");
var uuid = require("streamline/lib/util/uuid");
var each = flows.each;
var path = require("path");
var url = require("streamline/lib/util/url");

function _replyError(response, statusCode, body) {
 response.writeHead(statusCode, {
 "Content-Type": "text/plain",
 "Content-Length": body.length });

 response.end(body);};










exports.dispatcher = function(config) {
 config = (config || { });

 var root = (config.root || path.join(__dirname, "../../../../.."));
 return function __1(_, request, response) { var noneMatch, parts, qs, path, known, stats, missing, accept, boundary, endMarker, i; var __frame = { name: "__1", line: 39 }; return __func(_, this, arguments, __1, 0, __frame, function __$__1() { return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$__1() {

 noneMatch = request.headers["if-none-match"];
 if ((noneMatch === depend.etag())) {
 response.writeHead(304, { });
 return _(null, response.end()); } ;

 parts = request.url.split("?");
 qs = url.parseQueryString(parts[1]);
 path = qs["module"];
 known = ((qs["known"] || "")).split(",");

 if ((path[0] == ".")) {
 return _(new Error(("server require cannot resolve relative path: " + path))); } ;
 path = ((path[0] == "/") ? (root + path) : ((root + "/node_modules/") + path));
 return fs.stat((path + ".js"), __cb(_, __frame, 15, 15, function ___(__0, __2) { stats = __2;
 if (!stats.isFile()) {
 return _(null, _replyError(response, 404, ("file not found " + path))); } ;

 return depend.missingDependencies(__cb(_, __frame, 19, 17, function ___(__0, __3) { missing = __3;
 accept = request.headers.accept; return (function __$__1(__then) {
 if ((accept.indexOf("text/html") == 0)) {
 response.writeHead(200, {
 "content-type": "text/html",
 ETag: depend.etag() });

 return response.write(__cb(_, __frame, 26, 4, function __$__1() {








 response.end(); return _(null); }), ((((((("<html>" + "\n<head><title>dependencies: ") + path) + "</title></head>") + "\n<body><ul>") + missing.sort().map(function(dep) { dep = dep.substring((root.length + 1)); return (((("\n<li><a href=\"/require/" + dep) + "\">") + dep) + "</li>"); }).join("")) + "\n</ul>") + "\n</body>\n</html>")); } else { __then(); } ; })(function __$__1() {



 boundary = uuid.generate();
 endMarker = (("\n--" + boundary) + "--\n");
 response.writeHead(200, {
 "Content-Type": (("multipart/related; boundary=\"" + boundary) + "\""),
 ETag: depend.etag() });

 i = 0;
 return each(__cb(_, __frame, 46, 3, function __$__1() {

















 response.end(endMarker); __then(); }), missing, function __1(_, dep) { var modIndex, location, data; var __frame = { name: "__1", line: 85 }; return __func(_, this, arguments, __1, 0, __frame, function __$__1() { return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$__1() { modIndex = dep.indexOf("/node_modules/"); location = ((modIndex >= 0) ? dep.substring((modIndex + 14)) : dep.substring(root.length)); return fs.readFile((dep + ".js"), "utf8", __cb(_, __frame, 4, 16, function ___(__0, __1) { data = __1; return response.write(__cb(_, __frame, 5, 5, __then), (((((((((((("\n--" + boundary) + "\n") + "Content-ID: FILE ") + ++i) + "\n") + "Content-Location: ") + location) + "\n") + "Content-Type: application/javascript\n") + "\n") + data) + "\n")); })); }); })(function ___(ex, __result) { __tryCatch(_, function __$__1() { if (ex) { return response.write(__cb(_, __frame, 11, 5, function __$__1() { response.end(endMarker); __then(); }), ((((((("\n--" + boundary) + "\n") + "Content-ID: ERROR\n") + "Content-Type: text/plain\n") + "\n") + ex.toString()) + "\n")); } else { _(null, __result); } ; }); }); })(function ___() { __tryCatch(_, _); }); }); }); }); }), path, known); })); }); })(function ___(ex, __result) { __tryCatch(_, function __$__1() { if (ex) {

 console.error(((ex.message + "\n") + ex.stack));
 return _(null, _replyError(response, 500, ex.toString())); } else { _(null, __result); } ; }); }); })(function ___() { __tryCatch(_, _); }); }); };};