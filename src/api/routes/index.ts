import express from 'express';

import bandRoutes from './bands.routes';
import userRoutes from './users.routes';
import setlistRoutes from './setlists.routes';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/bands', bandRoutes);
router.use('/setlists', setlistRoutes);

export { router };
