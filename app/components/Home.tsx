import React from 'react';
import { Link } from 'react-router-dom';
import { DateRangePicker } from '@blueprintjs/datetime';
import routes from '../constants/routes.json';
import styles from './Home.css';

export default function Home(): JSX.Element {
  return (
      <div class="w-full">
        <header className="bg-white shadow">
          <div className="h-16 mx-auto py-3 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">
              Followers
            </h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="mb-4">
                <span className="text-sm leading-5 text-gray-500">Sync Status</span>
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        In Progress
                </span>
            </div>
          </div>
        </main>
      </div>
  );
}
