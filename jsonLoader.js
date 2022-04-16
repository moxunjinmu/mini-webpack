export function jsonLoader(source){

  console.log("jsonloader---:", source);
  // 调用webpack内部方法
  this.addDeps('jsonloader')
  return `export default ${JSON.stringify(source)}`
}