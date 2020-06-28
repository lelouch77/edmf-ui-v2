import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import { UserOutlined, InboxOutlined, GroupOutlined, SettingOutlined, CloseOutlined } from '@ant-design/icons'

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
      icon: InboxOutlined,
      route: routes.HOME,
    },
    {
      label: 'Segments',
      icon: GroupOutlined,
      route: routes.SEGMENTS
    },
    {
      label: 'Followers',
      icon: UserOutlined,
      route: routes.FOLLOWERS
    },
    {
      label: 'Settings',
      icon: SettingOutlined,
      route: routes.SETTINGS
    }
  ]

  return (
    <nav aria-label="side bar" aria-orientation="vertical" className="flex-none flex flex-col items-center text-center bg-indigo-700 text-gray-400 border-r min-h-screen">
      <div className="h-16 flex items-center w-full flex align-center justify-center">
        <CloseOutlined style={{ fontSize: 28 }} />
      </div>
      <ul>
        { navOptions.map(nav => {
          const { label, icon: Icon, route } = nav;
          const isActive = !!(activeState == route)
          return (
            <li>
              <Link
                to={route}
                title={label}
                onClick={() => setActiveState(route)}
                className={`h-20 px-3 flex flex-col items-center justify-center hover:text-white w-full cursor-pointer ${ isActive ? 'text-white bg-indigo-800' : '' }`}
              >
                <i className="mx-auto"> <Icon style={{ fontSize: 20 }} /> </i>
                <div className="mt-2 text-xs">{ label }</div>
            </Link> </li>
          )
        })}
        </ul>
      <div className="mt-auto h-16 flex items-center w-full"></div>
    </nav>
  )
}