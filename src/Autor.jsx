import React, { Component } from 'react';
import InputCustomizado from './Components/InputCustomizado.js';
import './css/pure-min.css';
import './css/side-menu.css';

class FormularioAutor extends Component {

    constructor(){
        super()
        this.state = {
          nome:"",
          email:"",
          senha:""   
        }
      }

    setNome(nome){
    this.setState({nome:nome.target.value})
    };

    setEmail(email){
    this.setState({email:email.target.value})
    }

    setSenha(senha){
    this.setState({senha:senha.target.value})
    }

    enviaform(evento){
        evento.preventDefault()
        fetch('http://cdc-react.herokuapp.com/api/autores',{
          method:'post',
          body:JSON.stringify({nome:this.state.nome, email:this.state.email, senha:this.state.senha}),
          headers: {
            "Content-Type": "application/json"
          }
          
        })
        .then(
          response=>{
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' +
                response.status);
              return;
            }
            response.json().then((info)=> {
              this.setState({lista:info})
              }
            );
          }
        )
        .catch(function(err) {
          console.log('Fetch Error :-S', err);
        });
      }

    render(){
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit = {this.enviaform.bind(this)} method = 'post'>
                
                    <InputCustomizado id="nome" type="text" name="nome" value={this.state.nome} onChange ={this.setNome.bind(this)} label="Nome"/>
                    <InputCustomizado id="email" type="text" name="email" value={this.state.email} onChange ={this.setEmail.bind(this)} label="Email"/>
                    <InputCustomizado id="senha" type="text" name="senha" value={this.state.senha} onChange ={this.setSenha.bind(this)} label="Senha"/>                 
                                
                    <div className="pure-control-group">                                  
                        <label></label> 
                        <button type="submit" className="pure-button pure-button-primary">Gravar</button>                                    
                    </div>
                </form>             

             </div>  
        )
    }
}

class TabelaAutores extends Component {

    render(){
        return (
            <div>            
                <table className="pure-table">
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.lista.map(function(autor){
                      return(
                        <tr key={autor.id}>
                      <th>{autor.nome}</th>
                      <th>{autor.email}</th>
                    </tr>
                      )
                    })}
                  </tbody>
                </table> 
              </div>  
        )
    }
}

export default class AutorBox extends Component {

    constructor(){
        super()
        this.state = {
          lista:[]   
        }
    
      }

      componentDidMount(){
        fetch('http://cdc-react.herokuapp.com/api/autores')
        .then(
          response=>{
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' +
                response.status);
              return;
            }
            response.json().then(data=> {
              this.setState({lista:data})
              }
            );
          }
        )
        .catch(function(err) {
          console.log('Fetch Error :-S', err);
        });
    
      }
      
    render(){
        return (
            <div className="content" id="content">
                <FormularioAutor/>
                <TabelaAutores/>
            </div>
        )
    }
}
