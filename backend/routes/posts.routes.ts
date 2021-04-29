import express from 'express';
import controller from '../controllers/posts.controller';
import checkJwt from '../authz/check-jwt';

const router = express.Router();

router.get('/top', controller.getTopItems);
router.get('/top/:limit', controller.getTopItems);

router.get('/', controller.getAll);
router.get('/:postId', controller.getOne);
router.post('/', checkJwt, controller.create);

export default router;
