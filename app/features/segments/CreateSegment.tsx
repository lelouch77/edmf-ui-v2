import React, { useState, useEffect } from 'react'
import Header from '../../containers/Header';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes.json'
import { Input, Select, Button, InputNumber } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import FollowersGrid from '../followers/FollowersGrid'
import API from '../../api/easyDMAPI';

const { Option } = Select;

const types: any = {
	boolean: [
		{ id: 'EQ', label: 'Equals' }
	],
	number: [
		{ id: 'GTE', label: '>=' },
		{ id: 'LTE', label: '<=' },
	],
	string: [
		{ id: 'CONTAINS', label: 'contains' },
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

const TypedDropdown = ({ options = [], value, handleChange, disabled = false, width = 170 }: { dataType: string } | any) => {
	return (
		<Select style={{ width }} value={value} onChange={handleChange} disabled={disabled}>
			{ options.map((option: any) => <Option value={option.id}>{option.label}</Option>) }
		</Select>
	)
}

const FilterRow = ({ index = 0, filter, deleteFilter, joinCondition, setJoinCondition, updateFilter }: any) => {
	
	const getOperatorType = (column: string) => (types.columns.find((item: any) => item.id == column) || {}).type

	const [column, setColumn] = useState(filter.id || null)
	const [operatorType, setOperatorType] = useState(getOperatorType(column) || 'string')
	const [operator, setOperator] = useState('')
	const [value, setValue] = useState(filter.value || '')

	useEffect(() => {
		if(column){
			setOperatorType(getOperatorType(column))
		}
	}, [column])

	useEffect(() => {
		setColumn(filter.id)
		setOperator(filter.operator)
		setValue(filter.value)
	}, [filter])

	const handleUpdateFilter = (args: any) => {
		if(args.id){
			args.operator = '',
			args.value = ''
		}
		updateFilter({ id: column, operator, value, ...args })
	}

	return (
		<div className="flex items-center mb-2">
			{/* First column - Where / Join Condition Dropdown / Join Condition */}
			{ index === 0 && <div style={{ width: 80 }}>Where</div> }
			{ index === 1 && 
				<TypedDropdown
					value={joinCondition}
					options={types.joinCondition}
					handleChange={setJoinCondition}
					width={80}
				/>
			}
			{ index > 1 && <div style={{ width: 80 }}>{ joinCondition }</div> }
			{/* Select Column */}
			<div className="ml-2">
				<TypedDropdown
					options={types.columns}
					value={column}
					handleChange={(value: string) => handleUpdateFilter({ id: value })}
				/>
			</div>
			{/* operator */}
			<div className="ml-2">
				<TypedDropdown
					options={types[operatorType]}
					value={operator}
					handleChange={(value: string) => handleUpdateFilter({ operator: value })}
					disabled={!column} 
				/>
			</div>
			{/* value */}
			<div className="ml-2">
				{ operatorType == 'boolean' &&
					<TypedDropdown
						options={types.booleanOptions}
						value={value} 
						handleChange={(value: string) => handleUpdateFilter({ value: value })}
						disabled={!column}
					/>
				}
				{ operatorType == 'number' &&
					<InputNumber
						style={{ width: '100%' }}
						placeholder="Value"
						value={value}
						onChange={value => handleUpdateFilter({ value })}
						disabled={!column}
						min={0}
					/>
				}
				{	operatorType != 'boolean' && operatorType != 'number' &&
					<Input
						placeholder="Value"
						value={value}
						onChange={e => handleUpdateFilter({ value: e.target.value })}
						disabled={!column}
					/>
				}
			</div>
			{/* delete button */}
			<Button className="flex items-center justify-center mx-3" onClick={deleteFilter} icon={<DeleteOutlined />}/>
		</div>
	)
}

export default ({ createSegment }: any) => {
	const [joinCondition, setJoinCondition] = useState(types.joinCondition[0].id)
	const [filters, setFilters] = useState([])
	const createFilterRow = () => setFilters([...filters, {}])
	const updateFilter = (id, updatedFilter) => setFilters(filters.map((filter, idx) => idx == id ? updatedFilter : filter ))
	const [transformedFilter, setTransformedFilter] = useState({})
	const [segmentName, setSegmentName] = useState('')
	
	useEffect(() => {
		// console.log(filters.filter((item: any) => item.id && item.operator && item.value))
		console.log({
			filterType: joinCondition,
			conditions: filters.filter((item: any) => item.id && item.operator && item.value)
		})
		setTransformedFilter({
			filterType: joinCondition,
			conditions: filters.filter((item: any) => item.id && item.operator && item.value)
		})
	}, [filters])

	const handleSaveSegment = () => {
		console.log('handleCreateSegment called', createSegment)
		createSegment({	
			name: segmentName,
			description: '',
			filters: transformedFilter
		})
	}

	return (
		<div className="w-full">
			<Header name="Segments"/>
			<main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
				<div className="flex flex-row-reverse justify-between items-center mb-5">
					<Link to={routes.SEGMENTS}>
						<button 
							onClick={handleSaveSegment}
							className={`${
								!segmentName?
									"bg-indigo-500 text-white opacity-50 cursor-not-allowed":
									"bg-indigo-700 hover:bg-indigo-500 text-white " } font-bold py-2 px-4 rounded`}
							disabled={!segmentName}
						>
							Save
						</button>
					</Link>
					<p className="text-gray-500">Segment <b>></b> Create Segment </p>
				</div>
				<div>
					<div className="max-w-lg mb-6 md:mb-0">
						<label
							className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							htmlFor="name"
						>
							Name
						</label>
						<input
							className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
							type="text"
							placeholder="Name of the segmant"
							value={segmentName}
							onChange={(e: any) => setSegmentName(e.target.value)}
						/>
					</div>
					<div className="">
						<div className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Filters</div>
						<div className="flex flex-col align-left p-5 border-solid border-2 border-gray-300">
							{ filters.map((filter, index) => 
								<FilterRow
									filter={filter}
									index={index}
									key={index}
									joinCondition={joinCondition}
									setJoinCondition={setJoinCondition}
									updateFilter={(updatedFilter: any) => updateFilter(index, updatedFilter)}
									deleteFilter = {() => setFilters(filters.filter((item, idx) => idx != index))}
								/>
							)}
							<div onClick={createFilterRow} className="color-indigo-700 hover:underline cursor-pointer">
								+ Add Filter
							</div>
						</div>
					</div>
				</div>
				<div className="ag-theme-alpine" style={{ height: 'calc(100vh - 100px)', width: '100%' }}>
					<FollowersGrid where={transformedFilter} />
				</div>
			</main>
		</div>
	)
}