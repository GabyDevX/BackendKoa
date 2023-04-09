import Router from 'koa-router'
import controller from '../controllers/login.js'
import passport from 'koa-passport'
//import authRouter from './midlewares/auth.js'

const router = Router()

//router.use(authRouter) // pass middleware function instead of invoking it

router.get('/login', controller.login)
router.post('/login', controller.loginPost)
router.get('/faillogin', controller.faillogin)

export default router
