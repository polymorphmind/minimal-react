import React, { Component } from 'react';
import { Container } from "react-bootstrap";
import './Validation.css';
import { Redirect } from 'react-router-dom'
import '../containers/Signup.css'
import '../containers/login.css'
import ModalWindow from '../components/ModalWindow'
import UserDataForm from '../components/UserDataForm'

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.state = {
    toDashboard:false,
    showModal:false
  }      
  this.childData = {};  
}

  handleCloseModal(e){
    this.setState({showModal:false});
  }


  handleData(data) {
    this.childData=data;
    if(this.childData.validation.isValid){
      if(this.childData.email==localStorage.getItem('email')&&
        this.childData.password==localStorage.getItem('password')){
          sessionStorage.setItem('email', this.childData.email);
          sessionStorage.setItem('password', this.childData.password);
          this.setState({toDashboard:true});
      }else{this.setState({showModal:true})}
    }
  }

  render(){
    if (this.state.toDashboard === true) {return (<Redirect to='/' />)}               
    return(
      <Container className="login">      
        <UserDataForm formName="Login" 
                      ref={this.child} 
                      handlerFromParant={this.handleData.bind(this)}
                      buttonColor="info"/>
        <ModalWindow 
                        title="Error"
                        show={this.state.showModal} 
                        onClickHeader = {this.handleCloseModal.bind(this)} 
                        onClickButton={this.handleCloseModal.bind(this)} 
                        msg="The email or password you entered is incorrect. Please try again."
                        variant="danger"/>
    </Container>  
    )
  }
}


