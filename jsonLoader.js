export function jsonLoader(source){

  console.log("jsonloader---:", source);
  return `export default ${JSON.stringify(source)}`
}