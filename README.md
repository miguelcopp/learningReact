### `BY MIGUEL COPPOLA`
### `built in React.js using Visual Studio Code`

### `IMPORTANT`
The project doesn't include the node_modules
The .js files were renamed so that they can be mailed 

### `instructions`
    1. Extract the folder from the .zip file
    2. Change all the .txt files to .js
    3. run --->   npm install
    4. run --->   npm run server
    5. run --->   npm start

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

### `highlited events`
The requirement on highlighted events cannot be done with the current data structure
My suggestion would be to add a highlighted attribute to the entity event
Can be a Boolean that indicates true if the event is highlighted and false if not
In this way you could show a Highlighted Events section and condition it based on that attribute
