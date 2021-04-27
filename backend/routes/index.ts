import express from 'express';

import bandRoutes from './bands.routes';
import setlistRoutes from './setlists.routes';
import songRoutes from './songs.routes';

const router = express.Router();

router.use('/bands', bandRoutes);
router.use('/setlists', setlistRoutes);
router.use('/songs', songRoutes);

// eslint-disable-next-line import/prefer-default-export
export { router };
