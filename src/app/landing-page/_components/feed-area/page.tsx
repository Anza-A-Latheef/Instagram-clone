import React from 'react'
import Story from './_components/story'
import Posts from './_components/posts'
import Profiles from './_components/profiles'

export default function FeedArea() {
  return (
    <div className='flex w-full justify-between mx-12'>
      <div>
        <Story/>
        <Posts/>
      </div>
      <div>
        <Profiles/>
      </div>
    </div>
  )
}
