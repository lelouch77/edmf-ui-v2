import React, { useEffect } from 'react';
import Settings from '../features/settings/Settings';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSettings } from '../features/settings/SettingsSlice'

const SettingsPage = () => {
  const dispatch = useDispatch();
	const { settings } = useSelector((state: any) => state.settings)
	
	useEffect(() => {
			dispatch(fetchSettings())
  }, [])

  useEffect(() => {
    console.log('Settings')
    console.log(settings)
  }, [settings])
  
  return <Settings settings={settings} />;
}

export default SettingsPage;