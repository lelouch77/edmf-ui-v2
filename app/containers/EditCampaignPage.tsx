import React,{useEffect,useState} from 'react';
import CreateCampaign from '../features/campaign/CreateCampaign';
import API from '../api/easyDMAPI'
import { useHistory } from "react-router-dom";
import routes from '../constants/routes.json';
import {notification } from 'antd';
import openNotification from '../components/common/Notification';
import { useParams } from "react-router";


function EditCampaignPage(props) {
  const {id} = useParams();
  const history = useHistory();
  const [campaign,setCampaign] = useState(null);

  //Fetch this from API
  const [allSegments, setAllSegments]=  useState([]);
  
  useEffect(()=>{
    API.getCampaign(id).then((campaign)=>{
        campaign.segmentIds = campaign.metadata.segments.map((segment)=>segment.id);
        setCampaign(campaign);
    });
    API.getSegments().then((segments)=>{
      setAllSegments(segments);
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
     {campaign && <CreateCampaign campaign={campaign} segments={allSegments} onSubmit={handleSubmit} onTestDM={handleTestDM}/> }
    </>
  );
}


export default EditCampaignPage;