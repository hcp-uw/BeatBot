import React, { useState } from "react";
import BackButton from "./BackButton.js";
import NextButton from "./NextButton.js";
import { searchArtists } from "../utils/spotifyApi.js";

export default function CollectArtists(props) {
    const { handleArtistSelection, selectedArtists, token, handleGoBack, handleGoNext } = props;
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
            <div className="item" key={artist.id}>
                {artist.images.length ? (
                    <img className="artist-image" src={artist.images[0].url} alt={`${artist.name}`} />
                ) : (
                    <span>No Image</span>
                )}
                <span className="item-name">{artist.name}</span>
                <button onClick={() => handleArtistSelection(artist.id)} className="add-btn">
                    {selectedArtists.includes(artist.id) ? "Remove" : "Add"}
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
            <span><BackButton handleGoBack={handleGoBack} /></span>
            <span><NextButton handleGoNext={handleGoNext} /></span>
            {token && (
                <form onSubmit={handleSearch}>
                    <input type="text" onChange={event => setSearchKey(event.target.value)} />
                    <button type={"submit"}>Search</button>
                </form>
            )}

            {renderArtists()}
        </div>
    )
}