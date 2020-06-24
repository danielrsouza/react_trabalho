import React, { useEffect, useState } from "react"
import axios from 'axios';
import {useParams, useHistory} from 'react-router-dom';
import {getToken} from "../../auth";
import {useForm} from 'react-hook-form';

function ClientesView(){
    let {id} = useParams(); 
    const [clientes, setClientes] = useState([]);
    const {handleSubmit, register} = useForm();
    const history = useHistory();

    useEffect (()=>{
        console.log(id)
        axios.get(`https://vinicius.pro.br/daoo/rest2/index.php/clients/${id}`,
            {
                headers: {
                    Authorization: "Bearer " + getToken()
                }
            }
        ).then( (response) =>{
            setClientes(response.data);
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {

        });

    }, [id]);


    const onSubmit = (data) =>{
        //Api.put(`/contact/${contact.idContact}`)
        axios.post(`https://vinicius.pro.br/daoo/rest2/index.php/clients/update/${id}`,
            {
                status: data.status,
                description: data.description,

                headers: {
                    Authorization: "Bearer " + getToken(),

                }
        }).then( (response) =>{

            setClientes(response.data)
            console.log(id)
            console.log(response)
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {
        }, [id]);
    }

    return(
        <>
            <h1>Retorno de Contatos</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <table className="table table-striped">
                    <thead></thead>
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <td>{clientes.idClient}</td>
                        </tr>
                        <tr>
                            <th>Nome</th>
                            <td><input name="description" ref={register} className="form-control" defaultValue={clientes.name}/></td>
                        </tr>
                        <tr>
                            <th>Telefone</th>
                            <td><input name="description" ref={register} className="form-control" defaultValue={clientes.phone}/></td>
                        </tr>
                        <tr>
                            <th>Endereço</th>
                            <td><input name="description" ref={register} className="form-control" defaultValue={clientes.address}/></td>
                        </tr>
        
                    </tbody>
                </table>
                <div className="form-group text-right">
                    <button type="submit" className="btn btn-primary">Salvar</button>
                </div>
            </form>
        </>
    )
}

export default ClientesView