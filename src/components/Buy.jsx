import React from 'react'
import { connect } from "react-redux";
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { comprarPelicula } from "../actions/index";
import YoutubeEmbed from "./MovieClip";
import {  Link } from "react-router-dom";

function mapStateToProps(state) {
  return {
    articles: state.articles
  };
}

function mapDispatchToProps(dispatch) {
  return {
    comprarPelicula: article => dispatch(comprarPelicula(article))
  };
}

const Buy = () => {
  let { id } = useParams();

  const [data, setData] = useState(null);
   const [isLoading, setIsLoading] = useState(false);
   useEffect(() => {
      async function fetchData() {
         setIsLoading(true);
         try {
            const response = await fetch('http://www.omdbapi.com/?apikey=e8cfdf2d&i='+id);
            const json = await response.json();
            console.log(json);
            setData(json);
           
         } catch (error) {
            console.error(error);
         } finally {
            setIsLoading(false);
         }
      }
      fetchData();
   }, []);
   if (isLoading) {
      return <div style={{ color: 'black' }}>Cargando...</div>;
   }
   if (data) {
      return  <div>
        {
          <div className="row">
            <div className="col-8">
              <div className="card border border-danger">
                  <div className="card-body ">
                  <h1 className="card-title text-center">
                    {data.Title}
                  </h1>
                  <div className='text-center'>
                    <h2>Sinopsis:</h2>
                    <h3><p>{data.Plot}</p></h3>
                    </div>
                  <p className="card-text"></p>
                  <div className="row">
                    <h2>Actores: <p>{data.Actors}</p></h2>
                  </div>
                  <div className="row">
                    <h2>Director: <p>{data.Director}</p></h2>
                  </div>
                  <div className="row">
                    <h2>Genero: <p>{data.Genre}</p></h2>
                  </div>
                  <div className="row">
                    <h2>Lenguaje: <p>{data.Language}</p></h2>
                  </div>
                  <div className="row">
                    <h2>Año: <p>{data.Year}</p></h2>
                  </div>
                  <div className="row">
                    <h2>Duración: <p>{data.Runtime}</p></h2>
                  </div>
                  <div className="row">
                    <h2>Criticas: 
                      <p>
                        <div className="row">
                          {data.Ratings && data.Ratings.map(x => (
                            <span>{x.Source}: {x.Value}</span>
                          ))}
                        </div>
                      </p>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-3 mt-5">
              <div className="card border border-primary border border-secondary" >
                <div className="card-body text-center">
                  <img src={data.Poster} className="card-img-top" alt={data.Title} 
                  style={{ width: 400 }}/>
                  <div className="mt-3 d-grid gap-2">
                    <button type="button" className="btn btn-danger btn-lg" onClick={() => comprarPelicula({title: data.Title})}>Comprar</button>
                  </div>
                  <div className="mt-3 d-grid gap-2">
                    <button type="button" class="btn btn-warning btn-lg" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => comprarPelicula({title: data.Title})}>
                      Ver tráiler
                    </button>
                  </div>
              </div>
            </div>
          </div>
          <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="staticBackdropLabel">Tráiler {data.Title}</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                </div>
                <div class="modal-body text-center">
                  <YoutubeEmbed embedId="PyakRSni-c0" />
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
              </div>
            </div>
          </div>
          <Link className="btn btn-info btn btn-lg text-center mt-5" to={`/`}>Volver al inicio</Link>
        </div>
        }
    </div>
   }
   return <div style={{ color: 'black' }}>No hay datos</div>;
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Buy);


