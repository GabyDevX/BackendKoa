import passport from 'koa-passport'
// CONNECT DB
import MongoStore from 'koa-session-mongoose'
import bCrypt from 'bcrypt'

import UsuariosFactory from '../../persistence/Factories/UsuariosDAOFactory.js'
import { Strategy as LocalStrategy } from 'passport-local'

const usuariosDAO = UsuariosFactory.getDao()

const options = {}

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser((id, done) => {
  usuariosDAO
    .getById(id)
    .then((user) => {
      done(null, user)
    })
    .catch((error) => {
      done(error)
    })
})

const validatePassword = (user, password) => {
  return bCrypt.compareSync(password, user.password)
}

passport.use(
  new LocalStrategy(options, (username, password, done) => {
    usuariosDAO
      .getByUsername(username)
      .then((user) => {
        if (!user) {
          console.log('User Not Found with username ' + username)
          return done(null, false)
        }
        if (!validatePassword(password, user.password)) {
          return done(null, false)
        } else {
          return done(null, user)
        }
      })
      .catch((err) => {
        return done(err)
      })
  }),
)


