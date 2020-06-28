/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import CampaignsPage from './containers/CampaignsPage';
import CreateCampaignPageWithRouter from './containers/CreateCampaignPage';
import EditCampaignPage from './containers/EditCampaignPage';
import SettingsPage from './containers/SettingsPage';
import FollowersPage from './containers/FollowersPage';
import SegmentsPage from './containers/SegmentsPage';
import DashboardPage from './containers/DashboardPage';

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
          <Route path={routes.HOME} component={DashboardPage} exact={true} />
          <Route path={routes.CAMPAIGNS} component={CampaignsPage} />
          <Route path={routes.CREATECAMPAIGN} component={CreateCampaignPageWithRouter} />
          <Route path={routes.SEGMENTS} component={SegmentsPage} />
          <Route path={routes.FOLLOWERS} component={FollowersPage} />
          <Route path={routes.SETTINGS} component={SettingsPage} />
          <Route path={`${routes.EDITCAMPAIGN}/:id`} component={EditCampaignPage} />
        </Switch>
      </Router>
    </App>
  );
}
