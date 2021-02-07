import express from 'express';

//import postRoutes from './post.route';
import userRoutes from './users.route';
import bracketGroupRoutes from './bracket-group.route'

const router = express.Router();

router.use('/users', userRoutes);
router.use('/bracketgroups', bracketGroupRoutes);

export { router };
