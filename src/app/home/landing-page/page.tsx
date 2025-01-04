"use client"
import React, { useState } from 'react'
import Head from 'next/head'
import SideMenu from './_components/sidemenu'
import FeedArea from './_components/feed-area/page'

export default function LandingPage() {
	const [isLoading,setLoading] = useState<any>(true)
	const toggleLoadingTrue = ()=>{
		setLoading(true)
	}
	const toggleLoadingFalse = ()=>{
		setLoading(false)
	}
return (
	<>
		<FeedArea isLoading={isLoading} setLoading={toggleLoadingFalse}/>
	</>
)
}
