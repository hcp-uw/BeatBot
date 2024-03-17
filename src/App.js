import { useEffect, useState } from "react";

function App() {
  const CLIENT_ID = "98b7d6d384cc4503a01bd5d9864b49b0"
  const REDIRECT_URI = "http://localhost:3000"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

  const [token, setToken] = useState("")

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      const params = new URLSearchParams(hash.substring(1));

      if (!params.has('error')) {
        token = params.get('access_token');
        window.localStorage.setItem("token", token);
        setToken(token);
      } else {
        console.log('Spotify access denied:', params.get('error'));
      }
    } else {
      setToken(token);
    }

  }, []);


  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
  }

  return (
    <div className="App">
        <h1>Spotify React</h1>
        {!token ?
          <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>
            Login to Spotify</a>
          : <button onClick={logout}>Logout</button>}
    </div>
  );
}

export default App;