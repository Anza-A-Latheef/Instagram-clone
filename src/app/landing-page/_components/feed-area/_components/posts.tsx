import { useState, useEffect } from 'react';
import Image from 'next/image';
import React from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { LuMessageCircle } from 'react-icons/lu';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { TbLocation } from 'react-icons/tb';
import { LiaBookmarkSolid } from 'react-icons/lia';
import { PiSmileyLight } from 'react-icons/pi';
import { formatDistanceToNow } from 'date-fns';
import Cookies from 'js-cookie';

interface PostHeaderProps {
    profile_picture: string;
    username: string;
    time: string;
    setData:React.Dispatch<React.SetStateAction<string>>;
    isClickedModal:string
    index:string
    ownPost:boolean
    deleteFun:()=>void
}

interface PostImageProps {
    postImage: string;
}

interface PostContentProps {
    postId: number;
    username: string;
    time: string;
    profile_picture: string;
    postImage: string;
    likes: number;
    caption: string;
    setData:React.Dispatch<React.SetStateAction<string>>;
    isClickedModal:string
    index:string
    ownPost:boolean
    deleteFun:()=>void
}

interface PostActionsProps {
    isLiked: boolean;
    onLikeClick: () => void;
    onCommentClick: () => void;
}

interface PostLikesProps {
    likes: number;
}

interface Post {
    id: number;
    user: string;
    image: string; 
    profile_picture: string;
    likes: number;
    created_at: string;
    caption: string;
    username:string;
    is_same_user: boolean;
}

interface Comment {
    id: number;
    user: string;
    content: string;
    created_at: string;
}

interface PostCommentSectionProps {
    comments: Comment[];
    newComment: string;
    setNewComment: React.Dispatch<React.SetStateAction<string>>;
    showComments: boolean;
    toggleComments: () => void;
    addComment: () => void;
}

const PostHeader: React.FC<PostHeaderProps> = ({ profile_picture, username, time,setData, isClickedModal, index, ownPost, deleteFun  }) => (
    <div className="flex justify-between items-center ml-2 2xs:ml-0">
        <div className="flex gap-3 items-center cursor-pointer">
            <div className="story-border w-[42px] h-[42px] 2xs:w-[32px] 2xs:h-[32px] rounded-full flex justify-center">
                <Image src={profile_picture} width={42} height={42} alt="Profile Image" className="w-full h-full border-2 border-black rounded-full" />
            </div>
            <p className="text-white text-center text-[12px] font-semibold">
               {username}<span className="font-bold ml-[3px] text-[#666]"> • {time}</span>
            </p>
        </div>
        
        <div className='relative'>
            <button onClick={()=>{ 
                if(index==isClickedModal){
                    setData("aaa")
                }else{
                    setData(index)}
                }
        }>
                <BsThreeDots className="text-white text-lg cursor-pointer" />
            </button>
            {isClickedModal==index &&<>
                {ownPost?<>
                        <div className='absolute top-6 whitespace-nowrap bg-black text-white border border-white text-sm py-2 px-4 rounded-xl left-0'>
                            <button onClick={deleteFun}>
                                delete this post
                            </button>
                        </div>
                        </>:<>
                        <div className='absolute top-6 whitespace-nowrap bg-black text-white border border-white text-sm py-2 px-4 rounded-xl left-0'>
                                <p>You can only delete your posts</p>
                        </div>
                    </>
            }
            </>}
        </div>
    </div>
);

const PostImage: React.FC<PostImageProps> = ({ postImage }) => (
    <div className="border border-[#262626] rounded-lg w-full sm:w-[468px] mt-4">
        <Image src={postImage} alt="Post" className="w-full h-full rounded-lg" width={468} height={100} />
    </div>
);

const PostActions: React.FC<PostActionsProps> = ({ isLiked, onLikeClick,onCommentClick}) => (
    <div className="flex items-center justify-between mt-[12px]">
        <div className="flex gap-3">
        {isLiked ? (
                <FaHeart
                    className="text-2xl cursor-pointer text-[#ff3040]"
                    title="Like"
                    onClick={onLikeClick}
                />
            ) : (
                <FaRegHeart
                    className="text-2xl cursor-pointer text-white hover:opacity-[0.6]"
                    title="Like"
                    onClick={onLikeClick}
                />
            )}
            <LuMessageCircle className="text-white text-[27px] cursor-pointer hover:opacity-[0.6]" title="Comment" onClick={onCommentClick} />
            <TbLocation className="text-white text-2xl cursor-pointer hover:opacity-[0.6]" title="Share" />
        </div>
        <LiaBookmarkSolid className="text-white text-3xl cursor-pointer hover:opacity-[0.6]" title="Save" />
    </div>
);

const PostLikes: React.FC<PostLikesProps> = ({ likes }) => (
    <div className="flex items-center mt-3 gap-1">
        <span className="text-white font-semibold text-[13px] cursor-pointer">{likes} likes</span>
    </div>
);

const PostCommentSection: React.FC<PostCommentSectionProps> = ({ 
    comments, 
    newComment, 
    setNewComment, 
    showComments, 
    toggleComments, 
    addComment 
}) => (
    <div className="mt-2">
        <button onClick={toggleComments}>
            {showComments ? "Hide comments" : "View all comments"}
        </button>
        {showComments && (
            <div>
                {comments.map(comment => (
                    <div key={comment.id} className="text-white mt-2">
                        <span className="font-semibold">{comment.user}</span>: {comment.content}
                        <span className="text-xs text-gray-500 ml-2">{comment.created_at}</span>
                    </div>
                ))}
                <div className="flex items-center mt-2">
                    <input 
                        type="text" 
                        value={newComment} 
                        onChange={(e) => setNewComment(e.target.value)} 
                        placeholder="Add a comment..." 
                        className="bg-black outline-none text-white text-sm border-none w-full mr-2"
                    />
                    <button onClick={addComment} className="text-blue-500">Post</button>
                </div>
            </div>
        )}
    </div>
);

const PostContent: React.FC<PostContentProps> = ({ profile_picture, username, time, postImage, likes, caption, setData, isClickedModal, index, ownPost, deleteFun,postId, ...props}) => {
    const [isLiked, setIsLiked] = useState(false); 
    const [likeCount, setLikeCount] = useState(likes);
    const [comments, setComments] = useState<Comment[]>([]);
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState("");

    const fetchComments = async () => {
        const res = await fetch(`http://localhost:8000/api/comments/${postId}/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`
            }
        });
        const data = await res.json();
        setComments(data);
    };

    const addComment = async () => {
        const res = await fetch(`http://localhost:8000/api/comments/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ post: postId, content: newComment }),
        });

        if (res.ok) {
            const data = await res.json();
            setComments([...comments, data]);
            setNewComment("");
        }
    };

    useEffect(() => {
        if (showComments) fetchComments();
    }, [showComments]);

    const handleLikeClick = () => {
        setIsLiked(!isLiked); 
        setLikeCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1)); 
    };

    return (
        <div className="post w-full px-2 2xs:w-[75%] 2xs:px-0 py-4 border-b border-[#262626]">
            <PostHeader  username={username}  time={time}  profile_picture={profile_picture}  setData={setData}  isClickedModal={isClickedModal}  index={index}  ownPost={ownPost}  deleteFun={deleteFun}/>
            <PostImage postImage={postImage} />
            <PostActions onLikeClick={handleLikeClick} isLiked={isLiked} onCommentClick={() => setShowComments(!showComments)} /> 
            <PostLikes likes={likeCount} /> 
            <div className="flex flex-col items-start mt-2">
                <div className="flex items-center gap-1">
                    <h6 className="text-white font-semibold text-[13px] cursor-pointer">{username}</h6>
                    <p className="text-white text-[13px]">{caption}</p>
                </div>
            </div>
            <PostCommentSection 
                comments={comments} 
                newComment={newComment} 
                setNewComment={setNewComment} 
                showComments={showComments} 
                toggleComments={() => setShowComments(!showComments)} 
                addComment={addComment} 
            />
        </div>
    );
};

export default function Posts({isLoading, setLoading}:{isLoading:any,setLoading:()=>void}) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [clickedModal,setClickedModal] = useState<string>("hg")
    useEffect(()=>{
        console.log("deleteModal",clickedModal)
    },[clickedModal])

    const [deleteBool, setDeleteBool] = useState<boolean>(false)

    const deletePost = async () =>{
        const token = Cookies.get('token'); 

        const fetchData = async ()=>{
            const res = await fetch('http://127.0.0.1:8000/api/post/',{
                method:'DELETE',
                headers:{
                    'Authorization':`Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({
                    "id":clickedModal
                })
            })
            console.log("clicked id",clickedModal)
            const response = await res.json()
            console.log("res in delete",response)
            setLoading()
            setDeleteBool(true)
        }
        fetchData()
    }
    useEffect(() => {
        const token = Cookies.get('token'); 
        
        const fetchData = async ()=>{
            const res = await fetch('http://127.0.0.1:8000/api/post/',{
                method:'GET',
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            })
            const response = await res.json()
            console.log("res in fetch",response)
            setPosts(response.reverse())
            setLoading()
            setDeleteBool(false)
    }
    fetchData()
    }, [isLoading,deleteBool]);

      
    return (
        <>
        {!deleteBool &&<>
        { 
        
        !isLoading ?<>
            
            <div className="w-screen sm:w-[630px] flex flex-col items-center pb-1">
            {posts.length > 0 ? (
                posts.map((post:any,index:any) => (
                    <PostContent
                    key={post.id}
                    {...post}
                        deleteFun={deletePost}
                        setData={setClickedModal}
                        isClickedModal={clickedModal}
                        ownPost={post?.is_same_user}
                        index={post?.id}
                        username={post.user}
                        time={formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                        profile_picture=
                        {post.profile_picture ? 
                            post.profile_picture.startsWith('http') ? post.profile_picture : `http://localhost:8000${post.profile_picture}` 
                            : ''}
                            postImage={post.image.startsWith('http') ? post.image : `http://localhost:8000${post.image}`}
                            likes={post.likes || 0}
                            caption={post.caption}
                            />
                    ))
                ) : (
                    <p className="text-white">No posts available.</p>
                )}
                    </div>
                </>:<></>
                }</>
            }
        </>
    );
}



// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import React from 'react';
// import { BsThreeDots } from 'react-icons/bs';
// import { LuMessageCircle } from 'react-icons/lu';
// import { FaRegHeart, FaHeart } from 'react-icons/fa';
// import { TbLocation } from 'react-icons/tb';
// import { LiaBookmarkSolid } from 'react-icons/lia';
// import { PiSmileyLight } from 'react-icons/pi';
// import { formatDistanceToNow } from 'date-fns';
// import Cookies from 'js-cookie';

// interface PostHeaderProps {
//     profile_picture: string;
//     username: string;
//     time: string;
//     setData:React.Dispatch<React.SetStateAction<string>>;
//     isClickedModal:string
//     index:string
//     ownPost:boolean
//     deleteFun:()=>void
// }

// interface PostImageProps {
//     postImage: string;
// }

// interface PostContentProps {
//     username: string;
//     time: string;
//     profile_picture: string;
//     postImage: string;
//     likes: number;
//     caption: string;
//     setData:React.Dispatch<React.SetStateAction<string>>;
//     isClickedModal:string
//     index:string
//     ownPost:boolean
//     deleteFun:()=>void
// }

// interface PostActionsProps {
//     isLiked: boolean;
//     onLikeClick: () => void;
// }

// interface PostLikesProps {
//     likes: number;
// }

// interface Post {
//     id: number;
//     user: string;
//     image: string; 
//     profile_picture: string;
//     likes: number;
//     created_at: string;
//     caption: string;
//     username:string;
// }

// const PostHeader: React.FC<PostHeaderProps> = ({ profile_picture, username, time,setData, isClickedModal, index, ownPost, deleteFun  }) => (
//     <div className="flex justify-between items-center ml-2 2xs:ml-0">
//         <div className="flex gap-3 items-center cursor-pointer">
//             <div className="story-border w-[42px] h-[42px] 2xs:w-[32px] 2xs:h-[32px] rounded-full flex justify-center">
//                 <Image src={profile_picture} width={42} height={42} alt="Profile Image" className="w-full h-full border-2 border-black rounded-full" />
//             </div>
//             <p className="text-white text-center text-[12px] font-semibold">
//                {username}<span className="font-bold ml-[3px] text-[#666]"> • {time}</span>
//             </p>
//         </div>
        
//         <div className='relative'>
//             <button onClick={()=>{ 
//                 if(index==isClickedModal){
//                     setData("aaa")
//                 }else{
//                     setData(index)}
//                 }
//         }>
//                 <BsThreeDots className="text-white text-lg cursor-pointer" />
//             </button>
//             {isClickedModal==index &&<>
//                 {ownPost?<>
//                         <div className='absolute top-6 whitespace-nowrap bg-black text-white border border-white text-sm py-2 px-4 rounded-xl left-0'>
//                             <button onClick={deleteFun}>
//                                 delete this post
//                             </button>
//                         </div>
//                         </>:<>
//                         <div className='absolute top-6 whitespace-nowrap bg-black text-white border border-white text-sm py-2 px-4 rounded-xl left-0'>
//                                 <p>You can only delete your posts</p>
//                         </div>
//                     </>
//             }
//             </>}


//         </div>
//     </div>
// );

// const PostImage: React.FC<PostImageProps> = ({ postImage }) => (
//     <div className="border border-[#262626] rounded-lg w-full sm:w-[468px] mt-4">
//         <Image src={postImage} alt="Post" className="w-full h-full rounded-lg" width={468} height={100} />
//     </div>
// );

// const PostActions: React.FC<PostActionsProps> = ({ isLiked, onLikeClick }) => (
//     <div className="flex items-center justify-between mt-[12px]">
//         <div className="flex gap-3">
//         {isLiked ? (
//                 <FaHeart
//                     className="text-2xl cursor-pointer text-[#ff3040]"
//                     title="Like"
//                     onClick={onLikeClick}
//                 />
//             ) : (
//                 <FaRegHeart
//                     className="text-2xl cursor-pointer text-white hover:opacity-[0.6]"
//                     title="Like"
//                     onClick={onLikeClick}
//                 />
//             )}
//             <LuMessageCircle className="text-white text-[27px] cursor-pointer hover:opacity-[0.6]" title="Comment" />
//             <TbLocation className="text-white text-2xl cursor-pointer hover:opacity-[0.6]" title="Share" />
//         </div>
//         <LiaBookmarkSolid className="text-white text-3xl cursor-pointer hover:opacity-[0.6]" title="Save" />
//     </div>
// );

// const PostLikes: React.FC<PostLikesProps> = ({ likes }) => (
//     <div className="flex items-center mt-3 gap-1">
//         <span className="text-white font-semibold text-[13px] cursor-pointer">{likes} likes</span>
//     </div>
// );

// const PostCommentSection = () => (
//     <div className="mt-2">
//         <p className="text-sm font-light text-[#a8a8a8] cursor-pointer">view all comments</p>
//         <div className="flex justify-between items-center mt-2">
//             <input type="text" placeholder="Add a comment..." className="bg-black outline-none text-white text-sm border-none w-2/3" />
//             <PiSmileyLight className="text-[#a8a8a8] text-sm cursor-pointer hover:opacity-[0.6]" />
//         </div>
//     </div>
// );

// const PostContent: React.FC<PostContentProps> = ({ profile_picture, username, time, postImage, likes, caption, setData, isClickedModal, index, ownPost, deleteFun,}) => {
//     const [isLiked, setIsLiked] = useState(false); 
//     const [likeCount, setLikeCount] = useState(likes);

//     const handleLikeClick = () => {
//         setIsLiked(!isLiked); 
//         setLikeCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1)); 
//     };

//     return (
//         <div className="post w-full px-2 2xs:w-[75%] 2xs:px-0 py-4 border-b border-[#262626]">
//             <PostHeader  username={username}  time={time}  profile_picture={profile_picture}  setData={setData}  isClickedModal={isClickedModal}  index={index}  ownPost={ownPost}  deleteFun={deleteFun}/>
//             <PostImage postImage={postImage} />
//             <PostActions onLikeClick={handleLikeClick} isLiked={isLiked} /> 
//             <PostLikes likes={likeCount} /> 
//             <div className="flex flex-col items-start mt-2">
//                 <div className="flex items-center gap-1">
//                     <h6 className="text-white font-semibold text-[13px] cursor-pointer">{username}</h6>
//                     <p className="text-white text-[13px]">{caption}</p>
//                 </div>
//             </div>
//             <PostCommentSection />
//         </div>
//     );
// };

// export default function Posts({isLoading, setLoading}:{isLoading:any,setLoading:()=>void}) {
//     const [posts, setPosts] = useState<Post[]>([]);
//     const [clickedModal,setClickedModal] = useState<string>("hg")
//     useEffect(()=>{
//         console.log("deleteModal",clickedModal)
//     },[clickedModal])

//     const [deleteBool, setDeleteBool] = useState<boolean>(false)

//     const deletePost = async () =>{
//         const token = Cookies.get('token'); 

//         const fetchData = async ()=>{
//             const res = await fetch('http://127.0.0.1:8000/api/post/',{
//                 method:'DELETE',
//                 headers:{
//                     'Authorization':`Bearer ${token}`,
//                     'Content-Type': 'application/json',
//                 },
//                 body:JSON.stringify({
//                     "id":clickedModal
//                 })
//             })
//             console.log("clicked id",clickedModal)
//             const response = await res.json()
//             console.log("res in delete",response)
//             setLoading()
//             setDeleteBool(true)
//         }
//         fetchData()
//     }
//     useEffect(() => {
//         const token = Cookies.get('token'); 
        
//         const fetchData = async ()=>{
//             const res = await fetch('http://127.0.0.1:8000/api/post/',{
//                 method:'GET',
//                 headers:{
//                     'Authorization':`Bearer ${token}`
//                 }
//             })
//             const response = await res.json()
//             console.log("res in fetch",response)
//             setPosts(response.reverse())
//             setLoading()
//             setDeleteBool(false)
//     }
//     fetchData()
//     }, [isLoading,deleteBool]);

      
//     return (
//         <>
//         {!deleteBool &&<>
//         { 
        
//         !isLoading ?<>
            
//             <div className="w-screen sm:w-[630px] flex flex-col items-center pb-1">
//             {posts.length > 0 ? (
//                 posts.map((post:any,index:any) => (
//                     <PostContent
//                         deleteFun={deletePost}
//                         setData={setClickedModal}
//                         isClickedModal={clickedModal}
//                         ownPost={post?.is_same_user}
//                         index={post?.id}
//                         username={post.user}
//                         time={formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
//                         profile_picture=
//                         {post.profile_picture ? 
//                             post.profile_picture.startsWith('http') ? post.profile_picture : `http://localhost:8000${post.profile_picture}` 
//                             : ''}
//                             postImage={post.image.startsWith('http') ? post.image : `http://localhost:8000${post.image}`}
//                             likes={post.likes || 0}
//                             caption={post.caption}
//                             />
//                     ))
//                 ) : (
//                     <p className="text-white">No posts available.</p>
//                 )}
//                     </div>
//                 </>:<></>
//                 }</>
//             }
//         </>
//     );
// }
