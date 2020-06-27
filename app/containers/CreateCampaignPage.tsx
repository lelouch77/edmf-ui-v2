<<<<<<< HEAD
import React,{useEffect,useState} from 'react';
=======
import React from 'react';
>>>>>>> c7366cafbab7042bbd0d4cf5b22e44103c2f728f
import CreateCampaign from '../features/campaign/CreateCampaign';
import API from '../api/easyDMAPI'
import { useHistory } from "react-router-dom";
import routes from '../constants/routes.json';
import {notification } from 'antd';
import openNotification from '../components/common/Notification';
import { withRouter } from "react-router";


function CreateCampaignPage(props) {
<<<<<<< HEAD

=======
  console.log(props);
>>>>>>> c7366cafbab7042bbd0d4cf5b22e44103c2f728f
  const history = useHistory();
  const newCampaign = {
    name:"Untitled",
    description:"",
    message:"",
    segmentIds:[],
    allocated_msg_count:100,
    scheduled_time:null
  }
<<<<<<< HEAD

  const [allSegments, setAllSegments]=  useState([]);

  useEffect(()=>{
    API.getSegments().then((segments)=>{
      setAllSegments(segments);
    });
  },[]);

  async function handleSubmit(newCampaign){
=======
  //Fetch this from API
  const allSegments= [];

  async function handleSubmit(newCampaign){
    //   const segment = await API.createSegment({
    //     name: "Segment 1",
    //     description: "This is a test Segment",
    //     filters: {
    //         filterType: "AND",
    //         conditions: [
    //             {
    //                 id: "followers_count",
    //                 operator: "GT",
    //                 value: 500000
    //             }
    //         ]
    //     }
    // });
    newCampaign.segmentIds = [1]
>>>>>>> c7366cafbab7042bbd0d4cf5b22e44103c2f728f
    API.createCampaign(newCampaign);
    openNotification("Campaign created successfully");
    history.push(routes.CAMPAIGNS);
  }

<<<<<<< HEAD
  async function handleTestDM(testDM){
    API.sendDM(testDM);
    openNotification("Test Message has been sent successfully");
  }


  return <CreateCampaign campaign={newCampaign} segments={allSegments}  onSubmit={handleSubmit} onTestDM={handleTestDM} />;
=======
  return <CreateCampaign campaign={newCampaign} segments={allSegments} onSubmit={handleSubmit}/>;
>>>>>>> c7366cafbab7042bbd0d4cf5b22e44103c2f728f
}

const CreateCampaignPageWithRouter = withRouter(CreateCampaignPage)

export default CreateCampaignPageWithRouter;