import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes.json';
import Header from '../../containers/Header';
import { fetchCampaigns,selectCampaigns } from './campaignSlice'
import NoCampaignFound from './NoCampaign'
import { AgGridReact } from 'ag-grid-react';
import moment from 'moment';

export default function Campaign({campaigns,editCampaign}) {
  const statusMap = {
    20:"🕑 Scheduled",
    30:"⏸ Paused",
    40:"✔ Done"
  }
  const columnDefs = [
    { headerName: "Name", field: "name"},
    { headerName: "Description", field: "description",flex:2},
    { headerName: "Messages Per Day", field: "allocated_msg_count" },
    { headerName: "Status", field: "status" ,valueFormatter : (params)=>{
      return statusMap[params.value]
    } },
    { headerName: "Last Updated", field: "updatedAt",valueFormatter : (params)=>{
      return moment(params.value).format('MM/DD/YYYY HH:mm A')
    }}
  ]
 const defaultColDef = { sortable: true ,flex:1}

 function handleEditCampaign(params){
  var selectedRows = params.api.getSelectedRows();
  if(selectedRows.length >0){
    editCampaign(selectedRows[0])
  }
   
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
              <div className="ag-theme-alpine" style={{ height: 'calc(100vh - 170px)', width: '100%' }}>
                    <AgGridReact 
                      columnDefs={columnDefs}
                      defaultColDef={defaultColDef}
                      rowData={campaigns}
                      onSelectionChanged={handleEditCampaign}
                      rowSelection={'single'}
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
