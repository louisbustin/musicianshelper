import express from 'express';

//import postRoutes from './post.route';
import userRoutes from './users.route';

const router = express.Router();

router.use('/users', userRoutes);

export { router };
