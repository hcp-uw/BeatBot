import React from "react";

export default function BackButton(props) {
    const { handleGoNext } = props;
    return (
        <div>
            <button onClick={handleGoNext}>Next</button>
        </div>
    )
}