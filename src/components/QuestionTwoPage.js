import React, { useState } from "react";
import NextButton from "./NextButton";
import mascot from "../img/mascot3.png";
import { searchArtists } from "../utils/spotifyApi.js";
//import PromptSearch from "./PromptSearch.js";

export function QuestionTwoPage(props) {
  const { handleArtistSelection, selectedArtists, token } = props;
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault();
    const { data, error } = await searchArtists(token, searchKey);
    if (data) {
      setArtists(data);
    }
    if (error) {
      if (error.response.status === 401) {
        console.error("Error: Unauthorized. Please re-authenticate.");
        setError("Error: Unauthorized. Please re-authenticate.");
      } else if (error.response.status === 429) {
        console.error("Error: Too many requests. Please try again later.");
        setError("Error: Too many requests. Please try again later.");
      } else {
        console.error("An error occurred, please try again.");
        setError("An error occurred, please try again.");
      }
    }
  };

  const renderArtists = () => {
    return artists.map(artist => (
      <div className="container">
        <div className="item list-item" key={artist.id}>
            {artist.images.length ? (
                <img className="item-image" src={artist.images[0].url} alt={`${artist.name}`} />
            ) : (
                <span>No Image</span>
            )}
            <span className="item-name">{artist.name}</span>
            <span className="toggle-button">
              <button onClick={() => handleArtistSelection(artist.id)}>
                {selectedArtists.includes(artist.id) ? "—" : "+"}
              </button>
            </span>
        </div>
        </div>
    ));
};

  document.body.style.backgroundColor = "#EBD6C1";
  return (
    <div className="q2-page" >
      <div className class="q2-title">
        <h1>What kinds of <span style={{ color: "#E2B47D" }}>artists</span> do you want to listen to?</h1>
        <p>
          The final step! Hit continue and I’ll start on your playlist.
        </p>
      </div>
      <section className="section-q2-page">
        <img className="mascot-logo3" src={mascot} alt="beatbot mascot" />
        <div>
          {token && (
            <form onSubmit={handleSearch}>
              <input className="q2-input" type="text" placeholder="Enter your response here..." onChange={event => setSearchKey(event.target.value)} />
              {/* <button type={"submit"}>Search</button> */}
            </form>
          )}

          {renderArtists()}
        </div>
      </section>
    </div>
  );
}