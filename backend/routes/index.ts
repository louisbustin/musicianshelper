import express from 'express';

import bandRoutes from './bands.routes';
import setlistRoutes from './setlists.routes';
import songRoutes from './songs.routes';
import postRoutes from './posts.routes';
import emailRoutes from './email.routes';
import profileRoutes from './profiles.routes';
import zipRoutes from './zips.routes';

const router = express.Router();

router.use('/bands', bandRoutes);
router.use('/posts', postRoutes);
router.use('/setlists', setlistRoutes);
router.use('/songs', songRoutes);
router.use('/email', emailRoutes);
router.use('/profiles', profileRoutes);
router.use('/zips', zipRoutes);

// eslint-disable-next-line import/prefer-default-export
export { router };
