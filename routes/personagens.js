var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var app     = express();
var corpo;

app.use(bodyParser.urlencoded({ extended: true }));

router.post('/', require('connect-ensure-login').ensureLoggedIn(),
(req, res) => {

  var request = require('request');
  var busca = req.body.personagem; 
  var personagem = '&nameStartsWith='+req.body.personagem;
  var limit  = "&limit=5"; //Limit the result 
  var offset = 0; //Skip the specified number 
  
  request('https://gateway.marvel.com:443/v1/public/characters?ts=emerson&apikey=7b0eb4dbf3375d03258105ffa79204ff&hash=b040881fe4b12a2c9dd797071055c52d'+personagem+limit, function (error, response, body) {
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
          //var paginas = new Array("", 0);

          var paginas = [];
          //var paginas = {link: "/personagens/", 
          //               indice: 0};

          for (var i=1; i <= 10; i++){
            //paginas[i].link = "/personagens/"+busca+"/"+i;
            //paginas[i].indice = i;
            paginas.push("/personagens/"+busca+"/"+i);
          }

          res.render('personagens', { title: 'Consulta personagem MARVEL', corpo: corpo.data.results[0].name, 
                                      descricao: corpo.data.results[0].description, imagem: imagem, id: corpo.data.results[0].id,
                                      lista: corpo.data.results, usuario: req.user, paginas:paginas, busca: busca });
        
        
      }, 1000);
    } else { res.send("Personagem não encontrado.") }
    } else { res.send("Servidor ocupado.") }    
  });	
});
module.exports = router;
