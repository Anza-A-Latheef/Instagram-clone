    import { useState, useEffect } from 'react';
    import Image from 'next/image';
    import React from 'react';
    import Profile1 from '../../../../../../public/images/prof1.jpg';
    import Post1 from '../../../../../../public/images/post1.jpg';
    import { BsThreeDots } from 'react-icons/bs';
    import { LuMessageCircle } from 'react-icons/lu';
    import { FaRegHeart } from 'react-icons/fa';
    import { TbLocation } from 'react-icons/tb';
    import { LiaBookmarkSolid } from 'react-icons/lia';
    import { PiSmileyLight } from 'react-icons/pi';
    import Profile2 from '../../../../../../public/images/prof2.jpeg';
    import Profile3 from '../../../../../../public/images/prof3.jpeg';
    import Profile4 from '../../../../../../public/images/prof4.jpeg';
    import { StaticImageData } from 'next/image';

    interface PostHeaderProps {
        profileImage: StaticImageData;
        // profileImage: string;
        username: string;
        time: string;
    }

    interface User {
        username: string;
        profile_image: string; 
    }

    interface Post {
        id: number;
        user: User;
        image: string; 
        likes: number;
        created_at: string;
    }

    const PostHeader: React.FC<PostHeaderProps> = ({ profileImage, username, time }) => (
    <div className="flex justify-between items-center ml-2 2xs:ml-0">
        <div className="flex gap-3 items-center cursor-pointer">
            <div className="story-border w-[42px] h-[42px] 2xs:w-[32px] 2xs:h-[32px] rounded-full flex justify-center">
                <Image src={profileImage} alt="Profile Image" className="w-full h-full border-2 border-black rounded-full" />
            </div>
            <p className="text-white text-center text-[12px] font-semibold">
                {username} <span className="font-bold text-[#666]">• {time}</span>
            </p>
        </div>
        <BsThreeDots className="text-white text-lg cursor-pointer" />
    </div>
    );

    interface PostImageProps {
        postImage: StaticImageData;
        // postImage: string;
    }

    const PostImage: React.FC<PostImageProps> = ({ postImage }) => (
        <div className="border border-[#262626] rounded-lg w-full sm:w-[468px] mt-4">
            <Image src={postImage} alt="Post" className="w-full h-full rounded-lg" />
        </div>
    );

    const PostActions = () => (
        <div className="flex items-center justify-between mt-[12px]">
            <div className="flex gap-3">
                <FaRegHeart className="text-white text-2xl cursor-pointer hover:opacity-[0.6]" title="Like" />
                <LuMessageCircle className="text-white text-[27px] cursor-pointer hover:opacity-[0.6]" title="Comment" />
                <TbLocation className="text-white text-2xl cursor-pointer hover:opacity-[0.6]" title="Share" />
            </div>
            <LiaBookmarkSolid className="text-white text-3xl cursor-pointer hover:opacity-[0.6]" title="Save" />
        </div>
    );

    interface PostLikesProps {
        likes: number;
    }

    const PostLikes: React.FC<PostLikesProps> = ({ likes }) => (
        <div className="flex items-center mt-3 gap-1">
            <div className="flex items-center cursor-pointer">
                <Image src={Profile2} alt="Liked Profile" className="w-[20px] h-[20px] rounded-full border-2 border-black ml-0 hover:opacity-[0.8]" />
                <Image src={Profile3} alt="Liked Profile" className="w-[20px] h-[20px] rounded-full border-2 border-black ml-[-9px] hover:opacity-[0.8]" />
                <Image src={Profile4} alt="Liked Profile" className="w-[20px] h-[20px] rounded-full border-2 border-black ml-[-9px] hover:opacity-[0.8]" />
            </div>
            <span className="text-white font-semibold text-[13px] cursor-pointer">{likes} likes</span>
        </div>
    );

    const PostCommentSection = () => (
        <div className="mt-2">
            <p className="text-sm font-light text-[#a8a8a8] cursor-pointer">view all 3 comments</p>
            <div className="flex justify-between items-center mt-2">
                <input type="text" placeholder="Add a comment..." className="bg-black outline-none text-white text-sm border-none w-2/3" />
                <PiSmileyLight className="text-[#a8a8a8] text-sm cursor-pointer hover:opacity-[0.6]" />
            </div>
        </div>
    );

    interface PostContentProps {
        username: string;
        time: string;
        profileImage: StaticImageData;
        postImage: StaticImageData;
        // profileImage: string; 
        // postImage: string; 
        likes: number;
    }

    const PostContent: React.FC<PostContentProps> = ({ username, time, profileImage, postImage, likes }) => (
        <div className="post w-full px-2 2xs:w-[75%] 2xs:px-0 py-4 border-b border-[#262626]">
            <PostHeader username={username} time={time} profileImage={profileImage} />
            <PostImage postImage={postImage} />
            <PostActions />
            <PostLikes likes={likes} />
            <div className="flex flex-col items-start mt-2">
                <div className="flex items-center gap-1">
                    <h6 className="text-white font-semibold text-[13px] cursor-pointer">{username}</h6>
                    <p className="text-white text-[13px]">Forever starts here, in each other's arms</p>
                </div>
                <span className="text-[#a8a8a8] text-[13px] cursor-pointer">...more</span>
            </div>
            <PostCommentSection />
        </div>  
    );

    export default function Posts() {
        const [posts, setPosts] = useState<Post[]>([]);

        useEffect(() => {
            const fetchPosts = async () => {
                try {
                  const token = localStorage.getItem('token');
                  const res = await fetch('http://127.0.0.1:8000/posts/', {
                    method: 'GET',
                    headers: {
                      'Authorization': `Token ${token}`, 
                      'Content-Type': 'application/json',
                    },
                  });
                  const data = await res.json();
                  setPosts(data);
                } catch (error) {
                  console.error('Error fetching posts:', error);
                }
              };
    
            fetchPosts();
        }, []);
        
    return (
        <div className="w-screen sm:w-[630px] flex flex-col items-center pb-1">
             {/* {posts.map((post) => (
                <PostContent 
                    key={post.id} 
                    username={post.user.username} 
                    time={new Date(post.created_at).toLocaleDateString()} 
                    profileImage={post.user.profile_image}
                    postImage={post.image} 
                    likes={post.likes}
                    />
                ))} */}
                <PostContent username="lucky_carp" time="3 d" profileImage={Profile1} postImage={Post1} likes={177} />
                <PostContent username="lucky_carp" time="3 d" profileImage={Profile1} postImage={Profile1} likes={177} />
                <PostContent username="lucky_carp" time="3 d" profileImage={Profile1} postImage={Profile2} likes={177} />
                <PostContent username="lucky_carp" time="3 d" profileImage={Profile1} postImage={Profile3} likes={177} /> 
        </div>
    );
    }

    