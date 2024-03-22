import React, { useState } from "react";
import axios from 'axios';


export default function CollectTracks(props) {
    const { handleTrackSelection, selectedTracks, token } = props;
    const [searchKey, setSearchKey] = useState("");
    const [tracks, setTracks] = useState([]);
    const [error, setError] = useState(null);

    const searchTracks = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.get("https://api.spotify.com/v1/search", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    q: searchKey,
                    type: "track",
                    limit: 30
                }
            })
            console.log(res);
            setTracks(res.data.tracks.items);
            setError(null);
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);

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
        }
    }

    const renderTracks = () => {
        return tracks.map(track => (
            <div className="track-item" key={track.id}>
                <span className="track-name">{track.name}</span>
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
            {token && (
                <form onSubmit={searchTracks}>
                    <input type="text" onChange={event => setSearchKey(event.target.value)} />
                    <button type={"submit"}>Search</button>
                </form>
            )}

            {renderTracks()}
        </div>
    )
}