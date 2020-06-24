import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';

import axios from "axios";
import { setToken } from "../../auth";

function Login()
{

    const {handleSubmit, register} = useForm();
    const history = useHistory();

    const onSubmit = data => {
        
            axios.post(`https://vinicius.pro.br/daoo/rest2/index.php/users/login`,{ user: data.user, pass: data.pass })
            .then(res => {
                console.log(res.data.token);
                setToken(res.data.token);
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
                history.push('/');

            })

    }

    return(
        <div className="row">
            <div className="col-sm-1"></div>
            <div className="col-sm-10">
                <h1>Contato</h1>
                <br />

                <form onSubmit={handleSubmit(onSubmit)} name="formulario">
                    <div className="form-group">
                    <label>User</label>
                    <input ref={register({
                        required:"Required",
                    })}
                    className="form-control"
                    type="text"
                    name="user"
                    />
                    <label>Pass</label>
                    <input ref={register({
                        required:"Required",
                    })}
                    className="form-control"
                    type="text"
                    name="pass"
                    />
                    </div>

                <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
            </div>
        </div>
    )
}

export default Login;