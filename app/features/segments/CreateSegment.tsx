import React, { useState, useEffect } from 'react'
import Header from '../../containers/Header';
import { AgGridReact } from 'ag-grid-react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes.json'
import { Input, Select } from 'antd';
const { Option } = Select;

const defaultColDef = {  sortable: true }

const types: any = {
	boolean: [
		{ id: 'equals', label: 'Equals' }
	],
	number: [
		{ id: 'GTE', label: '>=' },
		{ id: 'LTE', label: '<=' },
	],
	string: [
		{ id: 'contains', label: 'contains' }
	],
	columns: [
		{ id: 'screen_name', label: 'Screen Name', type: 'string', added: false },
		{ id: 'followers_count', label: 'Followers', type: 'number', added: false },
		{ id: 'friends_count', label: 'Following', type: 'number', added: false },
		{ id: 'verified', label: 'Verified', type: 'boolean', added: false },
		{ id: 'location', label: 'Location', type: 'string', added: false },
		{ id: 'statuses_count', label: 'Tweets & Retweets', type: 'number', added: false }
	],
	joinCondition: [
		{ id: 'AND', label: 'AND' },
		{ id: 'OR', label: 'OR' }
	],
	booleanOptions: [
		{ id: 'true', label: 'Yes' },
		{ id: 'false', label: 'No' }
	]
}

const TypedDropdown = ({ options = [], value, handleChange, disabled = false, width = 120 }: { dataType: string } | any) => {
	return (
		<Select style={{ width }} value={value} onChange={handleChange} disabled={disabled}>
			{ options.map((option: any) => <Option value={option.id}>{option.label}</Option>) }
		</Select>
	)
}

const FilterRow = ({ index = 0, filter, joinCondition, setJoinCondition, updateFilter }: any) => {
	
	const [column, setColumn] = useState(filter.column || null)
	const [comparatorType, setComparatorType] = useState(filter.conditionType || 'string')
	const [comparator, setComparator] = useState('')
	const [constraint, setConstraint] = useState(filter.conditionType || '')

	useEffect(() => {
		if(column){
			setComparatorType(types.columns.find((item: any) => item.id == column).type)
			setComparator('')
			setConstraint('')
		}
	}, [column])

	useEffect(() => {
		updateFilter({ column, comparator, constraint })
	}, [column, comparator, constraint])

	return (
		<div className="flex items-center mb-2">
			{/* First column - Where / Join Condition Dropdown / Join Condition */}
			{ index === 0 && <div style={{ width: 80 }}>Where</div> }
			{ index === 1 && <div><TypedDropdown value={joinCondition} options={types.joinCondition} handleChange={setJoinCondition} width={80} /></div> }
			{ index > 1 && <div style={{ width: 80 }}>{ joinCondition }</div> }
			{/* Select Column */}
			<div className="ml-2"><TypedDropdown options={types.columns} handleChange={setColumn} /></div>
			{/* comparator */}
			<div className="ml-2"><TypedDropdown options={types[comparatorType]} value={comparator} handleChange={setComparator} disabled={!column} /></div>
			{/* constraint */}
			<div className="ml-2">
				{ comparatorType == 'boolean' ? 
					<TypedDropdown options={types.booleanOptions} handleChange={setConstraint} disabled={!column} /> :
					<Input placeholder="Value" value={constraint} onChange={e => setConstraint(e.target.value)} disabled={!column} />
				}
			</div>
		</div>
	)
}

export default () => {
	const [joinCondition, setJoinCondition] = useState(types.joinCondition[0].id)
	const [filters, setFilters] = useState([])
	const createFilterRow = () => setFilters([...filters, {}])
	const updateFilter = (id, updatedFilter) => setFilters(filters.map((filter, idx) => idx == id ? updatedFilter : filter ))
	
	useEffect(() => {
		console.log(filters)
	}, [filters])

	return (
		<div className="w-full">
			<Header name="Segments"/>
			<main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
				<div className="flex flex-row-reverse justify-between items-center mb-5">
					<Link to={routes.SEGMENTS}>
						<button className="bg-indigo-700 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded">
							Save
						</button>
					</Link>
					<p className="text-gray-500">Segment <b>></b> Create Segment </p>
				</div>
				<div>
					<div className="p-2">
						<div className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Filters</div>
						<div className="flex flex-col align-left p-5 border-solid border-2 border-gray-300">
							{ filters.map((filter, index) => 
								<FilterRow
									filter={filter}
									index={index}
									joinCondition={joinCondition}
									setJoinCondition={setJoinCondition}
									updateFilter={(updatedFilter: any) => updateFilter(index, updatedFilter)}
								/>
							)}
							<div onClick={createFilterRow} className="color-indigo-700 hover:underline cursor-pointer">
								+ Add Filter
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	)
}