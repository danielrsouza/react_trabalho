import React from 'react';
import {Link} from 'react-router-dom';
import { isAuthenticated } from "../../auth";
import { deleteToken } from '../../auth';
import { useHistory } from 'react-router-dom';

function Nav() {

    const history = useHistory();

    const logout = () => {
        deleteToken();
        history.push('/login');
        window.location.reload(true)

    }
    return(
       <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
           <ul className="navbar-nav">
               <li className="nav-item">
                   <Link className="nav-link" to="/">Home</Link>
               </li>
               <li className="nav-item">
                   <Link className="nav-link" to="/sobre">Sobre</Link>
               </li>
               <li className="nav-item">
                    <Link className="nav-link" to="/produtos">Produtos</Link>
               </li>
               {
                   isAuthenticated() ?
                   <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contatos">Contatos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/clientes">Clientes</Link>
                        </li>
                        
                        <li className="nav-item" style={{marginLeft: '900px'}}>
                            <Link className="nav-link" onClick={logout} to="/">Logout</Link>
                        </li>
                    </>
                    :
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>

                    
               }

           </ul>
       </nav>
    );
}

export default Nav