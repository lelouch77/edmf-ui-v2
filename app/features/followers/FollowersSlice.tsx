import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import API from '../../api/easyDMAPI'
import { AppThunk } from '../../store'

interface FollowersState {
  followers: any[]
  isLoading: boolean
  error: string | null
}

const FollowersInitialState: FollowersState = {
  followers: [],
  isLoading: false,
  error: null
}

const onStart = (state: FollowersState) => {
  state.isLoading = true
}

const onError = (state: FollowersState, action: PayloadAction<string>) => {
  state.isLoading = false
  state.error = action.payload
}

const onSuccess = (state: FollowersState, { payload }: PayloadAction<any>) => {
	state.isLoading = false
	state.error = null
  state.followers = payload
}

const followers = createSlice({
  name: 'followers',
  initialState: FollowersInitialState,
  reducers: { onStart, onSuccess, onError }
})

const fetchFollowers = (): AppThunk => async dispatch => {
	try {
    dispatch(followers.actions.onStart())
    const campaigns = await API.getFollowers()
		dispatch(followers.actions.onSuccess(campaigns))
	} catch (err) {
		dispatch(followers.actions.onError(err.toString()))
	}
}

export default followers.reducer;
export { fetchFollowers };