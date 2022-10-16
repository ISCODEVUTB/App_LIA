const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        mongoose.connect(process.env.MONGO_DB);
        console.log('DB online');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inicializar DB');
    }
}
module.exports = {
    dbConnection
}