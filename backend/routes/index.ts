import express from 'express';

import bandRoutes from './bands.routes';
import setlistRoutes from './setlists.routes';
import songRoutes from './songs.routes';
import postRoutes from './posts.routes';
import emailRoutes from './email.routes';

const router = express.Router();

router.use('/bands', bandRoutes);
router.use('/posts', postRoutes);
router.use('/setlists', setlistRoutes);
router.use('/songs', songRoutes);
router.use('/email', emailRoutes);

// eslint-disable-next-line import/prefer-default-export
export { router };
