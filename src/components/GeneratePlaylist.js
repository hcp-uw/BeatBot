import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BackButton from "./BackButton.js";

export default function GeneratePlaylist(props) {
    const { selectedTracks, selectedArtists, token, handleGoBack } = props;
    const [recommendations, setRecommendations] = useState([]);
    const [playlistId, setPlaylistId] = useState(null);
    const [error, setError] = useState(null);


    const getRecommendations = async () => {
        const res = await axios.get(`https://api.spotify.com/v1/recommendations?seed_artists=${selectedArtists}&seed_tracks=${selectedTracks}&limit=30`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(res);
        const recommendationURIs = res.data.tracks.map(track => track.uri);
        setRecommendations(recommendationURIs);
    }

    const createPlaylist = async () => {
        const meRes = await axios.get('https://api.spotify.com/v1/me', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const userId = meRes.data.id;

        const createPlaylistRes = await axios.post(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }

        }, {
            name: "Your New Playlist",
            description: "Generated by BeatBot",
            public: true
        }
        );
        setPlaylistId(createPlaylistRes.data.id);
        console.log('Playlist created:', createPlaylistRes.data);
    };

    const addTracks = async () => {
        const res = await axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            uris: recommendations
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }
        );

        console.log(res);
    }


    const generatePlaylist = async () => {
        try {
            await getRecommendations();
            await createPlaylist();
            await addTracks();
            console.log("playlist successfully generated")
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

    return (
        <div>
            {error && (
                <div>
                    Error: {error}
                </div>
            )}
            <BackButton handleGoBack={handleGoBack} />
            <button onClick={generatePlaylist}>Generate Playlist</button>
        </div >
    )
}