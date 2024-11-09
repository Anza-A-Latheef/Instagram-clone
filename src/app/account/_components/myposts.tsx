"use client";

import React, { useEffect, useState } from 'react';
import { IoIosSettings } from "react-icons/io";
import { BsGrid3X3 } from "react-icons/bs";
import Image from 'next/image';
import { FaChevronDown } from "react-icons/fa6";
import Cookies from 'js-cookie';

interface UserData {
  username: string;
  first_name: string;
  profile_picture: string;
}

interface PostData {
  id: number;
  image: string;
}

export default function Myposts() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userPosts, setUserPosts] = useState<PostData[]>([]);
  
  useEffect(() => {
    const token = Cookies.get('token');

    const fetchUserData = async () => {
        try {
            const res = await fetch('http://127.0.0.1:8000/api/user/', {
                headers: {
                'Authorization': `Bearer ${token}`
            }
        });
      
        if (!res.ok) {
            console.error(`Error fetching user data: ${res.status} - ${res.statusText}`);
            return;
        }
      
        const user = await res.json();
        setUserData({
            username: user.username,
            first_name: user.first_name,
            profile_picture: user.profile_picture 
              ? (user.profile_picture.startsWith('http') ? user.profile_picture : `http://localhost:8000${user.profile_picture}`)
              : '/default_profile.jpg'
        });
        } catch (error) {
          console.error("Failed to fetch user data", error);
        }
    };
      
    const fetchUserPosts = async () => {
        try {
            const res = await fetch('http://127.0.0.1:8000/api/user/posts/', {
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
      

    fetchUserData();
    fetchUserPosts();
  }, []);

  return (
    <div className='h-screen overflow-auto scrollbar-hide'>
      <div className='ml-[88px]'>
        <div className="ml-[90px] py-12 flex">
          <div className="left">
            <div className="cursor-pointer prof_img w-[140px] h-[140px]">
              <Image src={userData?.profile_picture || '/default_profile.jpg'} alt='Profile Picture' width={140} height={140} className='w-full h-full rounded-full' />
            </div>
          </div>
          <div className="right ml-20 flex flex-col gap-4">
            <div className='text-white flex items-center gap-5'>
              <h6 className='cursor-pointer text-base'>{userData?.username}</h6>
              <button className='bg-[#363636] text-[#f5f5f5] text-[13px] px-[10px] py-[3px] rounded-md'>Edit Profile</button>
              <button className='bg-[#363636] text-[#f5f5f5] text-[13px] px-[10px] py-[3px] border border-transparent rounded-md'>View archive</button>
              <IoIosSettings className='text-2xl'/>
            </div>
            <div className='mt-2'>
              <p className='text-white text-sm'>{userData?.first_name}</p>
            </div>
          </div>
        </div>
        <div className="bottom border-t border-[#262626] w-full">
          <h5 className='py-3 uppercase text-white flex items-center gap-2 font-medium'><BsGrid3X3 /> Posts</h5>
          {userPosts.length > 0 ? (
            <div className="posts grid grid-cols-3 gap-1">
              {userPosts.map((post) => (
                <div key={post.id} className="w-[307px] h-[307px]">
                  <Image src={post.image.startsWith('http') ? post.image : `http://localhost:8000${post.image}`} alt='My Post' width={307} height={307} className='w-full h-full' />
                </div>
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


// import React from 'react'
// import { IoIosSettings } from "react-icons/io";
// import { BsGrid3X3 } from "react-icons/bs";
// import Image from 'next/image';
// import { FaChevronDown } from "react-icons/fa6";
// import ProfilePic from '../../../../public/images/profilepic.jpg'
// import Post from '../../../../public/images/post1.jpg'

// export default function Myposts() {
//   return (
//     <div className='h-screen overflow-auto scrollbar-hide'>
//         <div className='ml-[88px]'>
//             <div className="ml-[90px]  py-12 flex">
//                 <div className="left">
//                     <div className="cursor-pointer prof_img w-[140px] h-[140px] ">
//                         <Image src={ProfilePic} alt='Profile Picture' className='w-full h-full border-transparent border rounded-full'/>
//                     </div>
//                 </div>
//                 <div className="right ml-20 flex flex-col gap-4">
//                     <div className='text-white flex items-center gap-5'>
//                         <h6 className='cursor-pointer text-base'>anza__anzz</h6>
//                         <div className='flex items-center gap-2'>
//                             <button className='bg-[#363636] text-[#f5f5f5] text-[13px] px-[10px] py-[3px] border border-transparent rounded-md'>Edit Profile</button>
//                             <button className='bg-[#363636] text-[#f5f5f5] text-[13px] px-[10px] py-[3px] border border-transparent rounded-md'>View archive</button>
//                         <IoIosSettings className='text-2xl'/>
//                         </div>
//                     </div>
//                     <div className='flex text-white gap-9 text-sm items-center'>
//                         <p><span className='font-medium'>11</span> posts</p>
//                         <p><span className='font-medium'>355</span> followers</p>
//                         <p><span className='font-medium'>535</span> following</p>
//                     </div>
//                     <div className='mt-2'>
//                         <p className='text-white text-sm'>first_name</p>
//                     </div>
//                 </div>
//             </div>
//             <div className="bottom border-[#262626] border-t-[1px] w-[100%]">
//                 <h5 className='py-3 uppercase text-white flex text-sm items-center gap-2 font-medium'><BsGrid3X3 /> Posts</h5>
//                 <div className="posts grid grid-cols-3 gap-1">
//                     <div className="w-[307px] h-[307px]">
//                         <Image src={Post} alt='My Post' width={307} height={307} className='w-full h-full'/>
//                     </div>
//                     <div className="w-[307px] h-[307px]">
//                         <Image src={Post} alt='My Post' width={307} height={307} className='w-full h-full'/>
//                     </div>
//                     <div className="w-[307px] h-[307px]">
//                         <Image src={Post} alt='My Post' width={307} height={307} className='w-full h-full'/>
//                     </div>
//                     <div className="w-[307px] h-[307px]">
//                         <Image src={Post} alt='My Post' width={307} height={307} className='w-full h-full'/>
//                     </div>
//                     <div className="w-[307px] h-[307px]">
//                         <Image src={Post} alt='My Post' width={307} height={307} className='w-full h-full'/>
//                     </div>
//                     <div className="w-[307px] h-[307px]">
//                         <Image src={Post} alt='My Post' width={307} height={307} className='w-full h-full'/>
//                     </div>
//                 </div>
//                 <footer className='flex flex-col my-12 gap-4 justify-center items-center'>
//                     <ul className='flex gap-4 items-center justify-center mt-3 flex-wrap'>
//                         <li className='whitespace-nowrap text-[12px] text-[#737373] cursor-pointer hover:underline'><a href="#">Meta</a></li>
//                         <li className='whitespace-nowrap text-[12px] text-[#737373] cursor-pointer hover:underline'><a href="#">About</a></li>
//                         <li className='whitespace-nowrap text-[12px] text-[#737373] cursor-pointer hover:underline'><a href="#">Blog</a></li>
//                         <li className='whitespace-nowrap text-[12px] text-[#737373] cursor-pointer hover:underline'><a href="#">Jobs</a></li>
//                         <li className='whitespace-nowrap text-[12px] text-[#737373] cursor-pointer hover:underline'><a href="#">Help</a></li>
//                         <li className='whitespace-nowrap text-[12px] text-[#737373] cursor-pointer hover:underline'><a href="#">API</a></li>
//                         <li className='whitespace-nowrap text-[12px] text-[#737373] cursor-pointer hover:underline'><a href="#">Privacy</a></li>
//                         <li className='whitespace-nowrap text-[12px] text-[#737373] cursor-pointer hover:underline'><a href="#">Terms</a></li>
//                         <li className='whitespace-nowrap text-[12px] text-[#737373] cursor-pointer hover:underline'><a href="#">Locations</a></li>
//                         <li className='whitespace-nowrap text-[12px] text-[#737373] cursor-pointer hover:underline'><a href="#">Instagram Lite</a></li>
//                         <li className='whitespace-nowrap text-[12px] text-[#737373] cursor-pointer hover:underline'><a href="#">Threads</a></li>
//                         <li className='whitespace-nowrap text-[12px] text-[#737373] cursor-pointer hover:underline'><a href="#">Contact uploading and non-users</a></li>
//                         <li className='whitespace-nowrap text-[12px] text-[#737373] cursor-pointer hover:underline'><a href="#">Meta Verified</a></li>
//                     </ul>
//                     <div className='flex items-center gap-3 justify-center'>
//                         <p className='flex items-center gap-1 text-[12px] cursor-pointer text-[#737373]'>English (UK) <FaChevronDown/></p>
//                         <span className='text-[12px] text-[#737373]'>© 2024 Instagram from Meta</span>
//                     </div>
//                 </footer>
//             </div>
//         </div>
//     </div>
//   )
// }


