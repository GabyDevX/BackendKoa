import Router from 'koa-router'
import controller from '../controllers/randoms.js'
const router = Router()

router.get(`/randoms`, controller.randomsGet)

router.post(`/randoms`, controller.randomsPost)

export default router
