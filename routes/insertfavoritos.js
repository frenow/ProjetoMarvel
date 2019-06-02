var express = require('express');
var router = express.Router();
const Favoritos = require('../store/favoritos');
var bodyParser = require('body-parser');
var app     = express();

app.use(bodyParser.urlencoded({ extended: true }));

/* GET home page. */
router.get('/', require('connect-ensure-login').ensureLoggedIn(),
(req, res) => {
    var lista_favoritos = [];
    
    Favoritos.find({ id_usuario: req.user.id }).then(function (favoritos) {
        lista_favoritos = favoritos;

      res.render('favoritos', { lista_favoritos, usuario: req.user });
    })

});

/* GET home page. */
router.get('/:id', require('connect-ensure-login').ensureLoggedIn(),
(req, res) => {    
    Favoritos.findOneAndRemove({ id_usuario: req.user.id, id_personagem: req.params.id }).then(function (favoritos) {
        res.redirect('/insertfavoritos');
    })

});

router.post('/', require('connect-ensure-login').ensureLoggedIn(),
(req, res) => {
    var newFavorito = new Favoritos({
        id_usuario : req.user.id,               //usuario id do passportjs facebook
        id_personagem : req.body.id,
        nome_personagem : req.body.name,
    });
    console.log('obj: '+newFavorito);
    newFavorito.save((err, favorito) => {
        if (err) {
            res.json({ success: false, message: 'falhaz' + err });
        } else {
            res.redirect('/insertfavoritos');
        }
    });    

});
module.exports = router;
