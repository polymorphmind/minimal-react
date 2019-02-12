import { Form, Button, Row } from "react-bootstrap";
import React,{Component} from 'react';
import FormValidator from '../containers/FormValidator';
import '../containers/Validation.css';

export default class UserDataForm extends Component {
  constructor(props){
    super(props);
    this.validatorRules = [
        { 
          field: 'email', 
          method: 'isEmpty', 
          validWhen: false, 
          message: 'Email is required.' 
        },
        { 
          field: 'email',
          method: 'isEmail', 
          validWhen: true, 
          message: 'That is not a valid email.'
        },
        { 
          field: 'password', 
          method: 'isEmpty', 
          validWhen: false, 
          message: 'Password is required.'
        }
      ];
    
    if(this.props.showPasswordConfirmation){    
        this.validatorRules.push(        { 
            field: 'password_confirmation', 
            method: 'isEmpty', 
            validWhen: false, 
            message: 'Password confirmation is required.'
          },
          { 
            field: 'password_confirmation', 
            method: this.passwordMatch,  
            validWhen: true, 
            message: 'Password and password confirmation do not match.'
          });
    }

    this.validator = new FormValidator(this.validatorRules);
    this.state = {email:this.props.mode==="edit"?localStorage.getItem('email'):'',
                  password:this.props.mode==="edit"?localStorage.getItem('password'):'',
                  password_confirmation:'',
                  validation: this.validator.valid(),
                  msg:'You have successfully registered and logged in.',
                  typeP:'password'
    }
    this.submitted = false;     
  }

  passwordMatch(confirmation, state) {return state.password === confirmation}

  handleInputChange(e){
    e.preventDefault();     
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  makePassVisible(){
    this.setState({typeP:this.state.typeP=="password"?"text":"password"});
  }

  handleSubmit(e) {
    e.preventDefault();
    const validation = this.validator.validate(this.state);
    this.setState({ validation });       
    this.submitted=true;
    var data = this.state;                  //вопрос
    data.validation=validation;
    this.props.handlerFromParant(data);
   }

  render(){
    let validation = this.submitted ?       
    this.validator.validate(this.state) :  
    this.state.validation  

    return(
      <div>
        <Form>       
        <Row className="justify-content-md-center" ><h3>{this.props.formName}</h3></Row>
            <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                    <Form.Control 
                    name ="email"
                    type="email"  
                    className={validation.email.isInvalid && 'has-error'}
                    value={this.state.email}
                    onChange={this.handleInputChange.bind(this)}
                    inputRef={(ref) => { this.state.email = ref }}
                    placeholder="Enter email" />
                    <span className="error">{validation.email.message}</span>
                </Form.Group>
      
             <Form.Group controlId="formPassword1">
                  <Form.Label>Password</Form.Label>
                  <Form.Control 
                    name ="password"
                    className={validation.password.isInvalid && 'has-error'}
                    value={this.state.password}
                    onChange={this.handleInputChange.bind(this)}
                    inputRef={(ref) => { this.state.password = ref }}            
                    placeholder="Password" 
                    onClick={this.props.parentClick}
                    onBlur={this.props.parentOnBlur}
                    type={this.state.typeP}
                    />
                    <span className="error">{validation.password.message}</span>
             </Form.Group>
            {this.props.showPasswordConfirmation?
                <Form.Group controlId="formPassword2">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                    name ="password_confirmation"
                    type="password" 
                    className={validation.password_confirmation.isInvalid && 'has-error'}
                    value={this.state.password_confirmation}
                    onChange={this.handleInputChange.bind(this)}
                    inputRef={(ref) => { this.state.password_confirmation = ref }}            
                    placeholder="Confirm Password" />
                    <span className="error">{validation.password_confirmation.message}</span>
                </Form.Group> :''}  
                <Row className="justify-content-md-center" >
            <Button variant={this.props.buttonColor} type="submit" onClick={this.handleSubmit.bind(this)}>Submit</Button>
          </Row> 
        </Form>   
      </div>        
    )
  }
}




