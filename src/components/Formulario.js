import React, { useState } from 'react'
import Error from './Error';

const Formulario = ({guardarBusqueda}) => {

    const [termino, guardarTermino] = useState('');
    const [error, guardarError] = useState(false);

    const buscarImagenes = (e)=>{
        e.preventDefault();

        //Validar
        if(termino.trim() === ''){
            guardarError(true);
            return;
        }
        guardarError(false);

        //Enviar el termino de busqueda hacia el componente principal
        guardarBusqueda(termino);


    }

    return (
        <form
            onSubmit={buscarImagenes}
        >
            {error ? <Error mensaje="Complete el campo" /> : null}
            <div className="row">
                <div className="form-group col-md-8">
                    <input 
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Busca una Imagen"
                        onChange={e => guardarTermino(e.target.value)}
                    />
                </div>

                <div className="form-group col-md-4">
                    <input 
                        type="submit"
                        className="btn btn-lg btn-warning btn-block"
                        value="Buscar"
                    />
                </div>
            </div>
        </form>
    )
}

export default Formulario
