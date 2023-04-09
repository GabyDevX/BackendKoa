import path from 'path'
import { fileURLToPath } from 'url'
import passport from 'koa-passport'
import send from 'koa-send'
const bcrypt = require('bcryptjs')
import UsuariosFactory from '../persistence/Factories/UsuariosDAOFactory.js'
const usuariosDAO = UsuariosFactory.getDao()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const register = async (ctx) => {
  await send(ctx, '../public/views/register.html', { root: __dirname })
}

const registerPost = async (ctx, next) => {
  const user = await addUser(ctx.request.body)
  return passport.authenticate('register', (err, user, info, status) => {
    if (user) {
      ctx.login(user)
      ctx.redirect('/')
    } else {
      ctx.redirect('/failregister')
    }
  })(ctx)
}

const failregister = async (ctx) => {
  await ctx.render('register-error')
}

export default { register, failregister, registerPost }

const findOrCreateUser = ({ username, password, direccion }) => {
  usuariosDAO
    .getByUsername(username)
    .then((user) => {
      if (user) {
        console.log('User already exists')
      } else {
        const salt = bcrypt.genSaltSync()
        const hash = bcrypt.hashSync(password, salt)
        const newUser = {
          username: username,
          password: hash,
          direccion: direccion,
        }
        usuariosDAO
          .save(newUser)
          .then((savedUser) => {
            console.log('registered')
          })
          .catch((error) => {
            console.log('Error in SignUp: ' + error)
          })
      }
    })
    .catch((error) => {
      console.log('Error in SignUp: ' + error)
    })
}
