import React,{useEffect,useState} from 'react';
import CreateCampaign from '../features/campaign/CreateCampaign';
import API from '../api/easyDMAPI'
import { useHistory } from "react-router-dom";
import routes from '../constants/routes.json';
import {notification } from 'antd';
import openNotification from '../components/common/Notification';
import { withRouter } from "react-router";


function CreateCampaignPage(props) {
  const history = useHistory();
  const newCampaign = {
    name:"Untitled",
    description:"",
    message:"",
    segmentIds:[],
    allocated_msg_count:100,
    scheduled_time:null
  }
  const [allSegments, setAllSegments]=  useState([]);

  useEffect(()=>{
    API.getSegments().then((segments)=>{
      setAllSegments(segments);
    });
  },[]);

  async function handleSubmit(newCampaign){
    API.createCampaign(newCampaign);
    openNotification("Campaign created successfully");
    history.push(routes.CAMPAIGNS);
  }


  async function handleTestDM(testDM){
    API.sendDM(testDM);
    openNotification("Test Message has been sent successfully");
  }
  return <CreateCampaign campaign={newCampaign} segments={allSegments}  onSubmit={handleSubmit} onTestDM={handleTestDM} />;
}

const CreateCampaignPageWithRouter = withRouter(CreateCampaignPage)

export default CreateCampaignPageWithRouter;