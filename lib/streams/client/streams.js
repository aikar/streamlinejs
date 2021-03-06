/*** Generated by streamline 0.1.44rt2 - DO NOT EDIT ***/ "use strict"; var __rt=require('streamline-runtime')(__filename),__func=__rt.__func,__cb=__rt.__cb,__future=__rt.__future,__propagate=__rt.__propagate,__trap=__rt.__trap,__setEF=__rt.__setEF,__g=__rt.__g; function DataBuffer(options) {

















 var _chunks = [];

 this.read = function read__1(_, len) { var chunks, total, chunk; var __frame = { name: "read__1", line: 21 }; return __func(_, this, arguments, read__1, 0, __frame, function __$read__1() {
 if ((len < 0)) {
 len = Infinity; } ;
 if ((len == 0)) {
 return _(null, ""); } ;
 chunks = []; total = 0;
 while ((total < len)) {
 chunk = _chunks.splice(0, 1)[0];
 if (!chunk) {
 return _(null, ((chunks.length == 0) ? null : chunks.join(""))); } ;
 if (((total + chunk.length) <= len)) {
 chunks.push(chunk);
 total += chunk.length; }
 else {
 chunks.push(chunk.substring(0, (len - total)));
 _chunks.splice(0, 0, chunk.substring((len - total)));
 total = len; } ; };


 return _(null, chunks.join("")); }); };




 this.readAll = function readAll__2(_) { var __this = this; var __frame = { name: "readAll__2", line: 45 }; return __func(_, this, arguments, readAll__2, 0, __frame, function __$readAll__2() {
 return __this.read(__cb(_, __frame, 1, 9, _), -1); }); };




 this.unread = function(chunk) {
 _chunks.splice(0, 0, chunk);
 return this; };


 this.write = function write__3(_, data, enc) { var __this = this; var __frame = { name: "write__3", line: 56 }; return __func(_, this, arguments, write__3, 0, __frame, function __$write__3() {
 _chunks.push(data); return _(null, __this); }); };



 this.end = function(data, enc) {
 if (data) {
 _chunks.push(data); };
 return this; };


 this.contents = function() {
 return _chunks.join(""); };};



function HttpError(statusCode, message) {
 this.statusCode = statusCode;
 this.message = message;
 this.stack = new Error().stack;};


function _fixHttpClientOptions(options) {
 if (!options) {
 throw new Error("request error: no options") };
 if ((typeof options === "string")) {
 options = { url: options }; };
 return options;};



















function HttpClientRequest(options) {
 options = _fixHttpClientOptions(options);
 DataBuffer.call(this, options);
 var _xhr;
 this.response = function(callback) {
 if (!callback) {
 return __future.call(this, this.response, arguments, 0) };
 $.ajax({
 url: options.url,
 headers: options.headers,
 type: options.method,
 data: this.contents(),
 dataType: "text",
 beforeSend: function(xhr) {
 _xhr = xhr; },

 success: function(data, statusText, xhr) {
 callback(null, new HttpClientResponse(data, xhr)); },

 error: function(xhr, statusText, message) {
 if ((statusText == "error")) {
 callback(new HttpError(xhr.status, ((statusText + ": ") + message))); } else {

 callback(new HttpError(400, ((statusText + ": ") + message))); }; } }); };



 this.abort = function() {
 (_xhr && _xhr.abort());
 _xhr = null; };};



function HttpClientResponse(data, xhr) {
 DataBuffer.call(this);
 this.end(data);
 this.statusCode = xhr.status;
 this.headers = { };
 var self = this;
 xhr.getAllResponseHeaders().replace(/\r\n/g, "\n").split("\n").forEach(function(header) {
 var pair = header.split(":");
 self.headers[pair[0].toLowerCase()] = (pair[1] && pair[1].trim()); });};



exports.httpRequest = function(options) {
 return new HttpClientRequest(options);};