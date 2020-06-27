import React from 'react';
import Header from '../../containers/Header';
import FollowersGrid from './FollowersGrid'

const Followers = ({segmentIds}) => {
	return (
		<div className="w-full">
			<Header name='Followers' />
			<main className="h-16 mx-auto p-4 sm:p-6 lg:p-8 flex">
				<div className="ag-theme-alpine" style={{ height: 'calc(100vh - 100px)', width: '100%' }}>
					<FollowersGrid segmentIds={[]}/>
				</div>
			</main>
		</div>
	);
}
 
export default Followers;