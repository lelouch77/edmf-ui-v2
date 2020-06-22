import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';

type Props = {
  children: ReactNode;
};

export default function App(props: Props) {
  const { children } = props;
  return (
      <div className="bg-white h-full flex">
        <aside
        className="flex flex-col items-center bg-gray-800 text-gray-300 shadow min-h-screen">
        <div className="h-16 flex items-center w-full">
          <Link to={routes.HOME} className="h-16 px-6 flex flex justify-center items-center w-full
              focus:bg-gray-700">
            <img
              className="h-6 w-6 mx-auto"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/512px-Svelte_Logo.svg.png"
              alt="svelte logo" />
          </Link>
        </div>
        <ul>
          <li className="hover:bg-gray-700">
            <Link to={routes.CAMPAIGNS} className="h-16 px-6 flex flex justify-center items-center w-full
              focus:bg-gray-700">
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round">
                <polyline
                  points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
                <path
                  d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0
                  2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0
                  0-1.79 1.11z"></path>
              </svg>
          </Link>
          </li>
            <li className="hover:bg-gray-700">
            <Link to={routes.COUNTER} className="h-16 px-6 flex flex justify-center items-center w-full
              focus:bg-gray-700">
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round">
                <polyline
                  points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
                <path
                  d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0
                  2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0
                  0-1.79 1.11z"></path>
              </svg>
          </Link>
          </li>
        </ul>

        <div className="mt-auto h-16 flex items-center w-full">
          <button
            className="h-16 w-10 mx-auto flex flex justify-center items-center
            w-full focus:text-orange-500 hover:bg-red-200 focus:outline-none">
            <svg
              className="h-5 w-5 text-red-700"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </button>
        </div>
      </aside>
  

      {children}
  </div>);
}
