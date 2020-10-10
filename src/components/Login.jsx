import React from 'react'
import {Link} from 'react-router-dom';


const Login = ({logged}) => {

    return(
        <div className="container-fluid m-0 p-0">
        <form className="form-signin">
   <h1 className="h3 mb-3 font-weight-normal">Before access, you need to login with twitch...</h1>
      <Link to='/login' className="btn btn-lg btn-primary btn-block" type="submit">Click here</Link>
      <p className="mt-5 mb-3 text-muted">&copy; 2020</p>
    </form>
      </div>
    );
}

export default Login;