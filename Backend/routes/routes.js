'use strict'

const bcrypt = require('bcrypt');
const commentsService = require('../services/commentsService');
const usersService = require('../services/usersService');
const config = require('../configJwt');
const rjwt = require('restify-jwt-community');
const jwt = require('jsonwebtoken');

module.exports = (server, db) => {
  // using restify-jwt to lock down everything except /auth
  server.use(rjwt(config.jwt).unless({
    path: ['/login','/register']
  }));

  //Users
  server.post('/login', (request, response, next) => {
    usersService.login(request.body).then(data => {
      // creating jsonwebtoken using the secret from config.json
      let token = jwt.sign(data[0].dataValues, config.jwt.secret, {
        expiresIn: '15m' // token expires in 15 minutes
      });

      // retrieve issue and expiration times
      let { iat, exp } = jwt.decode(token);
      response.send({ iat, exp, token });
    }).catch(err => {
      response.send(503, resp(true, 'failed', err));
    })
    next();
  });

  server.get('/users', (request, response, next) => {
    usersService.getUsers().then(data => {
      response.send(200, data);
    }).catch(err => {
      response.send(503, resp(true, 'failed', err));
    })
    next();
  });

  server.get('/user/:id', (request, response, next) => {
    usersService.getUserById(request.params).then(data => {
      response.send(200, data);
    }).catch(err => {
      response.send(400, err);
    })
    next();
  });

  server.post('/register', (request, response, next) => {
    usersService.insertUser(request.params).then(data => {
      response.send(200, 'Utente inserito con successo');
    }).catch(err => {
      response.send(400, err);
    })
    next();
  });

  server.put('/users/:id', (request, response, next) => {
    usersService.updateUser(request.params).then(data => {
      response.send(200, 'Utente modificato con successo');
    }).catch(err => {
      response.send(400, err);
    })
    next();
  });

  server.del('/users/:id', (request, response, next) => {
    usersService.deleteUser(request.params).then(data => {
      response.send(200, resp(true, 'Utente eliminato con successo', data));
    }).catch(err => {
      response.send(400, resp(false, 'failed', err));
    })
    next();
  });

  //Comments
  server.get('/comments', (request, response, next) => {
    commentsService.getComments().then(data => {
      response.send(200, data);
    }).catch(err => {
      response.send(503, resp(true, 'failed', err));
    })
    next();
  });

  server.get('/comments/:id', (request, response, next) => {
    commentsService.getCommentsByUserId(request.params).then(data => {
      response.send(200, data);
    }).catch(err => {
      response.send(400, err);
    })
    next();
  });

  server.get('/comment/:id', (request, response, next) => {
    commentsService.getCommentById(request.params).then(data => {
      response.send(200, data);
    }).catch(err => {
      response.send(400, err);
    })
    next();
  });

  server.post('/comments', (request, response, next) => {
    request.body.created_at = new Date();
    commentsService.insertComment(request.body).then(data => {
      response.send(200, 'Commento inserito con successo');
    }).catch(err => {
      response.send(400, err);
    })
    next();
  });

  server.put('/comments/:id', (request, response, next) => {
    commentsService.updateComment(request.params).then(data => {
      response.send(200, 'Commento modificato con successo');
    }).catch(err => {
      response.send(400, err);
    })
    next();
  });

  server.del('/comments/:id', (request, response, next) => {
    commentsService.deleteComment(request.params).then(data => {
      response.send(200, resp(true, 'Commento eliminato con successo', data));
    }).catch(err => {
      response.send(400, resp(false, 'failed', err));
    })
    next();
  });

  const checkPassword = (pwd1, pwd2) => {
    return bcrypt.compareSync(pwd1, pwd2);
  }

  const hashPassword = (pwd) => {
    return bcrypt.hashSync(pwd, bcrypt.genSaltSync());
  }

  function resp(success, msg, data) {
    const response = {
      success: success,
      message: msg,
      details: data
    }
    return response;
  }
};