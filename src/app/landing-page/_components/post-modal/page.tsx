import React, { useState } from 'react';
import Cookies from 'js-cookie';

const CreatePostModal = ({ isOpen, onClose,isLoading }: { isOpen: boolean,isLoading:()=>void, onClose: () => void }) => {
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const token = Cookies.get('token'); 
    const userId:any = Cookies.get('userId')

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("token",token)

        const formData = new FormData();
        if (image) formData.append('image', image);
        formData.append('caption', caption);
        formData.append('created_by',userId)

        try {
            const response = await fetch('http://127.0.0.1:8000/api/post/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Post created:', data);
                onClose();
                isLoading()
            } else {
                console.error('Failed to create post:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        isOpen ? (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg p-6 w-[400px]">
                    <h2 className="text-lg font-semibold mb-4">Create a new post</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="mb-4"
                        />
                        <textarea
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            placeholder="Add a caption..."
                            className="w-full border rounded p-2 mb-4"
                        />
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                            Post
                        </button>
                    </form>
                    <button onClick={onClose} className="mt-4 text-red-500">Cancel</button>
                </div>
            </div>
        ) : null
    );
};

export default CreatePostModal;
