import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes.json';
import { fetchCampaigns,selectCampaigns } from './campaignSlice'

export default function Campaign() {
  const dispatch = useDispatch();
  const campaigns = useSelector(selectCampaigns);
 // console.log(campaigns);

  useEffect(() => {
    dispatch(fetchCampaigns())
  },[])

  return (
    <div>
      <div data-tid="backButton">
        <Link to={routes.HOME}>
          <i className="fa fa-arrow-left fa-3x" />
        </Link>
      </div>
    </div>
  );
}
