import React,{useEffect,useState} from 'react';
import CreateCampaign from '../features/campaign/CreateCampaign';
import API from '../api/easyDMAPI'
import { useHistory } from "react-router-dom";
import routes from '../constants/routes.json';
import openNotification from '../components/common/Notification';
import { useParams } from "react-router";


function EditCampaignPage(props) {
  const {id} = useParams();
  const activeTabKey = props.location.hash === "#status"?"3":"1"
  const history = useHistory();
  const [campaign,setCampaign] = useState(null);
  const [campaignStatus, setCampaignStatus] = useState(null);

  //Fetch this from API
  const [allSegments, setAllSegments]=  useState([]);
  
  useEffect(()=>{
    API.getCampaign(id).then((campaign)=>{
        campaign.segmentIds = campaign.metadata.segments ? campaign.metadata.segments.map((segment)=>segment.id) : [];
        setCampaign(campaign);
        setAllSegments(campaign.metadata.segments  || []);
    });
    API.getCampaignStatus({id}).then((res)=>{
      setCampaignStatus(res);
  });
  },[]);

  async function handleSubmit(newCampaign){
    //Call update from here
    API.updateCampaign(newCampaign.id,newCampaign);
    openNotification("Campaign updated successfully");
    history.push(routes.CAMPAIGNS);
  }

  async function handleTestDM(testDM){
    API.sendDM(testDM);
    openNotification("Test Message has been sent successfully");
  }

  return  (
    <>
     {campaign && <CreateCampaign campaign={campaign} segments={allSegments} onSubmit={handleSubmit} onTestDM={handleTestDM} activeTab={activeTabKey} campaignStatus={campaignStatus} /> }
    </>
  );
}


export default EditCampaignPage;