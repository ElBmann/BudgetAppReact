import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import LoginCSS from './Login.css';
import TextField from '../../Components/TextField/TextField';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';


class Login extends Component {
  
     state = {
        loginForm:{
          email:{
            elementType: 'input',
            elementConfig:{
              type: 'email',
              placeholder: 'Email'
            },
            value: ''
          },
          password:{
            elementType: 'input',
            elementConfig:{
              type: 'password',
              placeholder:'Password'
            },
            value: ''
          }
        },    
        loading: false
      }
constructor(props){
  super(props);
  this.loginHandler = this.loginHandler.bind(this);
}


  loginHandler = (event) =>{
    event.preventDefault();
    console.log("this.state.loginForm.email: "+this.state.loginForm.email.value);
    console.log("this.state.loginForm.password "+this.state.loginForm.password.value);
  
    axios.get('http://localhost:8080/api/authenticateUser/', {
      params: {
        email: this.state.loginForm.email.value,
        password: this.state.loginForm.password.value
      }
    })
    .then(function (response) {

      if(response.data === true){
        console.log("response.data === true");
      }
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

   }

   inputChangedHandler = (event, inputIdentifier) => {
    console.log("Inside inputChangedHandler");
    const updatedLoginForm = {
        ...this.state.loginForm
    };
    const updatedFormElement = { 
        ...updatedLoginForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedLoginForm[inputIdentifier] = updatedFormElement;
  
    this.setState({loginForm: updatedLoginForm});
}

  render() {
    const formElementsArray = [];
    for (let key in this.state.loginForm) {
        formElementsArray.push({
            id: key,
            config: this.state.loginForm[key]
        });
    }

    let form = ( 
      <form onSubmit={this.loginHandler}>
          {formElementsArray.map(formElement => (
              <TextField 
                  key={formElement.id}
                  elementType={formElement.config.elementType}
                  elementConfig={formElement.config.elementConfig}
                  value={formElement.config.value}
                  changed={(event) => this.inputChangedHandler(event, formElement.id)} />
          ))}
          <Button type = 'submit' >Login</Button>
      </form>
      );


    return (
     <div>
        <Card className = {LoginCSS.cardFormat}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
           Login
        </Typography>
            {form}
      </CardContent>
    </Card>
    
     </div>
    );
  }
}

export default Login;
