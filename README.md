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

### Project management

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


### Application development

- Welcome screens  
  - Customized login screen
  - Worked on looks

- New channel creation  
  - Create channel button opens dialog
  - Adding a name
  - Adding known users to a channel when creating it (dynamically selecting / deselecting them)
  - Inviting new users via email
  - Forms are secured to prevent unwanted user behaviors
  - User can cancel at anytime or submit when the necessary info are provided
  - New channel is persisted in DB

- Channel membership and access  
  - Users are added to DB when logging for the first time
  - User is registered as owner when creating a channel
  - **MISSING:** API requests check for auth (provided by Worms)

- Ressource access control  
  - **MISSING:** user can only see and post to channels when he is a member or the owner
  - **MISSING:** appropriate HTTP response code and message.

- Invite users to channels  
  - Inviting known or new users at channel creation
  - **MISSING:** Inviting known or new users inside channel

- Message modification  
  - **MISSING:** The author of a message is able to modify its content

- Message removal  
  - **MISSING:** The author of a message is able to remove it

- Account settings  
  - **MISSING:** Create a screen for the user to modify his/her personal settings (email, name, language, theme, ...). Those properties don't have to be active. The goal is to display form components, persist their value and load the form components with new values. For example, a switch component to select between a day and night theme illustrates how to use the switch component. On save, the value must be persisted and the switch component must reflect it. You don't have to update the overall theme UI to reflect this value. If you do, it is part of the bonus and you must mention it in the readme.

- Gravatar integration  
  - **MISSING:** Use an existing component or build your own, it is very easy to integrate and it will provide a default random image if the user email is not registered.

- Avatar selection  
  - **MISSING:** Provide the user with the possibility to choose an avatar from a selection you provide. The screen presenting this selection can be proposed once the user logged in for the first time (when the user account was not yet present inside the database and was created) or when the user edits his/her settings.

- Personal custom avatar  
  - **MISSING:** Offer the user the ability to upload his avatar in the form of an image (eg png, svg, ...). Ideally, the form must support drag and drop, filter the file type and restrict the file size.

## Bonus

_place your comments_

## Authors

Benoît Clemenceau <b.clemenceau.pro@gmail.com> (https://github.com/benzinho75)<br>
Marin Neyret <marin.nyrt@gmail.com> (https://github.com/MARINeyret)
