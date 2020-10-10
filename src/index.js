import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Header from './components/Header';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Login from './components/Login';

const queryString = require('query-string');
let logged = '';
let token = '';
if(window.location.hash){
  const parsed = queryString.parse(window.location.hash);
  if(parsed.access_token){
    localStorage.setItem('logged', parsed.access_token);
    token = parsed.access_token;
    logged = true;
    window.location.href = "/";
  }
}else if(localStorage.getItem('logged')){
  token = localStorage.getItem('logged');
  logged = true;
}else{
  console.log('not logged');
  logged = false;
}
  ReactDOM.render(
  <React.StrictMode>
     <Router>
    <div className="App">
        <Switch>
          
        <Route path="/login" component={() => { window.location.href = 
            'https://id.twitch.tv/oauth2/authorize?client_id=3ygw3aha6vfzkwh6lw0nlyhrdhs8bs&redirect_uri=http://localhost:3000/&response_type=token%20id_token&scope=openid&claims=claims={"id_token":{"email":null,"email_verified":null},"userinfo":{"picture":null}}'
                ; return null;}}/>
          {logged ? 
          <Route
              path='/'
              render={(props) => (
                <App {...props} logged={logged} token={token} />
              )}
            /> :
          <Route
          path='/'
          render={(props) => (
            <Login {...props} logged={logged} />
            )}
            />
          }
        </Switch>
    </div>    
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
