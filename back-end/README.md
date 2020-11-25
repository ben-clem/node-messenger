
# ECE WebTech Chat

This is a chat application we wrote to learn the basics and the not so basics features of backend and frontend web programing. It leverages Node.js and React as well as complementary technologies such as unit testing with Mocha and Should.js, embeded storage with LevelDB, REST APIs, ... If we have time, we'll also play with GraphQL and Socket.io

## Usage

Start the web application:

```bash
./bin/start 
Chat is waiting for you at http://localhost:3001
```

Start the Dex server:

```bash
cd $GOPATH/src/github.com/dexidp/dex
./bin/dex serve examples/config-dev.yaml
```

Run the tests with mocha:

```bash
npm run test
```

## Instructions

See "../lab.md" for the lab instructions.
