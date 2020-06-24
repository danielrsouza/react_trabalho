import React, { useState, useEffect } from 'react';

import axios from "axios";

function Sobre() 
{
    const [page, setPage] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        const url = 'https://vinicius.pro.br/daoo/rest2/index.php/';

        axios.get(url + 'pages/2')
             .then(res => {
                const dados = res.data;
                setPage(dados.page)
                setContent(dados.content)
             })
    })

    return(
        <div className="jumbotron">
            <h1 className="display-4"dangerouslySetInnerHTML={{ __html: page }}></h1>
            <p className="lead" dangerouslySetInnerHTML={{ __html: content }}></p>
        </div>
    ) 
}

export default Sobre