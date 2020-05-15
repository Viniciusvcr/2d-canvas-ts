# 2D Canvas with React-Typescript

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A simple HTML Canvas App based on a college Computer Graphics project. Developed to learn React with Typescript.

[Original project can be founded here.](https://github.com/Viniciusvcr/2d-canvas-js)

## React concepts used and learned

- React Functional Components
- Hooks
  - useState
  - useReducer
  - useEffect

## How to interact with the Canvas

- First, select a tool in the Tool Menu above the Canvas
- Click on the Canvas to select points to create the shapes
  - Each tool has its own required number of points
  - The number of points left to select are shown below the Tool Menu
- You can select any shape on the Canvas by clicking on the Object List
  - Selected shapes turn blue
  - The corresponding shape changes color when your mouse hover on the item in the Object List
  - Clicking the "X" removes the shape from the Canvas
- The header contains common Computer Graphic functions to interact with the shapes on canvas
  - Translation, Scale and Rotation require selected objects to work

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
