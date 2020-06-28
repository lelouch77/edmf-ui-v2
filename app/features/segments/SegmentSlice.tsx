import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import API from '../../api/easyDMAPI'
import { AppThunk } from '../../store'

interface SegmentState {
	_defaultSlice: boolean
	segments?: any[]
  isLoading?: boolean
	error?: string | null
}

const SegmentsInitialState: SegmentState = {
	_defaultSlice: true,
	segments: [],
  isLoading: false,
  error: null
}

const onStart = (state: SegmentState) => {
	state.isLoading = true
	state._defaultSlice = false
}

const onError = (state: SegmentState, action: PayloadAction<string>) => {
  state.isLoading = false
  state.error = action.payload
}

const onSuccess = (state: SegmentState, { payload }: PayloadAction<any>) => {
	state.isLoading = false
	state.error = null
  state.segments = payload
}

const segments = createSlice({
  name: 'segments',
  initialState: SegmentsInitialState,
  reducers: { onStart, onSuccess, onError }
})

const fetchSegments = (): AppThunk => async dispatch => {
	try {
    dispatch(segments.actions.onStart())
    const segmentsList = await API.getSegments()
		dispatch(segments.actions.onSuccess(segmentsList))
	} catch (err) {
		dispatch(segments.actions.onError(err.toString()))
	}
}

const createSegment = (newSegment: any): AppThunk => async dispatch => {
	try {
    dispatch(segments.actions.onStart())
    await API.createSegment(newSegment)
		dispatch(fetchSegments())
	} catch (err) {
		dispatch(segments.actions.onError(err.toString()))
	}
}

const deleteSegment = (id: any): AppThunk => async dispatch => {
	try {
    dispatch(segments.actions.onStart())
    await API.deleteSegment(id)
		dispatch(fetchSegments())
	} catch (err) {
		dispatch(segments.actions.onError(err.toString()))
	}
}

export default segments.reducer;
export { fetchSegments, createSegment, deleteSegment };