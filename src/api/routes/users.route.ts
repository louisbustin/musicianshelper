import express from 'express';
import controller from '../controllers/user.controller';
import { checkJwt }  from '../authz/check-jwt';
const router = express.Router();


router.get('/', checkJwt, controller.getAll);
router.get('/:userId', controller.getOne);

router.post('/', checkJwt, controller.create);

//should we do put or patch? i guess both?
router.patch('/:userId', checkJwt, controller.update);
router.put('/:userId',  checkJwt, controller.update);

//delete may end up not deleting, but disabling somehow. but for now, here we go
router.delete('/:userId',  checkJwt, controller.delete);

export default router;