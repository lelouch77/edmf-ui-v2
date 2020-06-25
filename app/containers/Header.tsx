import React, { ReactNode } from 'react';

export default function Header({name}: Props) {
    return (
        <header className="bg-white shadow ">
          <div className="h-16 mx-auto py-3 px-4 sm:px-6 lg:px-8 flex">
            <h1 className="text-3xl font-bold leading-tight text-gray-900 w-11/12">
              {name}
            </h1>
            <div className="text-right py-1">
              <div>
                <img className="inline-block h-8 w-8 rounded-full" src="https://avatars0.githubusercontent.com/u/4323180?s=460&v=4" alt=""/>
              </div>
              <div className="hidden md:block md:flex md:items-center ml-2">
                <span className="text-white text-sm mr-1">Adam Wathan</span>
                <div>
                  <svg className="fill-current text-white h-4 w-4 block opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M4.516 7.548c.436-.446 1.043-.481 1.576 0L10 11.295l3.908-3.747c.533-.481 1.141-.446 1.574 0 .436.445.408 1.197 0 1.615-.406.418-4.695 4.502-4.695 4.502a1.095 1.095 0 0 1-1.576 0S4.924 9.581 4.516 9.163c-.409-.418-.436-1.17 0-1.615z"/></svg>
                </div>
              </div>
            </div>
          </div>
        </header>
    );
}