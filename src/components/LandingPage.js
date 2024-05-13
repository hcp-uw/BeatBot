import React, { useState } from "react";
// import NextButton from "./NextButton";
import mascot from "../img/mascot.png";
import SpotifyButton from "./SpotifyButton.js";
import '../css/LandingPage.css';


  export function LandingPage() {
    return (
      <div className="landingPageBody">
        <div className="lp-head-divider" >
          <div className="lp-welcome-divider">
          <h1 id="lp-welcome">Welcome to <span style={{color:"black"}}>BeatBot</span></h1>
          <p>
            Welcome to BeatBdddot, your go-to web application for creating personalized Spotify playlists!
            Connect your Spotify account, input your preferences like mood, genres, and artists into our
            intuitive interface, and let our OpenAI-powered system curate a unique playlist directly in
            your library. Whether you need music for relaxation, exercise, or entertainment, BeatBot
            makes sure your soundtrack matches every moment perfectly. Experience seamless, tailored
            music creation with BeatBot.
          </p>
            </div>
            

          <img src={mascot} alt="beatbot mascot" className="lp-mascot" />

        </div>
      </div>
    )
  // const [screenNumber, setScreenNumber] = useState(0);
  // const handleGoNext = () => {
  //   setScreenNumber(screenNumber + 1);
  // }
  // return (
  //   <div className="landing-page">
  //     <section>
  //       <div className="title-name">
  //         <h1>Welcome to <span style={{color:"black"}}>BeatBot</span></h1>
  //       </div>
  //       <p>
        //   Welcome to BeatBdddot, your go-to web application for creating personalized Spotify playlists!
        //   Connect your Spotify account, input your preferences like mood, genres, and artists into our
        //   intuitive interface, and let our OpenAI-powered system curate a unique playlist directly in
        //   your library. Whether you need music for relaxation, exercise, or entertainment, BeatBot
        //   makes sure your soundtrack matches every moment perfectly. Experience seamless, tailored
        //   music creation with BeatBot.
        // </p>
  //       <div className="button-div">
  //         {/* <button>Connect your Spotify</button> */}
  //         {/* <NextButton handleGoNext={handleGoNext} /> */}
  //         <SpotifyButton />
  //       </div>
  //     </section>
  //     <div className="mascot-logo">
  //       <img src={mascot} alt="beatbot mascot" />
  //     </div>
  //   </div>
  // );
}