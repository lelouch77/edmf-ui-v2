import React from 'react';
import CreateCampaign from '../features/campaign/CreateCampaign';
import API from '../api/easyDMAPI'
import { useHistory } from "react-router-dom";
import routes from '../constants/routes.json';

export default function CreateCampaignPage() {
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
    //console.log(newCampaign);
    // const segment = await API.createSegment({
    //     name: "Segment2",
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
    // newCampaign.segmentIds = [segment.id]
    API.createCampaign(newCampaign);
    //history.push(routes.CAMPAIGNS);
  }

  return <CreateCampaign campaign={newCampaign} segments={allSegments} onSubmit={handleSubmit}/>;
}
