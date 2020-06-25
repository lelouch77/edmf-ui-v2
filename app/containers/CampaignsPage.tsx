import React, { useState, useEffect } from 'react';
import Campaign from '../features/campaign/Campaign';
// import { Dialog } from "@blueprintjs/core";
import APIKeys from '../features/APIKeys'

const electron = require('electron');
const mainProcess = electron.remote.require('./main.dev');
// mainProcess.getKeys().then((res: any) => {
//   console.log('from API:    ',res)
// })

// mainProcess.getUsers().then((res: any) => {
//   console.log('from API2:    ',res)
// })
// mainProcess.getUserObject().then((userObject: any) => console.log(res))

export default function CampaignsPage() {
  const [showModal, setShowModal] = useState(true)
    // mainProcess.getUserObject().then((userObject: any) => {
    //   if(!userObject) setShowModal(true)
    // })
    useEffect(() => {
      console.log('get user object ------------')
      mainProcess.getUserObject().then((userObject: any) => {
        console.log('inside ---------------')
        alert(userObject)
      })
      mainProcess.setKeys({
        consumer_key: 'd9NU6wtENpB7il52fi1B1QmEY',
        consumer_secret: 'DOEbDkSMKapZSy9VaY5f11dtMiASxaIAKurSRG4eaj2V4VK5ve',
        access_token_key: '3075255631-HhDNzE0SioFxb8dy0kapEvs8rhFMUp4I0ARgDf8',
        access_token_secret: '4p19sW9uzJo04xu32QdWXZMwG2WGMJZavv37qzcqPtMvs'
      }).then((res: any) => alert(JSON.stringify(res)))
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
