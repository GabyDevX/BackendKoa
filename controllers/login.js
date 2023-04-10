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
    await ctx.render('login.html')
  }
}

const loginPost = async (ctx, next) => {
  return passport.authenticate('login', (err, user, info, status) => {
    if (user) {
      ctx.login(user)
      console.log('success')
      ctx.redirect('/datos')
    } else {
      console.log('fail')
      ctx.redirect('/faillogin')
    }
  })(ctx, next)
}

const faillogin = async (ctx, next) => {
  await ctx.render('login-error.ejs')
}

export default { login, faillogin, loginPost }
