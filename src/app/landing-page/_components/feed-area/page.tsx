import React from 'react'
import Story from './_components/story'
import Posts from './_components/posts'
import Profiles from './_components/profiles'
import Respheader from './_components/respheader'
import Navmenu from './_components/navmenu'

export default function FeedArea({isLoading,setLoading}:{isLoading:any,setLoading:()=>void}) {
  return (
    <div className='flex w-full justify-between mx-0 sm:mx-11 md:mx-10 sm:h-[100vh] bg-black overflow-visible sm:overflow-y-auto scrollbar-hide '>
      <div className='w-full items-center flex flex-col xlg:w-2/3 xlg:items-baseline'>
        <Respheader/>
        <Story/>
        <Posts  isLoading={isLoading} setLoading={setLoading}/>
        <Navmenu/>
      </div>
      <div className='xlg:w-1/3'>
        <Profiles/>
      </div>
    </div>
  )
}
