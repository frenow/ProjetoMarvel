const mongoose = require('mongoose')

const favoritosSchema = new mongoose.Schema({
    id_usuario: {
        type: Number
    },    
    id_personagem: {
        type: Number
    },
    nome_personagem: {
        type: String
    },
})

const Favoritos = mongoose.model('Favoritos', favoritosSchema);
module.exports = Favoritos;
