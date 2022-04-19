# 通过mini-webpack来学习webpack的编译打包流程

- 获取内容
- 获取依赖关系

# loader
 - 用来将babel不支持的文件转换为js文件
 - loader按顺序执行，从rules最后一个向前调用

 # plugins
  - 一个 JavaScript 命名函数。
  - 在插件函数的 prototype 上定义一个 apply 方法。
  - 指定一个绑定到 webpack 自身的事件钩子。
  - 处理 webpack 内部实例的特定数据。
  - 功能完成后调用 webpack 提供的回调。
