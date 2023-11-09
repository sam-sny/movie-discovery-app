import React from "react";
import styled from "styled-components";
import imbd from "../assets/imdb.svg";
import tomato from "../assets/tomato.svg";


const MovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 230px;
  cursor: pointer;
`;

const CoverImage = styled.img`
  height: 362px;
  object-fit: cover;
`;

const MovieName = styled.span`
   font-size: 18px;
   font-weight: 600;
   color: black;
   margin: 15px 0;
   white-space: no-wrap;
   text-overflow: ellipsis;
`;

const MovieInfo2 = styled.span`
font-size: 16px;
font-weight: 600;
color: black;
display: flex;
flex-direction: row;
justify-content: space-between;
`;

const MovieInfo = styled.span`
font-size: 16px;
font-weight: 600;
color: black;
text-overflow: ellipsis;
text-transform: capitalize;
`;

const InfoColumn = styled.span`
 display: flex;
 flex-direction: row;
 justify-content: space-between;
`;

const MovieComponent = (props) => {
    return (
        <MovieContainer data-testid = "movie-card">
        <CoverImage data-testid = "movie-poster" src={`https://image.tmdb.org/t/p/w500${props.posterPath}`} alt="john"/>
        <MovieInfo2>{props.movieInfo}</MovieInfo2>
        <MovieName data-testid = "movie-title">{props.movieName}</MovieName>
        <InfoColumn>
          <MovieInfo><img src={imbd} alt="imbd"/> 82.0/100</MovieInfo>
          <MovieInfo><img src={tomato} alt="tomato"/> 70%</MovieInfo>
        </InfoColumn>
        <MovieInfo2 data-testid = "movie-release-date">{props.genres}</MovieInfo2>
        </MovieContainer>
    );
}

export default MovieComponent;