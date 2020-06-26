import React, { useEffect } from 'react';
import Settings from '../features/settings/Settings';
import { useSelector } from 'react-redux';

const SettingsPage = () => {
	const { settings } = useSelector((state: any) => state.settings)

  useEffect(() => {
    console.log('Settings')
    console.log(settings)
  }, [settings])
  
  return <Settings settings={settings} />;
}

export default SettingsPage;