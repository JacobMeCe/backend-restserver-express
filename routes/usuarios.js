const { Router } = require("express");
const { check } = require("express-validator");

const {
  esRolValido,
  emailExiste,
  existeUsuarioID,
} = require("../helpers/db-validators");

const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
} = require("../controllers/usuarios");

const {
  validarCampos,
  validarJWT,
  esAdminRol,
  tieneRole,
} = require('../middlewares')

const router = Router();

router.get("/", usuariosGet);

router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check(
      "password",
      "La contraseña tiene que tener más de 6 caracteres"
    ).isLength({ min: 6 }),
    check("email", "El correo no es valido").isEmail(),
    check("email").custom(emailExiste),
    check("rol").custom(esRolValido),
    validarCampos,
  ],
  usuariosPost
);

router.put(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioID),
    check("rol").custom(esRolValido),
    validarCampos,
  ],
  usuariosPut
);

router.patch("/", usuariosPatch);

router.delete(
  "/:id",
  [
    validarJWT,
    tieneRole('ADMIN_ROL', 'VENTAS_ROL'),
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioID),
    validarCampos,
  ],
  usuariosDelete
);

module.exports = router;
