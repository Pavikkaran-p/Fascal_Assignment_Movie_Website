import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MovieInfo = () => {
  const { imdbID } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [movieLists, setMovieLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); 
  const [newListName, setNewListName] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(`https://fascal-assignment-movie-website.onrender.com/movie?imdbID=${imdbID}`, config);
        setMovieData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    const fetchMovieLists = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get('https://fascal-assignment-movie-website.onrender.com/api/lists', config);
        setMovieLists(response.data.lists);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchMovieData();
    fetchMovieLists();
  }, [imdbID]);

  const handleAddToList = async (listId) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.put(`https://fascal-assignment-movie-website.onrender.com/api/lists/${listId}`, {name:newListName ,isPublic:isPublic , movies: [imdbID] }, config);
      setShowModal(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleCreateList = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post('https://fascal-assignment-movie-website.onrender.com/api/lists/createlist', { name: newListName,isPublic:isPublic }, config);
      if(response){
        
      }
      // await handleAddToList(response.data.newList._id);
    } catch (error) {
      console.error(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className=" mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">{movieData.Title}</h1>
      <div className="flex flex-wrap">
        <div className="w-60 h-80">
          <img src={movieData.Poster} alt={movieData.Title} className="w-60 h-80" />
        </div>
        <div className="m-5 w-full sm:w-1/2 md:w-2/3 lg:w-3/4 xl:w-4/5">
          <button onClick={() => setShowModal(true)}
          className='bg-blue-500 px-4 py-2 rounded-3xl'
          >Add to Movie list</button>
          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 z-10 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-4 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Add to Movie List</h2>
                <select onChange={(e) => setNewListName(e.target.value)} value={newListName} className="w-full mb-4">
                  <option value="">Select a list or create a new one</option>
                  {movieLists.map(list => (
                    <option key={list._id} value={list._id}>{list.name}</option>
                  ))}
                </select>
                <div className='p-5'>
                    <h2>New list name</h2>
                    <input className='border-black' type="text" onChange={e=>setNewListName(e.target.value)}/>
                    {/* <button onClick={setIsPublic(true)}>Public {isPublic?'✔️':'✖️'}</button> */}
                </div>
                <div className="flex justify-between">
                  <button onClick={() => setShowModal(false)}>Cancel</button>
                  <button onClick={handleCreateList}>Create New List</button>
                  <button disabled={!newListName} onClick={() => handleAddToList(newListName)}>Add to List</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
