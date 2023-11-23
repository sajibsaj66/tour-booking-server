import express from 'express';
import { deleteUser, getAllUser, getUser, updateUser } from '../controllers/user.js';
import { verifyAdmin,verifyUser } from '../utils/verifyToken.js';
const router = express.Router();

//user Authentication check
// router.get('/checkAuthentication', verifyToken, (req, res, next) => {
//   res.send('hello user, you are successfully login! ');
// });

//user Authorized  check
// router.get('/checkUser/:id', verifyUser, (req, res, next) => {
//   res.send('hello user, you are update and delete this account! ');
// });

//user Admin   check
// router.get('/checkAdmin/:id', verifyAdmin, (req, res, next) => {
//   res.send('hello admin,you are delete this all account! ');
// });

//UPDATE
router.put('/:id', verifyUser, updateUser);
//DELETE
router.delete('/:id', verifyUser, deleteUser);
//GET
router.get('/:id', verifyUser, getUser);
//GET ALL
router.get('/', verifyAdmin, getAllUser);

export default router;
