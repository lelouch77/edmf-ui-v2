import React, { useEffect } from 'react';
import Campaign from '../features/campaign/Campaign';
import API from '../api/easyDMAPI'
import { useHistory } from "react-router-dom";
import routes from '../constants/routes.json';

function CampaignsPage() {
  const history = useHistory();
  const [campaigns,setCampaigns] = useState([]);
  const [isLoading,setLoading] = useState(true);
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
  }

  return (
    <>
     {!isLoading && <Campaign campaigns={campaigns} editCampaign={editCampaign} deleteCampaign={deleteCampaign}/> }
    </>
  );
}

export default CampaignsPage;