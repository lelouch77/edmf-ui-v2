import React, { useEffect, useState } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import CreateSegment from '../features/segments/CreateSegment'
import routes from '../constants/routes.json'
import Segments from '../features/segments/Segments'
import { fetchSegments, createSegment } from '../features/segments/SegmentSlice'
import { useDispatch, useSelector } from 'react-redux';


export default () => {
	const { segments, _defaultSlice } = useSelector((state: any) => state.segments)
  const dispatch = useDispatch();

	useEffect(() => {
		if(_defaultSlice){
			dispatch(fetchSegments())
		}
	}, [_defaultSlice, segments])

	const handleCreateSegment = (newSegment: any) => dispatch(createSegment(newSegment))

	return (
		<>
			<Router>
				<Switch>
					<Route path={`${routes.SEGMENTS}`} component={() => <Segments segments={segments} /> } exact={true} />
					<Route path={`${routes.SEGMENTS}/create`} component={() => <CreateSegment createSegment={handleCreateSegment} />} />
				</Switch>
			</Router>
		</>
	)
}