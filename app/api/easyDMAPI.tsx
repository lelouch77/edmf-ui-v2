const { ipcRenderer } = require('electron');

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
          resolve(data);
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


const routes = ['getFollowers']

const exportFunctions: any = {}

routes.forEach((functionName: string) => {
  exportFunctions[functionName] = (...args: Array<any>) => api(functionName, args)
})

export default exportFunctions;