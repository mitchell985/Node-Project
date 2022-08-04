## Welcome to my Node JS test project. 👏

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

Git Hooks:
- Husky
- ESLint
- Lint-staged

## ❯ Setup process.

### Step 1: The Dev Environment

You need to set up your development environment before you can do anything.

Install [Node.js and NPM](https://nodejs.org/en/download/)

- on OSX use [homebrew](http://brew.sh) `brew install node`
- on Windows use [chocolatey](https://chocolatey.org/) `choco install nodejs`
- on a Debian Linux distribution use [apt] `apt install nodejs npm`

Install yarn globally

```bash
npm install --global yarn
```

Then run

```bash
yarn install
```

### Step 2: Run the Project

Run this command

```bash
yarn dev
```

> This starts a local server using `nodemon`, which will watch for any file changes and will restart the server according to these changes.
> The server address will be displayed to you as `http://localhost:3000`.
