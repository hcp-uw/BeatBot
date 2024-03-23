import React, { useEffect, useState } from "react";
import CollectTracks from "./components/CollectTracks.js";
import CollectArtists from "./components/CollectArtists.js";
import GeneratePlaylist from "./components/GeneratePlaylist.js";

function App() {
  const CLIENT_ID = "98b7d6d384cc4503a01bd5d9864b49b0"
  const REDIRECT_URI = "http://localhost:3000"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"
  const SCOPES = "user-read-private user-read-email playlist-modify-public"

  const [token, setToken] = useState("");
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [screenNumber, setScreenNumber] = useState(0);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      const params = new URLSearchParams(hash.substring(1));

      if (!params.has('error')) {
        token = params.get('access_token');
        window.localStorage.setItem("token", token);
      } else {
        console.log('Spotify access denied:', params.get('error'));
      }
    }

    setToken(token);

  }, []);


  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  }

  const handleTrackSelection = (trackId) => {
    setSelectedTracks(prev => {
      if (prev.includes(trackId)) {
        return prev.filter(id => id !== trackId);
      } else {
        return [...prev, trackId];
      }
    });
    console.log(selectedTracks)
  };

  const handleArtistSelection = (artistId) => {
    setSelectedArtists(prev => {
      if (prev.includes(artistId)) {
        return prev.filter(id => id !== artistId);
      } else {
        return [...prev, artistId];
      }
    });
    console.log(selectedArtists)
  };

  const handleGoBack = () => {
    setScreenNumber(screenNumber - 1);
  }

  const handleGoNext = () => {
    setScreenNumber(screenNumber + 1);
  }

  return (
    <div className="App">
      <h1>Spotify React</h1>
      {!token ?
        <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES}`}>
          Login to Spotify</a>
        : <button onClick={logout}>Logout</button>}
      {screenNumber === 0 && <CollectTracks token={token} handleTrackSelection={handleTrackSelection} selectedTracks={selectedTracks} handleGoNext={handleGoNext} />}
      {screenNumber === 1 && <CollectArtists token={token} handleArtistSelection={handleArtistSelection} selectedArtists={selectedArtists} handleGoBack={handleGoBack} handleGoNext={handleGoNext} />}
      {screenNumber === 2 && <GeneratePlaylist token={token} selectedTracks={selectedTracks} selectedArtists={selectedArtists} handleGoBack={handleGoBack}/>}
    </div>
  );
}

export default App;