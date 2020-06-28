import React, { useState, useEffect } from 'react'
import FollowersGrid from '../followers/FollowersGrid'
import { Select, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;

const types: any = {
	number: [
		{ id: 'ASC', label: 'Ascending' },
		{ id: 'DESC', label: 'Descending' },
	],
	columns: [
		{ id: 'followers_count', label: 'Followers', type: 'number', added: false },
		{ id: 'friends_count', label: 'Following', type: 'number', added: false },
		{ id: 'statuses_count', label: 'Tweets & Retweets', type: 'number', added: false }
	]
}

const TypedDropdown = ({ options = [], value, handleChange, disabled = false, width = 170 }: { dataType: string } | any) => {
	return (
		<Select style={{ width }} value={value} onChange={handleChange} disabled={disabled}>
			{ options.map((option: any) => <Option value={option.id}>{option.label}</Option>) }
		</Select>
	)
}

const FilterRow = ({ index = 0, filter, deleteFilter, updateFilter, columns, markColumnChange }: any) => {
	
	const getOperatorType = (column: string) => (types.columns.find((item: any) => item.id == column) || {}).type

	const [column, setColumn] = useState(filter.id || null)
	const [operatorType, setOperatorType] = useState(getOperatorType(column) || 'number')
	const [operator, setOperator] = useState('')

	useEffect(() => {
		if(column){
			setOperatorType(getOperatorType(column))
			markColumnChange(column, true)
		}
		return () => markColumnChange(column, false)
	}, [column])

	useEffect(() => {
		setColumn(filter.id)
		setOperator(filter.operator)
	}, [filter])

	const handleUpdateFilter = (args: any) => {
		updateFilter({ id: column, operator, ...args })
	}

	return (
		<div className="flex items-center mb-2">
			{/* First column - Where / Join Condition Dropdown / Join Condition */}
			<div style={{ width: 80 }}>{ index === 0 ? "Order By" : '' }</div>
			{/* Select Column */}
			<div className="ml-2">
				<TypedDropdown
					options={columns}
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
			{/* delete button */}
			<Button className="flex items-center justify-center mx-3" onClick={deleteFilter} icon={<DeleteOutlined />}/>
		</div>
	)
}


const CampaignPreview = ({ segmentIds ,onRankBySelection}: any) => {
	const [filters, setFilters] = useState([])
	const createFilterRow = () => setFilters([...filters, {}])
	const updateFilter = (id, updatedFilter) => setFilters(filters.map((filter, idx) => idx == id ? updatedFilter : filter ))
	const [transformedFilter, setTransformedFilter] = useState([])
	const [columns, setColumns] = useState(types.columns)
	
	useEffect(() => {
		setTransformedFilter(
			filters.filter((item: any) => item.id && item.operator)
		)
		
	}, [filters])

	useEffect(() => {
		onRankBySelection(transformedFilter);
	}, [transformedFilter])

	const markColumnChange = (id: string, value: boolean) => {
		if(id){
			setColumns(columns.map((column: any) => {
				if(column.id == id) return { ...column, added: value }
				return column
			}))
		}
	}

	return (
		<div>
			<div>
				<div className="">
					<div className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Rank By</div>
					<div className="flex flex-col align-left p-5 border-solid border-2 border-gray-300">
						{ filters.map((filter, index) => 
							<FilterRow
								filter={filter}
								index={index}
								key={index}
								updateFilter={(updatedFilter: any) => updateFilter(index, updatedFilter)}
								deleteFilter = {() => setFilters(filters.filter((item, idx) => idx != index))}
								columns={columns.filter(column => !column.added)}
								markColumnChange={markColumnChange}
							/>
						)}
						{	filters.length < types.columns.length &&
							<div onClick={createFilterRow} className="color-indigo-700 hover:underline cursor-pointer">
								+ Add Sort Option
							</div>
						}
					</div>
				</div>
			</div>
			<div className="ag-theme-alpine mt-2" style={{ height: 'calc(100vh - 100px)', width: '100%' }}>
				<FollowersGrid segmentIds={segmentIds} hideRecordCount={true}  />
			</div>
		</div>
	)
}

export default CampaignPreview;