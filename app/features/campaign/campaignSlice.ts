import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Campaign,getCampaigns,CampaignResult } from 'api/easyDMAPI'
import { AppThunk } from '../../store'

interface CampaignsState {
  campaigns: Campaign[]
  isLoading: boolean
  error: string | null
}

const campaignsInitialState: CampaignsState = {
  campaigns: [],
  isLoading: false,
  error: null
}

function startLoading(state: CampaignsState) {
  state.isLoading = true
}

function loadingFailed(state: CampaignsState, action: PayloadAction<string>) {
  state.isLoading = false
  state.error = action.payload
}

const campaigns = createSlice({
  name: 'campaigns',
  initialState: campaignsInitialState,
  reducers: {
    getCampaignsStart: startLoading,
    getCampaignsSuccess(state, { payload }: PayloadAction<CampaignResult>) {
      state.campaigns = payload
      state.isLoading = false
      state.error = null
    },
    getCampaignsFailure: loadingFailed
  }
})

export const {
  getCampaignsStart,
  getCampaignsSuccess,
  getCampaignsFailure,
} = campaigns.actions

export default campaigns.reducer

export const fetchCampaigns = (
): AppThunk => async dispatch => {
  try {
    dispatch(getCampaignsStart())
    const campaigns = await getCampaigns()
    dispatch(getCampaignsSuccess(campaigns))
  } catch (err) {
    dispatch(getCampaignsFailure(err.toString()))
  }
}

export const selectCampaigns = (state: RootState) => state.campaigns;