import React, { useEffect } from 'react'
import EmailCampaignImage from './emailcampaign.png';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes.json';
export default function NoCampaignFound() {
  return (
      <div className="w-1/2 mx-auto">
        <img src={EmailCampaignImage}/>
        <div className="text-center pb-5">
          <Link to={routes.CREATECAMPAIGN}>
            <button className="bg-indigo-700 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded">
              Create Campaign
            </button>
          </Link>
        </div>
      </div>
  );
}
