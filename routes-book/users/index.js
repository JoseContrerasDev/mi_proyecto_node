import express from 'express'
import { deleteUser, getAllUsers, getUserByToken, updateUser } from '../../controllers/userController.js'
import { authMiddleWare } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.use("", authMiddleWare)

router.get('/', getAllUsers)
router.get('/details', getUserByToken)
router.put('/details', updateUser)
router.delete('/details', deleteUser)


export default router