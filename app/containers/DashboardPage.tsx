import React, { useEffect, useState } from 'react'
import Dashboard from '../features/dashboard/dashboard';
import { useSelector } from 'react-redux';	

const DashboardPage = () => {
    const { settings } = useSelector((state: any) => state.settings)
    
	return <Dashboard settings={settings}/>;
}
 
export default DashboardPage;