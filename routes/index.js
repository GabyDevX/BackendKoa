import Router from 'koa-router'
// import authRouter from './midlewares/auth.js'
import datosRouter from './datos.js'
import infoRouter from './info.js'
import loginRouter from './login.js'
import logoutRouter from './logout.js'
import randomsRouter from './randoms.js'
import productosRouter from './productos.js'
// import productosGraphQLRouter from "./productosGraphQL.js";
import registerRouter from './register.js'
import controller from '../controllers/index.js'

const router = new Router()

/////////////////Authenticate//////////////////////
import session from 'koa-session'
import passport from 'koa-passport'
import bodyParser from 'koa-bodyparser'
router.keys = ['super-secret-key']
// router.use(session(router))

router.use(bodyParser())

import './midlewares/authKoa.js'

// router.use(session({ maxAge: 60000 }, router))

router.use(passport.initialize())
router.use(passport.session())

///////////////////////////////////////////////////

router.all('/', controller.index)
// router.all('/auth', authRouter.routes())
router.all('/datos', datosRouter.routes())
router.all('/info', infoRouter.routes())
router.use('/login', loginRouter.routes())
router.all('/logout', logoutRouter.routes())
router.use('/register', registerRouter.routes())
router.use('/api', productosRouter.routes())
// router.all("/graphql", productosGraphQLRouter.routes());
router.all('/api', randomsRouter.routes())

export default router
