import fs from 'fs'
import path from 'path'
import ejs from 'ejs'
import parser from '@babel/parser'
import traverse from '@babel/traverse'
import { transformFromAst } from 'babel-core'
import { jsonLoader } from './jsonLoader.js'
import { ChangeOutputPath} from './ChangeOutputPath.js'
import { SyncHook } from 'tapable'
let id = 0

const webpackConfig = {
  module: {
    rules: [{
      test: /\.json$/,
      use: [jsonLoader]
    }]
  },
  plugins: [new ChangeOutputPath]
}

const hooks = {
  emitFile: new SyncHook(['context'])
}

function createAsset(filePath) {
  // 1.获取文件内容
  let source = fs.readFileSync(filePath, {
    encoding: 'utf-8'
  })
  // console.log("file-source:", source);

  // init loader
  const loaders = webpackConfig.module.rules;
  const loaderContext = {
    addDeps(dep){
      console.log("addDeps", dep);
    }
  }

  // 循环调用loader
  loaders.forEach(({ test, use }) => {
    // 测试文件是否符合正则表达式(json)
    if (test.test(filePath)) {
      if (Array.isArray(use)) {
        // TODO: use.reverse 会报错
        use.forEach((fn) => {
          // 向loader抛出内部webpack内loaderContext上下文对象
          source = fn.call(loaderContext,source)
        })
      } else {
        source = use.call(loaderContext, source)
      }
    }
  })
  // 2.获取依赖关系
  //  ast => 抽象语法树
  const ast = parser.parse(source, {
    sourceType: 'module'
  })

  // 用来存路径
  const deps = []
  // 获取ast里的路径
  traverse.default(ast, {
    ImportDeclaration({ node }) {
      // console.log("node.source.value:", node.source.value);
      deps.push(node.source.value)
    }
  })

  const { code } = transformFromAst(ast, null, {
    presets: ['env']
  })

  // 返回文件内容和依赖路径
  return {
    filePath,
    code,
    deps,
    mapping: {},
    id: id++
  }

}

// const asset = createAsset()
// console.log("asset", asset);

// 构建图结构
function createGraph() {
  const mainAsset = createAsset('./example/main.js')

  const queue = [mainAsset]
  for (const asset of queue) {
    asset.deps.forEach(relativePath => {
      const child = createAsset(path.resolve('./example', relativePath))
      asset.mapping[relativePath] = child.id
      queue.push(child)
    })
  }

  return queue;
}
function initPlugins () {
  const plugins = webpackConfig.plugins
  plugins.forEach((plugin) => {
    plugin.apply(hooks)
  })
}
initPlugins()
const graph = createGraph()
// console.log("graph", graph);


function build(graph) {
  const template = fs.readFileSync('./bundle.ejs', { encoding: 'utf-8' })

  const data = graph.map((asset) => {
    const { id, code, mapping } = asset
    // return {
    //   id: asset.id,
    //   code: asset.code,
    //   mapping: asset.mapping
    // }
    return {
      id,
      code,
      mapping
    }
  })

  // console.log("data--", data);
  const code = ejs.render(template, { data })

  let outputPath = './dist/bundle.js'
  const context = {
    changeOutputPath(path) {
      outputPath = path;
    }
  }
  hooks.emitFile.call(context)
  fs.writeFileSync(outputPath, code);
}

build(graph)