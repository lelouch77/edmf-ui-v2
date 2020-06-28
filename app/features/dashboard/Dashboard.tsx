import React from 'react';
import Header from '../../containers/Header';
import { Statistic } from 'antd';

const Dashboard = ({settings, messagesSent, campaigns}) => {
	return (
		<div className="w-full">
			<Header name='Dashboard' />
			<main className="mx-auto p-4 sm:p-6 lg:p-8">
                <div className="border-b text-3xl leading-normal pb-2">
                    Hi, {settings.name}
                </div>
                <div className="w-full h-full">
                    <div className="flex flex-col w-full py-4">
                      <div class="flex">
                            <div className="mr-4 border-r pr-10">
                                 <Statistic title="Messages Sent today" value={messagesSent} />
                            </div>
                            <div className="mr-4 border-r pr-10">
                                <Statistic title="Active Campaigns" value={campaigns} />
                            </div>
                            <div className="mr-4 border-r pr-10">
                                 <Statistic title="Followers" value={settings.followers_count} />
                            </div>
                            <div className="mr-4 border-r pr-10">
                                 <Statistic title="Following" value={settings.friends_count} />
                            </div>
                            <div className="mr-4 border-r pr-10">
                                 <Statistic title="Tweets" value={settings.statuses_count} />
                            </div>
                      </div>
                    </div>

                </div>
			</main>
		</div>
	);
}
 
export default Dashboard;