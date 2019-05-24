var express = require('express');
var router = express.Router();
var app     = express();

router.get('/:id', require('connect-ensure-login').ensureLoggedIn(),
(req, res) => {
      
  var request = require('request');
  const id = req.params.id+'?ts=emerson&apikey=7b0eb4dbf3375d03258105ffa79204ff&hash=b040881fe4b12a2c9dd797071055c52d';
  console.log('id '+id);
  request('https://gateway.marvel.com/v1/public/characters/'+id, function (error, response, body) {
    console.log('error:', error); 
    console.log('statusCode:', response && response.statusCode); 
    //console.log('body:', body); 
    console.log('usuario: '+req.user);
    corpo = JSON.parse(body);
    
    //verifica se o servidor conseguiu responder
    if (parseInt(response.statusCode) == 200){
      //verifica se encontrou o  personagem
      if (parseInt(corpo.data.count) > 0) {
        setTimeout(function() {

          console.log('id:', corpo.data.results[0].id);
          console.log('nome:', corpo.data.results[0].name);
          console.log('descricao:', corpo.data.results[0].description);
          imagem = corpo.data.results[0].thumbnail.path+'.'+corpo.data.results[0].thumbnail.extension;
          console.log('imagem:', imagem);
          res.render('personagem', { title: 'Consulta personagem MARVEL', corpo: corpo.data.results[0].name, 
                                      descricao: corpo.data.results[0].description, imagem: imagem, id: corpo.data.results[0].id,
                                      usuario: req.user });
        
        
      }, 1000);
    } else { res.send("Personagem não encontrado.") }
    } else { res.send("Servidor ocupado.") }    
  });

	
});
module.exports = router;
