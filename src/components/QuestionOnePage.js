import React, { useState } from "react";
import NextButton from "./NextButton";
import mascot from "../img/mascot2.png";
import { searchTracks } from "../utils/spotifyApi.js";

export function QuestionOnePage(props) {
  const { handleTrackSelection, selectedTracks, token } = props;
  const [searchKey, setSearchKey] = useState("");
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault();
    const { data, error } = await searchTracks(token, searchKey);
    if (data) {
      setTracks(data);
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

  const renderTracks = () => {
    return (
      <div className="container">
          {tracks.map(track => (
            <div className="item list-item" key={track.id}>
              <span className="item-name">{track.name}</span>
              <span className="track-artists">{track.artists.map(artist => artist.name).join(', ')}</span>
              <span className="toggle-button">
                <button onClick={() => handleTrackSelection(track.id)}>
                  {selectedTracks.includes(track.id) ? "—" : "+"}
                </button>
              </span>
            </div>
          ))}
      </div>
    );
    
  };
  

  document.body.style.backgroundColor = "#DEE0ED";
  return (
    <div className="q1-page" >
      <img className="mascot-logo2" src={mascot} alt="beatbot mascot" />
      <section className="section-q1-page">
        <div className class="q1-title">
          <h1>Are there any <span style={{ color: "#9E8DCE" }}>songs</span> you want to include?</h1>
        </div>
        <p>
          Some example songs would help a lot!
        </p>
        {token && (
          <form onSubmit={handleSearch}>
            <input className="q1-input" type="text" placeholder="Enter your response here..." onChange={event => setSearchKey(event.target.value)} />
            {/* <button type={"submit"}>Search</button> */}
          </form>
        )}

        {renderTracks()}
      </section>
    </div>
  );
}