const logout = async (ctx) => {
  if (ctx.isAuthenticated()) {
    ctx.logout()
    console.log(`logged out`)
    await ctx.render('logout', { userLogout, newRoute: '/login' })
  }
}

export default { logout }
