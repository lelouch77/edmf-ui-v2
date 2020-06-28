import React,{useEffect,useState,useRef} from 'react';
import { AgGridReact } from 'ag-grid-react';
import Header from '../../containers/Header';
import NameRenderer from '../../components/renderers/NameRenderer';
import VerifiedRenderer from '../../components/renderers/VerifiedRenderer';
import { InfiniteRowModelModule } from 'ag-grid-community';
import API from '../../api/easyDMAPI'


const FollowersGrid = (props) => {
        const [gridAPI,setGridAPI] = useState(null);
        const [tableCount,setTableCount] = useState(0);
        
        useEffect(()=>{
           gridAPI && gridAPI.purgeInfiniteCache();
        },[props.segmentIds]);

		const columnDefs = [
		{ 
			headerName: "Name", field: "name",cellRenderer: 'nameRenderer',
			valueGetter: (params: any) => {
				return params.data && { 
					name: params.data.name,
					image: params.data.profile_image_url_https
				};
			},
			flex:2
		},
		{ headerName: "Screen Name", field: "screen_name",flex:1},
		{ headerName: "Followers Count", field: "followers_count" ,flex:1},
		{ headerName: "Friends Count", field: "friends_count" ,flex:1},
		{ headerName: "Location", field: "location",flex:2},
		{ headerName: "Verified", field: "verified" ,cellRenderer: 'verifiedRenderer',flex:1}
	]

	const defaultColDef = { sortable: true }

	const components = {
		nameRenderer: NameRenderer,
		verifiedRenderer: VerifiedRenderer
	}

	const paginationConfig = {
		modules: [InfiniteRowModelModule ],
		rowModelType: 'infinite',
		paginationPageSize: 100,
		cacheOverflowSize: 2,
		maxConcurrentDatasourceRequests: 2,
		infiniteInitialRowCount: 1000,
		maxBlocksInCache: 2,
		rowBuffer: 0
	};
    
	const onGridReady = params => {
        setGridAPI(params.api);
		var dataSource = {
			rowCount: null,
				getRows: function(params) {
					//console.log('asking for ' + params.startRow + ' to ' + params.endRow);
					let sortParams = params.sortModel.length > 0  ? [params.sortModel.map((sortBy)=>{
						return [sortBy.colId,sortBy.sort.toUpperCase()]
					})]:undefined;

					let query = {offset:params.startRow,limit:100,order:sortParams};
					if(props.segmentIds && props.segmentIds.length>0){
						query.segmentIds = props.segmentIds;
					}
					API.getPaginatedFollowers(query).then((res)=>{
                        //TBD Update the table count from the Query
                        setTableCount(res.count);
						params.successCallback(res.rows, res.count);
					});
				}
			};
		params.api.setDatasource(dataSource);
	};
	return (
          <>
                {
                   
                    <div class="flex flex-row-reverse mb-2 text-gray-500" >
                            Showing {tableCount} records
                    </div>
                   
                }
                <AgGridReact 
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    components ={components}
                    rowModelType={paginationConfig.rowModelType}
                    paginationPageSize={paginationConfig.paginationPageSize}
                    cacheOverflowSize={paginationConfig.cacheOverflowSize}
                    maxConcurrentDatasourceRequests={
                    paginationConfig.maxConcurrentDatasourceRequests
                    }
                    infiniteInitialRowCount={paginationConfig.infiniteInitialRowCount}
                    maxBlocksInCache={paginationConfig.maxBlocksInCache}
                    rowBuffer={paginationConfig.rowBuffer}
                    onGridReady={onGridReady}
                >
                </AgGridReact>
            </>
	);
}
 
export default FollowersGrid;