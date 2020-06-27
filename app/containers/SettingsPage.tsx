import React from 'react';
import Settings from '../features/settings/Settings';
import { useSelector } from 'react-redux';

const SettingsPage = () => {
	const { settings } = useSelector((state: any) => state.settings)
  
  return <Settings settings={settings} />;
}

export default SettingsPage;