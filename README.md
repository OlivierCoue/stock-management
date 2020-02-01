# stock-management


### Installation

Requirements:
* docker and docker-compose [install](https://docs.docker.com/compose/install/)
* nodejs >=10.16 [install](https://nodejs.org/en/)
* yarn >=1.16 [install](https://legacy.yarnpkg.com/en/docs/install)

We first need to install the dependencies.

```bash

cd stock-management

yarn install
```

Then we have to run 3 process in order to start the application, the `api server`, the `web app` and the `api client` (this part only have to be built once it doesn't actually need to be running).

Start the server: 
```
cd packages/api-server
yarn run docker:development up -d
yarn run start:development
```

Start the api client:
```
cd packages/api-client
yarn run start:development
```

Start the web app:
```
cd packages/web-app
yarn run start:development
```

Multiple processes are listening on different ports:
   *  http://0.0.0.0:3002 Adminder interface to manage en see the database, default credentials are System: PostgreSQL | Server: postgres | Username: admin | Password: password. Those can be updated in the .env file at the root of the project.
   *  http://0.0.0.0:3000 Is the endpoint of the server api, in development mode it shows the GraphQL playground on the path /graphql where you can try out query, mutation and most importantly browse the documentation and the schema of the api.
   *  http://0.0.0.0:8080 Is the endpoint of the web app where you can access to the "real" application.
   
All those ports are default values (so is the 0.0.0.0 as host) and can be updated in the .env file at the root of the project

### Create Mock data

In order to create mock data for testing an be able to connect to the application (by the default there is no user so you cannot connect) you have to start the api server and go to the GraphqQL playground at http://0.0.0.0:3000/graphql. Once here you just have to write:
```
mutation {
  Mock_createMock
}
```
on the left side of the window, then you can click the run button at the top center. Once done, you can go to the web app at http://0.0.0.0:8080 and connect with de following credentials: 
* email: olivier28.coue@gmail.com
* password: test

### Testing

Eslint, prettier, stylelint are automatically run when you commit using husky hooks but you can manually run them by running the command `yarn run test` at the root of the project.

Concerning unit tests, you need to manually run them by going to `cd packages/api-server` and running the command `yarn run run:test`. WARNING : This command will empty the database and fill it with testing data.  

### Contributors

- Olivier Coué
- Damien Maestracci
