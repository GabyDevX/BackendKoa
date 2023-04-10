const logout = async (ctx) => {
  let userLogout = ctx.state.user[0].username
  if (ctx.isAuthenticated()) {
    // ctx.session = null // destroy session by setting session cookie to null
    ctx.logout()
    console.log(`logged out`)
    await ctx.render('logout', { userLogout, newRoute: '/login' })
  }
}

export default { logout }
