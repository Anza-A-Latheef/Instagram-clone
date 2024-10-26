	import React, { useState } from 'react';
	import Image from 'next/image';
	import Link from 'next/link';
	import { useRouter } from 'next/navigation';
	import { GoHomeFill } from 'react-icons/go';
	import { IoSearchOutline } from 'react-icons/io5';
	import { IoMdHeartEmpty } from 'react-icons/io';
	import { MdOutlineExplore, MdOutlineAddBox } from 'react-icons/md';
	import { CgClapperBoard } from 'react-icons/cg';
	import { PiMessengerLogoLight } from 'react-icons/pi';
	import { RxHamburgerMenu } from 'react-icons/rx';
	import { FaInstagram } from 'react-icons/fa';
	import InstaLogo from '../../../../public/images/instalogo.png';
	import ProfilePic from '../../../../public/images/profilepic.jpg';
	import Cookies from 'js-cookie';
	import CreatePostModal from '../_components/post-modal/page';

interface MenuItemProps {
    href: string;
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | null;
    label: string;
    isProfile?: boolean;
    isMore?: boolean;
    isLogo?: boolean;
    onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ href, Icon, label, isProfile, isMore, isLogo, onClick }) => (
    <li
        className={`relative px-0 l:px-2 py-[11px] hover:bg-[#ffffff1a] border border-none rounded-lg cursor-pointer ${isMore ? 'mt-[50px]' : ''} ${isLogo ? 'mb-[20px] py-[20px]' : ''}`}
        onClick={onClick}
    >
        <Link href={href} className="gap-0 justify-center l:gap-[15px] l:justify-normal flex items-center">
            {isProfile ? (
                <div className="w-[24px] h-[24px] border rounded-full overflow-hidden">
                    <Image src={Cookies.get('profile_pic') || ProfilePic} alt="Profile picture" width={24} height={24} className="w-full h-full object-cover" />
                </div>
            ) : (
                Icon && <Icon className="text-white text-[27px]" />
            )}
            <h6 className="text-white text-md font-segoe">{label}</h6>
        </Link>
    </li>
);

export default function SideMenu({ isLoading }: { isLoading: () => void }) {
    const [showLogout, setShowLogout] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const router = useRouter();

    const handleLogout = () => {
        Cookies.remove('token');
        router.push('/login');
    };

    return (
        <>
            <div className="hidden l:block w-[23.5%] border-[#262626] border-r-[1px] relative">
                <div className="Logo">
                    <Link href="#">
                        <Image src={InstaLogo} alt="Instagram logo" className="w-[136px] h-[89px] mt-2 ml-2" />
                    </Link>
                </div>
                <nav>
                    <ul className="flex flex-col gap-[5px] mx-3 mt-1">
                        <MenuItem href="#" Icon={GoHomeFill} label="Home" />
                        <MenuItem href="#" Icon={IoSearchOutline} label="Search" />
                        <MenuItem href="#" Icon={MdOutlineExplore} label="Explore" />
                        <MenuItem href="#" Icon={CgClapperBoard} label="Reels" />
                        <MenuItem href="#" Icon={PiMessengerLogoLight} label="Messages" />
                        <MenuItem href="#" Icon={IoMdHeartEmpty} label="Notifications" />
                        <MenuItem href="#" Icon={MdOutlineAddBox} label="Create" onClick={() => setShowCreateModal(true)} />
                        <CreatePostModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} isLoading={isLoading} />
                        <MenuItem href="#" Icon={null} label="Profile" isProfile />
                        <MenuItem href="#" Icon={RxHamburgerMenu} label="More" isMore onClick={() => setShowLogout(!showLogout)} />
                        {showLogout && (
                            <li className="mt-0">
                                <button
                                    className="text-white py-1 px-[30%] font-light border border-[#262626] rounded-lg hover:bg-[#ffffff1a]"
                                    onClick={handleLogout}
                                >
                                    Log out
                                </button>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>

            <div className="hidden sm:block l:hidden w-[7%] border-[#262626] border-r-[1px]">
                <nav>
                    <ul className="flex flex-col gap-[5px] mx-3 mt-1">
                        <MenuItem href="#" Icon={FaInstagram} label="" isLogo />
                        <MenuItem href="#" Icon={GoHomeFill} label="" />
                        <MenuItem href="#" Icon={IoSearchOutline} label="" />
                        <MenuItem href="#" Icon={MdOutlineExplore} label="" />
                        <MenuItem href="#" Icon={CgClapperBoard} label="" />
                        <MenuItem href="#" Icon={PiMessengerLogoLight} label="" />
                        <MenuItem href="#" Icon={IoMdHeartEmpty} label="" />
                        <MenuItem href="#" Icon={MdOutlineAddBox} label="" />
                        <MenuItem href="#" Icon={null} label="" isProfile />
                        <MenuItem href="#" Icon={RxHamburgerMenu} label="" />
                    </ul>
                </nav>
            </div>
        </>
    );
}
