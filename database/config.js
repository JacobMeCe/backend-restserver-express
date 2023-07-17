const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Conexion de base de datos exitosa");
  } catch (error) {
    console.log(error);
    throw new Error("Error en la base de datos");
  }
};

module.exports = {
  dbConnection,
};
