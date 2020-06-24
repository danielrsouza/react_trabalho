import React, { useEffect, useState } from "react"
import axios from 'axios';
import {useParams, useHistory} from 'react-router-dom';
import {getToken} from "../../auth";
import {useForm} from 'react-hook-form';

function ContatoView(){
    let {id} = useParams(); 
    const [contact, setContact] = useState([]);
    const {handleSubmit, register} = useForm();
    const history = useHistory();

    useEffect (()=>{
        axios.get(`https://vinicius.pro.br/daoo/rest/index.php/contacts/${id}`,
            {
                headers: {
                    Authorization: "Bearer " + getToken()
                }
            }
        ).then( (response) =>{
           setContact(response.data);
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {

        });

    }, [id]);

    const handleChange = (e) =>{
        setContact({...contact, status: e.target.value})
    }

    const onSubmit = (data) =>{
        //Api.put(`/contact/${contact.idContact}`)
        axios.post(`https://vinicius.pro.br/daoo/rest2/index.php/contacts/update/${id}`,
            {
                status: data.status,
                description: data.description,

                headers: {
                    Authorization: "Bearer " + getToken(),

                }
        }).then( (response) =>{

            setContact(response.data)
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
                            <td>{contact.idContact}</td>
                        </tr>
                        <tr>
                            <th>Nome</th>
                            <td>{contact.name}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>{contact.email}</td>
                        </tr>
                        <tr>
                            <th>Mensagem</th>
                            <td>{contact.message}</td>
                        </tr>
                        <tr>
                            <th>Status - {contact.status}</th>
                            <td>
                                <div className="form-group">
                                    <select name="status" ref={register} className="custom-select" 
                                    onChange={handleChange} value={contact.status}>
                                        <option disabled>Selecione um status</option>
                                        <option value="0">Aberto</option>
                                        <option value="1">Fechado</option>
                                    </select>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>Retorno</th>
                            <td>
                                <div className="form-group">
                                    <textarea name="description" ref={register} className="form-control" defaultValue={contact.description}></textarea>
                                </div>
                            </td>
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

export default ContatoView