import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes.json';
import Header from '../../containers/Header';
// import { FormGroup,InputGroup  } from '@blueprintjs/datetime';
import { FormGroup,InputGroup  } from '@blueprintjs/datetime';
import { ItemRenderer, MultiSelect } from "@blueprintjs/select";
import SegmentSelect from './SegmentSelect';

export default function CreateCampaign() {
  const dispatch = useDispatch();
  //TODO:Dispatch to get all the segments
  const [allSegments, setallSegments] = useState([{id:1,name:"Segment 1"},{id:2,name:"Has > 10K Followers"},{id:3,name:"In US"},{id:4,name:"Tweets More"}]);
  //TODO:Get the selected Segment for edit campaign.But mostly for edit mode this should be on read only mode
  const [segments, setSegments] = useState([]);
  const onChange =(segments)=>{
    setSegments(segments);
  };
  return (
      <div class="w-full">
       <Header name="Campaigns"/>
       <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div class="flex justify-between">
            <p className="text-gray-500">Create Campaign <b>></b> Untitled </p>
            <div class="flex flex-row-reverse">
              <button class="bg-indigo-700 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded">
                Save
              </button>
              <button class="bg-indigo-700 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded mr-3">
                Send Test
              </button>
            </div>
          </div>
          <div class="border-b border-gray-200 mb-4">
            <nav class="-mb-px flex">
              <a href="#" class="py-2 px-1 border-b-2 border-indigo-500 font-medium text-sm leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300">
                Configuration
              </a>
              <a href="#" class="ml-8 py-2 px-1 border-b-2 border-transparent font-medium text-sm leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300">
                Review
              </a>
            </nav>
         </div>
          <div>
            <div>
            <form class="w-full max-w-lg">
                <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                    Name
                    </label>
                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"  type="text" placeholder="Eg. New book Promotion"/>
                    
                </div>
                <div class="w-full px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="description">
                    Description
                    </label>
                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Campaign Description"/>
                </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="message">
                    Message
                    </label>
                    <textarea class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="password" placeholder="This is the DM that I want to send my followers"/>
                </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-2">
                <div class="w-full px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="recipients">
                    Recipients
                    </label>
                    <SegmentSelect allSegments={allSegments} selectedSegments={segments} onChange={onChange}/>
                </div>
            </div>
            </form>
            </div>
          </div>
        </div>
        
       </main>
      </div>
  );
}
