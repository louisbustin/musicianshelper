import express from 'express';
import controller from '../controllers/profile.controller';
import checkJwt from '../authz/check-jwt';

const router = express.Router();

router.get('/', checkJwt, controller.getOneByCurrentUser);
router.get('/:profileId', checkJwt, controller.getOneByProfileId);

router.post('/', checkJwt, controller.create);

router.patch('/:bandId', checkJwt, controller.update);
router.put('/:bandId', checkJwt, controller.update);

// delete may end up not deleting, but disabling somehow. but for now, here we go
// router.delete('/:userId',  checkJwt, controller.delete);

export default router;
