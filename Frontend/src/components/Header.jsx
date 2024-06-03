import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    
    const handleSearch = () => {
        if (searchTerm.trim() !== '') {
            navigate(`/s/${searchTerm}`);
        }
    };
    
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };
    
    useEffect(() => {
        if(!localStorage.getItem('token')){
            navigate('/login')
        }
    }, [])
    
  return (
    <div className="bg-gray-400 text-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to={'/'}><h1 className="text-xl font-semibold">The Movie List</h1></Link>
        <div className="flex items-center">
          <form  className="mr-4">
            <input
              type="text"
              placeholder="Search for movies..."
              className="p-2 border border-gray-300 rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Link to={`/s/${searchTerm}`}>
            <button type="submit" className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Search
            </button>
            </Link>
          </form>
          {/* <Link to="/login" className="text-white hover:text-gray-300 mr-4">Login</Link>
          <Link to="/signup" className="text-white hover:text-gray-300">Signup</Link> */}
          <Link to={'/profile'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-12">
                <path strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          </Link>

        </div>
      </div>
    </div>
  );
};
export default Header;
