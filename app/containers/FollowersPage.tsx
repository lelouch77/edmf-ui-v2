import React, { useEffect, useState } from 'react'
import Followers from '../features/followers/Followers'

const FollowersPage = () => {
	const [followers, setFollowers] = useState([] as any)

	useEffect(() => {
		setTimeout(() => {
			setFollowers([
				{
					name: 'John Doe 1',
					screenName: 'john_doe_ofl_',
					followersCount: 15000,
					friendsCount: 500,
					verified: true
				},
				{
					name: 'John Doe 2',
					screenName: 'john_doe_ofl_2',
					followersCount: 15001,
					friendsCount: 500,
					verified: true
				},
				{
					name: 'John Doe 3',
					screenName: 'john_doe_ofl_3',
					followersCount: 15002,
					friendsCount: 500,
					verified: true
				},
				{
					name: 'John Doe 4',
					screenName: 'john_doe_ofl_4',
					followersCount: 15002,
					friendsCount: 500,
					verified: true
				}
			])
		}, 0)
	}, [])
	
	return <Followers followers={followers} />;
}
 
export default FollowersPage;