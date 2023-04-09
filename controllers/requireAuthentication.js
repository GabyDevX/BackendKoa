const requireAuthentication = (ctx, next) => {
  if (!ctx.isAuthenticated()) {
    ctx.redirect('/login')
  } else {
    return next()
  }
}

export default { requireAuthentication }
