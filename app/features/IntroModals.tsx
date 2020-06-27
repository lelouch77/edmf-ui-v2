import React, { useState } from 'react'
import ViralTweet from '../assets/undraw/viral_tweet.png'

const APIKeysModal = ({ handleSaveKeys }: any) => {

	const [accessTokenKey, setAccessTokenKey] = useState('')
	const [accessTokenSecret, setAccessTokenSecret] = useState('')
	const [consumerKey, setConsumerkey] = useState('')
	const [consumerSecret, setConsumerSecret] = useState('')

	return (
		<form className="w-full max-w-lg mx-auto rounded">
			<div className="flex flex-wrap -mx-3 mb-6">
				<h5 className="leading-tight text-xl font-bold px-3 pb-5">Consumer API Keys</h5>
					<div className="w-full px-3 mb-6 md:mb-0">
							<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
							API Key
							</label>
							<input
								value={consumerKey}
								onChange={(e: any) => setConsumerkey(e.target.value)}
								className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
								type="text"
								placeholder=""
							/>
							
					</div>
					<div className="w-full px-3">
							<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="description">
							API Secret
							</label>
							<input 
								value={consumerSecret}
								onChange={(e: any) => setConsumerSecret(e.target.value)}
								type="text"
								placeholder=""
								className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							/>
					</div>
			</div>
			<div className="flex flex-wrap -mx-3 mb-6">
				<h5 className="leading-tight text-xl font-bold px-3 pb-5">Access token & access token secret</h5>
					<div className="w-full px-3 mb-6 md:mb-0">
							<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
							Access token
							</label>
							<input
								value={accessTokenKey}
								onChange={(e: any) => setAccessTokenKey(e.target.value)}
								type="text"
								placeholder=""
								className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
							/>
							
					</div>
					<div className="w-full px-3">
							<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="description">
							Access token secret
							</label>
							<input
								value={accessTokenSecret}
								onChange={(e: any) => setAccessTokenSecret(e.target.value)}
								type="text"
								placeholder=""
								className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							/>
					</div>
			</div>
			<div className="flex w-full flex-row-reverse mt-5">
				<button
					onClick={() => handleSaveKeys({ accessTokenKey, accessTokenSecret, consumerKey, consumerSecret })}
					className="bg-indigo-700 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded"
				>
					Save
				</button>
			</div>
		</form>
	)
}

const WelcomeScreen = ({ handleNext }: any) => {
	return (
		<div className="w-full max-w-lg mx-auto rounded flex flex-col items-center">
			<img src={ViralTweet} alt="" className="w-300" />
			<div className="text-2xl my-5">Hey There! Welcome to Jupiter</div>
			<button
				onClick={handleNext}
				className="bg-indigo-700 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded"
			>
				Proceed
			</button>
		</div>
	)
}

const abbreviateNumber = (value) => {
	var newValue = value;
	if (value >= 1000) {
			var suffixes = ["", "K", "M", "B","T"];
			var suffixNum = Math.floor( (""+value).length/3 );
			var shortValue = '';
			for (var precision = 2; precision >= 1; precision--) {
					shortValue = parseFloat( (suffixNum != 0 ? (value / Math.pow(1000,suffixNum) ) : value).toPrecision(precision));
					var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g,'');
					if (dotLessShortValue.length <= 2) { break; }
			}
			if (shortValue % 1 != 0)  shortValue = shortValue.toFixed(1);
			newValue = shortValue+suffixes[suffixNum];
	}
	return newValue;
}

const ProfileScreenModal = ({ user, handleDone }: any) => {
	console.log(user)
	return (
		<div>
			<div className="flex w-full flex-col items-center">
				<img className="w-20 rounded-full" src={user.profile_image_url_https} alt=""/>
				<div className="mt-2">{ user.name } <span className="text-indigo-700">(@{ user.screen_name })</span></div>
			</div>
			<div className="flex w-full justify-center mt-5">
				<div className="flex flex-col items-center px-8 py-2">
					<div>Followers</div>
					<div className="text-3xl">{abbreviateNumber(user.followers_count)}</div>
				</div>
				<div className="flex flex-col items-center px-8 py-2">
					<div>Following</div>
					<div className="text-3xl">{abbreviateNumber(user.friends_count)}</div>
				</div>
			</div>
			<div className="flex w-full flex-row-reverse mt-5">
				<button
					onClick={handleDone}
					className="bg-indigo-700 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded"
				>
					Done
				</button>
			</div>
		</div>
	)
}

export { APIKeysModal, WelcomeScreen, ProfileScreenModal };