import React from 'react'
import Image from 'next/image'
import InstaLogo from '../../../../public/images/instalogo.png'

export default function SideMenu() {
  return (
    <div className='w-[23.5%] border-[#262626] border-r-[1px]'>
      <div className='Logo'>
        <Image src={ InstaLogo } alt="Instagram logo"/>
      </div>
    </div>
  )
}
