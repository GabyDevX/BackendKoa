import Router from 'koa-router'
import controller from '../controllers/datos.js'
import controllerAuth from '../controllers/requireAuthentication.js'

const router = new Router()

router.get('/datos', controllerAuth.requireAuthentication, controller.datos)

export default router
