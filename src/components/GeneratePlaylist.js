import React, { useState } from 'react';
import BackButton from "./BackButton.js";
import { getRecommendations, createPlaylist, addTracks } from '../utils/spotifyApi.js';

export default function GeneratePlaylist(props) {
    const { selectedTracks, selectedArtists, token, handleGoBack } = props;
    const [error, setError] = useState(null);

    const generatePlaylist = async () => {
        try {
            const { recommendationURIs, error: recommendationError } = await getRecommendations(token, selectedArtists, selectedTracks);
            if (recommendationError) {
                throw recommendationError;
            }

            const { playlistId, error: createError } = await createPlaylist(token);
            if (createError) {
                throw createError;
            }

            const { error: addError } = await addTracks(token, playlistId, recommendationURIs);
            if (addError) {
                throw addError;
            }
        } catch (error) {
            console.error("Error generating playlist:", error);
            if (error.response && error.response.status) {
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
            } else {
                setError(error.message || "An unknown error occurred.");
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