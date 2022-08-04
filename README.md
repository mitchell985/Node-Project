# Welcome to my Node JS test project. 👏

The goal of this project is to create a REST API product database using the Express framework, written in Typescript, then containerized into a Docker container.

The plan is to do all of this while following best practices.

The technologies I will use to achieve this are:
- Node.js
- Express.js
- Docker

Database:
- MongoDB

Testing:
- Jest
- Postman

Git Hooks:
- Husky
- ESLint
- Lint-staged

## ❯ Testing

The Postman Collection for testing this project is avaliable [here](https://drive.google.com/file/d/1LdpKUbcqDyQdZy1LBoSuvG7WQ5-ZfnFd/view?usp=sharing)

## ❯ Setup process.

### Step 1: The Dev Environment

You need to set up your development environment before you can do anything.

Install [Node.js and NPM](https://nodejs.org/en/download/)

- on OSX use [homebrew](http://brew.sh) `brew install node`
- on Windows use [chocolatey](https://chocolatey.org/) `choco install nodejs`
- on a Debian Linux distribution use [apt](https://ubuntu.com/server/docs/package-management) `sudo apt install nodejs npm`

make sure node is at least v16 with the following command

```bash
node -v
```

If you have any issues updating it try this [link](https://github.com/nodesource/distributions/issues/1157)

Install yarn globally

```bash
npm install --global yarn
```

Then install the node modules

```bash
yarn install
```

Install docker then start the mongodb container

```bash
docker compose up -d
```

### Step 2: Add a config folder

If you don't have a config folder you'll have to add one inside the src folder using the following template. You need a default.ts, test.ts and if setting up for production, a production.ts file. You'll also need an RSA key, to set the saltWorkFactor and a google geocoding API key.

```ts
export default {
    port: 3000,
    dbUri: "mongodb://localhost:27017/rest-api",
    saltWorkFactor:,
    accessTokenTtl: '15m',
    refreshTokenTtl: '1y',
    publicKey: ``,
    privateKey: ``,
    apiKey: ""
}
```

### Step 3: Run the Project

Run this command

```bash
yarn dev
```

> This starts a local server using `nodemon`, which will watch for any file changes and will restart the server according to these changes.
> The server address will be displayed to you as `http://localhost:3000`.
