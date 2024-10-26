"use client";
import React from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import { useRouter } from 'next/navigation';
const inter = Inter({ subsets: ['latin'] });

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

	return (
	  <html lang="en">
			<head>
				<title>Instagram-clone</title>
				<link rel="icon"  href="https://png.pngtree.com/png-clipart/20180524/ourmid/pngtree-instagram-social-media-icon-png-image_3572472.png"/>
			</head>
		<body className={inter.className}>{children}</body>
	  </html>
	);
  };
  
  export default RootLayout;
