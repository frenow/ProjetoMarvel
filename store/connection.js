const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://mongouser:mongouser@cluster0-3dent.mongodb.net/test?retryWrites=true';
const openConnection = () => mongoose.connect(connectionString)

module.exports = {
    openConnection,
}