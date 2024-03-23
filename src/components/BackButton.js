import React from "react";

export default function BackButton(props) {
    const { handleGoBack } = props;
    return (
        <div>
            <button onClick={handleGoBack}>Back</button>
        </div>
    )
}