import React from 'react';
import { useParams } from 'react-router-dom';
import {useState, useEffect} from "react";
import Movies1 from "../assets/Movies1.jpg";
import Home from "../assets/Home.svg";
import Movi from "../assets/Movie Projector.svg";
import TV from "../assets/TV Show.svg";
import Calender from "../assets/Calendar.svg";
import LogOut from "../assets/Logout.svg";
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
        return <div>Loading...</div>;
    }
     
    //set the data and reuse in the UI e.g <div> formattedReleaseDate </div> will fetch data and render
    const releaseDate = new Date(movieDetails.release_date);
    const formattedReleaseDate = releaseDate.toISOString();
    const poster = movieDetails.poster_path;
    

    return (
        // Movie Details
        <div className='d-flex'>
          <div className='w-auto'>
{/* sidebar */}<div className='d-flex justify-content-between flex-column bg-white text-black p-1 vh-100 custom-rounded border border-right-0 border-top-0  border-bottom-0'>
                 <div>
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

                      <li className='nav-item p-3'>
                       <a className="text-decoration-none" href="#">
                         <img className="me-2" src={Movi} alt="movi" style={{width:"20px", height:"25px"}}/>
                         <span className="fs-7 text-secondary weight">Movie</span>
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
                          Play movie quizzes and earn a free ticket
                        </div>
                          <div className="red-box-content">
                            50k people are playing now
                          </div>
                            <div className="red-box-button" >
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

{/*ViewBox */}          
          <div className='col'>
            <div>
           {formattedReleaseDate}
           </div>
           <div>
            <img src={`https://image.tmdb.org/t/p/w500${poster}`} alt="poster" width="100px" height="100px" />
           </div>
          </div>
            
        </div>
  
  );
};

export default Movies;
