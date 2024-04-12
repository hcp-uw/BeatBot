import React, { useState } from "react";
import NextButton from "./NextButton.js";
import { searchTracks } from "../utils/spotifyApi.js";

export default function CollectTracks(props) {
    const { handleTrackSelection, selectedTracks, token, handleGoNext } = props;
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
        return tracks.map(track => (
            <div className="item" key={track.id}>
                <span className="item-name">{track.name}</span>
                <span className="track-artists">{track.artists.map(artist => artist.name).join(', ')}</span>
                <button onClick={() => handleTrackSelection(track.id)} className="add-btn">
                    {selectedTracks.includes(track.id) ? "Remove" : "Add"}
                </button>
            </div>
        ));
    };

    return (
        <div>
            {error && (
                <div>
                    Error: {error}
                </div>
            )}
            <span><NextButton handleGoNext={handleGoNext} /></span>
            {token && (
                <form onSubmit={handleSearch}>
                    <input type="text" onChange={event => setSearchKey(event.target.value)} />
                    <button type={"submit"}>Search</button>
                </form>
            )}

            {renderTracks()}
        </div>
    )
}