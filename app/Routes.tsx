/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import CampaignsPage from './containers/CampaignsPage';
import CreateCampaignPage from './containers/CreateCampaignPage';
import SettingsPage from './containers/SettingsPage';


// const LazyCampaignsPage = React.lazy(() =>
//   import(/* webpackChunkName: "CampaignsPage" */ './containers/CampaignsPage')
// );

// const CampaignsPage = () =>{
//   <React.Suspense fallback={<h1>Loading...</h1>}>
//     <LazyCampaignsPage {...props} />
//   </React.Suspense>
// }

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route path={routes.CAMPAIGNS} component={CampaignsPage} />
        <Route path={routes.CREATECAMPAIGN} component={CreateCampaignPage} />
        <Route path={routes.SETTINGS} component={SettingsPage} />
        <Route path={routes.HOME} component={CampaignsPage} />
      </Switch>
    </App>
  );
}
