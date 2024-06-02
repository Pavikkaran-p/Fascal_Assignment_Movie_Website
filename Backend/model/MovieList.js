import mongoose from 'mongoose';

const MovieListSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    movies: { type: [String], default: [] },
    isPublic: { type: Boolean, default: false },
    link: String,
});

const MovieList = mongoose.model('MovieList', MovieListSchema);

export default MovieList;
