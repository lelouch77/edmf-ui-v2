import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import Header from '../../containers/Header';

const columnDefs = [
	{ headerName: "Name", field: "name" },
	{ headerName: "Screen Name", field: "screenName" },
	{ headerName: "Followers Count", field: "followersCount" },
	{ headerName: "Friends Count", field: "friendsCount" },
	{ headerName: "Verified", field: "verified" }
]

const defaultColDef = { suppressSizeToFit: false, sortable: true }

const Followers = ({ followers }: any) => {
	return (
		<div className="w-full">
			<Header name='Followers' />
			<main className="h-16 mx-auto p-4 sm:p-6 lg:p-8 flex">
				<div className="ag-theme-alpine" style={{ height: 'calc(100vh - 100px)', width: '100%' }}>
					<AgGridReact 
						columnDefs={columnDefs}
						rowData={followers}
						defaultColDef={defaultColDef}
					>
					</AgGridReact>
				</div>
			</main>
		</div>
	);
}
 
export default Followers;