import { useEffect, useState } from "react";
import Formulario from "./components/Formulario";
import ListadoImagen from "./components/ListadoImagen";


function App() {

  const [busqueda, guardarBusqueda] = useState('');
  const [imagenes, guardarImagenes] = useState([]);
  const [paginaactual, guardarPaginaActual] = useState(1);
  const [totalpaginas, guardarTotalPaginas] = useState(1);

  useEffect(()=>{
   
    const consultarAPI = async()=>{

      if(busqueda === '') return;

      const imgPorPagina = 30;
      const key = '22870328-4c0e44546ab421749981585b3';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imgPorPagina}&page=${paginaactual}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      guardarImagenes(resultado.hits);

      //Calcular el total de paginas
      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imgPorPagina);
      guardarTotalPaginas(calcularTotalPaginas);


      //Mover la pantalla hacia arriba
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior: 'smooth'});
      
  
    }
    consultarAPI();

  },[busqueda, paginaactual]);

  //Paginacion-- definir la pagina anterior
  const paginaAnterior = ()=>{

    const nuevaPaginaActual = paginaactual - 1;

    if(nuevaPaginaActual === 0) return;

    guardarPaginaActual(nuevaPaginaActual);
  }

  //Paginacion-- definir la pagina siguiente
  const paginaSiguiente = ()=>{
    
    const nuevaPaginaActual = paginaactual + 1;

    if(nuevaPaginaActual > totalpaginas) return;

    guardarPaginaActual(nuevaPaginaActual);
  }


  return (
    <div className="container">
        <div className="jumbotron bg-secondary mt-4">
            <h1 className="text-warning text-center mb-5">Buscador de Imagenes</h1>
            <Formulario
              guardarBusqueda={guardarBusqueda}
            />
        </div>

        <div className="row justify-content-center mb-4">
            <ListadoImagen 
              imagenes={imagenes}
            />

            {(paginaactual === 1) ? null : (
              <button
                type="button"
                className="btn btn-primary mr-3"
                onClick={paginaAnterior}
              >
                &laquo; Anterior 
              </button>
            )}

           {(paginaactual === totalpaginas) ? null : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={paginaSiguiente}
              >
                Siguiente &raquo;
              </button>
           )}

        </div>
    </div>
  );
}

export default App;
