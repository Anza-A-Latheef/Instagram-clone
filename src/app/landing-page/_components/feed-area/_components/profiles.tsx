import React from 'react';
import Image from 'next/image';
import Profile1 from '../../../../../../public/images/prof1.jpg';
import Profile2 from '../../../../../../public/images/prof2.jpeg';


const Profiles: React.FC = () => {
  const profiles = [
    {
      username: 'my_account',
      status: 'Followed by lucky_carp and 2 others',
      profilePic: Profile2,
    },
    {
      username: 'my_account',
      status: 'Followed by lucky_carp and 2 others',
      profilePic: Profile2,
    },
    {
      username: 'my_account',
      status: 'Followed by lucky_carp and 2 others',
      profilePic: Profile2,
    },
    {
      username: 'my_account',
      status: 'Followed by lucky_carp and 2 others',
      profilePic: Profile2,
    },
    {
      username: 'my_account',
      status: 'Followed by lucky_carp and 2 others',
      profilePic: Profile2,
    },
  ];

  return (
    <div className="hidden p-6 xlg:block">
      <div className="flex items-center justify-between py-2">
        <div className=" flex items-center justify-center gap-3">
          <div className="cursor-pointer w-11 h-11">
            <Image src={Profile1} alt="Profile Picture" className="w-full h-full border-0 rounded-full" />
          </div>
          <div className="flex flex-col gap-1">
            <h6 className="text-[#f5f5f5] font-bold text-[13px] cursor-pointer">my_account</h6>
            <span className="text-[#a8a8a8] text-xs">sample_user</span>
          </div>
        </div>
        <div>
          <button className="text-[#0095f6] text-xs cursor-pointer hover:text-[#a8a8a8]">Switch</button>
        </div>
      </div>
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <h6 className="text-[#a8a8a8] text-[13px] font-semibold">Suggested for you</h6>
          <button className="text-[#f5f5f5] text-xs font-medium cursor-pointer hover:text-[#a8a8a8]">See All</button>
        </div>
        <div>
          <ul className="flex flex-col w-full">
            {profiles.map((profile, index) => (
              <li key={index} className="w-full py-2 cursor-pointer">
                <a href="#" className="flex items-center justify-between">
                  <div className="left flex items-center gap-3">
                    <div className="w-11 h-11">
                      <Image src={profile.profilePic} alt="Profile Picture" className="w-full h-full border-0 rounded-full" />
                    </div>
                    <div className="flex flex-col">
                      <h6 className="text-[#f5f5f5] font-semibold text-[13px]">{profile.username}</h6>
                      <p className="text-[#a8a8a8] text-xs truncate max-w-[180px]">{profile.status}</p>
                    </div>
                  </div>
                  <div>
                    <button className="text-[#0095f6] text-xs cursor-pointer hover:text-[#a8a8a8]">Follow</button>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="footer mt-10">
        <div className="top">
          <ul className="flex flex-wrap items-center gap-1">
            {['About', 'Help', 'Press', 'API', 'Jobs', 'Privacy', 'Terms', 'Locations', 'Language'].map((item, idx) => (
              <li key={idx} className="text-[#737373] text-xs">
                <a href="#" className="hover:underline">{item}</a>
                <span className="mx-1 text-[#737373] text-xs">.</span>
              </li>
            ))}
            <li className="text-[#737373] text-xs">
              <a href="#" className="hover:underline">Meta Verified</a>
            </li>
          </ul>
        </div>
        <div className="mt-5">
          <p className="text-[#737373] text-[12px] uppercase">© 2024 Instagram from meta</p>
        </div>
      </div>
    </div>
  );
};

export default Profiles;
