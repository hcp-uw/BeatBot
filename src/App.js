import React, { useState } from "react";
import { QuestionOnePage } from "./components/QuestionOnePage.js";
import { QuestionTwoPage } from "./components/QuestionTwoPage.js";
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { LandingPage } from "./components/LandingPage.js";



function App() {
  const [token, setToken] = useState("");
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);

  // const logoutClick = async () => {
  //   localStorage.clear();
  //   window.location.href = redirectUri;
  // }
  
  const handleTokenSet = (token) => {
    setToken(token);
    console.log(token)
  }

  const handleTrackSelection = (trackId) => {
    setSelectedTracks(prev => {
      if (prev.includes(trackId)) {
        return prev.filter(id => id !== trackId);
      } else {
        if (selectedArtists.length + prev.length < 15) {
          return [...prev, trackId];
        } else {
          alert('You may not select more than 15 seeds.');
          return prev;
        }
      }
    });
    console.log(selectedTracks);
  };

  const handleArtistSelection = (artistId) => {
    setSelectedArtists(prev => {
      if (prev.includes(artistId)) {
        return prev.filter(id => id !== artistId);
      } else {
        if (selectedTracks.length + prev.length < 15) {
          return [...prev, artistId];
        } else {
          alert('You may not select more than 15 seeds.');
          return prev;
        }
      }
    });
    console.log(selectedArtists);
  };

  return (
    <div className="App">
      {/* {!token ?
        <button onClick={loginWithSpotifyClick}>Login to Spotify</button>
        : ''
      } */}
      {/* {screenNumber === 0 && <CollectTracks token={token} handleTrackSelection={handleTrackSelection} selectedTracks={selectedTracks} handleGoNext={handleGoNext} />}
      {screenNumber === 1 && <CollectArtists token={token} handleArtistSelection={handleArtistSelection} selectedArtists={selectedArtists} handleGoBack={handleGoBack} handleGoNext={handleGoNext} />}
      {screenNumber === 2 && <GeneratePlaylist token={token} selectedTracks={selectedTracks} selectedArtists={selectedArtists} handleGoBack={handleGoBack} />} */}
      {/* <QuestionOnePage token={token} handleTrackSelection={handleTrackSelection} selectedTracks={selectedTracks} handleGoNext={handleGoNext} /> */}
      {/* <QuestionTwoPage token={token} handleArtistSelection={handleArtistSelection} selectedArtists={selectedArtists} selectedTracks={selectedTracks} /> */}
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage handleTokenSet={handleTokenSet}/>} />
          <Route path="/tracks" element={<QuestionOnePage token={token} handleTrackSelection={handleTrackSelection} selectedTracks={selectedTracks}/>} />
          <Route path="/artists" element={<QuestionTwoPage token={token} handleArtistSelection={handleArtistSelection} selectedArtists={selectedArtists}/>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;