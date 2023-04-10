import { User } from '../models/usuario.js'

const getUser = async (ctx) => {
  const usuario = await User.findOne({ username: ctx.state.user[0].username })

  ctx.state.usuario = usuario

  return usuario
}

export default { getUser }
