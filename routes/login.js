import Router from 'koa-router'
import controller from '../controllers/login.js'

const router = Router()

router.get('/', controller.login)

router.get('/faillogin', controller.faillogin)

router.post('/', controller.loginPost)

export default router
