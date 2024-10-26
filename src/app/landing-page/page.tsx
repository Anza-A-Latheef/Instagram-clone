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
		<Head>
			<title>Netflix Clone</title>
			<link rel="preconnect" href="https://fonts.gstatic.com" />
			<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet" />
		</Head>
		<div className="wrapper">
			<div className='flex justify-between bg-black sm:h-[100vh] h-max'>
				<SideMenu isLoading={toggleLoadingTrue}/>
				<FeedArea isLoading={isLoading} setLoading={toggleLoadingFalse}/>
			</div>
		</div>
		</>
	)
	}
