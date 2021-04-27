import express from 'express';
import controller from '../controllers/setlist.controller';
import checkJwt from '../authz/check-jwt';

const router = express.Router();

router.get('/', checkJwt, controller.getAll);
router.get('/:postId', checkJwt, controller.getOne);

export default router;
