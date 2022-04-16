(function (modules) {
  function require(id) {
    const [fn, mapping] = modules[id]

    const module = {
      exports: {}
    }

    function localRequire(filePath) {
      const id = mapping[filePath]
      return require(id)
    }

    fn(localRequire, module, module.exports)
    return module.exports;
  }
  require(0)
})({

  '0': [function (require, module, exports) {
    "use strict";

    var _foo = require("./foo.js");

    //不加.js 获取文件时会报错
    (0, _foo.foo)();
    console.log("main");
  }, { "./foo.js": 1 }],


  '1': [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.foo = foo;

    var _bar = require("./bar.js");

    function foo() {
      console.log("foo.js");
      (0, _bar.bar)();
    }
  }, { "./bar.js": 2 }],


  '2': [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.bar = bar;

    var _user = require("./user.json");

    var userInfo = _interopRequireWildcard(_user);

    function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

    function bar() {
      console.log("bar");
      console.log("userinfo", userInfo);
    }
  }, { "./user.json": 3 }],


  '3': [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = "{\r\n  \"name\": \"moxun\",\r\n  \"age\": 18\r\n}";
  }, {}],

})