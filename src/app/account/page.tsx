import React from 'react'
import SideMenu from '../account/_components/sidemenu'
import Myposts from './_components/myposts' 

export default function page() {
  return (
    <div className='bg-black h-screen'>
      <div className="wrapper h-full w-full flex">
				<SideMenu/>
        <Myposts/>
      </div>
    </div>
  )
}
