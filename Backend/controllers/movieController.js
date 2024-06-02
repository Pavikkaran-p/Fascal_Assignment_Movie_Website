export const movieBySearch=async (req, res) => {
    const { title } = req.query;
    console.log(title)
    // console.log(req.params)
    const apiKey = 'c6412e69';
  
    try {
      const response = await axios.get(`http://www.omdbapi.com/?t=${title}&apikey=${apiKey}`);
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch movie data' });
    }
}
