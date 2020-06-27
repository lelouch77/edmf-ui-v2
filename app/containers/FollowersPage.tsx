import React, { useEffect, useState } from 'react'
import Followers from '../features/followers/Followers'
import { getFollowers } from '../api/easyDMAPI'

const FollowersPage = () => {
	return <Followers/>;
}
 
export default FollowersPage;