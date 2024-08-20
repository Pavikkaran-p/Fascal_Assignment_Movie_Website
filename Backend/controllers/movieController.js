import axios from 'axios'
export const movieById=async (req, res) => {
  try {
    const apiKey = process.env.OMDB_API_KEY;
    const { imdbID } = req.query;
    const response = await axios.get(`http://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`);
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
}