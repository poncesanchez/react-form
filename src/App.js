import React, { Component } from 'react';
import './css/App.css';

function validarCamposVacios(email, password, errores) {
  return {
    errores: errores.password.length > 0 || errores.email.length > 0,
    email: email.length === 0,
    password: password.length === 0
  };
}

const validacionFormulario = ({ errores, ...rest }) => {
  let valid = true;
  Object.values(errores).forEach(val => { val.length > 0 && (valid = false); });
  Object.values(rest).forEach(val => { val === null && (valid = false); });
  return valid;
};

const emailValidacion = RegExp(
  /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
);

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      email: "", 
      password: "", 
      enviado: false,
      errores: {
        email: "",
        password: "",
        general: ""
      }
    };
  }

  onSubmit = e => {
    e.preventDefault();
    if (validacionFormulario(this.state)) {
      this.setState({enviado: true})
    } else {
      let errores = {...this.state.errores};
      errores.general = "Ha ocurrido un error en la información enviada";
    }
  };

  validar = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let errores = { ...this.state.errores };
    switch (name) {
      case "email":
      errores.email = emailValidacion.test(value) ? "" : "El email ingresado es inválido";
        break;
      case "password":
        errores.password = value.trim().length < 4 ? "La contraseña es inválida" : "";
        break;
      default:
        break;
    }
    this.setState({ errores, [name]: value });
  };

  render() {
    const { errores } = this.state;
    const errors = validarCamposVacios(this.state.email, this.state.password, this.state.errores);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    
    if(!this.state.enviado){
      return (
        <div className='contenedor'>
          <div className="imagen-estado">
            {errores.email.length > 0 || errores.password.length > 0 ? (
              <img src="images/error.svg" width="100%" alt="Errores" />
            ) : (
              <img src="images/inicial.svg" width="100%" alt="Todo bien" />
            )}
          </div>
          <div className="formulario">
            <form onSubmit={this.onSubmit.bind(this)} noValidate>
              <h2>Iniciar Sesión</h2>
              <div className="campo campo-mail">
                <img src="images/mail.svg" width="25" className="icono" alt="Email" />
                <input type="email" name="email" placeholder="Email" onChange={this.validar} noValidate
                    className={errores.email.length > 0 ? "error" : this.state.email.length > 0 ? "valid" : null} />
                {errores.email.length > 0 && (
                  <div className="errorMessage">
                    <img src="images/cross.svg" width="18" alt="Email inválido" /> 
                    <span>{errores.email}</span>
                  </div>
                )}
              </div>
              
              <div className="campo">
                <img src="images/password.svg" width="25" className="icono" alt="Password" />
                <input type="password" name="password" placeholder="Contraseña" onChange={this.validar} noValidate className={errores.password.length > 0 ? "error" : this.state.password.length > 0 ? "valid" : null} />
                {errores.password.length > 0 && (
                  <div className="errorMessage">
                    <img src="images/cross.svg" width="18" alt="Contraseña inválida" /> 
                    <span>{errores.password}</span>
                  </div>
                )}
              </div>
              
              <div className="campo">
                <button name="ingresar" disabled={isDisabled}>Ingresar</button>
              </div>
              {errores.general.length > 0 && (
                <div className="errorMessage">
                  <img src="images/cross.svg" width="18" alt="Error" /> 
                  <span>{errores.general}</span>
                </div>
              )}
            </form>
          </div>
        </div>
      );
    } else {
      return(
        <div className='contenedor formulario-enviado'>
          <div className="imagen-estado">
            <img src="images/final.svg" width="100%" alt="Final" />
          </div>
          <div className="formulario">
            <h2>!Todo bien, <span className="green">yupi</span>!</h2>
            <div className="box-datos">
              <p className="align-left">Has enviado los siguientes datos:</p>
              <ul>
                <li>Email: <b>{this.state.email}</b></li>
                <li>Password: <b>{this.state.password}</b></li>
              </ul>
            </div>
            <p className="credits">by Luis Ponce Sánchez</p>
            <small>pd: contrátenme :D</small>
          </div>
        </div>
      );
    }
  }
}

export default App;
