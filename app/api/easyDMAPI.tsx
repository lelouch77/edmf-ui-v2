const { ipcRenderer } = require('electron');
const PUBLIC_METHODS = require('edmf-core/dist/export.details');

const api = (path: string, params: Array<any> = []) => {
  ipcRenderer.send(path, ...params)
   return new Promise((resolve, reject) => {
      ipcRenderer.once(path, (e, data) => {
          console.log(path, data)
          if(data.error){
            reject(data.error);
          }else{
            resolve(data);
          }
      });
   });
}



const exportFunctions: any = {}
//console.log(PUBLIC_METHODS);
PUBLIC_METHODS.default.forEach((functionName: string) => {
  exportFunctions[functionName] = (...args: Array<any>) => api(functionName, args)
})

export default exportFunctions;
export { api }