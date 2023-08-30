# Job Portal

## Table of Contents

- [Getting Started](#getting-started)
  - [Installation](#installation)
- [Available Commands](#available-commands)
  - [`npm start`](#npm-start)
  - [`npm test`](#npm-test)
  - [`npm run build`](#npm-run-build)
  - [`npm run format`](#npm-run-format)
  - [`npm run release`](#npm-run-release)
  - [`npm run lint`](#npm-run-lint)
  - [`npm run inspect`](#npm-run-inspect)
  - [`npm run eject`](#npm-run-eject)
- [Architecture](#architecture)
  - [Dependency Management](#dependency-management)
  - [File Structure](#file-structure)

## Getting Started

### Installation

1.  Clone this repository.
1.  Use the Node version specified in `.nvmrc`:

    ```bash
    nvm install
    ```

1.  Install dependencies before your first run:

    ```bash
    npm install
    ```

## Available Commands

From a command line in the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

## Architecture

This app is built atop [create-react-app] which is a React starter app for building user interfaces.

### File Structure

The default file structure looks like this:

```
app
├── build/            # optimized, production-ready code after `npm run build`
├── public/           # the template files used during `npm run build`
├── src/              # the app source code goes here
├── .gitignore        # what files to ignore within version control
├── .nvmrc            # specify version of Node to target
├── package-lock.json # ensures everyone on the team has the same resolved dependencies
├── package.json      # app config
└── README.md         # this file
```

For the project to build, **these files must exist with exact filenames**:

- `public/index.html` is the page template;
- `src/index.js` is the JavaScript entry point.

For tests to run properly, `src/setupTests.js` must be present.

You may create subdirectories inside `src`. For faster rebuilds, only files inside `src` are processed by Webpack.<br/>
You need to **put any JS and CSS files inside `src`**, otherwise Webpack won’t see them.

Only files inside `public` can be used from `public/index.html`.<br/>

You can, however, create more top-level directories.<br/>
They will not be included in the production build so you can use them for things like documentation.

Please ensure to log in with the corresponding ID and password of an employer/freelancer as per data given in src/data/employers.json and src/data/freelancers.json
