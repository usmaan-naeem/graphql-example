import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Post } from '../types/Post';
import { SEARCH_POSTS_QUERY } from '../graphQl/schema';

const SearchComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchPosts, { data, loading, error }] = useLazyQuery<{ searchPosts: Post[] }>(
    SEARCH_POSTS_QUERY
  );

  const handleSearch = () => {
    searchPosts({ variables: { query: searchTerm } });
  };

  return (
    <div>
      <h2 className='pb-3 mb-3'>Search Posts</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search posts..."
        className='text-sm font-normal w-full border border-blue-chalk rounded py-2 px-4 mb-3 focus:outline-none focus:ring-0'
      />
      <button onClick={handleSearch} className='py-2 px-4 bg-blue-500 rounded text-white'>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      <ul className='my-4 text-left'>
        {data?.searchPosts.map((post) => (
          <li key={post.id} className='border border-blue-chalk rounded p-4 mb-2'>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p>{post.user.username}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchComponent;
