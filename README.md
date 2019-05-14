Personal Learning Compass
===========================
The Personal Learning Compass is a Personal Learning Environment (PLE) support application that can:
* Allow learners to log in with their [Hypothesis](https://web.hypothes.is/) account name;
* Represent a learner's recent learning interests by displaying his/her Hypothesis tags (public tags);
* Generate the learning resources network to connect an individual learner to people who share the same interest, ideas or resources;
* Allow learners to customize the learning resources network 
* Help a learner to discover and explore new learning resources of interest;


Development Environment
-------------------------
### Prerequisites ###
* Node.js & npm: [Click here](https://nodejs.org/en/) to navigate to the Node.js homepage. Follow instructions to install `Node.js` and `npm`.
### Intall ###
1. Install React
```
$ npm install --save react
```
2. Install Dependencies
```
$ npm install --save redux react-redux axios redux-thunk react-scripts react-dom react-router-dom 
```
3. Install ZoomCharts: Personal Learning Compass uses ZoomCharts.js as the library to visualize the learning resources network
```
npm install --save @dvsl/zoomcharts
```
4. Install Babel: Install `babel`, `babel-core`, `babel-loader`, `babel-preset-env` and `babel-preset-react` as dev dependencies.
```
npm install --save-dev babel babel-core babel-loader babel-preset-env babel-preset-react 
```
### Run ###

* Run PLC Locally
```
npm start
```
