import React, { useState, useEffect } from "react";

export default function SpotifyButton(props) {
  const clientId = '98b7d6d384cc4503a01bd5d9864b49b0';
  const redirectUri = 'http://localhost:3000';
  const authUrl = new URL("https://accounts.spotify.com/authorize")
  const scope = 'user-read-private user-read-email playlist-modify-public';

  const [token, setToken] = useState("");

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

  const redirectToSpotifyAuthorize = async () => {
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

  const getToken = async (code) => {
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
  }

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

  const loginWithSpotifyClick = async () => {
    await redirectToSpotifyAuthorize();
  }

  const logoutClick = async () => {
    localStorage.clear();
    window.location.href = redirectUri;
  }

  const refreshTokenClick = async () => {
    const token = await getRefreshToken();
    setToken(token);
  }

  return(
    <>
      {!token ?
          <button className="front-page-but" onClick={loginWithSpotifyClick}>Login to Spotify</button>
          : <span>
            <button className="front-page-but" onClick={logoutClick}>Logout</button>
            <button className="front-page-but" onClick={refreshTokenClick}>Refresh Token</button>
          </span>
        }
    </>
  );
}