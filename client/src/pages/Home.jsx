import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <div className='flex flex-col gap-6 p-6 sm:p-12 md:p-16 lg:p-28 px-4 max-w-5xl mx-auto'>
        <h1 className='text-4xl font-extrabold text-center lg:text-6xl text-gray-800 dark:text-white'>
          Welcome to Blog Mingle
        </h1>
        <p className='text-gray-600 text-sm sm:text-base text-center dark:text-gray-400'>
          Explore articles and tutorials to learn, grow, and stay updated!
        </p>
        <div className='text-center'>
          <Link
            to='/search'
            className='text-sm sm:text-base text-teal-600 font-semibold hover:underline dark:text-teal-400'
          >
            View All Posts
          </Link>
        </div>
      </div>


      <div className='p-3'>
        <CallToAction />
      </div>
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
            <div className='flex justify-center flex-wrap gap-4'>
              {posts?.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className='text-lg text-teal-500 hover:underline text-center'
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}