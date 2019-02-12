import React, { Component } from 'react';
import { Container } from "react-bootstrap";
import { Redirect } from 'react-router-dom'
import '../containers/Signup.css'
import ModalWindow from '../components/ModalWindow'
import UserDataForm from '../components/UserDataForm'

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.state={error:false,
                   msg:"You have successfully registered and logged in",
                   showModal:false,
                   toDashboard:false}
    this.childData = {};
  }        
  handleSignUp(e) {  
}
  
handleCloseModal(e){
  this.setState({showModal:false});
  if(!this.state.error){ this.setState({toDashboard:true});}
}

  handleData(data) {
    this.childData=data;
      if(this.childData.validation.isValid){
        if(localStorage.getItem('email')===this.childData.email){         
          this.setState({ msg:"This email already exists", 
                          showModal:true, 
                          error:true});
        }
        else{      
          localStorage.setItem('email', this.childData.email);
          localStorage.setItem('password', this.childData.password);
          sessionStorage.setItem('email', this.childData.email);
          sessionStorage.setItem('password', this.childData.password);
          this.setState({ showModal:true, 
                          msg:"You have successfully registered and logged in", 
                          error:false});
                        }
                      }
    }

    render(){    
      if (this.state.toDashboard === true) {return (<Redirect to='/' />)}            
      return(
        <Container className="login">    
              <UserDataForm formName="Sign Up"
                            ref={this.child} 
                            handlerFromParant={this.handleData.bind(this)}
                            showPasswordConfirmation={true}
                            buttonColor="warning"/>
    
            <ModalWindow 
                          title={this.state.error?"Error":"Success"}
                          show={this.state.showModal} 
                          onClickHeader = {this.handleCloseModal.bind(this)} 
                          onClickButton={this.handleCloseModal.bind(this)} 
                          msg={this.state.msg}
                          variant={this.state.error?"danger":"success"}/>
        </Container>  
    )
  }  
}
