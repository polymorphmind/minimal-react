import React, { Component } from 'react';
import { Container } from "react-bootstrap";
import './Validation.css';
import './DashBoard.css';
import ModalWindow from '../components/ModalWindow';
import UserDataForm from '../components/UserDataForm'


export default class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.child = React.createRef();
        
        this.state = {
            type: 'password',
            showModal:false
        }
        this.childData = {};    
    }

    handleCloseModal(e){
      this.setState({showModal:false});    
    }

      handleClick(e){     
        this.child.current.makePassVisible();
    }

    handleOnBlur(e){
      this.child.current.makePassVisible();
    }
    

    handleData(data) {
      this.childData=data;
      if(this.childData.validation.isValid){
        localStorage.setItem('email', this.childData.email);
        localStorage.setItem('password', this.childData.password);
        sessionStorage.setItem('email', this.childData.email);
        sessionStorage.setItem('password', this.childData.password);   
        this.props.handler();
        this.setState({showModal:true});
    }
    }
      
    render(){                
        return(
            <Container className="dash">        
                <UserDataForm formName="Edit"
                              ref={this.child} 
                              handlerFromParant={this.handleData.bind(this)}
                              mode="edit"
                              parentClick={this.handleClick.bind(this)}
                              parentOnBlur={this.handleOnBlur.bind(this)}
                              typeP={this.state.type}
                              buttonColor="success"/>
            <ModalWindow 
                        title="Success"
                        show={this.state.showModal} 
                        onClickHeader = {this.handleCloseModal.bind(this)} 
                        onClickButton={this.handleCloseModal.bind(this)} 
                        msg="The information was successfully updated"
                        variant="success"/>
          </Container>  
          )
    }
}




