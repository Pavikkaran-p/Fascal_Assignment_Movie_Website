import MovieList from '../model/MovieList.js';
import generateUniqueLink from '../utils/generateLink.js';

const createList = async (req, res) => {
    try {
        const { name, isPublic } = req.body;
        const link = generateUniqueLink();
        const newList = new MovieList({ user: req.user.id, name, isPublic, link });
        await newList.save();
        res.status(201).json({ message: 'Movie list created', newList });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

const updateList = async (req, res) => {
    try {
        const { name, isPublic, movies } = req.body;
        const list = await MovieList.findById(req.params.id);
        if (!list) {
            return res.status(404).json({ message: 'List not found' });
        }
        if (list.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        list.name = name;
        list.isPublic = isPublic;
        list.movies = movies;
        await list.save();
        res.status(200).json({ message: 'List updated', list });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};



const getUserLists = async (req, res) => {
    try {
        const lists = await MovieList.find({ user: req.user.id });
        res.status(200).json({ lists });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getPublicList = async (req, res) => {
    try {
        const list = await MovieList.findOne({ link: req.params.link, isPublic: true });
        if (!list) {
            return res.status(404).json({ message: 'List not found' });
        }
        res.status(200).json({ list });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

const deleteMovieFromList = async (req, res) => {
    try {
        const list = await MovieList.findById(req.params.id);
        if (!list) {
            return res.status(404).json({ message: 'List not found' });
        }
        if (list.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        list.movies = list.movies.filter(movieId => movieId !== req.params.movieId);
        await list.save();
        res.status(200).json({ message: 'Movie deleted from list', list });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

export { createList, updateList, getUserLists, getPublicList, deleteMovieFromList };
