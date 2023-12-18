import { ADD_ARTICLE } from "../constants/action-types";
import Swal from 'sweetalert2';

export function addArticle(payload) {
  return { type: ADD_ARTICLE, payload };
}

export function removeArticle(payload) {
  return { type: "REMOVE_ARTICLE", payload };
}

export function getData(titulo) {
  return function(dispatch) {
    return fetch("http://www.omdbapi.com/?i=tt3896198&apikey=e8cfdf2d&s=" + titulo)
      .then(response => response.json())
      .then(json => {
        dispatch({ type: "DATA_LOADED", payload: json });
      });
  };
}

export function getDataInit() {
  return function(dispatch) {
    return fetch("https://www.omdbapi.com/?s=avengers&i=tt3896198&apikey=e8cfdf2d")
      .then(response => response.json())
      .then(json => {
        dispatch({ type: "DATA_LOADED", payload: json });
      });
  };
}

export function getDataById(id) {
  return function(dispatch) {
    return fetch("http://www.omdbapi.com/?i=" + id)
      .then(response => response.json())
      .then(json => {
        dispatch({ type: "DATA_LOADED", payload: json });
      });
  };
}

export function getTrailerMovieById(id) {
  return function(dispatch) {
    return fetch("https://api.kinocheck.de/movies?imdb_id=" + id)
      .then(response => response.json())
      .then(json => {
        dispatch({ type: "DATA_LOADED", payload: json });
      });
  };
}

export function alquilarPelicula(payload) {
  console.log(payload);
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
  });
  swalWithBootstrapButtons.fire({
    title: "Esta es la película que desea alquilar?",
    text: payload.title,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Si, alquilar!",
    cancelButtonText: "No, cancelar!",
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      swalWithBootstrapButtons.fire({
        title: "Ya la tienes!",
        text: "La película fue alquilada de forma correcta",
        icon: "success"
      });
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire({
        title: "Que mal!",
        text: "Será para la próxima",
        icon: "error"
      });
    }
  });
}

export function comprarPelicula(payload) {
  console.log(payload);
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
  });
  swalWithBootstrapButtons.fire({
    title: "Esta es la película que desea comprar?",
    text: payload.title,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Si, comprar!",
    cancelButtonText: "No, cancelar!",
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      swalWithBootstrapButtons.fire({
        title: "Ya la tienes!",
        text: "La película fue comprada de forma correcta",
        icon: "success"
      });
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire({
        title: "Que mal!",
        text: "Será para la próxima",
        icon: "error"
      });
    }
  });
}