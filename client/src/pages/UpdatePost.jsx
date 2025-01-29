import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function UpdatePost() {
    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [formData, setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);
    const { postId } = useParams();

    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);

    // Fetch the post data on component mount
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`/api/post/getposts?postId=${postId}`);
                const data = await res.json();
                if (!res.ok) {
                    setPublishError(data.message);
                    return;
                }
                setFormData(data.posts[0]);
            } catch (error) {
                console.error('Error fetching post:', error.message);
                setPublishError('Failed to fetch the post');
            }
        };

        fetchPost();
    }, [postId]);

    // Handle image upload to Cloudinary
    const handleUpdloadImage = async () => {
        if (!file) {
            setImageUploadError('Please select an image');
            return;
        }

        try {
            setImageUploadError(null);
            setImageUploadProgress(0);

            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

            const res = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error?.message || 'Failed to upload image');
            }

            setImageUploadProgress(100);
            setFormData((prev) => ({ ...prev, image: data.secure_url }));
        } catch (error) {
            console.error('Error uploading image:', error.message);
            setImageUploadError('Image upload failed');
            setImageUploadProgress(null);
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/post/updatepost/${formData._id}/${currentUser._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (!res.ok) {
                setPublishError(data.message);
                return;
            }

            navigate(`/post/${data.slug}`);
        } catch (error) {
            console.error('Error updating post:', error.message);
            setPublishError('Something went wrong');
        }
    };

    return (
        <div className='p-3 max-w-3xl mx-auto min-h-screen'>
            <h1 className='text-center text-3xl my-7 font-semibold'>Update post</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                    <TextInput
                        type='text'
                        placeholder='Title'
                        required
                        id='title'
                        className='flex-1'
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        value={formData.title}
                    />
                    <Select
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        value={formData.category}
                    >
                        <option value='uncategorized'>Select a category</option>
                        <option value='javascript'>JavaScript</option>
                        <option value='reactjs'>React.js</option>
                        <option value='nextjs'>Next.js</option>
                    </Select>
                </div>
                <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
                    <FileInput
                        type='file'
                        accept='image/*'
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <Button
                        type='button'
                        gradientDuoTone='purpleToBlue'
                        size='sm'
                        outline
                        onClick={handleUpdloadImage}
                        disabled={!!imageUploadProgress}
                    >
                        {imageUploadProgress ? (
                            <div className='w-16 h-16'>
                                <CircularProgressbar
                                    value={imageUploadProgress}
                                    text={`${imageUploadProgress || 0}%`}
                                />
                            </div>
                        ) : (
                            'Upload Image'
                        )}
                    </Button>
                </div>
                {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
                {formData.image && (
                    <img src={formData.image} alt='Uploaded' className='w-full h-72 object-cover' />
                )}
                <ReactQuill
                    theme='snow'
                    value={formData.content}
                    placeholder='Write something...'
                    className='h-72 mb-12'
                    required
                    onChange={(value) => setFormData({ ...formData, content: value })}
                />
                <Button type='submit' gradientDuoTone='purpleToPink'>
                    Update post
                </Button>
                {publishError && <Alert className='mt-5' color='failure'>{publishError}</Alert>}
            </form>
        </div>
    );
}
