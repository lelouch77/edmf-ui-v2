import React, { useEffect, useState } from 'react'
import { HashRouter as Router, Switch, Route, useParams } from 'react-router-dom'
import CreateSegment from '../features/segments/CreateSegment'
import routes from '../constants/routes.json'
import Segments from '../features/segments/Segments'
import { fetchSegments, createSegment, deleteSegment, updateSegment } from '../features/segments/SegmentSlice'
import { useDispatch, useSelector } from 'react-redux';

const EditSegment = ({ createSegment }: any) => {
	const {id} = useParams();
	const dispatch = useDispatch();
	const { segments } = useSelector((state: any) => state.segments)
	const currentSegment = segments.find(segment => segment.id == id)
	const handleUpdateSegment = (id, udatedSegment) => dispatch(updateSegment(id, udatedSegment))
	return <CreateSegment createSegment={createSegment} data={currentSegment} updateSegment={handleUpdateSegment} />
}


export default () => {
	const { segments, _defaultSlice } = useSelector((state: any) => state.segments)
  const dispatch = useDispatch();

	useEffect(() => {
		if(_defaultSlice){
			dispatch(fetchSegments())
		}
	}, [_defaultSlice, segments])

	const handleCreateSegment = (newSegment: any) => dispatch(createSegment(newSegment))

	const handleDeleteSegment = (id: any) => dispatch(deleteSegment(id))

	return (
		<>
			<Router>
				<Switch>
					<Route path={`${routes.SEGMENTS}`} component={() => <Segments segments={segments} deleteSegment={handleDeleteSegment} /> } exact={true} />
					<Route path={`${routes.SEGMENTS}/create`} component={() => <CreateSegment createSegment={handleCreateSegment} />} />
					<Route path={`${routes.SEGMENTS}/:id`} component={() => <EditSegment createSegment={handleCreateSegment} />} />
				</Switch>
			</Router>
		</>
	)
}