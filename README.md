### `FIRST REACT PROJECT BY MIGUEL COPPOLA`
### `built in React.js using Visual Studio Code`

### `IMPORTANT`
The project doesn't include the node_modules

### `instructions`
    1. run --->   npm install
    2. run --->   npm run server
    3. run --->   npm start

### `npm install`
The project doesn't includes the node_module
So you need to run npm install

### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `server script`
I added this line to the scripts in the package.json
So npm run server can be used to execute the script

  "scripts": {
    "server": "json-server --watch db.json --port 3001"
  }

So npm run server can be used to execute the script

### `npm run server`
Runs the server using the script from pacakge.json, reading the db.json from root directory
In src/config.json you will find this line SERVER_URL": "http://localhost:3001/
So it will run the server in port 3001
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

### `npm packages`
I used some external tools as:
    
    https://github.com/typicode/json-server
    https://material-ui.com/
    https://www.npmjs.com/package/react-alert

### `npm installs`
All the exact npm commands I used

    npm install -g json-server
    npm install @material-ui/core
    npm install @material-ui/icons
    npm install --save react-alert
    npm install --save react-alert react-alert-template-basic

### `event subscription`
The event subscription works with the localstorage
If you reload the page all the events to which you subscribed will be checked
