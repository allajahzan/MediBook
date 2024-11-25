import { Router } from "express";
import { getClients } from '../controller/admin'

const router = Router()

// get users list
router.get('/clients', getClients)


export { router as adminRoute }