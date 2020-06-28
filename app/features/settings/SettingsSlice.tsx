import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import API from '../../api/easyDMAPI'
import { AppThunk } from '../../store'

interface ISettings {
  _defaultSlice?: boolean
	access_token_key?: string
	access_token_secret?: string
	consumer_key?: string
	consumer_secret?: string
}

interface SettingsState {
  settings: ISettings
  isLoading: boolean
  error: string | null
}

const initialState: SettingsState = {
  settings: { 
    _defaultSlice: true
  },
  isLoading: false,
  error: null
}

const onStart = (state: SettingsState) => {
  state.isLoading = true
}

const onError = (state: SettingsState, action: PayloadAction<string>) => {
  state.isLoading = false
  state.error = action.payload
}

const onSuccess = (state: SettingsState, { payload }: PayloadAction<ISettings>) => {
	state.isLoading = false
	state.error = null
  state.settings = payload
}

const settings = createSlice({
  name: 'settings',
  initialState: initialState,
  reducers: { onStart, onSuccess, onError }
})

const fetchSettings = (): AppThunk => async dispatch => {
	try {
    dispatch(settings.actions.onStart())
    const userInfo = await API.getUserObject()
    console.log('user Info:- ', userInfo)
    dispatch(settings.actions.onSuccess(userInfo || {}))
	} catch (err) {
    if(err == 1) dispatch(settings.actions.onSuccess({}))
		else dispatch(settings.actions.onError(err.toString()))
	}
}

const setSettings = (userInfo: any) => (dispatch: any) => dispatch(settings.actions.onSuccess(userInfo))

export default settings.reducer;
export { fetchSettings, setSettings };