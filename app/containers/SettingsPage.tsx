import React from 'react';
import Settings from '../features/settings/Settings';
import { setSettings } from '../features/settings/SettingsSlice'
import { useSelector } from 'react-redux';
import API from '../api/easyDMAPI'
import openNotification from '../components/common/Notification';
import { Modal } from 'antd';

const SettingsPage = () => {
	const { settings } = useSelector((state: any) => state.settings)

  const handleSaveKeys = ({ accessTokenKey, accessTokenSecret, consumerKey, consumerSecret }: any) => {
    Modal.confirm({
      title:"Danger Zone",
      content:(
        <div class="text-base">
          <p>If you're using the API keys of a different user,there is no going back.</p><p>This will delete all the data.Please be sure.</p>
        </div>
      ),
      onOk:()=>{
        API.setKeys({
          access_token_key: accessTokenKey,
          access_token_secret: accessTokenSecret,
          consumer_key: consumerKey,
          consumer_secret: consumerSecret
        }).then((userObject: any) => {
            if(userObject){
              setSettings(userObject)
              openNotification("API Keys updated successfully");
            } else {
              openNotification("Incorrect API keys");
            }
        }
        ).catch(e =>{
          openNotification("Incorrect API keys","error");
        });
      }
    });
  };
  
  return <Settings settings={settings} handleSaveKeys={handleSaveKeys} />;
}

export default SettingsPage;