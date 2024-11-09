'use client'
import React, { useState}  from 'react';
import { useRouter } from 'next/navigation'; 
import Image from 'next/image';
import InstaLogo from '../../../public/images/instablack.png'
import { BiLogoFacebookSquare } from "react-icons/bi";
import PlayStore from '../../../public/images/playstore.png'
import Microsoft from '../../../public/images/msstore.png'
import { FaChevronDown } from "react-icons/fa6";
import Cookies from 'js-cookie';


const Login = () => {
    const router = useRouter();
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch('http://127.0.0.1:8000/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                username:identifier,
                password:password
            }),
        });
        const data = await res.json();
        console.log('Response Status:', res.status);
        console.log('Response Data:', data);
        if (res.ok) {
            Cookies.set('token', data.access, {expires:7 });
            Cookies.set('profile_pic',data?.profile_picture_url)
            Cookies.set('username',data?.username)
            Cookies.set('first_name', data.user?.first_name, { expires: 7 });
            Cookies.set('userId',data?.user_id)
            console.log('successful login');
            router.push('/landing-page');
            console.log("Setting cookies:", {
                first_name: data.first_name,
                username: data.username,
                userId: data.user_id
            });
            
        } else {
            console.error('Access token not found in response:', data);
            alert('Login failed. Please check your credentials.');
        }
    };

    const handleSignUpClick = () => {
        router.push('/signup'); 
    };

    return (
        <div className='w-full flex flex-col items-center my-3'>
            <div className='w-[100%] 3xs:w-[70%] 2xs:w-[64%] xs:w-[54%] sm:w-[42.8%] md:w-[34.8%] lg:w-[31.8%] xlg:w-[25.8%] px-[22px] 4xs:px-[31px] py-5 flex flex-col items-center border border-[#dbdbdb]'>
                <div className="w-[177px] h-[95px]">
                    <Image src={InstaLogo} alt='Instagram Logo' className='w-full h-full'/>
                </div>
                <form onSubmit={handleSubmit} className='w-full mb-3 mt-6 flex flex-col items-center gap-2'>
                    <input className='outline-none bg-[#fafafa] border border-[#dbdbdb] rounded-[5px] text-[11px] w-full px-3 py-[10px] placeholder:text-[#737373]'  type="text"  placeholder="Username or email address"  required  onChange={(e) => setIdentifier(e.target.value)}/>
                    <input className='outline-none bg-[#fafafa] border border-[#dbdbdb] rounded-[5px] text-[11px] w-full px-3 py-[10px] placeholder:text-[#737373]'  type="password"  placeholder="Password" onChange={(e) => setPassword(e.target.value)}  autoComplete="current-password"/>
                    <button type="submit" className='bg-[#0095f6] opacity-[0.7] text-white w-full py-2 text-[13px] font-semibold rounded-lg' onClick={handleSubmit}>Log in</button> 
                </form>
                <div className='mt-3 flex flex-col items-center py-2 w-full border-t border-[#dbdbdb] relative '>
                    <p className='text-[#737373] absolute top-[-9px] left-[40%] bg-white px-5 text-[13px] font-semibold uppercase'>or</p>
                    <button className='cursor-pointer text-[#385185] text-[14px] w-full  py-[6px] mt-5 mb-3 font-medium rounded-lg flex items-center gap-2 justify-center'><BiLogoFacebookSquare className='text-xl'/> Log in with Facebook</button>
                    <span className='text-[#00376b] cursor-pointer text-xs'>Forgotten your password?</span>
                </div>
            </div>
            <div className='w-[100%] 3xs:w-[70%] 2xs:w-[64%] xs:w-[54%] sm:w-[42.8%] md:w-[34.8%] lg:w-[31.8%] xlg:w-[25.8%] px-[22px] 4xs:px-[31px] mt-3 py-[22px] flex gap-2 justify-center items-center border border-[#dbdbdb]'>
                <p className='text-[13px]'>Don't have an account?</p>
                <button className='border-none outline-none text-[13px] font-semibold text-[#0095f6]' onClick={handleSignUpClick}>Sign Up</button>
            </div>
            <div className='flex flex-col mt-4 items-center'>
                <p className='text-[13px]'>Get the app.</p>
                <div className='flex items-center gap-2 my-4'>
                    <a className="w-[134px] h-10" href='https://play.google.com/store/apps/details?id=com.instagram.android&referrer=ig_mid%3D2C2411A4-A98C-4226-8C7A-3930AB8DB121%26utm_campaign%3DsignupPage%26utm_content%3Dlo%26utm_source%3Dinstagramweb%26utm_medium%3Dbadge&pli=1' >
                        <Image src={PlayStore} className='w-full h-full' alt='Google play store'/>
                    </a>
                    <a className="w-[110px] h-10" href='https://apps.microsoft.com/detail/9nblggh5l9xt?hl=en-us&gl=US'>
                        <Image src={Microsoft} className='w-full h-full' alt='Google play store'/>
                    </a>
                </div>
            </div>
            <footer className='flex flex-col my-12 gap-4 justify-center items-center'>
                <ul className='flex gap-4 items-center justify-center mt-3 flex-wrap'>
                    <li className='whitespace-nowrap text-[12px] text-[#737373] cursor-pointer hover:underline'><a href="#">Meta</a></li>
                    <li className='whitespace-nowrap text-[12px] text-[#737373] cursor-pointer hover:underline'><a href="#">About</a></li>
                    <li className='whitespace-nowrap text-[12px] text-[#737373] cursor-pointer hover:underline'><a href="#">Blog</a></li>
                    <li className='whitespace-nowrap text-[12px] text-[#737373] cursor-pointer hover:underline'><a href="#">Jobs</a></li>
                    <li className='whitespace-nowrap text-[12px] text-[#737373] cursor-pointer hover:underline'><a href="#">Help</a></li>
                    <li className='whitespace-nowrap text-[12px] text-[#737373] cursor-pointer hover:underline'><a href="#">API</a></li>
                    <li className='whitespace-nowrap text-[12px] text-[#737373] cursor-pointer hover:underline'><a href="#">Privacy</a></li>
                    <li className='whitespace-nowrap text-[12px] text-[#737373] cursor-pointer hover:underline'><a href="#">Terms</a></li>
                    <li className='whitespace-nowrap text-[12px] text-[#737373] cursor-pointer hover:underline'><a href="#">Locations</a></li>
                    <li className='whitespace-nowrap text-[12px] text-[#737373] cursor-pointer hover:underline'><a href="#">Instagram Lite</a></li>
                    <li className='whitespace-nowrap text-[12px] text-[#737373] cursor-pointer hover:underline'><a href="#">Threads</a></li>
                    <li className='whitespace-nowrap text-[12px] text-[#737373] cursor-pointer hover:underline'><a href="#">Contact uploading and non-users</a></li>
                    <li className='whitespace-nowrap text-[12px] text-[#737373] cursor-pointer hover:underline'><a href="#">Meta Verified</a></li>
                </ul>
                <div className='flex items-center gap-3 justify-center'>
                    <p className='flex items-center gap-1 text-[12px] cursor-pointer text-[#737373]'>English (UK) <FaChevronDown/></p>
                    <span className='text-[12px] text-[#737373]'>© 2024 Instagram from Meta</span>
                </div>
            </footer>
        </div>
    );
    };

    export default Login;
