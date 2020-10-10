import React from 'react'
const Header = ({streams,newLogged, setnewLogged, newToken}) => {
  const logOut = () => {
    setnewLogged(false);
    localStorage.removeItem('logged');
    window.location.href="/";
  }
    return(
        <div className="container-fluid m-0 p-0">
        <nav className="mb-1 navbar navbar-expand-lg navbar-dark bg-dark secondary-color lighten-1 b-b-1">
        <a className="navbar-brand" href="/">Add Streamers</a>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link text-muted created" href="https://github.com/JuanGidoni">Created by Juan Ignacio Gidoni</a>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto nav-flex-icons">
            <li className="nav-item d-flex flex-row justify-content-center">
              <button className="nav-link waves-effect waves-light btn text-white bg-reacTodo mr-1 p-1 md-p-0 cursor-none">
                  <span id="totalTodo" className="mr-1">{streams.length}</span>
                <i className="fas fa-user"></i>
              </button>
            </li>
            <li className="nav-item mr-1">
              <button className="nav-link btn bg-reacTodo text-white" onClick={logOut}>Logout</button>
            </li>
          </ul>
      </nav>
      </div>
    );
}

export default Header;