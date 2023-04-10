import passport from 'koa-passport'
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
  console.log(user)
  console.log(password)
  return bCrypt.compareSync(password, user.password)
}

passport.use(
  'register',
  new LocalStrategy(options, (username, password, done) => {
    usuariosDAO
      .getByUsername(username)
      .then((user) => {
        if (user) {
          console.log('User already exists')
          return done(null, false)
        } else {
          const salt = bCrypt.genSaltSync(10); // 10 is the number of rounds

          const hash = bCrypt.hashSync(password, salt)

          const newUser = {
            username: username,
            password: hash,
            direccion: 'prueba',
            // direccion: ctx.request.body.direccion,
          }
          usuariosDAO
            .save(newUser)
            .then((savedUser) => {
              return done(null, savedUser)
            })
            .catch((error) => {
              console.log('Error in SignUp: ' + error)
              return done(error)
            })
        }
      })
      .catch((error) => {
        console.log('Error in SignUp: ' + error)
        done(error)
      })
  }),
);


passport.use(
  'login',
  new LocalStrategy(options, (username, password, done) => {
    usuariosDAO
      .getByUsername(username)
      .then((user) => {
        if (!user) {
          console.log('User Not Found with username ' + username)
          return done(null, false)
        }
        if (!validatePassword(user, password)) {
          return done(null, false)
        } else {
          return done(null, user)
        }
      })
      .catch((err) => {
        console.log('entre al error')
        return done(err)
      })
  }),
)
