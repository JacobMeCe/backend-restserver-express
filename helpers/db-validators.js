const { Categoria, Usuario, Role, Producto } = require("../models");

const esRolValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
  }
};

const emailExiste = async (email = "") => {
  const existeEmail = await Usuario.findOne({ email });
  if (existeEmail) {
    throw new Error(`El correo: ${email} ya a sido registrado`);
  }
};

const existeUsuarioID = async (id) => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El id no existe: ${id}`);
  }
};

const existeCategoriaPorId = async (id) => {
  const existeCategoria = await Categoria.findById(id);
  if (!existeCategoria) {
    throw new Error(`El id no existe: ${id}`);
  }
};

const existeProductoPorId = async (id) => {
  const existeProducto = await Producto.findById(id);
  if (!existeProducto) {
    throw new Error(`El id no existe: ${id}`);
  }
};

const coleccionesPermitidas = (coleccion = '', colecciones = []) => {

  const incluida = colecciones.includes(coleccion)
  if (!incluida) {
    throw new Error(`La coleccion ${coleccion} no es permitida, ${colecciones}`)
  }

  return true;

}

module.exports = {
  esRolValido,
  emailExiste,
  existeUsuarioID,
  existeCategoriaPorId,
  existeProductoPorId,
  coleccionesPermitidas,
};
