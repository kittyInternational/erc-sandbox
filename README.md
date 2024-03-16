#  ERC SANDBOX

A suite of tools that allows you to spin up a sandbox / dev space for dapps using ERC-721 tokens.

### Requirements

You will need to be able to run docker containers locally: https://www.docker.com/get-started/

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

 