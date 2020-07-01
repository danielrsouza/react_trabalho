import React, { useEffect, useState } from 'react';

import { useForm } from "react-hook-form";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { getToken } from '../../auth';

function Contato(){

    const { handleSubmit, register} = useForm();
    const [contatos, setContatos] = useState([]);
    const history = useHistory();

    useEffect(() => {
        axios.get(`https://vinicius.pro.br/daoo/rest2/index.php/contacts`, 
            {
                headers: {
                    Authorization: "Bearer " + getToken()
                }
            }
        )
        .then(res => {
            const dados = res.data
            setContatos(dados);

            console.log(dados);
        })        
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {

        });
    }, [])

    const onSubmit = (dados, event) => {

        event.preventDefault();

        const url = `https://vinicius.pro.br/daoo/rest2/index.php/contacts`;

        console.log("DADOS", dados)

        console.log(dados.filtro)

        if (dados.filtro) {

            let teste = dados.filtro
            axios.get(`https://vinicius.pro.br/daoo/rest2/index.php/contacts/search/${teste}`, 
                    {
                        params:{},
                        headers: {
                            Authorization: "Bearer " + getToken()
                        }
                    }
                )
                .then(res => {
                    const dados = res.data
                    setContatos(dados);

                    console.log(dados);
                })        
                .catch(function (error) {
                    console.log(error);
                })
                .finally(function () {

                });
        } else {
            axios.post(url, 
                {
                    name: dados.name,
                    description: dados.description,
                    email: dados.email
                },
                {
                    headers: {
                        Authorization: "Bearer " + getToken()
                    }
                })
                .then(res => {
                    console.log(res);
                })     
                   .catch(function (error) {
                    console.log(error);
                })
                .finally(function () {
        
                });
        }

    } 

    const handleClickResponse = (id) =>{
        console.log("aqui!")
        history.push(`/contacts/response/${id}`)
    }

    const handleClickDelete = (id) => {
        axios.post(`https://vinicius.pro.br/daoo/rest2/index.php/contacts/delete/${id}`, 
            {
            },
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
                <h1>Contato</h1>
            </div>
            <div className="col-sm-1"></div> 

            <div className="container">

            <form onSubmit = {handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="nome">Nome</label>
                    <input type="text" className="form-control" id="name" placeholder="nome" name="name" ref={register} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="email" name="email" ref={register} />
                </div>
                <div className="form-group">
                    <label htmlFor="mensagem">Mensagem</label>
                    <input type="text" className="form-control" id="message" placeholder="mensagem" name="message" ref={register} />
                </div>
                <button type="submit" className="btn btn-primary mb-2">Enviar</button>
            </form>

            <br/>


            <form onSubmit = {handleSubmit(onSubmit)}>
                <label>Pesquisar</label>
            <input class="form-control" type="text" id="filtro"name="filtro" placeholder="Search" aria-label="Search" ref={register} />
            <br/>
            <button type="submit" class="btn btn-warning" >Pesquisar</button>
            </form>
            <br/>

            <table className="table">
                <thead className="thead-dark">
                    <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Menssagem</th>
                    <th>status</th>
                    <th>description</th>
                    <th colSpan='2'>Ações</th>
                    </tr>
                </thead>
            
            <tbody>
                {contatos.map( (dados, index) =>{
                    return(
                    <tr key={index}>
                        <td>{dados.idContact}</td>
                        <td>{dados.name}</td>
                        <td>{dados.email}</td>
                        <td>{dados.message}</td>
                        <td>{dados.status}</td>
                        <td>{dados.description}</td>
                        <td>
                            <button type="button" className="btn btn-primary" onClick={() => handleClickResponse(dados.idContact)}>Responder</button>
                        </td>
                        <td>
                            <button type="button" className="btn btn-danger" onClick={() => handleClickDelete(dados.idContact)}>Excluir</button>
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

export default Contato