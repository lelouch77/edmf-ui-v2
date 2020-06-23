import React, { useState } from 'react';
import Campaign from '../features/campaign/Campaign';
import { Dialog } from "@blueprintjs/core";
import APIKeys from '../features/APIKeys'

export default function CampaignsPage() {
  const [showModal, setShowModal] = useState(true)
  return (
    <>
      { showModal &&
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
      }

      <Campaign />
    </>
  );
}
