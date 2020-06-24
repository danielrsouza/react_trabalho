import React, { useEffect, useState } from 'react';

import { useForm } from "react-hook-form";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { getToken } from '../../auth';

function Cliente()
{
    const { handleSubmit, register} = useForm();
    const [clientes, setClientes] = useState([]);
    const history = useHistory();

    useEffect(() => {
        axios.get(`https://vinicius.pro.br/daoo/rest2/index.php/clients`, 
            {
                headers: {
                    Authorization: "Bearer " + getToken()
                }
            }
        )
        .then(res => {
            const dados = res.data
            setClientes(dados);

            console.log(dados);
        })        
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {

        });
    }, [])

    // UPDATE
    const onSubmit = (dados, event) => {

        event.preventDefault();

        const url = `https://vinicius.pro.br/daoo/rest2/index.php/clients`;
        let dadosJson = JSON.stringify(dados);

        axios.post(url, dadosJson)
            .then(res => {
                console.log(res);
            })     
               .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
    
            });

    } 

    const handleClickResponse = (id) =>{
        history.push(`/clients/response/${id}`)
    }

    const handleClickDelete = (id) => {
        axios.post(`https://vinicius.pro.br/daoo/rest2/index.php/clients/delete/${id}`, 
            {
                headers: {
                    Authorization: "Bearer " + getToken()
                }
            }
        )
        .then(res => {
            console.log(res)
        })        
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {

        });

    }

    return(
        <div className="row">
            <div className="col-sm-1"></div>
            <div className="col-sm-10">
                <h1>Clientes</h1>
            </div>
            <div className="col-sm-1"></div> 

            <div className="container">
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="nome">Nome</label>
                    <input type="text" className="form-control" id="name" placeholder="nome" name="name" ref={register} />
                </div>
                <div className="form-group">
                    <label htmlFor="telefone">Telefone</label>
                    <input type="number" className="form-control" id="telefone" placeholder="telefone" name="phone" ref={register} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="email" name="email" ref={register} />
                </div>
                <div className="form-group">
                    <label htmlFor="mensagem">address</label>
                    <input type="text" className="form-control" id="message" placeholder="mensagem" name="address" ref={register} />
                </div>
                <button type="submit" className="btn btn-primary mb-2">Enviar</button>
            </form>

            <table className="table">
                <thead className="thead-dark">
                    <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Telefone</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th colSpan='2'>Ações</th>
                    </tr>
                </thead>
            
            <tbody>
                {clientes.map( (dados, index) =>{
                    return(
                    <tr key={index}>
                        <td>{dados.idClient}</td>
                        <td>{dados.name}</td>
                        <td>{dados.phone}</td>
                        <td>{dados.email}</td>
                        <td>{dados.address}</td>
                        <td>
                            <button type="button" className="btn btn-primary" onClick={() => handleClickResponse(dados.idClient)}>Responder</button>
                        </td>
                        <td>
                            <button type="button" className="btn btn-danger" onClick={() => handleClickDelete(dados.idClient)}>Excluir</button>
                        </td>
                    </tr>
                    )
                } )}
            </tbody>
            </table>
            </div>
        </div>
        
    );   
}

export default Cliente