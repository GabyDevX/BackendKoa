// import KoaRouter from 'koa-router'
// import session from 'koa-session'
// import passport from 'koa-passport'
// import { Strategy as LocalStrategy } from 'passport-local'
// import bCrypt from 'bcrypt'
// import MongoStore from 'koa-session-mongoose'
// import UsuariosFactory from '../../persistence/Factories/UsuariosDAOFactory.js'

// const router = new KoaRouter()

// const usuariosDAO = UsuariosFactory.getDao()

// // passport configuration
// passport.use(
//   'register',
//   new LocalStrategy(
//     {
//       passReqToCallback: true,
//     },
//     function (req, username, password, done) {
//       const { direccion } = req.body
//       const findOrCreateUser = function () {
//         usuariosDAO
//           .getByUsername(username)
//           .then((user) => {
//             if (user) {
//               console.log('User already exists')
//               done(null, false)
//             } else {
//               const newUser = {
//                 username: username,
//                 password: createHash(password),
//                 direccion: direccion,
//               }
//               usuariosDAO
//                 .save(newUser)
//                 .then((savedUser) => {
//                   done(null, savedUser)
//                 })
//                 .catch((error) => {
//                   console.log('Error in SignUp: ' + error)
//                   done(error)
//                 })
//             }
//           })
//           .catch((error) => {
//             console.log('Error in SignUp: ' + error)
//             done(error)
//           })
//       }
//       process.nextTick(findOrCreateUser)
//     },
//   ),
// )

// passport.use(
//   'login',
//   new LocalStrategy(
//     {
//       passReqToCallback: true,
//     },
//     async (req, username, password, done) => {
//       try {
//         const user = await usuariosDAO.getByUsername(username)
//         if (!user) {
//           console.log('User Not Found with username ' + username)
//           return done(null, false)
//         }
//         if (!validatePassword(user, password)) {
//           console.log('Invalid Password')
//           return done(null, false)
//         }
//         return done(null, user)
//       } catch (error) {
//         console.log(error)
//         return done(error)
//       }
//     },
//   ),
// )

// const validatePassword = (user, password) => {
//   return bCrypt.compareSync(password, user.password)
// }

// var createHash = function (password) {
//   return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null)
// }

// passport.serializeUser((user, done) => {
//   done(null, user._id)
// })

// passport.deserializeUser((id, done) => {
//   usuariosDAO
//     .getById(id)
//     .then((user) => {
//       done(null, user)
//     })
//     .catch((error) => {
//       done(error)
//     })
// })

// // session configuration
// const MONGO_DB_URI = process.env.URL_MONGO
// const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }
// const store = new MongoStore(
//   {
//     url: MONGO_DB_URI,
//     collectionName: 'sessions',
//   },
//   advancedOptions,
// )

// router.keys = ['mysecretkey']
// router.use(session({ store: store }, router))
// router.use(passport.initialize())
// router.use(passport.session())

// export default router
