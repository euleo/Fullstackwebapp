'use strict'

const routes = [
  require('./routes')
];

// Add access to the server and db objects to each route
module.exports = function router(server, db) {
  return routes.forEach((route) => {
    route(server, db);
  });
};