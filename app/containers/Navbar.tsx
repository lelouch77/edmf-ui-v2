import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import { CampaignsIcon, UserIcon, SettingsIcon } from '../assets/svg'

export default (props: Props) => {
  const [activeState, setActiveState] = useState('')
  
  useEffect(() => {
    console.log(window.location.hash.split('#')[1])
    const [ , hash ] =  window.location.hash.split('#')
    if(hash) setActiveState(hash)
  }, [])

  useEffect(() => {
    console.log('Active State: ', activeState)
  }, [activeState])

  const navOptions = [
    {
      label: 'Campaigns',
      icon: CampaignsIcon,
      route: routes.HOME
    },
    {
      label: 'Segments',
      icon: UserIcon,
      route: routes.SEGMENTS
    },
    {
      label: 'Followers',
      icon: UserIcon,
      route: routes.FOLLOWERS
    },
    {
      label: 'Settings',
      icon: SettingsIcon,
      route: routes.SETTINGS
    }
  ]

  return (
    <nav aria-label="side bar" aria-orientation="vertical" className="flex-none flex flex-col items-center text-center bg-indigo-700 text-gray-400 border-r min-h-screen">
      <div className="h-16 flex items-center w-full"></div>
        <ul>
 
          { navOptions.map(nav => {
              const { label, icon: Icon, route } = nav;
              const isActive = !!(activeState == route)
              console.log(activeState, route, isActive)
              return (
                <li> <Link to={route} title={label} onClick={() => setActiveState(route)} className={`h-16 px-6 flex items-center hover:text-white w-full cursor-pointer ${ isActive ? 'text-white bg-indigo-800' : '' }`}>
                    <i className="mx-auto"> <Icon /> </i>
                </Link> </li>
              )
          })}
        </ul>
      <div className="mt-auto h-16 flex items-center w-full"></div>
    </nav>
  )
}