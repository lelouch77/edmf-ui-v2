import React, { useEffect, useState } from 'react'
import Followers from '../features/followers/Followers'

const FollowersPage = () => {
	const [followers, setFollowers] = useState([] as any)

	useEffect(() => {
		setTimeout(() => {
			let followers = [];
			for(let i=0;i<100;i++){
				followers.push({
					name: 'John Doe 1',
					screenName: 'john_doe_ofl_',
					followersCount: 15000,
					friendsCount: 500,
					verified: true
				})
			};
			setFollowers(followers)
		}, 0)
	}, [])
	
	return <Followers followers={followers} />;
}
 
export default FollowersPage;