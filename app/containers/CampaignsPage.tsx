import React, { useState, useEffect } from 'react';
import Campaign from '../features/campaign/Campaign';
// import { Dialog } from "@blueprintjs/core";
import APIKeys from '../features/APIKeys'
const { ipcRenderer } = require('electron');


export default function CampaignsPage() {
  const [showModal, setShowModal] = useState(true)
    // mainProcess.getUserObject().then((userObject: any) => {
    //   if(!userObject) setShowModal(true)
    // })


    useEffect(() => {
      console.log('Inside Use Effect......', ipcRenderer)
      ipcRenderer.send('user:getKeys')
      //ipcRenderer.send('user:syncFollowers')

    //   mainProcess.setKeys({
    //     consumer_key: 'xxxxxx',
    //     consumer_secret: 'xxxxxx',
    //     access_token_key: 'xxxxxx-xxxxxx',
    //     access_token_secret: 'xxxxxx'
    //   }).then((res: any) => alert(JSON.stringify(res)))
    //  ipcRenderer.once('user:syncFollowers', (e,data) => {
    //     console.log('received......')
    //     console.log(data)
    //     ipcRenderer.send('user:getFollowers')
    // });

    // ipcRenderer.once('user:getFollowers', (e,data) => {
    //     console.log('received......')
    //     console.log(data)
    // });

    ipcRenderer.once('user:getKeys', (e,data) => {
        console.log('received......')
        console.log(data)
        if(!data){
          const keys= {
            consumer_key: 'xxxxxx',
            consumer_secret: 'xxxxxx',
            access_token_key: 'xxxxxx-xxxxxx',
            access_token_secret: 'xxxxxx'
         }
          ipcRenderer.send('user:setKeys',keys)
          //ipcRenderer.send('user:syncFollowers')
        }
    });

     ipcRenderer.once('user:setKeys', (e,data) => {
       if(data){
         ipcRenderer.send('user:syncFollowers')
       }
        
     });

    },[])
  return (
    <>
      {/* { showModal &&
        <Dialog
          className={``}
          onClose={() => setShowModal(false)}
          title="API Keys"
          autoFocus={true}
          canEscapeKeyClose={true}
          canOutsideClickClose={true}
          enforceFocus= {true}
          isOpen={true}
          usePortal= {true}
        >
          <APIKeys />
        </Dialog>
      } */}

      <Campaign />
    </>
  );
}
