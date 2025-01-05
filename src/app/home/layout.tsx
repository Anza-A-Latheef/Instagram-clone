"use client"
import React, { useState } from 'react'
import Head from 'next/head'
import SideMenu from './landing-page/_components/sidemenu'
import FeedArea from './landing-page/_components/feed-area/page'

export default function Home({
    children,
}:Readonly<{children:React.ReactNode}>) {
	const [isLoading,setLoading] = useState<any>(true)
	const toggleLoadingTrue = ()=>{
		setLoading(true)
	}
	const toggleLoadingFalse = ()=>{
		setLoading(false)
	}
return (
	<>
	<Head>
		<title>Netflix Clone</title>
		<link rel="preconnect" href="https://fonts.gstatic.com" />
		<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet" />
	</Head>
	<div className="wrapper">
		<div className='flex bg-black sm:h-[100vh] h-max'>
			<SideMenu isLoading={toggleLoadingTrue}/>
            {children}
		</div>
	</div>
	</>
)
}

