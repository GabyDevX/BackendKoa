import path from 'path'
import { fileURLToPath } from 'url'
import passport from 'koa-passport'
import send from 'koa-send'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const login = async (ctx, next) => {
  if (ctx.isAuthenticated()) {
    ctx.redirect('/datos')
  } else {
    const loginPagePath = path.resolve(
      __dirname,
      '..',
      'public',
      'views',
      'login.html',
    )
    await send(ctx, loginPagePath)
  }
}

const loginPost = passport.authenticate('login', (err, user, info, status) => {
  if (user) {
    ctx.login(user)
    ctx.redirect('/datos')
  } else {
    ctx.redirect('/faillogin')
  }
})(ctx)

const faillogin = async (ctx, next) => {
  await ctx.render('login-error')
}

export default { login, faillogin, loginPost }
