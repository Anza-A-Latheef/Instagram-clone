'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import Image from 'next/image';
import InstaLogo from '../../../public/images/instablack.png'
import { BiLogoFacebookSquare } from "react-icons/bi";
import PlayStore from '../../../public/images/playstore.png'
import Microsoft from '../../../public/images/msstore.png'
import { FaChevronDown } from "react-icons/fa6";

export default function SignUp() {
const router = useRouter();
const [username, setUsername] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [profilePicture, setProfilePicture] = useState<File | null>(null); 
const [firstName, setFirstName] = useState('');

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("signup clicked")
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("email", email);
    formData.append("first_name", firstName);
    if (profilePicture) {
        formData.append("profile_picture", profilePicture);
    }

    // try {
    const response = await fetch('http://127.0.0.1:8000/api/register/', {
        method: 'POST',
        body:formData,
    });
    const res = await response.json()
    
    
    console.log("response in signup",res);
    if (response.ok) {
        router.push('/login');
    } else {
        alert('Sign Up failed. Please try again.');
    }
};

const handleLoginClick = () => {
    router.push('/login');
};

return (
    <div className='w-full flex flex-col items-center my-3'>
        <div className='w-[100%] 3xs:w-[70%] 2xs:w-[64%] xs:w-[54%] sm:w-[42.8%] md:w-[34.8%] lg:w-[31.8%] xlg:w-[25.8%] px-[22px] 4xs:px-[31px] py-5 flex flex-col items-center border border-[#dbdbdb]'>
            <div className="w-[177px] h-[95px]">
                <Image src={InstaLogo} alt='Instagram Logo' className='w-full h-full'/>
            </div>
            <span className='text-[#737373] tracking-[0.3px] w-full px-1 text-[15px] text-center whitespace-pre-line font-[600]'>Sign up to see photos and videos from your friends</span>
            <div className='py-3 w-full border-b border-[#dbdbdb] relative '>
                <button className='cursor-pointer bg-[#1877f2] text-white text-[14px] w-full px-[50px] py-[6px] mb-3 font-medium rounded-lg flex items-center gap-2 justify-center'><BiLogoFacebookSquare className='text-xl'/> Log in with Facebook</button>
                <p className='text-[#737373] absolute bottom-[-9px] left-[36%] bg-white px-5 text-[11px] font-semibold uppercase'>or</p>
            </div>
            <form onSubmit={handleSubmit} className='w-full mb-3 mt-6 flex flex-col items-center gap-2'>
                <input className='outline-none bg-[#fafafa] border border-[#dbdbdb] rounded-[5px] text-[11px] w-full px-3 py-[10px] placeholder:text-[#737373]'  type="email"  placeholder="Email address"  required  onChange={(e) => setEmail(e.target.value)}/>
                <input className='outline-none bg-[#fafafa] border border-[#dbdbdb] rounded-[5px] text-[11px] w-full px-3 py-[10px] placeholder:text-[#737373]'  type="password"  placeholder="Password"  required  onChange={(e) => setPassword(e.target.value)}  autoComplete="current-password"/>
                <input className='outline-none bg-[#fafafa] border border-[#dbdbdb] rounded-[5px] text-[11px] w-full px-3 py-[10px] placeholder:text-[#737373]'  type="text"  placeholder="Username"  required  onChange={(e) => setUsername(e.target.value)}/>
                <input className='outline-none bg-[#fafafa] border border-[#dbdbdb] rounded-[5px] text-[11px] w-full px-3 py-[10px] placeholder:text-[#737373]'  type="text"  placeholder="First Name"  required  onChange={(e) => setFirstName(e.target.value)}/>
                <div className="w-full mt-1">
                    <input className="hidden" type="file" accept="image/*" id="file-input" onChange={(e) => {
                        console.log("profile pic",e.target)
                        setProfilePicture(e.target.files ? e.target.files[0] : null)}} />
                    <label htmlFor="file-input" className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium py-2 px-[50px] rounded cursor-pointer" >
                        {profilePicture ? profilePicture.name : "Choose File"}
                    </label>
                </div>
                <p className='w-full text-[12px] text-[#737373] text-center mt-3'>People who use our service may have uploaded your contact information to Instagram. <a href="https://www.facebook.com/help/instagram/261704639352628?cms_id=261704639352628" className='text-[#00376b] whitespace-nowrap'>Learn more</a></p>
                <span className='w-full text-[12px] text-[#737373] text-center mt-2'>By signing up, you agree to our <a href="https://help.instagram.com/581066165581870/?locale=en_GB" className='text-[#00376b]'>Terms</a>, <a href="https://www.facebook.com/privacy/policy" className='text-[#00376b]'>Privacy Policy</a> and <a href="https://privacycenter.instagram.com/policies/cookies/" className='text-[#00376b]'>Cookies Policy.</a></span>
                <button type="submit" className='bg-[#0095f6] opacity-[0.7] text-white w-full py-2 text-[13px] font-semibold rounded-lg'>Sign Up</button> 
            </form>
        </div>
        <div className='w-[100%] 3xs:w-[70%] 2xs:w-[64%] xs:w-[54%] sm:w-[42.8%] md:w-[34.8%] lg:w-[31.8%] xlg:w-[25.8%] mt-3 px-[22px] 4xs:px-[31px] py-[22px] flex gap-2 justify-center items-center border border-[#dbdbdb]'>
            <p className='text-[13px]'>Have an account?</p>
            <button className='border-none outline-none text-[13px] font-semibold text-[#0095f6]' onClick={handleLoginClick}>Log in</button>
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
}
