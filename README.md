#  ERC SANDBOX

A suite of tools that allows you to spin up a sandbox / dev space for dapps using ERC-721 tokens.

## Requirements

You will need to be able to run docker containers locally: https://www.docker.com/get-started/

### API:

Create a `.env` file in the /server directory and add the following env vars:

```
JWT_SECRET=any_secure_password
MONGO_LOCAL_DIR=/your_local_mongodb_persistence_dir
NODE_ENV=DEVELOPMENT
ORIGIN=front_end_url
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
PORT=any_port_you_like_just_not_the_same_as_the_api
SRC_CODE_LOCAL_DIR=/your_local_src_code_dir
REACT_APP_END_POINT="http://localhost:whatever_you_set_the_server_port_var_as"
DOCKERFILE="Dockerfile.dev"
RESTART="always"
REACT_APP_CHAIN_ID=0x1
REACT_APP_TOKEN_NAME=erc_sandbox_token
```

For prod you would change `DOCKERFILE` to "Dockerfile" as this also performs a prod build of the create-react-app.
Notice that `REACT_APP_CHAIN_ID` allows you to point at a test chain id if required - though default here is live EVM (`0x1` = 1)

Then cd to the client directory and run:

`docker-compose up --build -d`

live reload should be available in both containers

The front end will be available here:
`http://localhost:YOUR_FRONT_END_PORT_NUMBER`


Happy hacking... 🐾
 