import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './MovieList.css';

const MovieRecommendation = () => {
  const [movies, setMovies] = useState([]);
  const [activeGenre, setActiveGenre] = useState('popular');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`/api/movies/${activeGenre}`);
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [activeGenre]);

  return (
    <>
    <Container className="movie-recommendation">
      <h1 className="text-center my-4">Movie Recommendations</h1>
      <Nav variant="tabs" className="justify-content-center mb-4">
        <Nav.Item>
          <Nav.Link 
            active={activeGenre === 'popular'} 
            onClick={() => setActiveGenre('popular')}
          >
            Popular
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            active={activeGenre === 'top_rated'} 
            onClick={() => setActiveGenre('top_rated')}
          >
            Top Rated
          </Nav.Link>
        </Nav.Item>
        {/* Add more genre tabs as needed */}
      </Nav>
      <Row>
        {movies.map((movie) => (
          <Col key={movie.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card className="movie-card h-100">
              <Card.Img 
                variant="top" 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                alt={movie.title}
              />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.overview.slice(0, 100)}...</Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">
                  Release Date: {movie.release_date} | Rating: {movie.vote_average}
                </small>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    </>
  );
};

export default MovieRecommendation;