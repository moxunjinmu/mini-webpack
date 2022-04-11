import fs from 'fs'
import path from 'path'
import parser from '@babel/parser'
import traverse from '@babel/traverse'

function createAsset(filePath) {
  // 1.获取文件内容
  const source = fs.readFileSync(filePath, {
    encoding: 'utf-8'
  })
  console.log("file-source:", source);
  // 2.获取依赖关系
  //  ast => 抽象语法树
  const ast = parser.parse(source, {
    sourceType: 'module'
  })

  // 用来存路径
  const deps = []
  // 获取ast里的路径
  traverse.default(ast,{
    ImportDeclaration({ node }) {
      console.log("node.source.value:", node.source.value);
      deps.push(node.source.value)
    }
  })

  // 返回文件内容和依赖路径
  return {
    source,
    deps
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
      console.log('child', child);
    })
  }

}

createGraph()