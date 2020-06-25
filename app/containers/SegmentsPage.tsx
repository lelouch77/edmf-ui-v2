import React, { useEffect, useState } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import CreateSegment from '../features/segments/CreateSegment'
import routes from '../constants/routes.json'
import Segments from '../features/segments/Segments'

export default () => {
	const [ segments, SetSegments ] = useState([])

	useEffect(() => {
		setTimeout(() => {
			SetSegments([])
		},0)
	}, [])

	return (
		<>
			<Router>
				<Switch>
					<Route path={`${routes.SEGMENTS}`} component={() => <Segments segments={segments} /> } exact={true} />
					<Route path={`${routes.SEGMENTS}/create`} component={CreateSegment} />
				</Switch>
			</Router>
		</>
	)
}