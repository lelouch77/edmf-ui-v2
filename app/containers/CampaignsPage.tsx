import React, { useState, useEffect } from 'react';
import Campaign from '../features/campaign/Campaign';
import API from '../api/easyDMAPI'
import { useHistory } from "react-router-dom";
import routes from '../constants/routes.json';

function CampaignsPage() {
  const history = useHistory();
  const [campaigns,setCampaigns] = useState([]);
  const [isLoading,setLoading] = useState(false);
  useEffect(()=>{
     API.getAllActiveCampaign().then((allCampaigns)=>{
       setCampaigns(allCampaigns);
       setLoading(true);
     });
  },[]);

  function editCampaign(campaign){
    //TODO: This is not working correctly
    history.push(routes.CREATECAMPAIGN+`/${campaign.id}`);
  }

  return (
    <>
     {isLoading && <Campaign campaigns={campaigns} editCampaign={editCampaign}/> }
    </>
  );
}

export default CampaignsPage;