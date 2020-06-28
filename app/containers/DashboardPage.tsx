import React, { useEffect, useState } from 'react';
import Dashboard from '../features/dashboard/dashboard';
import API from '../api/easyDMAPI';
import { useSelector } from 'react-redux';

const DashboardPage = () => {
  const { settings } = useSelector((state: any) => state.settings);
  const [messagesSent, setMessagesSent] = useState(0);
  const [campaigns, setCampaigns] = useState(0);

  function getCampaigns() {
    API.getAllCampaigns().then((allCampaigns) => {
      const campCount = allCampaigns.reduce((acc, camp) => {
        if (camp.status === 10) {
          acc++;
        }
        return acc;
      }, 0);
      setCampaigns(campCount);
    });
  }
  function getMsgCount() {
    API.messagesSentToday().then((msgCount) => {
      setMessagesSent(msgCount);
    });
  }
  useEffect(() => {
    getCampaigns();
    getMsgCount();
  }, []);
  return <Dashboard settings={settings} campaigns={campaigns} messagesSent={messagesSent}  />;
};

export default DashboardPage;
