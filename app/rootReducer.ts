import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import campaignsReducer from './features/campaign/campaignSlice';
import followersReducer from './features/followers/FollowersSlice'

export default function createRootReducer(history: History): any {
  return combineReducers({
    router: connectRouter(history),
    campaigns: campaignsReducer,
    followers: followersReducer
  });
}