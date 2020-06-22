import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes.json';
import { fetchCampaigns,selectCampaigns } from './campaignSlice'

export default function Campaign() {
  const dispatch = useDispatch();
  const campaigns = useSelector(selectCampaigns);
 // console.log(campaigns);

  useEffect(() => {
    dispatch(fetchCampaigns())
  },[])

  return (
      <div class="w-full">
      <header className="bg-white shadow">
        <div className="h-16 mx-auto py-3 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            Campaigns
          </h1>
        </div>
      </header>
       <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="h-100">

          </div>
        </div>
       </main>
      </div>
  );
}
