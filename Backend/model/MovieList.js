import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const MovieListSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  movies: [{ type: String }],
  isPublic: { type: Boolean, default: false },
  uuid: { type: String, default: uuidv4 }
});

const MovieList = mongoose.model('MovieList', MovieListSchema);
export default MovieList;
