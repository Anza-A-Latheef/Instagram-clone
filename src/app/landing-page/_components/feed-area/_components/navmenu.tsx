    import React from 'react'
    import Link from 'next/link'
    import Image from 'next/image'
    import ProfilePic from '../../../../../../public/images/profilepic.jpg';
    import { GoHomeFill } from "react-icons/go";
    import { MdOutlineExplore, MdOutlineAddBox } from "react-icons/md";
    import { CgClapperBoard } from "react-icons/cg";
    import { PiMessengerLogoLight } from "react-icons/pi";

    interface MenuItemProps {
        href: string;
        Icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | null;
        label: string;
        isProfile?: boolean; 
        isMore ?: boolean; 
        isLogo ?: boolean;
    }

    const MenuItem: React.FC<MenuItemProps> = ({ href, Icon, label, isProfile, isMore ,isLogo}) => (
        <li className={`px-0 l:px-2 py-[11px] hover:bg-[#ffffff1a] border border-none rounded-lg cursor-pointer ${isMore ? 'mt-[60px]' : ''} ${isLogo ? 'mb-[20px] py-[20px]' : ''}`}>
        <Link href={href} className='gap-0 justify-center l:gap-[15px] l:justify-normal flex items-center'>
        {isProfile ? (
            <div className='w-[24px] h-[24px] border rounded-full'>
                <Image src={ProfilePic} alt="Profile picture" className='w-full h-full border rounded-full' />
            </div>
        ) : (
            Icon && <Icon className='text-white text-[27px]' /> 
        )}
        </Link>
    </li>
    );

    export default function Navmenu() {
    return (
        <div className='w-full block sm:hidden border-[#262626] border-t-[1px] fixed bottom-[-1px] bg-black z-10'>
            <div className='w-full flex justify-center items-center'>
                <nav className='w-5/6'>
                    <ul className='flex justify-between w-full'>
                        <MenuItem href="#" Icon={GoHomeFill} label="" />
                        <MenuItem href="#" Icon={MdOutlineExplore} label="" />
                        <MenuItem href="#" Icon={CgClapperBoard} label="" />
                        <MenuItem href="#" Icon={MdOutlineAddBox} label="" />
                        <MenuItem href="#" Icon={PiMessengerLogoLight} label="" />
                        <MenuItem href="#" Icon={null} label="" isProfile />
                    </ul>
                </nav>
            </div>
        </div>
    )
    }

