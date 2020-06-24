import React from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';

import Categoria from './Categoria';


function Produtos(){
    let {path, url} = useRouteMatch();

    return(
        <div className="row">
            <div className="col-sm-1"></div>
            <div className="col-sm-10">
                <h1>Produtos</h1>
           
           <ul className="navbar-nav">
               <li className="nav-item">
                   <Link className="nav-link" to={`${url}/1`}>Cat 1</Link>
               </li>
               <li className="nav-item">
                   <Link className="nav-link" to={`${url}/2`}>Cat 2</Link>
               </li>
               <li className="nav-item">
                   <Link className="nav-link" to={`${url}/3`}>Cat 3</Link>
               </li>
           </ul>

           <Switch>
                <Route exact path={path}>
                        <h1>Selecione uma Categoria</h1>
                </Route>

                <Route path={`${path}/:id`}>
                    <Categoria />
                </Route>
            </Switch>




            </div>
            <div className="col-sm-1"></div> 
        </div>
        
    );
}

export default Produtos;