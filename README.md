#  ERC SANDBOX

A suite of tools that allows you to spin up a sandbox / dev space for dapps using ERC-721 tokens - or any solidity / EVM logic - and deploy to production with ease.

<img src="https://raw.githubusercontent.com/kittyInternational/erc-sandbox/main/client/public/images/docs/chainfaces-example1.png" style="max-width: 520px">
<img src="https://raw.githubusercontent.com/kittyInternational/erc-sandbox/main/client/public/images/docs/kitty-family-example1.png" style="max-width: 520px">
<img src="https://raw.githubusercontent.com/kittyInternational/erc-sandbox/main/client/public/images/docs/the-paddock-example1.png" style="max-width: 520px">

_Chainfaces full stack dapp example_

### Features
- front end (react) dapp with metamask login flow, (login secure) chat room and (live) block height example
- web3 enabled back end api & chain reporting tool: select which contract you want to scrape with some minimal config and you will be collecting the data within minutes
- a modular approach allows for creating dapps that report on multiple contracts simultaneously: even with their own auth and chatroom systems 🙀
- all data is collected from the blockchain and has no 'web2' dependencies - don't trust... verify!
- docs that take a cookbook approach to all the many and various things you might want to do in a dapp

## Requirements

You will need to be able to run docker containers locally: https://www.docker.com/get-started/

Please don't be put off if you haven't used Docker before! Our tutorials are aimed at all levels of coder experience and all the commands needed will be clearly explained. This is the only requirement though. Docker will be "wrapping" our (2) containers and installing everything we need in them.

## Setup:

There are 2 docker containers that need to be running to start working with the sandbox:

### API:

Create a `.env` file in the /server directory and add the following env vars:

```
JWT_SECRET=any_secure_password
MONGO_LOCAL_DIR=/your_local_mongodb_persistence_directory
NODE_ENV=DEVELOPMENT
ORIGIN=http://localhost:3333
PORT=any_port_you_like
RESTART=always
SRC_CODE_LOCAL_DIR=/your_local_src_code_dir
WEB3_SOCKET_URL=your_ws_web3_provider_url
```

To launch the backend container cd to the server directory and run:

`docker-compose -p erc-sandbox-api up --build -d`

To observe the logs you can then run:

`docker logs erc-sandbox-api -f`

### Frontend

Create a `.env` file in the /client directory and add the following env vars:

```
PORT=3333
SRC_CODE_LOCAL_DIR=/your_local_src_code_dir
REACT_APP_END_POINT="http://localhost:whatever_you_set_the_server_port_var_as"
DOCKERFILE="Dockerfile.dev"
RESTART="always"
REACT_APP_CHAIN_ID=0x1
REACT_APP_TOKEN_NAME=erc_sandbox_token
```

Notice that `REACT_APP_CHAIN_ID` allows you to point at a test chain id if required - though default here is live EVM (`0x1` = 1)

Then cd to the client directory and run:

`docker-compose up --build -d`

The front end will be available here:
`http://localhost:3333`

live reload should be available in both containers

Happy hacking... 🐾

### Some examples:
- Duplicate a backend module - 🐎 chained horses: https://github.com/kittyInternational/erc-sandbox/pull/4
- Duplicate a slimmed down backend module - 🐻 Two Bit Bears: https://github.com/kittyInternational/erc-sandbox/pull/6
- Duplicate a backend module with front end examples - :⚆.^| Chainfaces: https://github.com/kittyInternational/erc-sandbox/pull/7
 