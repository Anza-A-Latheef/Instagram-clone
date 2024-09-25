import React from 'react'
import Story from './_components/story'
import Posts from './_components/posts'
import Profiles from './_components/profiles'

export default function FeedArea() {
  return (
    <div className='flex w-full justify-between mx-12 h-[100vh] overflow-y-auto scrollbar-hide '>
      <div className='flex flex-col w-2/3'>
        <Story/>
        <Posts/>
      </div>
      <div className='bg-white w-1/3'>
        <Profiles/>
      </div>
    </div>
  )
}
