import React from 'react';
import { useSelector } from 'react-redux';

const Header = ({name}: any) => {

  const { settings } = useSelector((state: any) => state.settings)
  
  return (
    <header className="bg-white shadow">
      <div className="h-16 py-3 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold leading-tight text-gray-900">
          {name}
        </h1>
        <div className="justify-around items-center">
          <img className="inline-block h-8 w-8 rounded-full" src={settings.profile_image_url_https} alt=""/>
          <span className="text-sm ml-2">{ settings.name }</span>
          {/* <svg className="fill-current h-4 w-4 block opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M4.516 7.548c.436-.446 1.043-.481 1.576 0L10 11.295l3.908-3.747c.533-.481 1.141-.446 1.574 0 .436.445.408 1.197 0 1.615-.406.418-4.695 4.502-4.695 4.502a1.095 1.095 0 0 1-1.576 0S4.924 9.581 4.516 9.163c-.409-.418-.436-1.17 0-1.615z"/></svg> */}
        </div>
      </div>
    </header>
  );
}

export default Header;