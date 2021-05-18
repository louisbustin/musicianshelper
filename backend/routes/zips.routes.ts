import express from 'express';
import controller from '../controllers/zip.controller';
import checkJwt from '../authz/check-jwt';

const router = express.Router();

router.get('/search/:zip', checkJwt, controller.getByPartial);
router.get('/:zip', checkJwt, controller.getByZip);

export default router;
