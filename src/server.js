const Hapi = require('@hapi/hapi');
const { routes } = require('./routes');

const init = async () => {
    const server = Hapi.server({
        port: 5000,
        host: 'localhost', //process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
        routes: {
          cors: {
            origin: ['*'],
          },
        },
      });

    server.route(routes);

    await server.start();
    console.log(`Server Sedang Berjalan Di ${server.info.uri}`)
};

//test commit
init();

/*
Ubah script run di package.json menjadi:
"start-prod": "NODE_ENV=production node ./src/server.js"
"start-dev": "nodemon ./src/server.js",
*/