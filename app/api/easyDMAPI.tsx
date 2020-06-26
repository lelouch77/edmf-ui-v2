const { ipcRenderer } = require('electron');
const PUBLIC_METHODS = require('edmf-core/dist/export.details');

export interface Campaign {
  id: number
  name: string
  message: string
  weight: number
  status: number
}

const api = (path: string, params: Array<any> = []) => {
  ipcRenderer.send(path, ...params)
   return new Promise((resolve) => {
      ipcRenderer.once(path, (e, data) => {
          if(data.error){
            reject(data.error);
          }else{
            resolve(data);
          }
      });
   });
}

export interface CampaignResult {
  campaigns: Campaign[]
}

export async function getCampaigns(): Promise<CampaignResult>{
    return [{
        id:1,
        name:"Campaign 1",
        message:"I want to write to you...",
        weight:100,
        status:10
    }];
}


const exportFunctions: any = {}
//console.log(PUBLIC_METHODS);
PUBLIC_METHODS.default.forEach((functionName: string) => {
  exportFunctions[functionName] = (...args: Array<any>) => api(functionName, args)
})

export default exportFunctions;