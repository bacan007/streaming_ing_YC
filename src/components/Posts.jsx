import React, { Component } from "react";
import { connect } from "react-redux";
import { getData, getDataInit } from "../actions/index";
import { addArticle } from "../actions/index";
import {  Link } from "react-router-dom";

function mapStateToProps(state) {
  return {
    articles: state.remoteArticles
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addArticle: article => dispatch(addArticle(article)),
    getData: title => dispatch(getData(title)),
    getDataInit: () => dispatch(getDataInit()),
  };
}

export class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.getData(this.state.title);
  }

  handleLoad(event) {
    console.log("OK");
    this.props.getDataInit();
  }

  componentDidMount() {
    window.addEventListener('load', this.handleLoad);
  }

  render() {
    const { title } = this.state;
    return (
      <div onLoad={()=>this.handleLoad}>
        <form onSubmit={this.handleSubmit} >
          <div>
            <nav className="navbar navbar-dark bg-dark">
              <div className="container-fluid">
                <a className="navbar-brand">ACTIVIDAD FRONTEND (YESID CARRANZA) ... Streaming </a>
                <form className="d-flex">
                  <input id="title"  className="form-control me-6" 
                  type="text" 
                  placeholder="Buscar peliculas" 
                  aria-label="Buscar pelicualas"
                  aria-describedby="button-addon2"
                  onChange={this.handleChange} />
                  <button className="btn btn-outline-success" 
                    type="submit"
                    id="button-addon2">Buscar</button>
                </form>
              </div>
            </nav>  
          </div>  
        </form>
        <div className="container text-center mt-3">
          <div className="row">
            {this.props.articles && this.props.articles.map(el => (
                <div className="col-3">
                  <div className="card shadow-sm border border-5 mt-3">
                      <img src={el.Poster} className="card-img-top" alt={el.Title}/>
                      <div className="card-body">
                        <h5 className="card-title">{el.Title}</h5>
                        <p className="card-text"></p>
                        <div className="row">
                          <div className="col">
                            <Link className="btn btn-info" to={`/rent/${el.imdbID}`}>Alquilar</Link>
                          </div>
                          <div className="col">
                            <Link className="btn btn-dark" to={`/buy/${el.imdbID}`}>Comprar</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
