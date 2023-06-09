import Router from 'koa-router'
// import authRouter from './midlewares/auth.js'
import controller from '../controllers/register.js'

const router = new Router()

// router.use(authRouter)

router.get('/', controller.register)

router.post('/', controller.registerPost)

router.get('/failregister', controller.failregister)

export default router
