import React from 'react'

const APIKets = () => {
	return (
		<form className="w-full max-w-lg mx-auto rounded px-8 py-10 bg-white">
			<div className="flex flex-wrap -mx-3 mb-6">
				<h5 className="leading-tight text-xl font-bold px-3 pb-5">Consumer API Keys</h5>
					<div className="w-full px-3 mb-6 md:mb-0">
							<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
							API Key
							</label>
							<input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"  type="text" placeholder=""/>
							
					</div>
					<div className="w-full px-3">
							<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="description">
							API Secret
							</label>
							<input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder=""/>
					</div>
			</div>
			<div className="flex flex-wrap -mx-3 mb-6">
				<h5 className="leading-tight text-xl font-bold px-3 pb-5">Access token & access token secret</h5>
					<div className="w-full px-3 mb-6 md:mb-0">
							<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
							Access token
							</label>
							<input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"  type="text" placeholder=""/>
							
					</div>
					<div className="w-full px-3">
							<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="description">
							Access token secret
							</label>
							<input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder=""/>
					</div>
			</div>
		</form>
	)
}

export default APIKets;