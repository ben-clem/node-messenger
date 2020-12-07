# Node Messenger

Adaltas [webtech course](https://github.com/adaltas/ece-2020-fall-webtech) project.

The goal of this project is to build a basic messaging web app.<br>
It leverages Node.js and React as well as complementary technologies such as unit testing with Mocha and Should.js, embeded storage with LevelDB, REST APIs, ...<br>
If we have time, we'll also play with GraphQL and Socket<span>.io.

You can find the project instructions here: [INSTRUCTIONS.md](../master/INSTRUCTIONS.md)

## Changelog

[CHANGELOG.md](../master/CHANGELOG.md)

## Usage

_How to start and use the application, run the tests, ..._

1. **Clone this repository, from your local machine:**<br>

   ```bash
   git clone https://github.com/benzinho75/node-messenger
   cd node-messenger
   ```

2. **Install [Go](https://golang.org/) and [Dex](https://dexidp.io/docs/getting-started/):**<br>

   For example, on Ubuntu, from your project root directory:

   ```bash
   # Install Go
   apt install golang-go
   # Download Dex
   git clone https://github.com/dexidp/dex
   # Build Dex
   cd dex
   make
   make examples
   ```


3. **Register your GitHub application, get the clientID and clientSecret from GitHub and report them to your Dex configuration:**<br>

   Modify the provided `./dex-config/config.yml` configuration to look like:

   ```yaml
   - type: github
     id: github
     name: GitHub
     config:
       clientID: xxxx98f1c26493dbxxxx
       clientSecret: xxxxxxxxx80e139441b637796b128d8xxxxxxxxx
       redirectURI: http://127.0.0.1:5556/dex/callback
   ```

   **And place it inside your dex folder.**<br>
   You should have a structure like this: `dex/dex-config/config.yml`.<br>
   The frond-end application is already registered and CORS is activated.

4. **Now that Dex is built and configured, your can start the Dex server:**<br>

   ```bash
   cd dex
   bin/dex serve dex-config/config.yaml
   ```

5. **Start the back-end:**<br>

   ```bash
   # In another terminal tab:
   cd back-end
   # Install dependencies (use yarn or npm)
   yarn install
   # Optional, fill the database with initial data
   bin/init
   # Start the back-end
   bin/start
   ```

6. **Start the front-end:**<br>
   ```bash
   # In a third terminal tab:
   cd front-end
   # Install dependencies (use yarn or npm)
   yarn install
   # Start the front-end
   yarn start
   ```

## Tasks

Project management

- Naming convention  
  _place your comments_
- Project structure  
  _place your comments_
- Code quality  
  _place your comments_
- Design, UX  
  _place your comments_
- Git and DevOps  
  _place your comments_

Application development

- Welcome screens  
  _place your comments_
- New channel creation  
  _place your comments_
- Channel membership and access  
  _place your comments_
- Ressource access control  
  _place your comments_
- Invite users to channels  
  _place your comments_
- Message modification  
  _place your comments_
- Message removal  
  _place your comments_
- Account settings  
  _place your comments_
- Gravatar integration  
  _place your comments_
- Avatar selection  
  _place your comments_
- Personal custom avatar  
  _place your comments_

## Bonus

_place your comments_

## Authors

Benoît Clemenceau <b.clemenceau.pro@gmail.com> (https://github.com/benzinho75)<br>
Marin Neyret <marin.nyrt@gmail.com> (https://github.com/MARINeyret)
