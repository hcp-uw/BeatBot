import React, { useEffect, useState } from "react";
import CollectTracks from "./components/CollectTracks.js";
import CollectArtists from "./components/CollectArtists.js";
import GeneratePlaylist from "./components/GeneratePlaylist.js";

function App() {
  const clientId = '98b7d6d384cc4503a01bd5d9864b49b0';
  const redirectUri = 'http://localhost:3000';
  const authUrl = new URL("https://accounts.spotify.com/authorize")
  const scope = 'user-read-private user-read-email playlist-modify-public';

  const [token, setToken] = useState("");
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [screenNumber, setScreenNumber] = useState(0);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    // if there is a code, call getToken
    if (code) {
      getToken(code);
      const url = new URL(window.location.href);
      url.searchParams.delete("code");
    
      const updatedUrl = url.search ? url.href : url.href.replace('?', '');
      window.history.replaceState({}, document.title, updatedUrl);
    }
  }, []);

  async function redirectToSpotifyAuthorize() {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const randomValues = crypto.getRandomValues(new Uint8Array(64));
    const randomString = randomValues.reduce((acc, x) => acc + possible[x % possible.length], "");

    const code_verifier = randomString;
    const data = new TextEncoder().encode(code_verifier);
    const hashed = await crypto.subtle.digest('SHA-256', data);

    const code_challenge_base64 = btoa(String.fromCharCode(...new Uint8Array(hashed)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

    window.localStorage.setItem('code_verifier', code_verifier);

    const params = {
      response_type: 'code',
      client_id: clientId,
      scope: scope,
      code_challenge_method: 'S256',
      code_challenge: code_challenge_base64,
      redirect_uri: redirectUri,
    };

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString(); // redirect the user to the authorization server for login
  }

  const getToken = async code => {
    // url for requesting an access token from Spotify
    const url = "https://accounts.spotify.com/api/token";

    let codeVerifier = localStorage.getItem('code_verifier');

    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      }),
    };

    try {
      const response = await fetch(url, payload);
      const data = await response.json();

      if (data.access_token) {
        localStorage.setItem('access_token', data.access_token);

        if (data.refresh_token) {
          localStorage.setItem('refresh_token', data.refresh_token);
        }

        setToken(data.access_token);
      }
    } catch (error) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      console.error('Error fetching access token:', error);
    }
  };



  const getRefreshToken = async () => {
    // refresh token that has been previously stored
    const refreshToken = localStorage.getItem('refresh_token');
    const url = "https://accounts.spotify.com/api/token";

    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: clientId
      }),
    }
    const body = await fetch(url, payload);
    const response = await body.json();

    localStorage.setItem('access_token', response.accessToken);
    localStorage.setItem('refresh_token', response.refreshToken);
  }

  async function loginWithSpotifyClick() {
    await redirectToSpotifyAuthorize();
  }

  async function logoutClick() {
    localStorage.clear();
    window.location.href = redirectUri;
  }

  async function refreshTokenClick() {
    const token = await getRefreshToken();
    setToken(token);
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
        <button onClick={loginWithSpotifyClick}>Login to Spotify</button>
        : <span>
          <button onClick={logoutClick}>Logout</button>
          <button onClick={refreshTokenClick}>Refresh Token</button>
        </span>
      }
      {screenNumber === 0 && <CollectTracks token={token} handleTrackSelection={handleTrackSelection} selectedTracks={selectedTracks} handleGoNext={handleGoNext} />}
      {screenNumber === 1 && <CollectArtists token={token} handleArtistSelection={handleArtistSelection} selectedArtists={selectedArtists} handleGoBack={handleGoBack} handleGoNext={handleGoNext} />}
      {screenNumber === 2 && <GeneratePlaylist token={token} selectedTracks={selectedTracks} selectedArtists={selectedArtists} handleGoBack={handleGoBack} />}
    </div>
  );
}

export default App;