import React, { useRef, useState, useEffect  } from 'react';
import Image from 'next/image';
import { ImageProps } from 'next/image';
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import Profile1 from '../../../../../../public/images/prof1.jpg';
import Profile2 from '../../../../../../public/images/prof2.jpeg';
import Profile3 from '../../../../../../public/images/prof3.jpeg';
import Profile4 from '../../../../../../public/images/prof4.jpeg';
import Profile5 from '../../../../../../public/images/prof5.jpeg';
import Profile6 from '../../../../../../public/images/prof6.jpeg';
import Profile7 from '../../../../../../public/images/prof7.jpeg';
import Profile8 from '../../../../../../public/images/prof8.jpeg';

const profiles = [
  { img: Profile1, username: 'lucky_carp' },
  { img: Profile2, username: 'peter_loop' },
  { img: Profile3, username: 'i_am_ai' },
  { img: Profile4, username: 'l_r_Cr0ft' },
  { img: Profile5, username: 'robo40' },
  { img: Profile6, username: 'queen of dreams' },
  { img: Profile7, username: 'anime_lover' },
  { img: Profile8, username: 'traveller' },
  { img: Profile1, username: 'lucky_carp' },
  { img: Profile2, username: 'peter_loop' },
  { img: Profile3, username: 'i_am_ai' },
  { img: Profile4, username: 'l_r_Cr0ft' },
  { img: Profile5, username: 'robo40' },
  { img: Profile6, username: 'queen of dreams' },
  { img: Profile7, username: 'anime_lover' },
  { img: Profile8, username: 'traveller' },
  { img: Profile1, username: 'lucky_carp' },
  { img: Profile2, username: 'peter_loop' },
  { img: Profile3, username: 'i_am_ai' },
  { img: Profile4, username: 'l_r_Cr0ft' },
  { img: Profile5, username: 'robo40' },
  { img: Profile6, username: 'queen of dreams' },
  { img: Profile7, username: 'anime_lover' },
  { img: Profile8, username: 'traveller' },
];

const StoryItem = ({ imgSrc, username }: { imgSrc: ImageProps['src']; username: string }) => (
  <li className="flex flex-col items-center w-[68px] cursor-pointer gap-2">
    <div className="story-border w-16 h-16 rounded-full">
      <Image src={imgSrc} alt="Profile Image" className="w-full h-full border-2 border-black rounded-full" />
    </div>
    <p className="text-white text-center text-[11px] w-full overflow-hidden text-ellipsis whitespace-nowrap">{username}</p>
  </li>
);

export default function Story() {
  const storyListRef = useRef<HTMLUListElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(profiles.length > 8);

  const scrollLeft = () => {
    if (storyListRef.current) {
      storyListRef.current.scrollBy({ left: -270, behavior: 'smooth' }); 
      handleScroll();
    }
  };

  const scrollRight = () => {
    if (storyListRef.current) {
      storyListRef.current.scrollBy({ left: 270, behavior: 'smooth' }); 
      handleScroll();
    }
  };

  const handleScroll = () => {
    if (storyListRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = storyListRef.current;
      
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft + clientWidth < scrollWidth); 
    }
  };

  useEffect(() => {
    handleScroll();
  }, []);

  return (
    <div className="relative flex flex-col justify-center mx-4 xs:mx-3 sm:mx-0 py-5 w-screen sm:w-[630px] h-[23%]">
      {showLeftButton && (
        <button 
          className='absolute left-4 top-11 border rounded-full bg-[#f5f5f5] w-fit h-fit items-center justify-center z-[2]'
          onClick={scrollLeft}>
          <FiChevronLeft className='text-[#666] text-xl' />
        </button>
      )}
      
      <ul ref={storyListRef} onScroll={handleScroll} className="flex justify-between xs:justify-normal gap-4 overflow-x-auto scrollbar-hide">
        {profiles.map((profile, index) => (
          <StoryItem key={index} imgSrc={profile.img} username={profile.username} />
        ))}
      </ul>
      
      {showRightButton && (
        <button 
          className='absolute right-4 top-11 border rounded-full bg-[#f5f5f5] w-fit h-fit items-center justify-center z-[2]'
          onClick={scrollRight}>
          <FiChevronRight className='text-[#666] text-xl' />
        </button>
      )}
    </div>
  );
}
