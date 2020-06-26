import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes.json';
import Header from '../../containers/Header';
const shell = require('electron').shell;

export default function Settings() {
  const dispatch = useDispatch();

  return (
      <div className="w-full">
        <Header name="Settings"/>
        <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="h-100">
            <div className="flex flex-row-reverse mb-2">
              <button className="bg-indigo-700 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded">
                Save
              </button>
            </div>
            <h2 className="leading-tight text-xl font-bold pb-1">Twitter Keys and Tokens</h2>
            <p className="text-gray-500 text-sm">Easy DM works with a Twitter App which acts as a gateway needed for making requests to Twitter APIs.Please create a app from here <a href="https://developer.twitter.com/en/apps/create">https://developer.twitter.com/en/apps/create</a></p>
            <form className="w-full max-w-lg mx-auto rounded border-solid border px-8 py-10 mt-5">
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
          </div>
        </div>

        </main>
      </div>
  );
}
