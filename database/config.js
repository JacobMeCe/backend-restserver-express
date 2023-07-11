
const mongoose = require('mongoose')

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false
        })

        console.log('Base de datos Online');
    } catch (error) {
        console.log(error);
        throw new Error('Error en la base de datos')
    }
}

module.exports = {
    dbConnection,
}