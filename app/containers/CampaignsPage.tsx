import React, { useState, useEffect } from 'react';
import Campaign from '../features/campaign/Campaign';
import API from '../api/easyDMAPI'
import { useHistory } from "react-router-dom";
import routes from '../constants/routes.json';

function CampaignsPage() {
  const history = useHistory();
  const [campaigns,setCampaigns] = useState([]);
  const [isLoading,setLoading] = useState(true);

  function getCampaigns(){
    API.getAllCampaigns({order:[['updatedAt','DESC']]}).then((allCampaigns)=>{
       setCampaigns(allCampaigns);
       setLoading(false);
     });
  }
  useEffect(()=>{
    getCampaigns();
  },[]);

  async function editCampaign(campaign){
    //TODO: This is not working correctly
    history.push(routes.EDITCAMPAIGN+`/${campaign.id}`);
  }

  function deleteCampaign(id){
    API.deleteCampaign(id).then(()=>{
      getCampaigns();
    });
  }

  return (
    <>
     {!isLoading && <Campaign campaigns={campaigns} editCampaign={editCampaign} deleteCampaign={deleteCampaign}/> }
    </>
  );
}

export default CampaignsPage;