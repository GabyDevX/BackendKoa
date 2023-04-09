import { User } from '../models/usuario.js'

const getUser = async (ctx, next) => {
  const usuario = await User.findOne({ username: ctx.state.user.username })

  ctx.state.usuario = usuario

  await next()
}

export default getUser
