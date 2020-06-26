const { ipcRenderer } = require('electron');

export interface Campaign {
  id: number
  name: string
  message: string
  weight: number
  status: number
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

export async function getFollowers(offset,sortParams){
   ipcRenderer.send('user:getFollowers',offset,sortParams)
   return new Promise((resolve, reject) => {
      ipcRenderer.once('user:getFollowers', (e,data) => {
          resolve(data);
      });
   });
}