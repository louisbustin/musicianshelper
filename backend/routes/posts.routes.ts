import express from 'express';
import controller from '../controllers/posts.controller';
import checkJwt from '../authz/check-jwt';

const router = express.Router();

router.get('/top', checkJwt, controller.getTopItems);
router.get('/top/:limit', checkJwt, controller.getTopItems);

router.get('/', checkJwt, controller.getAll);
router.get('/:postId', checkJwt, controller.getOne);
router.post('/', checkJwt, controller.create);

export default router;
