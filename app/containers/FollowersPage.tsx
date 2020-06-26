import React, { useEffect } from 'react'
import Followers from '../features/followers/Followers'
import { useDispatch, useSelector } from 'react-redux';
import { fetchFollowers } from '../features/followers/FollowersSlice'

const FollowersPage = () => {
	const dispatch = useDispatch();
	const { followers } = useSelector((state: any) => state.followers)
	
	useEffect(() => {
		if(followers.length == 0) {
			dispatch(fetchFollowers())
		}
	}, [])
	
	return <Followers followers={followers} />;
}
 
export default FollowersPage;