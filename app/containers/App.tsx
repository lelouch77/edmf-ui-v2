import React, { useEffect } from 'react';
import { fetchSettings } from '../features/settings/SettingsSlice'
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './Navbar';

const App = ({ children }: any) => {
  const dispatch = useDispatch();
	const { settings } = useSelector((state: any) => state.settings)
	
	useEffect(() => {
			dispatch(fetchSettings())
  }, [])
  
  return (
      <div className="bg-white h-full flex">
        <Navbar/>
        { Object.keys(settings).length && children }
     </div>
  );
}

export default App
