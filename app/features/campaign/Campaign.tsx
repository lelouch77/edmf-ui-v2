import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes.json';
import Header from '../../containers/Header';
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
        <Header name="Campaigns"/>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="mb-4">
            <Link to={routes.CREATECAMPAIGN}>
              <button class="bg-indigo-700 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded">
                Create Campaign
              </button>
            </Link>
            </div>
            <table aria-describedby="info-popup" aria-label="open tickets" class=" w-full min-h-0 h-full flex flex-col">
                <thead class="border-t border-b flex w-full flex-col px-4">
                  <tr class="flex">
                    <th class="font-semibold text-left py-3 px-1 w-24 truncate">
                      Name
                    </th>
                    <th class="font-semibold text-left py-3 px-1 w-full max-w-xs xl:max-w-lg truncate">
                      Description
                    </th>
                    <th class="font-semibold text-left py-3 px-1 flex-1 truncate">
                      Weight
                    </th>
                    <th class="font-semibold text-left py-3 px-1 flex-1 truncate">
                      Status
                    </th>
                    <th class="font-semibold text-left py-3 px-1 flex-1 truncate">
                      Created Date
                    </th>
                  </tr>
                </thead>
            </table>
          </div>
        </main>
      </div>
  );
}
