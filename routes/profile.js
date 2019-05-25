const express = require('express');
const router = express.Router();

router.get('/', require('connect-ensure-login').ensureLoggedIn(),
(req, res) => {

    //estratégia para garantir que os logins de steam se comportem de maneira uniforme
    //em princípio, criar o próprio objeto user e carregá-lo com os valores de diversas
    //mídias sociais
    if(req.user.id === undefined){
        req.user = {id: req.user._json.steamid, displayName: req.user._json.personaname};
    }

    console.log('usuario: '+req.user);
    res.render('profile', { profile: req.user});
}

)
module.exports = router;