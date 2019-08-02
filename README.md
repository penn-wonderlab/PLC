Personal Learning Compass
===========================
The Personal Learning Compass is a Personal Learning Environment (PLE) support application that can:
* Allow learners to log in with their [Hypothesis](https://web.hypothes.is/) account name;

![PLC-1-gif](https://user-images.githubusercontent.com/35544378/57734231-10f96680-7667-11e9-82aa-cc9ef8265538.gif)

* Represent a learner's recent learning interests by displaying his/her Hypothesis tags (public tags);

![PLC-2-gif](https://user-images.githubusercontent.com/35544378/57734280-2cfd0800-7667-11e9-9913-430919063bbf.gif)

* Generate the learning resources network to connect an individual learner to people who share the same interest, ideas or resources;

![PLC-3-gif](https://user-images.githubusercontent.com/35544378/57734302-39816080-7667-11e9-95b3-ca2a8297c934.gif)

* Allow learners to customize the learning resources network 

![PLC-4-gif](https://user-images.githubusercontent.com/35544378/57734338-4dc55d80-7667-11e9-80b7-176a4223a24c.gif)

* Help a learner to discover and explore new learning resources of interest;

![PLC-5-gif](https://user-images.githubusercontent.com/35544378/57734376-5d44a680-7667-11e9-8318-c8baf1b8054b.gif)


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
$ npm install --save @dvsl/zoomcharts
```
4. Install Babel: Install `babel`, `babel-core`, `babel-loader`, `babel-preset-env` and `babel-preset-react` as dev dependencies.
```
$ npm install --save-dev babel babel-core babel-loader babel-preset-env babel-preset-react 
```
5. Install Semantic UI React
```
$  yarn add semantic-ui-react
$  yarn add semantic-ui-css
```
### Run ###

* Run PLC Locally
```
$ npm start
```
