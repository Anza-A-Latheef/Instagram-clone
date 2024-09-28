import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import InstaLogo from '../../../../../../public/images/instablack.png'
import { IoMdHeartEmpty } from "react-icons/io"; 
import { IoIosSearch } from "react-icons/io";
export default function Respheader() {
return (
    <div className='w-full block sm:hidden border-[#262626] border-b-[1px] top-0 sticky bg-black z-10'>
        <div className='w-full flex justify-between items-center px-[15px]'>
            <div>
                <Link href="#">
                    <Image src={InstaLogo} alt="Instagram logo" width={103} height={60} className='invert' />
                </Link>
            </div>
            <div className="flex items-center gap-1 3xs:gap-5">
                <div className='bg-[#363636] flex items-center justify-center border-0 rounded-md w-32 3xs:w-[268px] h-9'>
                    <IoIosSearch className='text-[#a8a8a8] text-lg'/>
                    <input type="text" placeholder='Search' className='bg-transparent py-1 w-[76%] 3xs:py-2 px-2 border-none outline-none placeholder:text-[#a8a8a8] placeholder:text-base placeholder:font-extralight'/>
                </div>
                <IoMdHeartEmpty className='text-white text-[27px]'/>
            </div>
        </div>
    </div>
)
}
