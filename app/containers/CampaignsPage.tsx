import React, { useState, useEffect } from 'react';
import Campaign from '../features/campaign/Campaign';
import API from '../api/easyDMAPI'



function CampaignsPage() {

  useEffect(()=>{
     API.getAllActiveCampaign().then((allCampaigns)=>{
       console.log(allCampaigns);
     });
  },[]);

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

export default CampaignsPage;