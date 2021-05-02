import express from 'express';
import controller from '../controllers/email.controller';
import checkJwt from '../authz/check-jwt';

const router = express.Router();

router.post('/', checkJwt, controller.queueEmail);

export default router;
