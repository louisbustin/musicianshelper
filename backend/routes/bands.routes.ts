import express from 'express';
import controller from '../controllers/band.controller';
import checkJwt from '../authz/check-jwt';

const router = express.Router();

router.get('/', checkJwt, controller.getAll);
// router.get('/:userId', checkJwt, controller.getOne);

router.post('/', checkJwt, controller.create);

// should we do put or patch? i guess both?
router.patch('/:bandId', checkJwt, controller.update);
router.put('/:bandId', checkJwt, controller.update);

// delete may end up not deleting, but disabling somehow. but for now, here we go
// router.delete('/:userId',  checkJwt, controller.delete);

export default router;
