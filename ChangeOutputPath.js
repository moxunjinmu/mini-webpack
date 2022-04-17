
export class ChangeOutputPath {

  apply(hooks) {
    hooks.emitFile.tap('ChangeOutputPath', (context) => {
      console.log("--ChangeOutputPath--");
      context.changeOutputPath('./dist/wwj.js')
    })
  }
}