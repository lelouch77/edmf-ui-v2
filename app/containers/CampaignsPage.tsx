import React, { useEffect, useState } from 'react';
import Campaign from '../features/campaign/Campaign';
import API from '../api/easyDMAPI'
import { useHistory } from "react-router-dom";
import routes from '../constants/routes.json';

function CampaignsPage() {
  const history = useHistory();
  const [campaigns,setCampaigns] = useState([]);
  const [isLoading,setLoading] = useState(true);
<<<<<<< HEAD

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
    //TODO: This is not working correctly
    history.push(routes.EDITCAMPAIGN+`/${campaign.id}`);
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
=======
  useEffect(()=>{
     API.getAllActiveCampaign().then((allCampaigns)=>{
       setCampaigns(allCampaigns);
       setLoading(false);
     });
  },[]);

  function editCampaign(campaign){
    //TODO: This is not working correctly
    history.push(routes.CREATECAMPAIGN+`/${campaign.id}`);
  }

  function deleteCampaign(id){
    API.deleteCampaign(id);
>>>>>>> c7366cafbab7042bbd0d4cf5b22e44103c2f728f
  }

  return (
    <>
<<<<<<< HEAD
     {!isLoading && <Campaign campaigns={campaigns} editCampaign={editCampaign} deleteCampaign={deleteCampaign} updateCampaign={updateCampaign}/> }
=======
     {!isLoading && <Campaign campaigns={campaigns} editCampaign={editCampaign} deleteCampaign={deleteCampaign}/> }
>>>>>>> c7366cafbab7042bbd0d4cf5b22e44103c2f728f
    </>
  );
}

export default CampaignsPage;