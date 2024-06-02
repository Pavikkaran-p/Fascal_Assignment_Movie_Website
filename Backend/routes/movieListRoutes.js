import express from 'express';
import {
    createList,
    updateList,
    getUserLists,
    getPublicList,
    deleteMovieFromList
} from '../controllers/movieListController.js';
import authenticateUser from '../middleware/authenticateUser.js';

const router = express.Router();

router.post('/', authenticateUser, createList);
router.put('/:id', authenticateUser, updateList);
router.get('/', authenticateUser, getUserLists);
router.get('/:link', getPublicList);
router.delete('/:id/movies/:movieId', authenticateUser, deleteMovieFromList);

export default router;
