import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import axios from "axios";

function Categoria(){
    let {id} = useParams();

    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        const url = 'https://vinicius.pro.br/daoo/rest2/index.php/products/category/' + id

        axios.get(url)
        .then(res => {
           const dados = res.data;
           setProdutos(dados);
        })

    })


    return(
        <>
        <ul>
            {produtos.map( (dados, index) => <li key={index}>Nome do Produto: {dados.name} - Preço: {dados.price} - Descrição: {dados.description}</li>)}
        </ul>
        <br />
        </>
    );
}

export default Categoria;