    import React from 'react';
    import Image from 'next/image';
    import Link from 'next/link';
    import { GoHomeFill } from "react-icons/go";
    import { IoSearchOutline} from "react-icons/io5";
    import { IoMdHeartEmpty } from "react-icons/io"; 
    import { MdOutlineExplore, MdOutlineAddBox } from "react-icons/md";
    import { CgClapperBoard } from "react-icons/cg";
    import { PiMessengerLogoLight } from "react-icons/pi";
    import { RxHamburgerMenu } from "react-icons/rx";
    import { FaInstagram } from "react-icons/fa";
    import InstaLogo from '../../../../public/images/instalogo.png';
    import ProfilePic from '../../../../public/images/profilepic.jpg';

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
        <h6 className='text-white text-md font-segoe'>{label}</h6>
        </Link>
    </li>
    );

    export default function SideMenu() {
    return (
        <>
            <div className='hidden l:block w-[23.5%] border-[#262626] border-r-[1px]'>
                <div className='Logo'>
                    <Link href="#">
                        <Image src={InstaLogo} alt="Instagram logo" className='w-[136px] h-[89px] mt-2 ml-2' />
                    </Link>
                </div>
                <nav>
                    <ul className='flex flex-col gap-[5px] mx-3 mt-1'>
                        <MenuItem href="#" Icon={GoHomeFill} label="Home" />
                        <MenuItem href="#" Icon={IoSearchOutline} label="Search" /> 
                        <MenuItem href="#" Icon={MdOutlineExplore} label="Explore" />
                        <MenuItem href="#" Icon={CgClapperBoard} label="Reels" />
                        <MenuItem href="#" Icon={PiMessengerLogoLight} label="Messages" />
                        <MenuItem href="#" Icon={IoMdHeartEmpty} label="Notifications" />
                        <MenuItem href="#" Icon={MdOutlineAddBox} label="Create" />
                        <MenuItem href="#" Icon={null} label="Profile" isProfile />
                        <MenuItem href="#" Icon={RxHamburgerMenu} label="More" isMore />
                    </ul>
                </nav>
            </div>
            <div className='hidden sm:block l:hidden w-[7%] border-[#262626] border-r-[1px]'>
                <nav>
                    <ul className='flex flex-col gap-[5px] mx-3 mt-1'>
                        <MenuItem href="#" Icon={FaInstagram} label="" isLogo/>
                        <MenuItem href="#" Icon={GoHomeFill} label="" />
                        <MenuItem href="#" Icon={IoSearchOutline} label="" /> 
                        <MenuItem href="#" Icon={MdOutlineExplore} label="" />
                        <MenuItem href="#" Icon={CgClapperBoard} label="" />
                        <MenuItem href="#" Icon={PiMessengerLogoLight} label="" />
                        <MenuItem href="#" Icon={IoMdHeartEmpty} label="" />
                        <MenuItem href="#" Icon={MdOutlineAddBox} label="" />
                        <MenuItem href="#" Icon={null} label="" isProfile />
                        <MenuItem href="#" Icon={RxHamburgerMenu} label=""/>
                    </ul>
                </nav>
            </div>
        </>
    );
    }
