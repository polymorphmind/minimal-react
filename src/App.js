import React, {Component} from 'react';
import Login from './containers/Login';
import SignUp from './containers/SignUp';
import Dashboard from './containers/DashBoard';
import { Nav, Navbar } from "react-bootstrap";
import { Link, Route, Switch } from 'react-router-dom';
import './containers/app.css';

class App extends Component{  
  constructor(){
    super();
    this.state = {render: false}
    this.handler = this.handler.bind(this)
  }

  handler() {
    this.setState({
      render: true
    })
  }

signOut(e){
  e.preventDefault();
  sessionStorage.clear();
  this.setState({render:true});
}

      render(){      
        var loginActionButtons=<div><Link className="p-2 text-left"  role="button"  to="/login">Log In</Link>
                                    <Link className="p-2 text-left" role="button"  to="/signup">Sign Up</Link></div>;
        var dashBoard = '';
        if(localStorage.getItem('email')&&sessionStorage.getItem('email')){
          dashBoard = <Dashboard handler = {this.handler}></Dashboard>;
          var email = sessionStorage.getItem('email');
          loginActionButtons=<div>Hello, {email}
                              <Link className="p-2 text-left"  
                              role="button" 
                              onClick={this.signOut.bind(this)}  
                              to="/signup">Sing Out</Link></div>;
        }
        return(
        <div>
          <Navbar className="nv" bg="light" expand="lg">
            <Navbar.Brand>Dashboard</Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">       
              </Nav>      
              <div className="d-flex justify-content-end">
                {loginActionButtons}
              </div>
            </Navbar.Collapse>   
          </Navbar>
          {dashBoard}
          <Switch>
                  <Route path="/signup" component={SignUp}/>
                  <Route path="/login" component={Login}/> 
          </Switch>  
        </div>
        )
      }     
}

export default App;