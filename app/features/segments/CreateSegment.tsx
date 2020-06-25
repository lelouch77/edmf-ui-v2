import React from 'react'
import Header from '../../containers/Header';
import { AgGridReact } from 'ag-grid-react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes.json'

const defaultColDef = {  sortable: true }

export default () => {
	return (
		<div className="w-full">
			<Header name="Campaigns"/>
			<main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
				<div className="flex flex-row-reverse justify-between items-center mb-5">
					<Link to={routes.SEGMENTS}>
						<button className="bg-indigo-700 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded">
							Save
						</button>
					</Link>
					<div>Route</div>
				</div>
				<div>
				
				</div>
			</main>
		</div>
	)
}