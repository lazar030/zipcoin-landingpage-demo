# Communication

## Quickstart

`npm i && npm run fixuws`
`npm start`

## Initial setup


_Install Sequelize CLI_

`npm install -g sequelize-cli`

_Setup DB_

`createuser --superuser zkoin`

`createdb communication`

`sequelize db:migrate`

_Reset DB_

`sequelize db:migrate:undo:all`

`sequelize db:migrate`

## dotenv configuration

[dotenv](https://github.com/motdotla/dotenv) can be used to start server locally as all configuration is in environment variables: 

`node -r dotenv/config server/main.js`

Just create a **.env** file in repo folder and populate with configuration.

```
# app
PORT=8055
API_NAME=Communication API v1
API_VERSION=1.0.0-alpha
API_DESCRIPTION="Communication API"
API_PRODUCT_VERSION=1.0.0-alpha
NODE_ENV=development
LOG_LEVEL=trace
# request throttling
THROTTLE_BURST=10
THROTTLE_PERIOD=5s
# database
DATABASE_URL=postgresql://localhost/communication
DATABASE_SEQUELIZE_DIALECT=postgres
DATABASE_SEQUELIZE_SEEDER_STORAGE=sequelize
# blockchain
BLOCKCHAIN_ENABLED=true
BLOCKCHAIN_DEFAULT_DONATE_TOKENS=10000
BLOCKCHAIN_ENODE_RPC_URL=http://host:port
BLOCKCHAIN_MAIN_ENODE_RPC_URL=http://host:port
BLOCKCHAIN_CONTRACT_COMMISSION=0.01
BLOCKCHAIN_UNLOCK_TIME=10000
```

## Running unit tests

`npm install --global mocha`

Run `mocha test` to execute the mocha tests via [mocha](https://mochajs.org/#getting-started).
