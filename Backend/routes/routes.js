'use strict'

const bcrypt = require('bcrypt');
const commentsService = require('../services/commentsService');
const usersService = require('../services/usersService');

module.exports = (server, db) => {
  //Users
  server.post('/login', (request, response, next) => {
    console.log("login",request.body);
    usersService.login(request.body).then(data => {
      response.send(200, resp(true, 'success', data));
    }).catch(err => {
      response.send(503, resp(true, 'failed', err));
    })
    next();
  });

  server.get('/users', (request, response, next) => {
    console.log("get users");
    usersService.getUsers().then(data => {
      response.send(200, data);
    }).catch(err => {
      response.send(503, resp(true, 'failed', err));
    })
    next();
  });

  server.get('/user/:id', (request, response, next) => {
    console.log("getbyId");
    usersService.getUserById(request.params).then(data => {
      response.send(200, data);
    }).catch(err => {
      response.send(400, err);
    })
    next();
  });

  server.post('/users', (request, response, next) => {
    console.log("insert");
    usersService.insertUser(request.params).then(data => {
      response.send(200, 'Utente inserito con successo');
    }).catch(err => {
      response.send(400, err);
    })
    next();
  });

  server.put('/users/:id', (request, response, next) => {
    console.log("update");
    usersService.updateUser(request.params).then(data => {
      response.send(200, 'Utente modificato con successo');
    }).catch(err => {
      response.send(400, err);
    })
    next();
  });

  server.del('/users/:id', (request, response, next) => {
    console.log("delete");
    usersService.deleteUser(request.params).then(data => {
      response.send(200, resp(true, 'Utente eliminato con successo', data));
    }).catch(err => {
      response.send(400, resp(false, 'failed', err));
    })
    next();
  });

  //Comments
  server.get('/comments', (request, response, next) => {
    console.log("get comments");
    commentsService.getComments().then(data => {
      response.send(200, data);
    }).catch(err => {
      response.send(503, resp(true, 'failed', err));
    })
    next();
  });

  server.get('/comments/:id', (request, response, next) => {
    console.log("getbyUserId");
    commentsService.getCommentsByUserId(request.params).then(data => {
      response.send(200, data);
    }).catch(err => {
      response.send(400, err);
    })
    next();
  });

  server.get('/comment/:id', (request, response, next) => {
    console.log("getbyId");
    commentsService.getCommentById(request.params).then(data => {
      response.send(200, data);
    }).catch(err => {
      response.send(400, err);
    })
    next();
  });

  server.post('/comments', (request, response, next) => {
    console.log("insert body", request.body);
    console.log("insert params", request.params);

    request.body.created_at = new Date();
    commentsService.insertComment(request.body).then(data => {
      response.send(200, 'Commento inserito con successo');
    }).catch(err => {
      response.send(400, err);
    })
    next();
  });

  server.put('/comments/:id', (request, response, next) => {
    console.log("update");
    commentsService.updateComment(request.params).then(data => {
      response.send(200, 'Commento modificato con successo');
    }).catch(err => {
      response.send(400, err);
    })
    next();
  });

  server.del('/comments/:id', (request, response, next) => {
    console.log("delete");
    commentsService.deleteComment(request.params).then(data => {
      response.send(200, resp(true, 'Commento eliminato con successo', data));
    }).catch(err => {
      response.send(400, resp(false, 'failed', err));
    })
    next();
  });


  // server.post('/login', (req, res) => {
  //   console.log("login");
  //   db.users.findAll({ where: { "email": req.params.email } })
  //     .then(user => {
  //       if (checkPassword(req.params.password, user[0].dataValues.password)) {
  //         console.log("Passwords match");// Passwords match
  //       }
  //       else {
  //         console.log("Passwords don't match");
  //         // return next(core.errorToRestifyError({ code: 400, reason: 'login errato (password non corretta)' }));
  //       }
  //       res.json(user);
  //     });
  // });

  // server.get('/users', (req, res) => {
  //   db.users.findAll({
  //     include: [
  //       {
  //         model: db.comments
  //       }
  //     ]
  //   }).then(users => {
  //     const resObj = users.map(user => {

  //       //tidy up the user data
  //       return Object.assign(
  //         {},
  //         {
  //           user
  //         }
  //       )
  //     });
  //     res.json(resObj)
  //   });
  // });

  // server.get('/user/:id', (req, res) => {
  //   console.log("getUserById");
  //   db.users.findAll({ where: { "id": req.params.id } })
  //     .then(user => {
  //       res.json(user);
  //     });
  // });

  // server.post('/users', (req, res) => {
  //   console.log("insertUser");
  //   req.params.password = hashPassword(req.params.password);
  //   db.users.create(req.params)
  //     .then(user => {
  //       res.json(user);
  //     });
  // });

  // server.put('/users/:id', (req, res) => {
  //   console.log("update user", req.params.id);
  //   db.users.update(req.params, { where: { "id": req.params.id } })
  //     .then(user => {
  //       res.json(user);
  //     });
  // });

  // server.del('/users/:id', (req, res) => {
  //   console.log("delete user");
  //   db.users.destroy({ where: { "id": req.params.id } })
  //     .then(user => {
  //       res.json(user);
  //     });
  // });








  // server.get('/comments', (req, res) => {
  //   db.comments.findAll({
  //     include: [
  //       {
  //         model: db.users
  //       }
  //     ]
  //   }).then(comments => {
  //     const resObj = comments.map(comment => {

  //       //tidy up the user data
  //       return Object.assign(
  //         {},
  //         {
  //           comment
  //         }
  //       )
  //     });
  //     res.json(resObj)
  //   });
  // });

  // server.get('/comment/:id', (req, res) => {
  //   console.log("getCommentById");
  //   db.comments.findAll({ where: { "id": req.params.id } })
  //     .then(comment => {
  //       res.json(comment);
  //     });
  // });

  // server.get('/comments/:id', (req, res) => {
  //   console.log("getCommentsByUserId");
  //   db.comments.findAll({ where: { "userId": req.params.userId } })
  //     .then(comment => {
  //       res.json(comment);
  //     });
  // });

  // server.post('/comments', (req, res) => {
  //   console.log("insertComment");
  //   req.params.created_at = new Date();
  //   db.comments.create(req.params)
  //     .then(comment => {
  //       res.json(comment);
  //     });
  // });

  // server.put('/comments/:id', (req, res) => {
  //   console.log("update comment", req.params.id);
  //   db.comments.update(req.params, { where: { "id": req.params.id } })
  //     .then(comment => {
  //       res.json(comment);
  //     });
  // });

  // server.del('/comments/:id', (req, res) => {
  //   console.log("delete comment");
  //   db.comments.destroy({ where: { "id": req.params.id } })
  //     .then(res => resolve(res))
  //   // ).catch(err => {
  //   //     console.log(`errore nell'eliminare un commento: ${err};`);
  //   //     reject(err);
  //   //   });
  // });

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