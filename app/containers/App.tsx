import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'antd'
import { fetchSettings } from '../features/settings/SettingsSlice'
import { setSettings } from '../features/settings/SettingsSlice'
import { APIKeysModal, WelcomeScreen, ProfileScreenModal } from '../features/IntroModals'
import Navbar from './Navbar';
import API, { api } from '../api/easyDMAPI'
import { Alert } from 'antd'
import { useHistory } from "react-router-dom";
import routes from 'constants/routes.json';
import openNotification from 'components/common/Notification';

const App = ({ children }: any) => {
  const history = useHistory();
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const dispatch = useDispatch();
	const { settings } = useSelector((state: any) => state.settings)
	
	useEffect(() => {
    dispatch(fetchSettings())
    api('respath')
      .then((respath) =>console.log('respath success: ', respath))
      .catch((respath) =>console.log('respath error: ', respath))
  }, [])

  // useEffect(() => {
  //   console.log('outside if: ', settings)
  //   if(settings && Object.keys(settings).length > 0 && page == 2){
  //     console.log('inside if :', settings)
  //     setPage(3)
  //   }
  // }, [settings])

  const handleSaveKeys = ({ accessTokenKey, accessTokenSecret, consumerKey, consumerSecret }: any) => {
    console.log({accessTokenKey, accessTokenSecret, consumerKey, consumerSecret})
    API.setKeys({
      access_token_key: accessTokenKey,
      access_token_secret: accessTokenSecret,
      consumer_key: consumerKey,
      consumer_secret: consumerSecret
    }).then((userObject: any) => {
      window.location.reload()
    })
    .catch((err) => {
      setError('Invalid API Keys')
    })
  }

  function handleDone(){
    setPage(0)
    openNotification("Getting all your followers...")
    history.push(routes.FOLLOWERS);
  }
  
  return (
    <div className="bg-white h-full flex">
      { (settings && Object.keys(settings).length > 0 ) && 
        <>
          <Navbar/>
          { children }
        </>
      }
      { (!settings._defaultSlice && (!settings || (Object.keys(settings).length == 0))) &&
        <Modal key="Main Modal" visible title="Jupiter Setup" footer={false} closable={false}>
          { error && <Alert className='mb-5' message={error} type="error" showIcon /> }
          { page == 1 &&  <WelcomeScreen handleNext={() => setPage(2)} />}
          { page == 2 &&  <APIKeysModal handleSaveKeys={handleSaveKeys} /> }
        </Modal>
      }
      { (page == 3) &&
        <Modal key="Profile Modal" title="Jupiter Setup" visible footer={false} closable={false}>
          <ProfileScreenModal user={settings} handleDone={handleDone} />
        </Modal>
      }
    </div>
  );
}

export default App
