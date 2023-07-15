const { response, json } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");

const { generarJWT } = require("../helpers/generarJWT");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    //verificar si el email existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({
        msg: "El usuario y/o contraseña no son correctos -email",
      });
    }

    //si el usuario esta activo
    if (!usuario.status) {
      return res.status(400).json({
        msg: "El usuario y/o contraseña no son correctos -usuario false",
      });
    }

    // vericar contraseña
    const validarPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validarPassword) {
      return res.status(400).json({
        msg: "El usuario y/o contraseña no son correctos -password",
      });
    }

    //generar el jwt
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const googleSingIn = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { name, picture, email } = await googleVerify(id_token);

    let usuario = await Usuario.findOne({ email });
    if (!usuario) {
      const data = {
        name,
        email,
        password: ":D",
        picture,
        google: true,
      };
      usuario = new Usuario(data);
      await usuario.save();
    }

    //Si el usuario en DB 
    if (!usuario.status) {
      return res.status(401).json({
        msg: 'Hable con el administrador, usuario bloqueado'
      })
    }

    //generar jwt
    const token = await generarJWT(usuario.id);


    res.json({
      usuario,
      token,
    });
  } catch (error) {
    json.status(400).json({ ok: false, msg: "El token no se pudo verificar" });
  }
};

module.exports = {
  login,
  googleSingIn,
};
