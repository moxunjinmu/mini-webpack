(function (modules) {
  function require(filePath) {
    // const fn = modules[filePath]
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
  // require('./main.js')
  require(1)
})({
  2: [
    function (require, module, exports) {
      // foo.js
      function foo() {
        console.log("foo");
      }
      module.exports = {
        foo
      }
    }
  ],
  1: [
    function (require, module, exports) {
      // main.js
      const {foo} = require('./foo')
      foo()
      console.log("main.js");
    },{
      './foo': 2
    }
  ]
})