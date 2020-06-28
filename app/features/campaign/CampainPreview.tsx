import React, { useState, useEffect } from 'react'
import FollowersGrid from '../followers/FollowersGrid'
import { Select } from 'antd';

const { Option } = Select;

const sortOptions: any = {
	sortBy: [
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

const FilterRow = ({ sortBy, sortOrder,  setSortBy, setSortOrder }: any) => {
	

	return (
		<div className="flex items-center mb-2">
			<div>
				<TypedDropdown
					options={sortOptions.columns}
					value={sortBy}
					handleChange={(value: string) => setSortBy(value)}
				/>
			</div>
			{/* operator */}
			<div className="ml-2">
				<TypedDropdown
					options={sortOptions.sortBy}
					value={sortOrder}
					handleChange={(value: string) => setSortOrder(value)}
				/>
			</div>
		</div>
	)
}


const CampaignPreview = ({ segmentIds ,onRankBySelection, rankBy}: any) => {
	const [sortBy, setSortBy] = useState(rankBy[0][0])
	const [sortOrder, setSortOrder] = useState(rankBy[0][1])
	
	useEffect(() => {
		onRankBySelection([[sortBy,sortOrder]]);
	}, [sortBy,sortOrder])

	return (
		<div>
			<div>
				<div className="">
					<div className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Rank By</div>
							<FilterRow
								sortBy={sortBy}
								sortOrder={sortOrder}
								setSortBy={setSortBy}
								setSortOrder={setSortOrder}
							/>
				</div>
			</div>
			<div className="ag-theme-alpine mt-2" style={{ height: 'calc(100vh - 19rem)', width: '100%' }}>
				<FollowersGrid segmentIds={segmentIds} hideRecordCount={true} order={[[sortBy,sortOrder]]} disableSort />
			</div>
		</div>
	)
}

export default CampaignPreview;