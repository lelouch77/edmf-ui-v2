import React from 'react'
import Header from '../../containers/Header';
import { AgGridReact } from 'ag-grid-react';
import { Link } from 'react-router-dom'
import CampainActionRenderert from '../../components/renderers/CampainActionRenderer'
import routes from '../../constants/routes.json'

const defaultColDef = {  sortable: true }

export default ({ segments, createSegment, deleteSegment }: any) => {

	const columnDefs = [
		{ headerName: "Name", field: "name",cellRenderer: 'nameRenderer',  flex:2 },
		{ headerName: "Description", field: "description" , flex:1},
		{ headerName: "Created At", field: "createdAt" ,flex:1},
		{ headerName: "Last Modified", field: "updatedAt", flex:1 },
		{ 
			headerName: "Action",cellRenderer: 'actionRenderer',
			cellRendererParams: { 
				onDelete: deleteSegment,
				onEdit: (id) => console.log('Edit Campaign', id)
			},
			flex:1
		}
	]

	const frameworkComponents = { actionRenderer: CampainActionRenderert }

	return (
		<div className="w-full">
			<Header name="Segments"/>
			<main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8" style={{ height: 'calc(100% - 4rem)'}}>
				<div className="flex items-center mb-5">
					<Link to={`${routes.SEGMENTS}/create`}>
						<button onClick={createSegment} className="bg-indigo-700 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded">
							Create Segment
						</button>
					</Link>
				</div>
				<div className="ag-theme-alpine" style={{ height: 'calc(100% - 3rem)', width: '100%' }}>
					<AgGridReact 
						columnDefs={columnDefs}
						rowData={segments}
						defaultColDef={defaultColDef}
						frameworkComponents={frameworkComponents}
					>
					</AgGridReact>
				</div>
			</main>
		</div>
	)
}