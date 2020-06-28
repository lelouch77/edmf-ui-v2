import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'antd'
import { fetchSettings } from '../features/settings/SettingsSlice'
import { setSettings } from '../features/settings/SettingsSlice'
import { APIKeysModal, WelcomeScreen, ProfileScreenModal } from '../features/IntroModals'
import Navbar from './Navbar';
import API from '../api/easyDMAPI'
import { Alert } from 'antd'

const App = ({ children }: any) => {
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const dispatch = useDispatch();
	const { settings } = useSelector((state: any) => state.settings)
	
	useEffect(() => {
    dispatch(fetchSettings())
  }, [])

  const handleSaveKeys = ({ accessTokenKey, accessTokenSecret, consumerKey, consumerSecret }: any) => {
    console.log({accessTokenKey, accessTokenSecret, consumerKey, consumerSecret})
    API.setKeys({
      access_token_key: accessTokenKey,
      access_token_secret: accessTokenSecret,
      consumer_key: consumerKey,
      consumer_secret: consumerSecret
    }).then((userObject: any) => {
      if(userObject){
        setError('')
        console.log(userObject)
        setSettings(userObject)
        setPage(3)
      } else {
        setError('Invalid API Keys')
      }
    })
  }
  
  return (
    <div className="bg-white h-full flex">
      <Navbar/>
      { children }
      { (!settings._defaultSlice && (!settings || (Object.keys(settings).length == 0))) &&
        <Modal key="Main Modal" visible title="Jupiter Setup" footer={false} closable={false}>
          { error && <Alert className='mb-5' message={error} type="error" showIcon /> }
          { page == 1 &&  <WelcomeScreen handleNext={() => setPage(2)} />}
          { page == 2 &&  <APIKeysModal handleSaveKeys={handleSaveKeys} /> }
        </Modal>
      }
      { (page == 3) &&
        <Modal key="Profile Modal" title="Jupiter Setup" visible footer={false} closable={false}>
          <ProfileScreenModal user={settings} handleDone={() => setPage(0)} />
        </Modal>
      }
    </div>
  );
}

export default App
