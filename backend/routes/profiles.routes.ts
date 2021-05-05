import express from 'express';
import multer from 'multer';
import controller from '../controllers/profile.controller';
import checkJwt from '../authz/check-jwt';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/', checkJwt, controller.getOneByCurrentUser);
router.get('/:profileId', checkJwt, controller.getOneByProfileId);

router.post('/', checkJwt, controller.create);

router.patch('/:profileId', checkJwt, controller.update);
router.put('/:profileId', checkJwt, controller.update);

router.post('/profilepic', checkJwt, upload.single('profilepic'), controller.uploadProfilePic);

// delete may end up not deleting, but disabling somehow. but for now, here we go
// router.delete('/:userId',  checkJwt, controller.delete);

export default router;
