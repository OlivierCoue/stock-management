# @stock-management/api-server

### How to start the server

Start docker:

`yarn run docker:development up -d`

Start the server (watch mode / auto reload when you change the code):

`yarn run start:development`

Then the server should be available on `localhost:3000` (if you didn't change the config in your .env file). You can find the GraphQl playground on `localhost:3000/graphql`.

You can find an interface to manage the database on `localhost:3002`, use the following information to connect:

- System: PostgresSQL
- Server: postgres
- Username: admin
- Password: password
- Database: leave blank  

