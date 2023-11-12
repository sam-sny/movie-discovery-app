import React from 'react';
import { useParams } from 'react-router-dom';
import {useState, useEffect} from "react";
import Movies1 from "../assets/Movies1.jpg";
import Home from "../assets/Home.svg";
import Movi from "../assets/Movie Projector.svg";
import TV from "../assets/TV Show.svg";
import Calender from "../assets/Calendar.svg";
import LogOut from "../assets/Logout.svg";
import Playing from "../assets/Playpng.png";
import load from "../assets/load.gif";
import "./Movies.css";


const Movies = () => {
  // Extract the id parameter from the URL
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
    

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=5323b1481fc3008f51b6546bf4c5d6a5&language=en-US`)
            .then((response) => response.json())
            .then((data) => {
                setMovieDetails(data);
            })
            .catch((error) => {
                console.error('Error fetching movie details:', error);
            });
    }, [id]);

    if (!movieDetails) {
        return <div className='position-absolute translate-middle fs-4 start-50 top-50'>
          <img src={load} alt="load" width="100%" height="auto"/></div>;
    }
     
    //set the data and reuse in the UI e.g <div> formattedReleaseDate </div> will fetch data and render
    const releaseDate = new Date(movieDetails.release_date);
    const formattedReleaseDate = releaseDate.toISOString();
    const poster = movieDetails.backdrop_path;
    const overview = movieDetails.overview;
    const movieTitle = movieDetails.title;
    const release_date = movieDetails.release_date;
    

    return (
        // Movie Details
        <div className='d-flex'>
          <div className='w-auto'>
{/* sidebar */}<div className='sidebar_ d-flex justify-content-between flex-column bg-white text-black p-1 vh-100 custom-rounded border'>
                 <div className=''>
                     <a href="#">
                       <img src={Movies1} alt="movies1" style={{width:"130px", height:"70px"}}/>
                     </a>
                     <ul className='nav nav-pills flex-column'>
                      <li className='nav-item p-3'>
                       <a className="text-decoration-none" href="#">
                         <img className="me-2" src={Home} alt="home" style={{width:"20px", height:"25px"}}/>
                         <span className="fs-7 text-secondary weight">Home</span>
                       </a>
                      </li>

                      <li className='nav-item p-3 movielist'>
                       <a className="text-decoration-none" href="#">
                         <img className="me-2" src={Movi} alt="movi" style={{width:"20px", height:"25px"}}/>
                         <span className="fs-7 weight" style={{color:"#b5556d"}}>Movie</span>
                       </a>
                      </li>

                      <li className='nav-item p-3'>
                       <a className="text-decoration-none" href="#">
                         <img className="me-2" src={TV} alt="tv" style={{width:"20px", height:"25px"}}/>
                         <span className="fs-7 text-secondary weight">TV Series</span>
                       </a>
                      </li>

                      <li className='nav-item p-3'>
                       <a className="text-decoration-none" href="#">
                         <img className="me-2" src={Calender} alt="cal" style={{width:"20px", height:"25px"}}/>
                         <span className="fs-7 text-secondary weight">Upcoming</span>
                       </a>
                      </li>
                     </ul>

                     <div className="red-box">
                        <div className="red-box-title">
                          Play movie quizzes and earn a free tickets
                        </div>
                          <div className="red-box-content mt-1">
                            50k people are playing now
                          </div>
                            <div className="red-box-button mt-1" >
                              Start playing
                              </div>
                     </div>

                     <ul className='nav nav-pills flex-column'>
                     <li className='nav-item p-3'>
                       <a className="text-decoration-none" href="#">
                         <img className="me-2" src={LogOut} alt="cal" style={{width:"20px", height:"25px"}}/>
                         <span className="fs-7 text-secondary weight">Log out</span>
                       </a>
                      </li>
                      </ul>

                 </div>
              </div>

          </div>

  {/*Navigation*/}        
          
               <div className='col_'>
  {/*ViewBox*/}  <div className='container-fluid'>
                  <div className='row'>
                   <div className='d-flex p-3 col-12'>
                    <div className='position-relative col-12'>
                    <img src={`https://image.tmdb.org/t/p/w500${poster}`} alt="poster" className="img-fluid" style={{width: "100%", borderRadius: "20px" ,height: "50%", objectFit: "cover"}}
                        />
                       <div className="center-element text-center">
                      <img src={Playing} alt="playButton" style={{ width: "10%", height: "auto"}} />
                      {/*<div className="watch-trailer">
                        Watch Trailer
    </div>*/}
                    </div>
                    <div className='col-12'>
                      <div className="fw-bold_ mt-1" style={{}}>
                      {movieTitle} · {release_date} · PG-13 · 2h10m 
                    <span className='fw-bold_' style={{fontSize: "10px", marginLeft: "10px", 
                    color: "#b5556d", padding: "5px", border: "1px solid #b5556d", borderRadius: "20px"}}>Action</span> 
                      <span className='fw-bold_' style={{fontSize: "10px", marginLeft: "10px",
                       color: "#b5556d", padding: "5px", border: "1px solid #b5556d", borderRadius: "20px"}}>Drama</span>

                    <span style={{float: "right"}}>⭐ 8.5 | 350k</span>
                      </div>
                   </div>
                   <div className='col-12'>
                    <div className='fw-bold__ mt-2' style={{}}>
                      {overview}
                    </div>

                   </div>
                    </div> 
                   </div>  
                 </div> 
              </div>
            </div>
          
            
        </div>
  
  );
};

export default Movies;
