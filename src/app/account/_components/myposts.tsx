"use client";

import React, { useEffect, useState } from 'react';
import { IoIosSettings } from "react-icons/io";
import { BsGrid3X3 } from "react-icons/bs";
import Image from 'next/image';
import Cookies from 'js-cookie';

interface UserData {
  username: string;
  first_name: string;
  profile_picture: string;
}

interface PostData {
  id: number;
  image: string;
  is_same_user?: boolean;
}

export default function Myposts() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userPosts, setUserPosts] = useState<PostData[]>([]);
  const username = Cookies.get("username");
  const first_name = Cookies.get("first_name");
  const image = Cookies.get('profile_pic') as string;

  
  useEffect(() => {
    const token = Cookies.get('token');
    const fetchUserPosts = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/post/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!res.ok) {
          console.error(`Error fetching user posts: ${res.status} - ${res.statusText}`);
          return;
        }
        
        const posts = await res.json();
        setUserPosts(posts);
      } catch (error) {
        console.error("Failed to fetch user posts", error);
      }
    };

    fetchUserPosts();
  }, []);

  return (
    <div className='h-screen overflow-auto scrollbar-hide'>
      <div className='ml-[88px]'>
        <div className="ml-[90px] py-12 flex">
          <div className="left">
            <div className="cursor-pointer prof_img w-[140px] h-[140px]">
              <Image src={image} alt="Profile Picture" width={1000} height={1000} className="w-full h-full border-0 rounded-full" />
            </div>
          </div>
          <div className="right ml-20 flex flex-col gap-4">
            <div className='text-white flex items-center gap-5'>
              <h6 className='cursor-pointer text-base'>{username}</h6>
              <button className='bg-[#363636] text-[#f5f5f5] text-[13px] px-[10px] py-[3px] rounded-md'>Edit Profile</button>
              <button className='bg-[#363636] text-[#f5f5f5] text-[13px] px-[10px] py-[3px] border border-transparent rounded-md'>View archive</button>
              <IoIosSettings className='text-2xl'/>
            </div>
            <div className='mt-2'>
              <p className='text-white text-sm'>{first_name}</p>
            </div>
          </div>
        </div>
        <div className="bottom border-t border-[#262626] w-full">
          <h5 className='py-3 uppercase text-white flex items-center gap-2 font-medium'><BsGrid3X3 /> Posts</h5>
          {userPosts.length > 0 ? (
            <div className="posts grid grid-cols-3 gap-1">
              {userPosts.map((post) => (
                post?.is_same_user &&<>
                <div key={post.id} className="w-[307px] h-[307px]">
                  <Image src={post.image.startsWith('http') ? post.image : `http://localhost:8000${post.image}`} alt='My Post' width={307} height={307} className='w-full h-full' />
                </div>
                </>
              ))}
            </div>
          ) : (
            <p className='text-white text-center mt-4'>No posts available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

