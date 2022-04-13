(function (modules) {
  function require(filePath) {
    const fn = modules[filePath]

    const module = {
      exports: {}
    }

    fn(require, module, module.exports)
    return module.exports;
  }
  require('./main.js')
})({
  
    './example/main.js': function (require, module, exports) {
      "use strict";

var _foo = require("./foo.js");

//不加.js 获取文件时会报错
(0, _foo.foo)();
console.log("main");
    }
  
  
    'D:\code\vue源码\mini-webpack\example\foo.js': function (require, module, exports) {
      "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.foo = foo;

function foo() {
  console.log("foo.js");
}
    }
  
  
})