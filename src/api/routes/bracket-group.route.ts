import express from 'express';
import controller from '../controllers/bracket-group.controller';
import { checkJwt }  from '../authz/check-jwt';
const router = express.Router();


router.get('/', checkJwt, controller.getAll);
router.get('/:bracketGroupId', checkJwt, controller.getOne);
router.get('/byowner/:ownerId', checkJwt, controller.getAllByOwnerId);

router.post('/', checkJwt, controller.create);

//should we do put or patch? i guess both?
router.patch('/:bracketGroupId', checkJwt, controller.update);
router.put('/:bracketGroupId',  checkJwt, controller.update);

//delete may end up not deleting, but disabling somehow. but for now, here we go
router.delete('/:bracketGroupId',  checkJwt, controller.delete);

export default router;