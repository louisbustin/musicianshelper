import express from 'express';

//import postRoutes from './post.route';
//import userRoutes from './user.route';

const router = express.Router();

router.get('/', function (req, res) {
  res.send('API works!');
});

//all APIs for Posts
//router.use('/posts', postRoutes);
//router.use('/users', userRoutes);

export { router };
