import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import { isAuthenticated } from "./auth";

import './App.css';
import Nav from './Componets/pages/Nav';
import Home from './Componets/pages/Home';
import Sobre from './Componets/pages/Sobre';
import Produtos from './Componets/pages/Produtos';
import Contato from './Componets/pages/Contato';
import Login from './Componets/admin/Login';
import ContatoView from './Componets/admin/ContatoView';
import ClientesView from './Componets/admin/ClientesView';
import Cliente from './Componets/pages/Clientes';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
      )
    }
  />
);

function App() {
  return (
    <div>
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/sobre">
            <Sobre />
          </Route>
          <Route path="/produtos">
            <Produtos />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>


            <PrivateRoute exact path="/contatos" component={Contato} />
            <PrivateRoute path="/contacts/response/:id" component={ContatoView}/>
            <PrivateRoute path="/clients/response/:id" component={ClientesView}/>
            <PrivateRoute exact path="/clientes" component={Cliente} />

        </Switch>
      </Router>
    </div>
  
  );
}

export default App;
