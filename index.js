import fs from 'fs'
import parser from '@babel/parser'

function createAsset() {
  // 1.获取文件内容
  const source = fs.readFileSync('./example/main.js', {
    encoding: 'utf-8'
  })
  console.log("source", source);
  // 2.获取依赖关系
  //  ast => 抽象语法树
  const ast = parser.parse(source, {
    sourceType: 'module'
  })
  console.log("ast", ast);
  return {}

}

createAsset()
