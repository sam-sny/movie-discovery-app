import React from "react";
import {useState, useEffect} from "react";
import john from "../assets/john.jpg";
import Menu from "../assets/Menu.svg";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import HomepageMovies from "./HomepageMovies";
import logo from "../assets/Logo.svg";
import imbd from "../assets/imdb.svg";
import tomato from "../assets/tomato.svg";
import Play from "../assets/Play.svg";
import load from "../assets/load.gif";
import MovieComponent from "./MovieComponent";
import styled from "styled-components";
import "./Homepage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faFacebook,
	faInstagram,
	faTwitter,
	faYoutube,
} from "@fortawesome/free-brands-svg-icons";




const API_KEY ="5323b1481fc3008f51b6546bf4c5d6a5";

const MovieListContainer = styled.div`
   display:flex;
   flex-direction:row;
   flex-wrap: wrap;
   padding: 30px;
   justify-content: space-evenly;
   gap: 40px;
`;

const Homepage = () => {

  const [moviesList, updateMoviesList] = useState([]);
  const [searchQuery, updateSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [timeoutId, updateTimeoutId] = useState(null);

  // Fetch top-rated movies
  useEffect(() => {
    fetchTopRatedMovies();
  }, []);

  const fetchTopRatedMovies = () => {
    setLoading(true);

    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        const Movie = data.results.slice(0, 10);
        updateMoviesList(Movie);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching top-rated movies:", error);
        setLoading(false);
      });
  };

  // Handle movie search
  const onTextChange = (event) => {
    clearTimeout(timeoutId);
    const newValue = event.target.value;
    updateSearchQuery(newValue);
    setLoading(newValue.length > 0);

    // Use a ternary operator to determine whether to fetch top-rated movies or search results
    const fetchFunction = newValue.length > 0 ? fetchSearchResults : fetchTopRatedMovies;

    const newTimeoutId = setTimeout(() => fetchFunction(newValue), 500);
    updateTimeoutId(newTimeoutId);
  };

  const fetchSearchResults = async(searchString) => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${searchString}&api_key=${API_KEY}`
      );

      if (response.ok) {
        const data = await response.json();
        updateMoviesList(data.results);
      } else {
        // Handle API error
        console.error("Error fetching search results");
      }
    } catch (error) {
      // Handle network error
      console.error("Network error:", error);
    }

    setLoading(false);
  };

    return (  
    <>
     <Container fluid>

    <figure className="position-relative">
    <img src={john} className="img-fluid" alt="john" style={{height:"82vh", width:"100%", objectFit:"cover"}}/>

    <figcaption className="fig1">
    <Link to="/">
    <img src={logo} className="logo" alt="logo" /></Link>
    </figcaption>
  
    
    <input className="searchButtonInput"  value={searchQuery} onChange ={onTextChange} placeholder="Type any Movie Name..."/>

  
    <figcaption className="fig2">
    <span><a href="#" className="menu" >Sign in
    <img className="menu_img" src={Menu} alt="menu"/></a></span>
    </figcaption>
  
    <figcaption className="fig3">
    <div className="homepageLabel">John Wick 3: Parabellum</div>
    <div className="ratingContainer">
    <img src={imbd} alt="imbd" style={{width:"30px", height:"30px"}}/> <span className="rating" style={{color:"white"}} >86.0/100</span>
    <img src={tomato} alt="tomato" style={{marginLeft:"20px", width:"15px", height:"15px"}}/>
    <span className="rating" style={{color:"white"}}> 90%</span>
    </div>
    <div className="homepageLabelDetails">
    John wick is on the run after killing a member of the international assasins' guild, and with
    a $14 million price tag on his head, he is the target of the hit men and women everywhere.
    </div>
    <div className="homepageLabelWatch">
    <img src={Play} className="watchFont" alt="Play" style={{width:"20px", height:"32px", color:"white" }}/> WATCH TRAILER</div>
    </figcaption>
    </figure>
    </Container>
    {loading ? (
          <div className="loader" style={{position:"absolute", top:"30%", left:"40%", width:"100%", height:"100vh"}}>
            <img src={load} alt="load" style={{ width: "", height: "" }} />
          </div>
        ) : (
          <div></div>
        )}
    <HomepageMovies />
    <MovieListContainer>
    {moviesList.map((movie) => (
    <Link className="links" to={`/movies/${movie.id}`} key={movie.id}>
    <MovieComponent
    key={movie.id}
    posterPath={movie.poster_path}
    movieInfo="USA, 2018"
    movieName={movie.title}
    imdbRating="82.0/100"
    tomatoRating="70%"
    genres={["Action", " Adventure"]} // Each genre should be a separate string
    />
    </Link>
    ))}
    </MovieListContainer>

    <footer className="text-center mt-5">
			<div className="mt-3">
				<FontAwesomeIcon icon={faFacebook} className="me-4"/>
				<FontAwesomeIcon icon={faInstagram} className="me-4"/>
				<FontAwesomeIcon icon={faTwitter} className="me-4"/>
				<FontAwesomeIcon icon={faYoutube} className="me-4"/>
			</div>
			<div className="mt-4">
				<Link className="links me-4">Conditions of Use</Link>
				<Link className="links me-4">Privacys & Policies</Link>
				<Link className="links me-4">Press Room</Link>
			</div>
			<div className="mt-4 mb-5">
				&copy; 2023 MovieBox by Ekpo Sampson E
			</div>
		</footer>

    </>
    );
  };
     
  export default Homepage;
