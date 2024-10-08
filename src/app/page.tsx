'use client'
import LandingPage from "./landing-page/page";
import { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { checkAuthentication } from "../../authUtils";


export default function Home() {
  const [loading, setLoading] = useState(true); 
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = checkAuthentication();

    if (!isAuthenticated) {
      router.push('/login');
    }
    else {
      setLoading(false);
  }
  }, [router]);
  if (loading) {
    return <div>Loading...</div>; 
}
  return (
    <>
      <LandingPage/>
    </>
  )
}
