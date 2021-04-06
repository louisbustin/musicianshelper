import express from 'express';

import bandRoutes from './bands.routes';
import userRoutes from './users.routes';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/bands', bandRoutes);

export { router };
