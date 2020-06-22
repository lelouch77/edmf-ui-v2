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