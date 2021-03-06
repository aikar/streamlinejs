/*** Generated by streamline 0.1.44rt2 - DO NOT EDIT ***/ "use strict"; var __rt=require('streamline-runtime')(__filename),__func=__rt.__func,__cb=__rt.__cb,__propagate=__rt.__propagate,__trap=__rt.__trap,__future=__rt.__future,__setEF=__rt.__setEF,__g=__rt.__g; var fs = require("fs");



var fspath = require("path");
var uuid = require("streamline/lib/util//uuid");
var flows = require("streamline/lib/util/flows");
var each = flows.each;

var dependencies = {};

var commentsRE = /(\/\*([^*]|[\r\n]|(\*+([^*\/]|[\r\n])))*\*+\/)|(\/\/.*)/g;
var requireRE = /require\s*\(('|")([\w\W]*?)('|")\)/gm;

var funnel = flows.funnel(1);

function _exists(callback, path) {
 fspath.exists(path, function(result) {
 return callback(null, result); });};


function _normalize(path) {
 return path.replace(/\\/g, "/");};


var modulesDir = _normalize(__dirname).split("/");
modulesDir = modulesDir.slice(0, (modulesDir.length - 4)).join("/");

function _combine(path, rel) {
 var cut = path.lastIndexOf("/");
 if ((cut <= 0)) {
 throw new Error(("too many parent dirs" + rel)) };
 path = path.substring(0, cut);
 while ((rel.indexOf("./.") == 0)) { rel = rel.substring(2);; };

 if ((rel.indexOf("../") == 0)) {
 return _combine(path, rel.substring(1)) };
 if ((rel.indexOf("./") != 0)) {
 return ((modulesDir + "/") + rel) };
 return (path + rel.substring(1));};


var _etag = uuid.generate();
var _watched = {};

function _watcher(stats) {

 funnel(null, function() {

 _etag = uuid.generate();

 Object.keys(_watched).forEach(function(path) {
 fs.unwatchFile(path); });

 _watched = { };
 dependencies = { }; });};




exports.etag = function() {
 return ("" + _etag);};

function _watch(file) {
 if (!_watched[file]) {
 _watched[file] = true; };};




function _loadFile(_, path) { var js, js_; var __frame = { name: "_loadFile", line: 71 }; return __func(_, this, arguments, _loadFile, 0, __frame, function __$_loadFile() {
 js = (path + ".js");
 js_ = (path + "_.js");
 return _exists(__cb(_, __frame, 3, 5, function ___(__0, __1) { return (function __$_loadFile(__then) { if (__1) {
 _watch(js_);
 return require("streamline/lib/compiler/compile").loadFile(__cb(_, __frame, 5, 9, _), js); } else {
 return _exists(__cb(_, __frame, 6, 12, function ___(__0, __3) { return (function __$_loadFile(__then) { if (__3) {
 _watch(js);
 return fs.readFile(js, "utf8", __cb(_, __frame, 8, 9, _)); } else {

 return _(new Error(("invalid require path: " + path))); } ; })(__then); }), js); } ; })(_); }), js_); });};


function _extendPath(_, path) { var __frame = { name: "_extendPath", line: 84 }; return __func(_, this, arguments, _extendPath, 0, __frame, function __$_extendPath() { return (function __$_extendPath(_) { return (function __$_extendPath(_) {
 return _exists(__cb(_, __frame, 1, 6, function ___(__0, __3) { var __2 = !__3; var __4 = !__2; return (function __$_extendPath(__then) { if (__4) { var __5 = __2; return _(null, __5); } else { __then(); } ; })(function __$_extendPath() { return _exists(__cb(_, __frame, 1, 34, _), path); }); }), (path + ".js")); })(__cb(_, __frame, -83, 8, function ___(__0, __1) { var __3 = !__1; return (function __$_extendPath(__then) { if (__3) { var __4 = __1; return _(null, __4); } else { __then(); } ; })(function __$_extendPath() { return fs.stat(path, __cb(_, __frame, 1, 54, function ___(__0, __6) { var __5 = __6.isDirectory(); return _(null, __5); })); }); })); })(__cb(_, __frame, -83, 8, function ___(__0, __2) { return (function __$_extendPath(__then) { if (__2) {

 return _exists(__cb(_, __frame, 3, 6, function ___(__0, __3) { return (function __$_extendPath(__then) { if (__3) {
 return _(null, (path + "/main")); } else {
 return _exists(__cb(_, __frame, 5, 11, function ___(__0, __4) { return (function __$_extendPath(__then) { if (__4) {
 return _(null, (path + "/index")); } else { __then(); } ; })(__then); }), (path + "/index.js")); } ; })(__then); }), (path + "/main.js")); } else { __then(); } ; })(function __$_extendPath() {

 return _(null, path); }); })); });};




function _directDependencies(_, path) { var result, str, match; var __frame = { name: "_directDependencies", line: 97 }; return __func(_, this, arguments, _directDependencies, 0, __frame, function __$_directDependencies() {
 if (dependencies[path]) {
 return _(null, dependencies[path]); } ;
 result = [];
 dependencies[path] = result;
 return _loadFile(__cb(_, __frame, 5, 11, function ___(__0, __1) { str = __1;
 str = str.replace(commentsRE, "");

 while (match = requireRE.exec(str)) {
 result.push(_combine(path, match[2])); };
 return _(null, result); }), path); });};





function _missingDependencies(_, path, known) { var knownMap, missingMap;




 function _explore(_, path, missingMap) { var dependencies; var __frame = { name: "_explore", line: 118 }; return __func(_, this, arguments, _explore, 0, __frame, function __$_explore() {
 return _extendPath(__cb(_, __frame, 1, 9, function ___(__0, __2) { path = __2;
 if (knownMap[path]) { return _(null); } ;

 if (missingMap) {
 missingMap[path] = true; } ;
 knownMap[path] = true;
 return _directDependencies(__cb(_, __frame, 7, 21, function ___(__0, __3) { dependencies = __3;
 return each(__cb(_, __frame, 8, 2, _), dependencies, function __1(_, dependency) { var __frame = { name: "__1", line: 126 }; return __func(_, this, arguments, __1, 0, __frame, function __$__1() {
 return _explore(__cb(_, __frame, 1, 3, _), dependency, missingMap); }); }); }), path); }), path); }); }; var __frame = { name: "_missingDependencies", line: 113 }; return __func(_, this, arguments, _missingDependencies, 0, __frame, function __$_missingDependencies() { knownMap = { }; known.forEach(function(key) { knownMap[key] = true; });



 missingMap = { };

 return each(__cb(_, __frame, 20, 1, function __$_missingDependencies() {



 return _explore(__cb(_, __frame, 24, 1, function __$_missingDependencies() {
 return _(null, Object.keys(missingMap)); }), path, missingMap); }), known, function __1(_, cur) { var __frame = { name: "__1", line: 133 }; return __func(_, this, arguments, __1, 0, __frame, function __$__1() { return _explore(__cb(_, __frame, 1, 2, _), cur, null); }); }); });};


exports.directDependencies = function exports_directDependencies__1(_, path) { var __frame = { name: "exports_directDependencies__1", line: 141 }; return __func(_, this, arguments, exports_directDependencies__1, 0, __frame, function __$exports_directDependencies__1() {
 return funnel(__cb(_, __frame, 1, 8, _), function __1(_) { var __frame = { name: "__1", line: 142 }; return __func(_, this, arguments, __1, 0, __frame, function __$__1() {
 return _directDependencies(__cb(_, __frame, 1, 9, _), path); }); }); });};


exports.missingDependencies = function exports_missingDependencies__2(_, path, known) { var __frame = { name: "exports_missingDependencies__2", line: 146 }; return __func(_, this, arguments, exports_missingDependencies__2, 0, __frame, function __$exports_missingDependencies__2() {
 return funnel(__cb(_, __frame, 1, 8, _), function __1(_) { var __frame = { name: "__1", line: 147 }; return __func(_, this, arguments, __1, 0, __frame, function __$__1() {
 return _missingDependencies(__cb(_, __frame, 1, 9, _), path, known); }); }); });};