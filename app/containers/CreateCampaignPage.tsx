import React from 'react';
import CreateCampaign from '../features/campaign/CreateCampaign';
import API from '../api/easyDMAPI'
import { useHistory } from "react-router-dom";
import routes from '../constants/routes.json';
import {notification } from 'antd';
import openNotification from '../components/common/Notification';
import { withRouter } from "react-router";


function CreateCampaignPage(props) {
  console.log(props);
  const history = useHistory();
  const newCampaign = {
    name:"Untitled",
    description:"",
    message:"",
    segmentIds:[],
    allocated_msg_count:100,
    scheduled_time:null
  }
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
    API.createCampaign(newCampaign);
    openNotification("Campaign created successfully");
    history.push(routes.CAMPAIGNS);
  }

  return <CreateCampaign campaign={newCampaign} segments={allSegments} onSubmit={handleSubmit}/>;
}

const CreateCampaignPageWithRouter = withRouter(CreateCampaignPage)

export default CreateCampaignPageWithRouter;