"use client"
import React, { useEffect } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import { useRouter } from 'next/navigation';
const inter = Inter({ subsets: ['latin'] });

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  
	return (
	  <html lang="en">
			<head>
				<title>Instagram-clone</title>
				<link rel="icon"  href="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/227_Instagram_logo-512.png"/>
			</head>
		<body className={inter.className}>{children}</body>
	  </html>
	);
  };
  
  export default RootLayout;
