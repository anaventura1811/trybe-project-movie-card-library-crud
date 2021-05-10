import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as movieAPI from '../services/movieAPI';
import { Loading } from '../components';

class MovieDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {},
      loading: true,
    };
    this.handleLoading = this.handleLoading.bind(this);
  }

  componentDidMount() {
    this.handleMovies();
  }

  handleMovies = async () => {
    const { match } = this.props;
    const { id } = match.params;
    this.setState({ loading: true }, () => {
      movieAPI.getMovie(id).then((data) => {
        this.setState({ movie: data, loading: false });
      });
    });
  };

  handleDelete = (event, id) => {
    event.preventDefault();
    movieAPI.deleteMovie(id);
  }

  handleLoading(movie) {
    const { id, imagePath, subtitle, storyline, genre, rating, title } = movie;
    return (
      <div data-testid="movie-details">
        <img alt="Movie Cover" src={ `../${imagePath}` } />
        <p>{ `Título: ${title}` }</p>
        <p>{ `Subtitle: ${subtitle}` }</p>
        <p>{ `Storyline: ${storyline}` }</p>
        <p>{ `Genre: ${genre}` }</p>
        <p>{ `Rating: ${rating}` }</p>
        <Link to={ `/movies/${id}/edit` }>EDITAR</Link>
        <Link to="/">VOLTAR</Link>
        <button type="submit" onClick={ (event) => this.handleDelete(event, id) }>
          <Link to="/">DELETAR</Link>
        </button>
      </div>
    );
  }

  render() {
    const { loading, movie } = this.state;

    return loading ? <Loading /> : this.handleLoading(movie);
  }
}

MovieDetails.propTypes = {
  match: PropTypes.object,
}.isRequired;

export default MovieDetails;

// Ideia de usar o destructuring para match.params --> https://github.com/tryber/sd-010-a-project-movie-card-library-crud/pull/65
