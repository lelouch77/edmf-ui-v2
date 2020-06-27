/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import CampaignsPage from './containers/CampaignsPage';
import CreateCampaignPageWithRouter from './containers/CreateCampaignPage';
<<<<<<< HEAD
import EditCampaignPage from './containers/EditCampaignPage';
=======
>>>>>>> c7366cafbab7042bbd0d4cf5b22e44103c2f728f
import SettingsPage from './containers/SettingsPage';
import FollowersPage from './containers/FollowersPage';
import SegmentsPage from './containers/SegmentsPage';

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
      <Router>
        <Switch>
          <Route path={routes.HOME} component={CampaignsPage} exact={true} />
          <Route path={routes.CAMPAIGNS} component={CampaignsPage} />
          <Route path={routes.CREATECAMPAIGN} component={CreateCampaignPageWithRouter} />
          <Route path={routes.SEGMENTS} component={SegmentsPage} />
          <Route path={routes.FOLLOWERS} component={FollowersPage} />
          <Route path={routes.SETTINGS} component={SettingsPage} />
<<<<<<< HEAD
          <Route path={`${routes.EDITCAMPAIGN}/:id`} component={EditCampaignPage} />
=======
>>>>>>> c7366cafbab7042bbd0d4cf5b22e44103c2f728f
        </Switch>
      </Router>
    </App>
  );
}
