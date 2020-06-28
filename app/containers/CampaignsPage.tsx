import React, { useEffect, useState } from 'react';
import Campaign from '../features/campaign/Campaign';
import API from '../api/easyDMAPI'
import { useHistory } from "react-router-dom";
import routes from '../constants/routes.json';

function CampaignsPage() {
  const history = useHistory();
  const [campaigns,setCampaigns] = useState([]);
  const [isLoading,setLoading] = useState(true);

  function getCampaigns(){
    API.getAllCampaigns({order:[['createdAt','DESC']]}).then((allCampaigns)=>{
       setCampaigns(allCampaigns);
       setLoading(false);
     });
  }
  useEffect(()=>{
    getCampaigns();
  },[]);

  async function editCampaign(campaign){
    history.push(routes.EDITCAMPAIGN+`/${campaign.id}#status`);
  }

  function deleteCampaign(id){
    API.deleteCampaign(id).then(()=>{
      getCampaigns();
    });
  }

  function updateCampaign(id,updatedCampaign){
    API.updateCampaign(id,updatedCampaign).then(()=>{
      getCampaigns();
    });
  }

  return (
    <>
     {!isLoading && <Campaign campaigns={campaigns} editCampaign={editCampaign} deleteCampaign={deleteCampaign} updateCampaign={updateCampaign}/> }
    </>
  );
}

export default CampaignsPage;