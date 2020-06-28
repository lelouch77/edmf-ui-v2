import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes.json';
import Header from '../../containers/Header';
import { fetchCampaigns,selectCampaigns } from './campaignSlice'
import NoCampaignFound from './NoCampaign'
import { AgGridReact } from 'ag-grid-react';
import moment from 'moment';
import ActionRenderer from '../../components/renderers/ActionRenderer';
import LinkRenderer from '../../components/renderers/LinkRenderer';
import {formatTimeStamp} from '../../utils/DateUtils'


export default function Campaign({campaigns,editCampaign,deleteCampaign,updateCampaign}) {
  const statusMap = {
    10:"🕑 Scheduled",
    30:"⏸ Paused",
    40:"✔ Done"
  }

  function handleDeleteCampaign(campaign){
    deleteCampaign(campaign.id);
  }

  function handlePauseCampaign(campaign){
    updateCampaign(campaign.id,{status:30});
  }

  function handleRestartCampaign(campaign){
    updateCampaign(campaign.id,{status:10});
  }


 const defaultColDef = { sortable: true ,flex:1}
  const columnDefs = [
  { headerName: "Name", field: "name",cellRenderer: 'linkRenderer',cellRendererParams: {
        onClick: handleEditCampaign, 
      }},
  { headerName: "Description", field: "description",flex:2},
  { headerName: "Messages Per Day", field: "allocated_msg_count" },
  { headerName: "Scheduled At", field: "scheduled_time" ,valueFormatter:(params)=>{
    return formatTimeStamp(params.value)
  }},
  { headerName: "Status", field: "status" ,valueFormatter : (params)=>{
    return statusMap[params.value]
  } },
  { headerName: "Last Run", field: "last_run",valueFormatter : (params)=>{
    return params.value && moment(params.value).format('MM/DD/YYYY HH:mm A') || '--'
  }},
  { headerName: "Action",cellRenderer: 'actionRenderer',cellRendererParams: {
        onDelete: handleDeleteCampaign, 
        onPause: handlePauseCampaign, 
        onRestart: handleRestartCampaign
      }}
]
 const frameworkComponents = {

	actionRenderer: ActionRenderer,
  linkRenderer:LinkRenderer
}

function handleEditCampaign(campaign){
   editCampaign(campaign);
}


  return (
      <div className="w-full">
        <Header name="Campaigns"/>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {campaigns && campaigns.length > 0?
            ( 
              <>
                <div className="mb-4">
                <Link to={routes.CREATECAMPAIGN}>
                  <button className="bg-indigo-700 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded">
                    Create Campaign
                  </button>
                </Link>
              </div>
              <div className="ag-theme-alpine" style={{ height: 'calc(100vh - 15rem)', width: '100%' }}>
                    <AgGridReact 
                      columnDefs={columnDefs}
                      defaultColDef={defaultColDef}
                      rowData={campaigns}
                      onSelectionChanged={handleEditCampaign}
                      frameworkComponents ={frameworkComponents}
                    >
                    </AgGridReact>
				        </div>
            </>
            ):(<NoCampaignFound/>) }
          </div>
        </main>
      </div>
  );
}
