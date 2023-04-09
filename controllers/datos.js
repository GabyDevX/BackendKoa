import ApiProductosMock from '../api/productos.js'
import service from '../services/datos.js'

const apiProductos = new ApiProductosMock()

const datos = async (ctx) => {
  //Crear ProductosFaker
  const productosFaker = await apiProductos.popular()

  //Sacar a service
  const usuario = service.getUser

  await ctx.render('inicio', {
    datos: usuario,
    productos: productosFaker,
  })
}

export default { datos }
