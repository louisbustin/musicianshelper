import express from 'express';
import controller from '../controllers/setlist.controller';
import { checkJwt }  from '../authz/check-jwt';
const router = express.Router();


router.get('/', checkJwt, controller.getAll);
router.get('/byBand/:bandId', checkJwt, controller.byBand);
router.get('/:setlistId', checkJwt, controller.getOne);

router.post('/', checkJwt, controller.create);

//should we do put or patch? i guess both?
router.patch('/:setlistId', checkJwt, controller.update);
router.put('/:setlistId',  checkJwt, controller.update);

//delete may end up not deleting, but disabling somehow. but for now, here we go
//router.delete('/:userId',  checkJwt, controller.delete);

export default router;