const { ipcRenderer } = require('electron');
const PUBLIC_METHODS = require('edmf-core/dist/export.details');

<<<<<<< HEAD
const api = (path: string, params: Array<any> = []) => {
  ipcRenderer.send(path, ...params)
   return new Promise((resolve) => {
=======
export interface Campaign {
  id: number
  name: string
  message: string
  weight: number
  status: number
}

const api = (path: string, params: Array<any> = []) => {
  ipcRenderer.send(path, ...params)
   return new Promise((resolve, reject) => {
>>>>>>> c7366cafbab7042bbd0d4cf5b22e44103c2f728f
      ipcRenderer.once(path, (e, data) => {
          if(data.error){
            reject(data.error);
          }else{
            resolve(data);
          }
      });
   });
}

<<<<<<< HEAD
=======
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
>>>>>>> c7366cafbab7042bbd0d4cf5b22e44103c2f728f

const exportFunctions: any = {}
//console.log(PUBLIC_METHODS);
PUBLIC_METHODS.default.forEach((functionName: string) => {
  exportFunctions[functionName] = (...args: Array<any>) => api(functionName, args)
})

export default exportFunctions;