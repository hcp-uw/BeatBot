import React, { useState } from "react";
import axios from 'axios';


export default function CollectArtists(props) {
    const { handleArtistSelection, selectedArtists, token } = props;
    const [searchKey, setSearchKey] = useState("");
    const [artists, setArtists] = useState([]);
    const [error, setError] = useState(null);

    const searchArtists = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.get("https://api.spotify.com/v1/search", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    q: searchKey,
                    type: "artist",
                    limit: 30
                }
            })
            console.log(res);
            setArtists(res.data.artists.items);
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
            {token && (
                <form onSubmit={searchArtists}>
                    <input type="text" onChange={event => setSearchKey(event.target.value)} />
                    <button type={"submit"}>Search</button>
                </form>
            )}

            {renderArtists()}
        </div>
    )
}