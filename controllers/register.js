import path from 'path'
import { fileURLToPath } from 'url'
import passport from 'koa-passport'
import send from 'koa-send'
import bcrypt from 'bcryptjs'
import UsuariosFactory from '../persistence/Factories/UsuariosDAOFactory.js'
const usuariosDAO = UsuariosFactory.getDao()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const register = async (ctx) => {
  await ctx.render('register.html')
}

const registerPost = async (ctx, next) => {
  console.log(ctx.request.body.direccion)

  return passport.authenticate(
    'register',
    (err, user) => {
      if (err) {
        console.log('Error in SignUp: ' + err)
        ctx.redirect('/failregister')
        return
      }
      if (user) {
        ctx.login(user)
        ctx.redirect('/')
      } else {
        console.log('fail')
        ctx.redirect('/register/failregister')
      }
    },
  )(ctx, next)
}


const failregister = async (ctx) => {
  await ctx.render('register-error.ejs')
}

export default { register, failregister, registerPost }
