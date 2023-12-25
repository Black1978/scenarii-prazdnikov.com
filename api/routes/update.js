import express from 'express'
import { avatar } from '../controllers/avatar.js'

const router = express.Router()
router.put('/avatar', avatar)



export default router