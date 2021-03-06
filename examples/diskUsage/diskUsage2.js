/*** Generated by streamline 0.1.44rt2 - DO NOT EDIT ***/
var __rt=require('streamline-runtime')(__filename),__func=__rt.__func,__cb=__rt.__cb,__tryCatch=__rt.__tryCatch,__trap=__rt.__trap,__propagate=__rt.__propagate,__future=__rt.__future,__setEF=__rt.__setEF,__g=__rt.__g;
            (function main(_) {
              var fs, flows, fileFunnel, p, t0;
/*    18 */   function du(_, path) {
                var total, stat, files, futures;
                var __frame = {
                  name: "du",
                  line: 18
                };
                return __func(_, this, arguments, du, 0, __frame, function __$du() {
/*    19 */       total = 0;
/*    20 */       return fs.stat(path, __cb(_, __frame, 2, 12, function ___(__0, __3) {
                    stat = __3;
                    return (function __$du(__then) {
/*    21 */           if (stat.isFile()) {
/*    22 */             return fileFunnel(__cb(_, __frame, 4, 2, __then), function __1(_) {
                          var __frame = {
                            name: "__1",
                            line: 22
                          };
                          return __func(_, this, arguments, __1, 0, __frame, function __$__1() {
/*    23 */                 return fs.readFile(path, __cb(_, __frame, 1, 12, function ___(__0, __1) {
/*    23 */                   total += __1.length;
                              _();
                            }));
                          });
                        });
                      }
                       else {
                        return (function __$du(__then) {
/*    27 */               if (stat.isDirectory()) {
/*    28 */                 return fs.readdir(path, __cb(_, __frame, 10, 15, function ___(__0, __4) {
                              files = __4;
/*    29 */                   futures = files.map(function(file) {
/*    30 */                     return du(null, ((path + "/") + file));
                              });
/*    32 */                   return flows.reduce(__cb(_, __frame, 14, 12, function ___(__0, __5) {
/*    32 */                     total += __5;
/*    35 */                     console.log(((path + ": ") + total));
                                __then();
/*    32 */                   }), futures, function __2(_, val, future) {
                                var __frame = {
                                  name: "__2",
                                  line: 32
                                };
                                return __func(_, this, arguments, __2, 0, __frame, function __$__2() {
/*    33 */                       return future(__cb(_, __frame, 1, 17, function ___(__0, __2) {
/*    33 */                         var __1 = (val + __2);
                                    return _(null, __1);
                                  }));
                                });
/*    34 */                   }, 0);
                            }));
                          }
                           else {
/*    38 */                 console.log((path + ": odd file"));
                            __then();
                          }
                        ;
                        })(__then);
                      }
                    ;
                    })(function __$du() {
/*    40 */           return _(null, total);
                    });
                  }));
                });
              };
              var __frame = {
                name: "main",
                line: 1
              };
              return __func(_, this, arguments, main, 0, __frame, function __$main() {
/*    13 */     fs = require("fs");
/*    14 */     flows = require("streamline/lib/util/flows");
/*    16 */     fileFunnel = flows.funnel(20);
                return (function ___(__then) {
                  (function ___(_) {
                    __tryCatch(_, function __$main() {
/*    44 */           p = ((process.argv.length > 2) ? process.argv[2] : ".");
/*    46 */           t0 = Date.now();
/*    47 */           return du(__cb(_, __frame, 46, 1, function __$main() {
/*    48 */             console.log((("completed in " + ((Date.now() - t0))) + " ms"));
                        __then();
/*    47 */           }), p);
                    });
                  })(function ___(ex, __result) {
                    __tryCatch(_, function __$main() {
                      if (ex) {
/*    51 */             console.error(ex.stack);
                        __then();
                      }
                       else {
                        _(null, __result);
                      }
                    ;
                    });
                  });
                })(function ___() {
                  __tryCatch(_, _);
                });
              });
            }).call(this, __trap);
